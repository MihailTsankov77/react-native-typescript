import { BlogsAPI } from "./blogs-api-client.js";
import { Post, PostCreateDto } from "./posts.js";
import { idType } from "./shared-types.js";
import { AppStateStore } from "./state-store.js";
import { ValidationConfig, ValidationResult } from "./validate.js";

// interface BlogControllerType{
//   postsSection: HTMLElement;
//   erorrsDiv : HTMLElement;
//   addPostForm : HTMLFormElement;
//   resetButton : HTMLButtonElement;
//   init(): Promise<void>;
// }

class BlogController {
  postsSection: HTMLElement;
  erorrsDiv: HTMLElement;
  addPostForm: HTMLFormElement;
  resetButton: HTMLButtonElement;

  constructor() {
    this.postsSection = document.getElementById("posts") as HTMLElement;
    this.erorrsDiv = document.getElementById("errors") as HTMLElement;
    this.addPostForm = document.getElementById(
      "add-post-form"
    ) as HTMLFormElement;
    this.resetButton = document.getElementById(
      "reset-post-form"
    ) as HTMLButtonElement;
  }

  async init() {
    this.addPostForm.addEventListener("submit",this.handleSubmitPost.bind(this));
    this.resetButton.addEventListener("click", this.resetForm.bind(this));
    this.addPostForm.addEventListener("change", this.validateForm, true);
    try {
      const allPosts = await BlogsAPI.getAllPosts();
      AppStateStore.allPosts = allPosts;
      this.showPosts(allPosts);
    } catch (err) {
      this.showError(err);
    }
  }

  showPosts(posts: Post[]) {
    posts.forEach((post) => this.addPost(post));
  }

  showError(err: unknown) {
    this.erorrsDiv.innerHTML += `<div>${err}</div>`;
  }

  addPost(post: Post) {
    const postElem = document.createElement("article");
    postElem.setAttribute("id", post.id.toString());
    postElem.className = "col s12 m6 l4";

    this.addInnerHtmlToArticle(postElem, post);

    this.postsSection.insertAdjacentElement("beforeend", postElem);
  }

  editPost(post: Post) {
    const article = document.getElementById(post.id.toString()) as HTMLElement;
    this.addInnerHtmlToArticle(article, post);
  }

  private addInnerHtmlToArticle(elem: HTMLElement, post: Post) {
    elem.innerHTML = `
      <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${post.imageUrl}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${
          post.title
        }<i class="material-icons right">more_vert</i></span>
        <p>Author: ${post.authorId}, Tags: ${
      post.tags ? post.tags.join(", ") : "no tags"
    }</p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${
          post.title
        }<i class="material-icons right">close</i></span>
        <p>${post.content}</p>
      </div>
      <div class="card-action">
        <button class="btn waves-effect waves-light" type="button" id="edit${
          post.id
        }">Edit
          <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${
          post.id
        }">Delete
          <i class="material-icons right">clear</i>
        </button>
      </div>
      </div>
      `;

    elem
      .querySelector(`#delete${post.id}`)
      ?.addEventListener("click", () => this.deletePost(post.id));
    elem
      .querySelector(`#edit${post.id}`)
      ?.addEventListener("click", () => this.handleEditPost(post));
  }

  handleEditPost(post: Post) {
    AppStateStore.editedPost = post;
    this.fillPostForm(post);
    this.addPostForm.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }

  fillPostForm(post: Post) {
    for (const key in post) {
      (this.addPostForm.querySelector(`#${key}`) as HTMLFormElement).value =
        post[key as keyof Post];
      const label = this.addPostForm.querySelector(
        `label[for=${key}]`
      ) as HTMLElement;
      if (label) {
        label.className = "active";
      }
    }
  }
  async deletePost(postId: idType) {
    try {
      await BlogsAPI.deletePostById(postId);
      document.getElementById(postId.toString())?.remove();
    } catch (err) {
      this.showError(err);
    }
  }

  async handleSubmitPost(event: SubmitEvent) {
    try {
      event.preventDefault();

      const post = this.getPostFormSnapshot();

      if (post instanceof Post) {
        const edited = await BlogsAPI.updatePost(post);
        this.editPost(edited);
        AppStateStore.editedPost = undefined;
      } else {
        const created = await BlogsAPI.addNewPost(post);
        this.addPost(created);
      }

      this.resetForm();
    } catch (err) {
      this.showError(err);
    }
  }

  getPostFormSnapshot() : Post | PostCreateDto{
    const formData = new FormData(this.addPostForm);
      const nP: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        nP[key] = value.toString();
      });
      return (!nP.id)?
        new PostCreateDto(nP.title,nP.content,nP.tags.split(/\W+/),nP.imageUrl,parseInt(nP.authorId) || 1) :
        new Post(parseInt(nP.id),nP.title,nP.content,nP.tags.split(/\W+/),nP.imageUrl,parseInt(nP.authorId) || 1);
  }

  resetForm() {
    if (!AppStateStore.editedPost) {
      this.addPostForm.reset();
    } else {
      this.fillPostForm(AppStateStore.editedPost);
    }
  }

  validateForm = (event: Event) => {
    const validationResult: ValidationResult<Post> = {};
    const config = AppStateStore.postFormValidationConfig;
    const formSnapshot = this.getPostFormSnapshot() as Post;
    let field: keyof ValidationConfig<Post>;
    for (field in config) {
      const validators = config[field];
      if(validators !== undefined) {
        let errArr: string[];
        validators.forEach(validator =>{
          if(validator !== undefined) {
           const valid = validator(formSnapshot[field]!.toString(), field);

            if(valid){
              

                errArr.push(valid as string);
            
              
              
            }
          }
        });

        // validationResult[field] = errArr;
        
      }
    }
    this.showValidationErrors(validationResult);
  }

  showValidationErrors(validationResult: ValidationResult<Post>) {
    AppStateStore.postFormErrors = [];
    let field: keyof ValidationResult<Post>;
    for (field in validationResult) {
      const filedErrors = validationResult[field];
      if (filedErrors !== undefined) {
        for (const err of filedErrors) {
          AppStateStore.postFormErrors.push(`${field} -> ${err}<br>`);
        }
      }
    }
    this.showError(AppStateStore.postFormErrors);
  }
}

const CONTROLER = new BlogController();
CONTROLER.init();

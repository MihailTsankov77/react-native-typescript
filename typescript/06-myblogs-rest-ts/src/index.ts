import { BlogsAPI } from './blogs-api-client.js';
import { Post, PostCreateDto } from './posts.js';
import { idType } from './shared-types.js';

const postsSection = document.getElementById("posts");
const erorrsDiv = document.getElementById("errors");
const addPostForm = document.getElementById("add-post-form") as HTMLFormElement;
addPostForm.addEventListener('submit', handleSubmitPost);
addPostForm.addEventListener('reset', resetForm);

async function init() {
  try {
    const allPosts = await BlogsAPI.getAllPosts();
    showPosts(allPosts);
  } catch (err) {
    showError(err);
  }
}

export function showPosts(posts: Post[]) {
  posts.forEach(post => addPost(post));
}

export function showError(err: any) {
  if (erorrsDiv) {
    erorrsDiv.innerHTML = `<div>${err}</div>`;
  }
}

function reeditPost(post: Post){
  const article = document.getElementById(post.id.toString()) as HTMLElement;
  const card = article.querySelector(".card");
  card!.remove();

  addInnerHtml(article, post);

}


export function addPost(post: Post) {
  const postElem = document.createElement('article');
  postElem.setAttribute('id', post.id.toString());
  postElem.className = "col s12 m6 l4";
  
  addInnerHtml(postElem, post);
  
  postsSection!.insertAdjacentElement("beforeend", postElem);
}

function addInnerHtml(elem: HTMLElement, post: Post){
  elem.innerHTML = `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light" type="button" id="edit">Edit
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete">Delete
        <i class="material-icons right">clear</i>
      </button>
    </div>
    </div>
    `;

  elem.querySelector('#delete')!.addEventListener('click', () => deletePost(post.id))
  elem.querySelector('#edit')!.addEventListener('click', () => editPost(post))
}

async function handleSubmitPost(event: SubmitEvent) {
  try {
    event.preventDefault();
    const formData = new FormData(addPostForm);
    const nP: {[key: string]: string} = {};
    formData.forEach((value, key) =>{
      nP[key] = value.toString();
    });

    if(!nP.id){
      const newPost = new PostCreateDto(nP.title, nP.content, nP.tags.split(/\W+/), nP.imageUrl, parseInt(nP.authorId) || 1 )
      const created = await BlogsAPI.addNewPost(newPost);
      addPost(created);
    }else{
      
      const newPost = new Post(
        parseInt(nP.id),
        nP.title,
        nP.content,
        nP.tags.split(/\W+/),
        nP.imageUrl,
        parseInt(nP.authorId) || 1
      );
      const edited = await BlogsAPI.updatePost(newPost);
      reeditPost(edited);
      
    }

    resetForm();
  } catch (err) {
    showError(err);
  }
}

export function resetForm() {
   addPostForm.reset();
}

export function deletePost(postId: idType) {
  const article = document.getElementById(postId.toString());
  if(article){
    article.remove();
  }
  BlogsAPI.deletePostById(postId);
}

export function editPost(post: Post) {

  window.scrollTo(0,0);

   type ObjectKey = keyof typeof post;
  for(const keyV in post){
    const key = keyV as ObjectKey;
   
   const input = addPostForm.querySelector(`#${key}`) as HTMLFormElement;
   input.value = post[key];
  }
 
  

}




init()

import { addNewPosts, delPostFromDB, editPosts, getAllPosts } from "./blog-api-client.js";
import { addChipsForEdit, chipsEditInstances, chipsInstances } from "./materialize-helpers.js"

const postSection = document.getElementById('posts');
const errorsDiv = document.getElementById('errors');
const addPostForm = document.getElementById('add-blog-form');
addPostForm.addEventListener('submit', handleSubmitPost);
addPostForm.addEventListener('reset', resetForm);





async function init() {
    try {
        const AllPosts = await getAllPosts();
        showPosts(AllPosts);

    } catch (err) {
        showError(err);
    }
}

export function showError(err) {
    errorsDiv.innerHTML = `<div> ${err}</div>`
}

export function showPosts(posts) {
    posts.forEach(post => addPost(post));
}

export function addPost(post) {
    const postElem = document.createElement('article');
    postElem.setAttribute("id", post.id)
    postElem.className = "col s12 m6 l4";
    postElem.innerHTML = `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <p><div class="post-metadata">Author: ${post.authorId}, Tags:${(post.tags) ? post.tags.join(', ') : 'no tags'}</div></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <a class="waves-effect waves-light btn" id="edit"><i class="material-icons left">border_color</i></a>
    <a class="waves-effect waves-light btn" id="delete"><i class="material-icons left">clear</i></a>
  </div>
    `
    postSection.insertAdjacentElement('beforeend', postElem);
    postElem.querySelector('#delete').addEventListener("click", () => delPost(post.id));
    postElem.querySelector('#edit').addEventListener("click", () => editPost(post));

}

function delPost(postId) {
    const article = document.getElementById(postId);
    article.remove();
    delPostFromDB(postId);
}

function editPost(post) {
    const article = document.getElementById(post.id);
    const card = article.querySelector(".card");
    card.style.display = "none";
    article.innerHTML = `
    <div class="row">
        <form id="edit-post-form" class="col s12">
        <div id="${post.id}"></div>
        <div class="row">
            <div class="input-field col s6">
            <input  id="title" name="titlre" type="text" class="validate" value="${post.title}">
        
            </div>
            <div class="input-field col s6">
            <input id="authorId" name="authorId" type="text" class="validate" value="${post.authorId}">
        
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input  id="imageUrl" name="imageUrl" type="url" class="validate" value="${post.imageUrl}">
            
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <textarea id="content" name="content" class="materialize-textarea" class="validate" >${post.content}</textarea>
            </div>
        </div>
        <div class="row">
            <div id="edit-chips" class="chips">
                <input placeholder="Tags" id="tags" name="tags" class="custom-class">
            </div>
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="submit">Submit
            <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="reset" >Reset
            <i class="material-icons right">cached</i>
        </button>       

        </form>
    </div>
    `
    addChipsForEdit(post.tags);


    const editPostForm = document.getElementById('edit-post-form');
    editPostForm.addEventListener('submit', handleEditPost);
}


async function handleSubmitPost(event) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPost = {}
        for (const entry of formData.entries()) {
            newPost[entry[0]] = entry[1];
        }
        const tags = chipsInstances[0].chipsData.map(chip => chip.tag);
        newPost['tags'] = tags;

        const created = await addNewPosts(newPost);
        addPost(newPost);
        resetForm();
    } catch (err) {
        showError(err)
    }
}
async function handleEditPost(event) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const editPost = {}
        for (const entry of formData.entries()) {
            editPost[entry[0]] = entry[1];
        }
        const tags = chipsEditInstances[0].chipsData.map(chip => chip.tag);
        editPost['tags'] = tags;
        editPost['id'] = [...event.target.childNodes][1].id;

        const created = await editPosts(editPost);
        changeToEditedPost(editPost, event.target);

        resetForm();
    } catch (err) {
        showError(err)
    }
}

function changeToEditedPost(post, target){
    const article = target.parentElement.parentElement;
    article.innerHTML = `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <p><div class="post-metadata">Author: ${post.authorId}, Tags:${(post.tags) ? post.tags.join(', ') : 'no tags'}</div></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <a class="waves-effect waves-light btn" id="edit"><i class="material-icons left">border_color</i></a>
    <a class="waves-effect waves-light btn" id="delete"><i class="material-icons left">clear</i></a>
  </div>
    `
    postElem.querySelector('#delete').addEventListener("click", () => delPost(post.id));
    postElem.querySelector('#edit').addEventListener("click", () => editPost(post));

    target.remove();
}


function resetForm() {
    addPostForm.reset();

    const instance = chipsInstances[0];
    while (instance.chipsData.length > 0) {
        instance.deleteChip(0);
    }
}

init();
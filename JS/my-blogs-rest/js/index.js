import { addNewPosts, delPostFromDB, editPosts, getAllPosts } from "./blog-api-client.js";
import { addChipsForEdit, chipsEditInstances, chipsInstances } from "./materialize-helpers.js"

const postSection = document.getElementById('posts');
const errorsDiv = document.getElementById('errors');
const addPostForm = document.getElementById('add-blog-form');
addPostForm.addEventListener('submit', handleSubmit);
addPostForm.addEventListener('reset', resetForm);

let saveChips;



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
    
    addInnerHtmlToPost(post, postElem);
    
    postSection.insertAdjacentElement('beforeend', postElem);
}


function changeToEditedPost(post, target){
    addInnerHtmlToPost(post, target.parentElement.parentElement);
    target.remove();
}

function addInnerHtmlToPost(post, article){
    article.innerHTML = `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <p><div class="post-metadata">Author: ${post.authorId}, Tags: ${(post.tags) ? post.tags.join(', ') : 'no tags'}</div></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <a class="waves-effect waves-light btn" id="edit"><i class="material-icons left">border_color</i></a>
    <a class="waves-effect waves-light btn" id="delete"><i class="material-icons left">clear</i></a>
  </div>
    `
    // showTags(post.tags);
{/* <span id="showTags" class="chips">
         <input  disabled  id="tags" name="tags" class="custom-class">
        </span> */}


    article.querySelector('#delete').addEventListener("click", () => delPost(post.id));
    article.querySelector('#edit').addEventListener("click", () => editPost(post));

}


function delPost(postId) {
    const article = document.getElementById(postId);
    article.remove();
    delPostFromDB(postId);
}

function editPost(post) {
    const article = document.getElementById(post.id);
    const card = article.querySelector(".card");
    card.remove();
    
    article.innerHTML = `
    <div class="row">
        <form id="edit-post-form" class="col s12">
        <div id="${post.id}"></div>
        <div class="row">
            <div class="input-field col s6">
            <input  id="title" name="title" type="text" class="validate" value="${post.title}">
        
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
        <div class="btns">
            <button class="btn waves-effect waves-light" type="submit" name="submit">Submit
                <i class="material-icons right">send</i>
            </button>
            <button class="btn waves-effect waves-light red lighten-1" type="reset" >Reset
                <i class="material-icons right">cached</i>
            </button>   
            <button class="btn waves-effect waves-light blue lighten-2" id="cancel" type="button" >cancal
                <i class="material-icons right">cancel</i>
            </button>    
        </div>
        </form>

    </div>
    `
    
    addChipsForEdit(post.tags);
    
    saveChips = [...chipsEditInstances[0].chipsData.map(chip => chip.tag)];

    const editPostForm = document.getElementById('edit-post-form');
    editPostForm.addEventListener('submit', handleSubmit);
    editPostForm.addEventListener('reset', resetForm);
    editPostForm.querySelector('#cancel').addEventListener('click', () => cancelForm(post.id));
}


async function handleSubmit(event) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const Post = {}
        for (const entry of formData.entries()) {
            Post[entry[0]] = entry[1];
        }

        if([...event.target.childNodes][1].id===""){
            const tags = chipsInstances[0].chipsData.map(chip => chip.tag);
            Post['tags'] = tags;
            const created = await addNewPosts(Post);
            addPost(created);
            resetForm();
        }else{
            console.log(chipsEditInstances[0].chipsData)
            const tags = chipsEditInstances[0].chipsData.map(chip => chip.tag);
            Post['tags'] = tags;
            Post['id'] = [...event.target.childNodes][1].id;
            const created = await editPosts(Post);
            changeToEditedPost(created, event.target);
        }
  
    } catch (err) {
        showError(err)
    }
}

function resetForm(event) {
    event.target.reset();
    if([...event.target.childNodes][1].id===""){
        
        const instance = chipsInstances[0];
        while (instance.chipsData.length > 0) {
            instance.deleteChip(0);
        }
    }else{
        event.target.reset();
        const instance = chipsEditInstances[0];

        while (instance.chipsData.length > 0) {
            instance.deleteChip(0);
        }

        saveChips.forEach(tag => {
            chipsEditInstances[0].addChip({
            tag: tag,  
            })
        });

    }
    
    
}


function cancelForm(postId){
    const article = document.getElementById(postId).childNodes;
    article.remove()
    console.log(article)
}

init();
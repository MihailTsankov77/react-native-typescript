
const API_BASE_URL = "http://localhost:4200/api/posts";

export async function getAllPosts() {
    try{
        const postsResp = await fetch(API_BASE_URL);
        if(postsResp.status >= 400){
            return Promise.reject(postsResp.body);
        }
        return await postsResp.json();

    }catch(err){
        return Promise.reject(err)
    }
}

export async function addNewPosts(post) {
    try{
        const postResp = await fetch(API_BASE_URL,{
            method: "POST", 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if(postResp.status >= 400){
            return Promise.reject(postResp.body);
        }
        return await postResp.json();

    }catch(err){
        return Promise.reject(err)
    }
}

export async function delPostFromDB(postId) {
    try{
        const postResp = await fetch(`${API_BASE_URL}/${postId}`, {
            method: 'DELETE',
          });
        if(postResp.status >= 400){
            return Promise.reject(postResp.body);
        }
        return await postResp.json();

    }catch(err){
        return Promise.reject(err)
    }
}

export async function editPosts(post) {
    try{
        const postResp = await fetch(`${API_BASE_URL}/${post.id}`,{
            method: "PUT", 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if(postResp.status >= 400){
            return Promise.reject(postResp.body);
        }
        return await postResp.json();

    }catch(err){
        return Promise.reject(err)
    }
}

import { User } from './user.js';

async function init() {
    try{
        const resultsElem = document.getElementById('results');
        const usersResp = await fetch("users.json");
        const users = await usersResp.json();
        const gitUsers = await Promise.all(
                            users.map( async user=>{
                                const gitResp= await fetch(`https://api.github.com/users/${user.username}`)
                                const gu =  await gitResp.json();
                                return new User (gu.login, gu.name, gu.avatar_url, gu.public_repos, gu.public_gists, gu.followers);
                            })
                        )    
            
        
        const elems = gitUsers.map(gitUser =>{
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <figure>
                    <img src = ${gitUser.pictureUrl} >
                    <figcaption>${gitUser.username} -  ${gitUser.name}</figcaption>
                </figure>
            `

            resultsElem.insertAdjacentElement('beforeend', userDiv);
            return userDiv;       
        });

      

    }catch (err){
        console.log(`Error:` ,err)
    }finally{
        console.log("Demo finished");
    }
}

init();
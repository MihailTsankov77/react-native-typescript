
async function init() {
    try{
        const resultsElem = document.getElementById('results');
        const usersResp = await fetch("users.json");
        const users = await usersResp.json();
        const gitUsers = await Promise.all(
                            users.map( async user=>{
                                const gitResp= await fetch(`https://api.github.com/users/${user.username}`)
                                return gitResp.json();
                            })
                        )    
            
        
        const images = gitUsers.map(gitUser =>{
            const img = new Image();
            img.src = gitUser.avatar_url;
            resultsElem.insertAdjacentElement('beforeend', img);
            return img;       
        });

        await new Promise((resolve, reject) => setTimeout(resolve, 10000));
        
        images.forEach(img => resultsElem.removeChild(img));

    }catch (err){
        console.log(`Error:` ,err)
    }finally{
        console.log("Demo finished");
    }
}

init();
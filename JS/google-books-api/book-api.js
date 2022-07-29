

async function showBooks() {
    try{
        const posts= document.getElementById('posts');
        const input = document.getElementById('booksName');
        const booksName = (input.value!="") ? input.value : "react native";
        input.value="";
        
        const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(booksName)}&maxResults=9`);
        
        const googleBooks = Object.values(await resp.json())[2];
        posts.innerHTML="";
        googleBooks.forEach(gBook => {
            const innerHtml = innerHtmlCode(gBook);
            posts.insertAdjacentHTML("beforeend", innerHtml)

        });
        
    }catch (err){
        console.log(`Error:` ,err)
    }finally{

        const favBtns = document.getElementsByClassName("favBtnHolder");
        for( btn of favBtns){
            btn.addEventListener("click", ()=>{
                console.log(btn);
                btn.innerHTML=`<img src="img/heart.webp">`;//?????
            });
        }
    }

}
showBooks();


function innerHtmlCode(book) { 
    const summ = shortText(book.volumeInfo.description, 400, "<span class=\"hide\"> ...</span>");
    return `<article class="article">
                <div class="title">
                    <h3 title="${book.volumeInfo.title}">${shortText( book.volumeInfo.title, 30, "...").short}</h3>
                    <div id="rightPart">
                        <div class="artNavbar"><div class="favBtnHolder"><img src="img/heart.webp" class="favBtn"></div></div>
                        <h4 class="author">${(book.volumeInfo.authors==undefined)? "" : book.volumeInfo.authors}</h4>
                    </div>
                </div>
                
                <img src="${(book.volumeInfo.imageLinks==undefined)? "" : book.volumeInfo.imageLinks.thumbnail}"></img>

                <summary class="summary">
                    <span>${summ.short}</span>
                    <span class=\"fullSummary\">${summ.fullText}</span>
                </summary>
                    
            </article>
        `
}

function shortText(text="description...", symbols, end){
    let substring = text.substring(0, symbols);
    if(text.length < symbols){
        return {
            short: (substring=="") ? "No description." :substring,
            fullText: ''
        }
    }
    let i;
    for(i=substring.length-1; i>0;i--) {
        if (substring[i] == " ") break;
    }
    substring = substring.substring(0,i);
    return {
        short: substring + end,
        fullText: text.replace(substring, '')
    }
}

function init(){
    const form = document.getElementById('form');
    form.addEventListener("submit", () =>{
        event.preventDefault();
        showBooks(); 
        
    } );

    

   
}

init();

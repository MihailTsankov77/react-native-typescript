import { Book } from "./book.js";
import { favoritesAdd, favoritesDel } from "./favorite.js";


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
            const book = new Book(gBook.id, gBook.volumeInfo.title, gBook.volumeInfo.authors, gBook.volumeInfo.imageLinks.thumbnail, gBook.volumeInfo.description);
            const innerHtml = innerHtmlCode(book);
            
            posts.insertAdjacentHTML("beforeend", innerHtml)
    addFavListener(book);
        });
        
    }catch (err){
        console.log(`Error:` ,err)
    }

}
showBooks();

function addFavListener(book){
    const favBtnsCollection = document.getElementsByClassName("favBtnHolder");
        const favBtns = [...favBtnsCollection];
        const favBtn = favBtns[favBtns.length-1];
        
            favBtn.addEventListener("click", ()=>{
                if(favBtn.childNodes[0].className.length>6){
                    favBtn.innerHTML=`<img src="img/heart.webp" class="favBtn">`;
                    
                    favoritesAdd(book);
                }else{
                    favBtn.innerHTML =`<img src="img/heart.webp" class="favBtn hoverFavBtn">`;
                    favoritesDel(book);
                }
                
            })
    
}


function innerHtmlCode(book) { 
    const summ = shortText(book.description, 400, "<span class=\"hide\"> ...</span>");
    return `<article class="article">
                <div class="title">
                    <h3 title="${book.title}">${shortText( book.title, 30, "...").short}</h3>
                    <div id="rightPart">
                        <div class="artNavbar"><div class="favBtnHolder"><img src="img/heart.webp" class="favBtn hoverFavBtn"></div></div>
                        <h4 class="author">${(book.authors==undefined)? "" : book.authors}</h4>
                    </div>
                </div>
                
                <img src="${(book.imageUrl==undefined)? "" : book.imageUrl}"></img>

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

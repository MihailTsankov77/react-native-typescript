

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
    }
}
showBooks();


function innerHtmlCode(book) { 
    const summ = shortText(book.volumeInfo.description, 400, "<span class=\"hide\"> ...</span>");
    return `<article class="article">
        <div class="title">
            <h3>${book.volumeInfo.title}</h3>
            <h4 class="author">${(book.volumeInfo.authors==undefined)? "" : book.volumeInfo.authors}</h4>
        </div>
        
        <img src="${(book.volumeInfo.imageLinks==undefined)? "" : book.volumeInfo.imageLinks.thumbnail}"></img>
            <summary class="summary">
                ${summ.short}
                <span class=\"fullSummary\">${summ.fullText}</span>
            </summary>
            
        </article>
        `
}

function shortText(text="description..", symbols, end){
    let substring = text.substring(0, symbols);
    let i;
    for(i=substring.length-1; i>0;i--) {
        if (substring[i] == " ") break;
    }
    substring = substring.substring(0,i);
    end = (text.length < symbols)? "" : end;
    return {
        short: (substring=="") ? "No description." :substring + end,
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

import { Book } from "./book.js";
import { Comments } from "./CommentController.js";
import { FavController } from "./favoritesController.js";
import { BOOKS_API } from "./google-books-client.js";
import { BooksRepo } from "./repository.js";

class BooksController{

    postContainer: HTMLElement;
    inputContainer: HTMLFormElement;
    inputValue = "react native";
    
    constructor (){
      this.postContainer = document.getElementById("posts") as HTMLElement;
      this.inputContainer = document.getElementById("booksName") as HTMLFormElement;
    }

    async init(){
      await this.showBooksFromInput();

      const form = document.getElementById("form") as HTMLFormElement;
      form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();
        this.showBooksFromInput();
      });
    
      const navbarFavBtn = document.getElementById('favoritePageBtn') as HTMLElement;
      navbarFavBtn.addEventListener("click", () => {
        this.showFav();
      });

      const navbarHomeBtn = document.getElementById('homePageBtn') as HTMLElement;
      navbarHomeBtn.addEventListener("click", () => {
        this.showBooksFromInput();
      });

    }



    async showBooksFromInput() {
     
      try {
    
        const booksName = this.inputContainer.value != "" ? this.inputContainer.value : this.inputValue;
        this.inputValue = booksName;
        
        this.inputContainer.value = "";
        this.postContainer.innerHTML = "";
    
        const books: Book[] = await BOOKS_API.getBooks(booksName, 9);

        this.createBooks(books);
    
      } catch (err) {
        this.showError(err);
      }
    }

    async showFav() {
      this.postContainer.innerHTML = "";
      const books: Book[] | undefined = await BooksRepo.findAll();
      if (books) {
        this.createBooks(books, true);
      }
    }

    createBooks( books:Book[], isFromFav = false){
      books.forEach((book) => {
          
        const article = this.createArticle(book);

        this.postContainer.insertAdjacentElement("beforeend", article);

        Comments.addCommentListener(book, isFromFav)
        FavController.addFavListener(book, isFromFav);
      });
    }


    createArticle(book: Book) {

      const article = document.createElement("article");
      article.setAttribute("id", book.id.toString());
          article.className = "article";
          article.innerHTML = this.createInnerHtmlArticle(book);
      return article;
    }

    createInnerHtmlArticle(book: Book){
      return `
      <div class="title">
          <h3>${book.shortTitle}</h3>
          <div id="rightPart">
            <div id="navBar">
              <div class="artNavbar"><div class="commentBtnHolder"><img src="img/comment.png" class="favBtn hoverFavBtn"></div></div>
              <div class="artNavbar"><div class="favBtnHolder"><img src="img/heart.webp" class="favBtn hoverFavBtn"></div></div>
            </div>  
              <h4 class="author">${book.authors}</h4>
              
          </div>
      </div>
    
        <img src="${book.imageUrl}"></img>

        <summary class="summary">
            <span class="shortSummary">${book.shortDescription}</span>
            <span class="fullSummary">${book.description}</span>
        </summary>            
    `;
    }

    showError(error: any){
      console.log(`Error:`, error);
    }
}


export const BooksControler = new BooksController();
BooksControler.init();
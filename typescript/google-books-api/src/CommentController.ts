import { BookComments } from "./book-comment.js";
import { Book } from "./book.js";
import { FavController } from "./favoritesController.js";
import { BooksControler } from "./index.js";
import { CommentsRepo } from "./repository.js";

class CommentController {

 
    async addCommentListener(book: Book, isFromFav: boolean) {

        const bookComments = new BookComments(book.id);
        await bookComments.areCommentsExisting();
        
        const article = document.getElementById(book.id) as HTMLElement;
        const commentBtn = article.querySelector(".commentBtnHolder") as HTMLElement;
       

        commentBtn.addEventListener("click", () => {
      
          article.innerHTML= this.#showForm(book);
          const commentsCont = article.querySelector('.comments-container') as HTMLElement;
          
          this.#showComments(commentsCont, bookComments);
          
          article.querySelector('.cancelBtn')?.addEventListener("click", ()=>{
            article.innerHTML = BooksControler.createInnerHtmlArticle(book);
            Comments.addCommentListener(book, isFromFav);
            FavController.addFavListener(book, isFromFav);
          });

          const form = article.querySelector('#addCommentForm') as HTMLFormElement;
          form.addEventListener("submit", (event: SubmitEvent)=>{
            event.preventDefault();
            this.#handleSubmitPost(form, bookComments, commentsCont);
          });
        })
      }

      #showComments(container: HTMLElement, Bookcomments:BookComments){
        
        Bookcomments.comments.forEach(comment => {
          this.#createCommentHolders(container, comment, Bookcomments);
        });
      }
      #createCommentHolders(container: HTMLElement, comment: string, Bookcomments:BookComments){
        
        const commentHolder = document.createElement('div') as HTMLElement;
        commentHolder.className = "commentHolder";
        commentHolder.innerHTML= `<div class="content">${comment}</div>
        <div class="cancelBtnHolder"><img src="img/icon-cancel.png" class="cancelBtn"></div>
        `;
        container.insertAdjacentElement("beforeend", commentHolder);
        const delBtn = commentHolder.querySelector(".cancelBtn") as HTMLElement;
        delBtn.addEventListener("click", ()=>{
          commentHolder.remove();

          const startIndex =  Bookcomments.comments.indexOf(comment);

          if (startIndex !== -1) {
            Bookcomments.comments.splice(startIndex, 1);
          }
          CommentsRepo.update(Bookcomments);
         
          
        });
      }

      #handleSubmitPost(form: HTMLFormElement, Bookcomments: BookComments, container: HTMLElement) {
        const input = form.querySelector("input") as unknown as HTMLFormElement;
        if(input.value!==""){
          this.#addComment(input.value, Bookcomments, container);
          input.value="";
        }   
      }

      #addComment(comment: string, Bookcomments: BookComments, container: HTMLElement){
        Bookcomments.addComment(comment);
        this.#createCommentHolders(container, comment, Bookcomments);

        if(Bookcomments.comments.length>1){
          CommentsRepo.update(Bookcomments);
        }else{
          CommentsRepo.create(Bookcomments);
        }

      }


      #showForm(book: Book){
        return ` 
        <form id="addCommentForm">
            <div class="heading">
              <label for=""> ${book.title}</label>
              <div class="cancelBtnHolder"><img src="img/icon-cancel.png" class="cancelBtn"></div>
              </div>
              <div class="comments-container"></div>
              <div class="inputFields">
                  <input type="text" maxlength="50">
                  <button name="submit">Add Comment</button>
              </div>
            </form>
        `
      }
}

export const Comments = new CommentController();
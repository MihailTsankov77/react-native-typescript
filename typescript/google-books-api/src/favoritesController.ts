import { Book } from "./book.js";
import { BooksRepo } from "./repository.js";




class FavoritesController{

    async addFavListener(book: Book, isFromFav: boolean) {


        const article = document.getElementById(book.id) as HTMLElement;
        const favBtn = article.querySelector(".favBtnHolder") as HTMLElement;
        
        const isFav = await Book.isFavorite(book);
         
        if (isFav) {
          favBtn.innerHTML = `<img src="img/heart.webp" class="favBtn">`
         
        }
  
        favBtn.addEventListener("click", () => {
      
          const heartBtn = favBtn.childNodes[0] as HTMLElement;
          
          if(!isFromFav){
            if (heartBtn.classList.length > 1) {
              favBtn.innerHTML = `<img src="img/heart.webp" class="favBtn">`;
              BooksRepo.create(book);
        
            } else {
              favBtn.innerHTML = `<img src="img/heart.webp" class="favBtn hoverFavBtn">`;
              BooksRepo.delete(book.id);
            }
          }else{
            article.remove();
            BooksRepo.delete(book.id);
          }
      
        })
      
      }




}

export const FavController = new FavoritesController();

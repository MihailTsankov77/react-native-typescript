import { Book } from "./book.js";
import { BOOKS_API } from "./google-books-client.js";
import { BooksRepo } from "./repository.js";

// class BooksController{
//     static{
//         showBooksFromInput();
//     }
// }

async function showBooksFromInput() {
  const posts = document.getElementById("posts") as HTMLElement;
  const input = document.getElementById("booksName") as HTMLFormElement;


  try {

    const booksName = input.value != "" ? input.value : "react native";
    input.value = "";
    posts.innerHTML = "";

    const books: Book[] = await BOOKS_API.getBooks(booksName, 9);
    books.forEach((book) => {
      const innerHtml = innerHtmlCode(book);

      posts.insertAdjacentHTML("beforeend", innerHtml);

      addFavListener(book);
    });


  } catch (err) {
    console.log(`Error:`, err);
  }
}

showBooksFromInput();

async function showFav(posts: HTMLElement) {
  posts.innerHTML = "";
  const books: Book[] | undefined = await BooksRepo.findAll();
  if (books) {
    books.forEach((book) => {
      const innerHtml = innerHtmlCode(book);

      posts.insertAdjacentHTML("beforeend", innerHtml);

      addFavListener(book);
    });
  }
}


async function addFavListener(book: Book) {

  const favBtnsCollection = document.getElementsByClassName("favBtnHolder");
  const favBtns = [...favBtnsCollection];
  const favBtn = favBtns[favBtns.length - 1];

  if (!book.checkFav) {
    const books: Book[] | undefined = await BooksRepo.findAll();
    if (books) {
      books.forEach((BookElem) => {
        if (BookElem.id === book.id) {
          favBtn.innerHTML = `<img src="img/heart.webp" class="favBtn">`
          return;
        }
      });
    }
    book.checkFav = true;
  }

  favBtn.addEventListener("click", () => {

    const heartBtn = favBtn.childNodes[0] as HTMLElement;
    if (heartBtn.className.length > 6) {
      favBtn.innerHTML = `<img src="img/heart.webp" class="favBtn">`;
      BooksRepo.create(book);

    } else {
      favBtn.innerHTML = `<img src="img/heart.webp" class="favBtn hoverFavBtn">`;
      BooksRepo.delete(book.id);
    }

  })

}

function innerHtmlCode(book: Book) {
  return `<article class="article">
                <div class="title">
                    <h3>${book.shortTitle}</h3>
                    <div id="rightPart">
                        <div class="artNavbar"><div class="favBtnHolder"><img src="img/heart.webp" class="favBtn hoverFavBtn"></div></div>
                        <h4 class="author">${book.authors}</h4>
                    </div>
                </div>
                
                <img src="${book.imageUrl}"></img>

                <summary class="summary">
                    <span>${book.shortDescription}</span>
                    <span class="fullSummary">${book.description}</span>
                </summary>
                    
            </article>
        `;
}

function init() {
  const form = document.getElementById("form") as HTMLFormElement;
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    showBooksFromInput();
  });

  const navbarFavBtn = document.getElementById('favoritePageBtn') as HTMLElement;
  navbarFavBtn.addEventListener("click", () => {
    showFav(document.getElementById("posts") as HTMLElement);
  });
}

init();

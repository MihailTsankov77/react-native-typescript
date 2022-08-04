import { Book } from "./book.js";

interface BooksApiInt {
  getAllBooks(booksName: string): Promise<Book[]>;
  getBooks(booksName: string, n: number): Promise<Book[]>;
}

class BooksApi implements BooksApiInt {
  #API_URL_MAIN = "https://www.googleapis.com/books/v1/volumes?q=";
  #API_URL_AD = "&maxResults=";

  async getAllBooks(booksName: string): Promise<Book[]> {
    return this.handleRequest(`${this.#API_URL_MAIN}${encodeURIComponent(booksName)}`);
  }

  async getBooks(booksName: string, n: number): Promise<Book[]> {
    console.log("fsbjask")
    return this.handleRequest(
      `${this.#API_URL_MAIN}${encodeURIComponent(booksName)}${this.#API_URL_AD}${n}`
    );
  }

  private async handleRequest(URL: string) {
    const resp = await fetch(URL);
    const googleBooks = Object.values(await resp.json())[2] as Array<any>;
    const books: Book[] = [];
    googleBooks.forEach((gBook) => {
      books.push(
        new Book(
          gBook.id,
          gBook.volumeInfo.title,
          gBook.volumeInfo.authors,
          gBook.volumeInfo.imageLinks.thumbnail,
          gBook.volumeInfo.description
        )
      );
    });
    return Promise.resolve(books);
  }
}

export const BOOKS_API: BooksApi = new BooksApi();

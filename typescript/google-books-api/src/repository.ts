import { Book, idType } from "./book.js";

type Identifiable<K> = { id: K };

export interface RepositoryInt<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]> | undefined;
    findById(id: K): Promise<V> | undefined;
    create(entety: V): Promise<V>;
    delete(id: K): Promise<V> | undefined;
  }

export class Repository<K, V extends Identifiable<K>> implements RepositoryInt<K, V>{
  #DB_BASE_URL = `http://localhost:4000/`;
  constructor (repoName: string){
      this.#DB_BASE_URL += repoName;
  }
  
  findAll(): Promise<V[]> | undefined {
    return this.handleRequest(this.#DB_BASE_URL);
  }
  findById(id: K): Promise<V>{
    return this.handleRequest(`${this.#DB_BASE_URL}/${id}`);
  }
  create(entety: V): Promise<V> {
    console.log(entety);
    
    return this.handleRequest(this.#DB_BASE_URL, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(entety)
  });
  }
 
  delete(id: K): Promise<V> | undefined {
    return this.handleRequest(`${this.#DB_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
  }


  private async handleRequest(url: string, options?: RequestInit) {
    try {
        const postsResp = await fetch(url, options);
        if (postsResp.status >= 400) {
            return Promise.reject(postsResp.body);
        }
        return postsResp.json();
    } catch (err) {
        return Promise.reject(err);
    }
  }

}

export const BooksRepo = new Repository<idType, Book>("books");
import Image from "../modules/Gallery-image";


export type Identifiable<K> = { id: K | undefined };

export interface RepositoryInt<K, V extends Identifiable<K>> {
  findAll(): Promise<V[]> | undefined;
  findById(id: K): Promise<V> | undefined;
  update(entety: V): Promise<V> | undefined;
  create(entety: V): Promise<V>;
  delete(id: K): Promise<V> | undefined;
}

export class Repository<K, V extends Identifiable<K>> implements RepositoryInt<K, V>{
  #DB_BASE_URL = `http://10.16.6.28:4000/api/`;
  constructor(repoName: string) {
    this.#DB_BASE_URL += repoName;
  }

  async findAll(): Promise<V[]> {
    return this.handleRequest(this.#DB_BASE_URL);
  }
  async findById(id: K): Promise<V> {
    return this.handleRequest(`${this.#DB_BASE_URL}/${id}`);
  }
  async create(entety: V): Promise<V> {
    return this.handleRequest(this.#DB_BASE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(entety)
    });
  }

  async update(entety: V): Promise<V> {
    return this.handleRequest(`${this.#DB_BASE_URL}/${entety.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(entety),
    });
  }


  async delete(id: K): Promise<V> {
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

export const ImageRepo = new Repository<number, Image>("Images");

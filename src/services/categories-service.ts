import { HttpClient, singleton } from "aurelia";

@singleton
export class CategoriesService {
  
  constructor(private httpClient: HttpClient) { }

  public async getAll(): Promise<string[]> {
    return this.httpClient
      .get('https://api.chucknorris.io/jokes/categories', { cache: 'no-store' })
      .then(response => response.json());
  }
}

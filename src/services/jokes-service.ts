import { HttpClient, inject } from "aurelia";

inject()
export class JokesService {
  private httpClient: HttpClient = new HttpClient();
  
  public getRandomJokeFromCategory(category: string) {
    return this.httpClient
      .get('https://api.chucknorris.io/jokes/random?category=' + category, { cache: 'no-store' })
      .then(response => response.json());
  }
}
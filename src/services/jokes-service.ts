import { HttpClient, singleton } from "aurelia";
import { IJoke } from "../domain/i-joke";

@singleton
export class JokesService {

  constructor(private httpClient: HttpClient) { }
  
  public async getRandomJokeFromCategory(category: string): Promise<IJoke> {
    return this.httpClient
      .get('https://api.chucknorris.io/jokes/random?category=' + category, { cache: 'no-store' })
      .then(response => response.json());
  }
}

import { inject } from "aurelia";
import { Joke } from "../domain/joke";
import { CategoriesService } from "../services/categories-service"
import { JokesService } from "../services/jokes-service";

export class AppState {
  public categories: readonly string[] = [];
  public jokes: Joke[] = [];

  constructor(@inject(CategoriesService) private categoriesService: CategoriesService,
              @inject(JokesService) private jokesService: JokesService) {
    this.getCategories();
  }

  private async getCategories() {
    this.categories = await this.categoriesService.getAll();
  }

  public async addJokes(category: string, count: number) {
    for (let i = 0; i < count; i++) {
      const newJoke = await this.jokesService.getRandomJokeFromCategory(category);

      if (!this.isJokeInList(newJoke)) {
        this.jokes.push(newJoke);
      }
    }
  }

  private isJokeInList(newJoke: Joke): boolean {
    for (const joke of this.jokes) {
      if (joke['id'] === newJoke['id']) {
        return true;
      }
    }
    return false;
  }
}

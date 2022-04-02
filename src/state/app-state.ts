import { inject } from "aurelia";
import { IJoke } from "../domain/i-joke";
import { CategoriesService } from "../services/categories-service"
import { JokesService } from "../services/jokes-service";

export class AppState {
  public categories: string[] = [];
  public jokes: IJoke[] = [];

  constructor(@inject(CategoriesService) private categoriesService: CategoriesService,
              @inject(JokesService) private jokesService: JokesService) {
    this.getCategories();
  }

  private async getCategories() {
    const availableCategories = await this.categoriesService.getAll();
    while (this.categories.length < 3) {
      const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];

      if (!this.categories.includes(category)) {
        this.categories.push(category);
      }
    }
  }

  public async addJokes(category: string, count: number) {
    for (let i = 0; i < count; i++) {
      const newJoke = await this.jokesService.getRandomJokeFromCategory(category);

      if (!this.isJokeInList(newJoke)) {
        this.jokes.splice(0, 0, newJoke);
      }
    }
  }

  private isJokeInList(newJoke: IJoke): boolean {
    for (const joke of this.jokes) {
      if (joke['id'] === newJoke['id']) {
        return true;
      }
    }
    return false;
  }
}

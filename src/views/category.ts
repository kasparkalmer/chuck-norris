import { EventAggregator, IRouteViewModel, Params } from "aurelia";
import { IJoke } from "../domain/i-joke";
import { AppState } from "../state/app-state";

export class Category implements IRouteViewModel {
  private category = '';
  private jokes: IJoke[] = [];
  private loading = false;

  constructor(private eventAggregator: EventAggregator, private appState: AppState) { }

  public load(parameters: Params): void {
    console.log(parameters);
    if (parameters[0]) {
      this.category = parameters[0];
      this.loading = true;
      this.jokes = this.appState.jokes.filter(joke => joke.categories.includes(this.category));
      this.changeViewClass();
      this.addJokes(5);
    }
  }

  private async addJokes(count: number): Promise<void> {
    await this.appState.addJokes(this.category, count);
    this.loading = false;
    this.eventAggregator.publish('loaded');
    this.jokes = this.appState.jokes.filter(joke => joke.categories.includes(this.category));
  }

  private changeViewClass(): void {
      setTimeout(() => {
          const backgroundDiv = document.getElementById('category');
          if (backgroundDiv) {
            backgroundDiv.className = this.category;
          }
      }, 0);
  }
}

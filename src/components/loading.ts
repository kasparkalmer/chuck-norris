import { EventAggregator } from "aurelia";

export class Loading {
  private loadingMessage = "LOADING";
  private loading = false;

  constructor(private eventAggregator: EventAggregator) {
      this.eventAggregator.subscribe('loaded', () => {
          this.loading = false;
          this.loadingMessage = "LOADING";
      });
  }

  attached() {
    this.loading = true;
    this.animate();
  }

  private animate() {
    setTimeout(() => {
      if (!this.loading) { return; }

      if (this.loadingMessage.length < 12) {
        this.loadingMessage = this.loadingMessage + '.';
      } else {
        this.loadingMessage = "LOADING";
      }

      this.animate();
    }, 150);
  }
}

import { Component, OnInit, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule, MatIconModule, MatCardModule],
  templateUrl: './app.html',
  styles: [],
})
export class App implements OnInit {
  protected readonly title = signal('app-folha');
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false      
    }, 1000);
  }
}

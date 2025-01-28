import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'destiny-salvations-edge-guide';

  constructor(private router: Router){
  }

  navigateToCalc() {
    this.router.navigate(['/verity/disection'])
  }
}

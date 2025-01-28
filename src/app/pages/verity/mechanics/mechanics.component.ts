import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-verity-mechanics',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mechanics.component.html',
  styleUrl: './mechanics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerityMechanicsComponent { }

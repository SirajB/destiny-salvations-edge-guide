import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-verity',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './verity.component.html',
  styleUrl: './verity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerityComponent { }

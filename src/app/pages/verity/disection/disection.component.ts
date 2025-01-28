import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShapeService, InsideShape, OutsideShape } from './shape.service'; // Import typings and service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verity-disection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './disection.component.html',
  styleUrl: './disection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerityDisectionComponent {
// Inside shapes variables
shape1: InsideShape | null = null;
shape2: InsideShape | null = null;
shape3: InsideShape | null = null;

// Outside shapes variables (storing the selected shape names)
outsideShape1: string | null = null;
outsideShape2: string | null = null;
outsideShape3: string | null = null;

// All possible inside shapes
availableInsideShapes: InsideShape[] = ['Square', 'Circle', 'Triangle'];

// All outside shapes from the service
allOutsideShapes: OutsideShape[] = this.shapeService.threeDShapes;

// Output for transactions
transactions: string[] = [];
validationError: string = '';

constructor(private shapeService: ShapeService) {}

// Event handler for when any inside shape is changed
onInsideShapeChange(): void {
  this.checkInsideShapesUniqueness();
}

// Event handler for when any outside shape is changed
onOutsideShapeChange(): void {
  // Ensure that outside shapes are unique (if necessary)
  this.checkOutsideShapesUniqueness();
}

// Method to validate inputs and calculate trades
calculateTrades(): void {
  this.validationError = ''; // Clear previous errors

  // Convert individual shape variables to an array for inside shapes
  const insideShapes: InsideShape[] = [this.shape1, this.shape2, this.shape3].filter(shape => shape !== null) as InsideShape[];

  // Validate that each inside shape is unique and valid
  if (
    insideShapes.length !== 3 || // Ensure all inside shapes are selected
    new Set(insideShapes).size !== 3 // Ensure uniqueness (no duplicates)
  ) {
    this.validationError =
      'Each inside shape must be unique and set to Square, Circle, or Triangle.';
    return;
  }

  // Get the selected outside shapes based on their names
  const selectedOutsideShapes = [this.outsideShape1, this.outsideShape2, this.outsideShape3].map(name =>
    this.allOutsideShapes.find(shape => shape.name === name)
  );

  // Validate that all selected outside shapes are valid
  if (selectedOutsideShapes.includes(undefined)) {
    this.validationError = 'Each outside shape must be a valid selection.';
    return;
  }

  // Cast to ensure types are correct after validation
  const validOutsideShapes = selectedOutsideShapes as OutsideShape[];

  // Calculate trades using the service with valid inside shapes
  this.transactions = this.shapeService.calculateTrades(insideShapes, validOutsideShapes);
}

// Optional: Method to check uniqueness of inside shapes
private checkInsideShapesUniqueness() {
  const insideShapes = [this.shape1, this.shape2, this.shape3];
  if (new Set(insideShapes).size !== insideShapes.length) {
    this.validationError = 'Inside shapes must be unique.';
  }
}

// Optional: Method to check uniqueness of outside shapes
private checkOutsideShapesUniqueness() {
  const outsideShapes = [this.outsideShape1, this.outsideShape2, this.outsideShape3];
  if (new Set(outsideShapes).size !== outsideShapes.length) {
    this.validationError = 'Outside shapes must be unique.';
  }
}

}
// shapeResult: { [key: string]: string | undefined } = {};
// selectedLetters: string[] = ['', '', ''];
// letters = ["S", "C", "T"];
// inputText: string = '';

// combinationShapeKeys: string[] = Object.keys(this.shapeService.combinationShapes);
// combinationShapeNames: string[] = Object.values(this.shapeService.combinationShapes);
// selectedCombinationShapes: string[] = ['', '', ''];
// finalShape: string = '';
// transformationSteps: string[] = [];

// constructor(private shapeService: ShapeService) {}

// ngOnInit(): void {}

// updateSelectionFromInput(): void {
//   const cleanInput = this.inputText.replace(/\s+/g, '').toUpperCase();
//   this.selectedLetters = Array.from(new Set(cleanInput.split('')));
//   while (this.selectedLetters.length < 3) {
//     this.selectedLetters.push('');
//   }
// }

// updateInputFromSelection(): void {
//   this.inputText = this.selectedLetters.join(' ');
// }

// calculateShapeFromText(): void {
//   this.updateSelectionFromInput();
//   this.shapeResult = this.shapeService.getShapesForInput(this.inputText);
//   this.calculateFinalShape();
// }

// calculateShapeFromDropdown(): void {
//   if (this.selectedLetters.length === 3) {
//     const input = this.selectedLetters.join('');
//     this.shapeResult = this.shapeService.getShapesForInput(input);
//     this.updateInputFromSelection();
//     this.calculateFinalShape();
//   } else {
//     this.shapeResult = { error: "Please select exactly three letters." };
//   }
// }

// onLetterSelect(letter: string | null, index: number): void {
//   if (letter) {
//     this.selectedLetters[index] = letter;
//     this.calculateShapeFromDropdown();
//   }
// }

// onInputChange(): void {
//   this.calculateShapeFromText();
// }

// onCombinationShapeSelect(shapeKey: string | null, index: number): void {
//   if (shapeKey) {
//     this.selectedCombinationShapes[index] = shapeKey;
//     this.calculateFinalShape();
//     this.calculateTransformationSteps();
//   }
// }

// calculateFinalShape(): void {
//   this.finalShape = this.shapeService.getFinalShape(this.selectedCombinationShapes);
// }

// calculateTransformationSteps(): void {
//   this.transformationSteps = this.shapeService.findTransformationSteps(this.selectedCombinationShapes);
// }

// getShapeResultKeys(): string[] {
//   return Object.keys(this.shapeResult);
// }

import { Injectable } from '@angular/core';

export type InsideShape = 'Square' | 'Circle' | 'Triangle';
export type OutsideShape = {
  name: string;
  symbol1: InsideShape;
  symbol2: InsideShape;
  isPure: boolean;
  image: string;
  raw: string;
};

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  public threeDShapes: OutsideShape[] = [
    { name: 'Cube', symbol1: 'Square', symbol2: 'Square', isPure: true, image: './images/cube.svg', raw: '' },
    { name: 'Sphere', symbol1: 'Circle', symbol2: 'Circle', isPure: true, image: './images/sphere.svg', raw: '' },
    { name: 'Pyramid', symbol1: 'Triangle', symbol2: 'Triangle', isPure: true, image: './images/pyramid.svg', raw: '' },
    { name: 'Cylinder', symbol1: 'Circle', symbol2: 'Square', isPure: false, image: './images/cylinder.svg', raw: '' },
    { name: 'Cone', symbol1: 'Circle', symbol2: 'Triangle', isPure: false, image: './images/cone.svg', raw: '' },
    { name: 'Prism', symbol1: 'Triangle', symbol2: 'Square', isPure: false, image: './images/prism.svg', raw: '' },
  ];

  // Mapping of inside shapes to their target 3D shapes
  private targetMapping: Record<InsideShape, string> = {
    Square: 'Cone',
    Circle: 'Prism',
    Triangle: 'Cylinder',
  };

  // Main function to calculate trades
  calculateTrades(
    insideShapes: InsideShape[],
    outsideShapes: OutsideShape[]
  ): string[] {
    const targetShapes = insideShapes.map(shape => this.targetMapping[shape]);
    const transactions: string[] = [];

    // Helper function to get the position (Left, Middle, Right)
    function getPosition(index: number): string {
      return ['Left', 'Middle', 'Right'][index];
    }

    // Place a symbol into the correct position
    function placeSymbol(positionIndex: number, symbol: InsideShape) {
      transactions.push(`Place ${symbol} into ${getPosition(positionIndex)}`);
    }

    // For each inside shape, match with the corresponding outside shape and make the swaps
    targetShapes.forEach((targetName, i) => {
      const targetShape = this.threeDShapes.find(shape => shape.name === targetName)!;
      const currentShape = outsideShapes[i];

      // If the current outside shape has duplicate symbols, we need to swap them
      if (currentShape.symbol1 === currentShape.symbol2) {
        const missingSymbol =
          currentShape.symbol1 === targetShape.symbol1
            ? targetShape.symbol2
            : targetShape.symbol1;

        // Handle the cases where we need to swap the correct symbols
        if (currentShape.symbol1 === insideShapes[i]) {
          placeSymbol(i, currentShape.symbol1); // Place current symbol in current position
          placeSymbol(i === 0 ? 1 : 0, currentShape.symbol2); // Swap to the other position

          // Update outside shapes accordingly
          if (i === 0) {
            currentShape.symbol1 = targetShape.symbol2;
            outsideShapes[1].symbol1 = targetShape.symbol2;
          } else {
            currentShape.symbol2 = targetShape.symbol1;
            outsideShapes[0].symbol1 = targetShape.symbol1;
          }
        } else {
          placeSymbol(i === 0 ? 1 : 0, missingSymbol); // Swap symbols if needed
          transactions.push('Perform trade operation');
        }
      }
    });

    return transactions;
  }

}
// private shapes: { [key: string]: string } = {
//   "S": "Square",
//   "C": "Circle",
//   "T": "Triangle"
// };

// public combinationShapes: { [key: string]: string } = {
//   "SS": "Cube",
//   "TT": "Pyramid",
//   "CC": "Sphere",
//   "SC": "Cylinder",
//   "ST": "Prism",
//   "CT": "Cone"
// };

// public shapeResults: { [key: string]: string } = {
//   "Cone": "CT",
//   "Cylinder": "SC",
//   "Prism": "ST",
//   "Pyramid": "TT",
//   "Sphere": "CC",
//   "Cube": "SS"
// };

// constructor() {}

// getCombinationShape(first: string, second: string): string {
//   const combination = first + second;
//   return this.combinationShapes[combination] || this.combinationShapes[second + first] || "Unknown combination shape";
// }

// getShapesForInput(input: string): { [key: string]: string } {
//   const cleanInput = input.replace(/\s+/g, '').toUpperCase();
//   if (cleanInput.length !== 3) {
//     return { error: "Input must contain three unique letters." };
//   }

//   const uniqueLetters = Array.from(new Set(cleanInput.split('')));
//   if (uniqueLetters.length !== 3) {
//     return { error: "Input must contain three unique letters." };
//   }

//   return {
//     [uniqueLetters[0]]: this.getCombinationShape(uniqueLetters[1], uniqueLetters[2]),
//     [uniqueLetters[1]]: this.getCombinationShape(uniqueLetters[0], uniqueLetters[2]),
//     [uniqueLetters[2]]: this.getCombinationShape(uniqueLetters[0], uniqueLetters[1])
//   };
// }

// getFinalShape(selectedCombinationShapes: string[]): string {
//   const combinedKeys = selectedCombinationShapes.map(shape => this.shapeResults[shape]).join('');
//   return this.combinationShapes[combinedKeys] || "Unknown final shape";
// }

// findTransformationSteps(selectedCombinationShapes: string[]): string[] {
//   const targetShapes = selectedCombinationShapes.map(shape => this.shapeResults[shape]);
//   console.log("TargetShapes: ", targetShapes)
//   const steps = this.bfsTransformations(selectedCombinationShapes, targetShapes);
//   return steps.length > 0 ? steps : ["No transformation path found."];
// }

// private bfsTransformations(currentShapes: string[], targetShapes: string[]): string[] {
//   const queue: { shapes: string[], path: string[] }[] = [{ shapes: currentShapes, path: [] }];
//   const visited = new Set<string>();

//   while (queue.length > 0) {
//     const { shapes, path } = queue.shift()!;

//     // Check if current shapes match target shapes
//     if (this.matchesTarget(shapes, targetShapes)) {
//       return path;
//     }

//     // Generate possible swaps
//     for (let i = 0; i < shapes.length; i++) {
//       for (let j = i + 1; j < shapes.length; j++) {
//         const newShapes = [...shapes];
//         [newShapes[i], newShapes[j]] = [newShapes[j], newShapes[i]]; // Swap
//         const newShapeKey = newShapes.join(',');

//         if (!visited.has(newShapeKey)) {
//           visited.add(newShapeKey);
//           queue.push({ shapes: newShapes, path: [...path, `Swap ${shapes[i]} with ${shapes[j]}`] });
//         }
//       }
//     }
//   }

//   return []; // No path found
// }

// private matchesTarget(currentShapes: string[], targetShapes: string[]): boolean {
//   return currentShapes.every((shape, index) => shape === targetShapes[index]);
// }
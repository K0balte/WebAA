import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameState, Position } from '../../models/game.model';

@Component({
    selector: 'app-game-board',
    styles: [`
    .board-container {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .board {
      display: inline-block;
      border: 3px solid #2c3e50;
      border-radius: 10px;
      background: #34495e;
      padding: 10px;
    }
    .board-row {
      display: flex;
    }
    .cell {
      width: 50px;
      height: 50px;
      border: 2px solid #7f8c8d;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ecf0f1;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }
    .cell:hover:not(.occupied) {
      background: #d5dbdb;
      transform: scale(1.05);
    }
    .cell.selected {
      background: #f39c12;
      border-color: #e67e22;
    }
    .cell.occupied {
      cursor: not-allowed;
    }
    .cell.player-x {
      background: #e74c3c;
      color: white;
    }
    .cell.player-o {
      background: #3498db;
      color: white;
    }
    .symbol {
      font-size: 24px;
      font-weight: bold;
    }
    .preview {
      font-size: 18px;
      font-weight: bold;
      color: #2c3e50;
      opacity: 0.7;
    }
  `],
    template: `
    <div class="board-container">
      <div class="board">
        <div *ngIf="gameState && gameState.board">
          <div 
            *ngFor="let row of gameState.board; let i = index" 
            class="board-row"
          >
            <div 
              *ngFor="let cell of row; let j = index"
              class="cell"
              [class.occupied]="cell !== null"
              [class.selected]="isPositionSelected(i, j)"
              [class.player-x]="cell === 'X'"
              [class.player-o]="cell === 'O'"
              (click)="onCellClick(i, j)"
            >
              <span *ngIf="cell" class="symbol">{{ cell }}</span>
              <span *ngIf="!cell && isPositionSelected(i, j)" class="preview">
                {{ gameState.currentPlayer.symbol }}
              </span>
            </div> 
          </div>
        </div>
      </div>
    </div>
  `
})
export class GameBoardComponent {
    @Input() gameState!: GameState;
    @Output() positionSelected = new EventEmitter<Position>();

    onCellClick(row: number, col: number): void {
        if (this.gameState && !this.gameState.gameOver) {
            this.positionSelected.emit({ row, col });
        }
    }

    isPositionSelected(row: number, col: number): boolean {
        return !!this.gameState?.selectedPositions?.some(
            pos => pos.row === row && pos.col === col
        );
    }
}

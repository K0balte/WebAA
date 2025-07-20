import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameState } from '../../models/game.model';

@Component({
    selector: 'app-player-info',
    template: `
    <div class="player-info">
      <div class="game-status">
        <div *ngIf="!gameState.gameOver" class="current-turn">
          <h3>Tour de 
            <span [style.color]="gameState.currentPlayer.color">
              {{ gameState.currentPlayer.name }}
            </span>
          </h3>
          <p>Sélectionnez 3 positions pour placer vos pions</p>
          <div class="selection-counter">
            {{ gameState.selectedPositions.length }}/3 positions sélectionnées
          </div>
        </div>

        <div *ngIf="gameState.gameOver" class="game-over">
          <h2>🎉 Partie terminée ! 🎉</h2>
          <h3>
            <span [style.color]="gameState.winner?.color">
              {{ gameState.winner?.name }}
            </span> 
            a gagné !
          </h3>
        </div>
      </div>

      <div class="game-controls">
        <button 
          *ngIf="!gameState.gameOver"
          (click)="confirmMove.emit()"
          [disabled]="gameState.selectedPositions.length !== 3"
          class="confirm-button"
        >
          Confirmer le mouvement
        </button>

        <button 
          (click)="resetGame.emit()"
          class="reset-button"
        >
          Nouvelle partie
        </button>
      </div>

      <div class="game-stats">
        <div class="stat">
          <strong>Coups joués:</strong> {{ gameState.moveCount }}
        </div>
        <div class="players">
          <div 
            *ngFor="let player of gameState.players" 
            class="player"
            [class.active]="player.id === gameState.currentPlayer.id && !gameState.gameOver"
          >
            <span class="player-symbol" [style.color]="player.color">
              {{ player.symbol }}
            </span>
            {{ player.name }}
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .player-info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .game-status {
      text-align: center;
      margin-bottom: 20px;
    }
    .current-turn h3 {
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    .selection-counter {
      background: #3498db;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      display: inline-block;
      margin-top: 10px;
    }
    .game-over {
      color: #27ae60;
    }
    .game-controls {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 20px;
    }
    .confirm-button {
      background: #27ae60;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .confirm-button:hover:not(:disabled) {
      background: #219a52;
    }
    .confirm-button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
    .reset-button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .reset-button:hover {
      background: #c0392b;
    }
    .game-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid #ddd;
    }
    .players {
      display: flex;
      gap: 20px;
    }
    .player {
      padding: 8px 12px;
      border-radius: 5px;
      transition: all 0.3s;
    }
    .player.active {
      background: #fff3cd;
      border: 2px solid #ffc107;
    }
    .player-symbol {
      font-weight: bold;
      font-size: 18px;
      margin-right: 5px;
    }
  `]
})
export class PlayerInfoComponent {
    @Input() gameState!: GameState;
    @Output() confirmMove = new EventEmitter<void>();
    @Output() resetGame = new EventEmitter<void>();
}

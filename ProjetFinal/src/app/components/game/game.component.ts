import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameState } from '../../models/game.model';

@Component({
    selector: 'app-game',
    template: `
    <div class="game-container">
      <div *ngIf="!gameState" class="game-setup">
        <h2>Nouvelle partie</h2>
        <div class="player-inputs">
          <input 
            [(ngModel)]="player1Name" 
            placeholder="Nom du joueur 1 (X)"
            class="player-input"
          />
          <input 
            [(ngModel)]="player2Name" 
            placeholder="Nom du joueur 2 (O)"
            class="player-input"
          />
        </div>
        <button 
          (click)="startGame()" 
          [disabled]="!player1Name || !player2Name"
          class="start-button"
        >
          Commencer la partie
        </button>
      </div>

        <div *ngIf="gameState" class="game-active">
            <app-player-info
                    [gameState]="gameState"
                    (confirmMove)="confirmMove()"
                    (resetGame)="resetGame()"
            ></app-player-info>

            <app-game-board
                    [gameState]="gameState"
                    (positionSelected)="selectPosition($event)"
            ></app-game-board>
        </div>
    </div>
  `,
    styles: [`
    .game-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .game-setup {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .player-inputs {
      display: flex;
      gap: 15px;
      margin: 20px 0;
      justify-content: center;
    }
    .player-input {
      padding: 10px 15px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      min-width: 200px;
    }
    .player-input:focus {
      border-color: #3498db;
      outline: none;
    }
    .start-button {
      background: #27ae60;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .start-button:hover:not(:disabled) {
      background: #219a52;
    }
    .start-button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
    .game-active {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  `]
})
export class GameComponent implements OnInit {
    gameState: GameState | null = null;
    player1Name: string = '';
    player2Name: string = '';

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        this.gameService.getGameState().subscribe(state => {
            this.gameState = state;
        });
    }

    startGame(): void {
        if (this.player1Name && this.player2Name) {
            this.gameService.startNewGame(this.player1Name, this.player2Name);
        }
    }

    selectPosition(position: { row: number; col: number }): void {
        this.gameService.selectPosition(position.row, position.col);
    }

    confirmMove(): void {
        this.gameService.confirmMove();
    }

    resetGame(): void {
        this.gameService.resetGame();
        this.player1Name = '';
        this.player2Name = '';
    }
}

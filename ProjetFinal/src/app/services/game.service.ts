import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState, Player, Position } from '../models/game.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private readonly BOARD_ROWS = 9;
    private readonly BOARD_COLS = 9;
    private gameState$ = new BehaviorSubject<GameState | null>(null);

    getGameState(): Observable<GameState | null> {
        return this.gameState$.asObservable();
    }

    startNewGame(player1Name: string, player2Name: string): void {
        const player1: Player = {
            id: '1',
            name: player1Name,
            symbol: 'X',
            color: '#e74c3c'
        };

        const player2: Player = {
            id: '2',
            name: player2Name,
            symbol: 'O',
            color: '#3498db'
        };

        const initialState: GameState = {
            id: this.generateId(),
            board: Array.from({ length: this.BOARD_ROWS }, () => Array(this.BOARD_COLS).fill(null)),
            players: [player1, player2],
            currentPlayer: player1,
            winner: null,
            gameOver: false,
            selectedPositions: [],
            moveCount: 0
        };

        this.gameState$.next(initialState);
    }

    selectPosition(row: number, col: number): boolean {
        const currentState = this.gameState$.value;
        if (!currentState || currentState.gameOver) {
            return false;
        }

        // Vérifier si la position est déjà occupée
        if (currentState.board[row][col] !== null) {
            return false;
        }

        // Nouvelle vérification : la case doit avoir un pion en dessous sauf si c'est la dernière ligne
        if (row < this.BOARD_ROWS - 1 && currentState.board[row + 1][col] === null) {
            return false;
        }

        // Vérifier si la position est déjà sélectionnée
        const isAlreadySelected = currentState.selectedPositions.some(
            pos => pos.row === row && pos.col === col
        );

        if (isAlreadySelected) {
            // Désélectionner la position
            currentState.selectedPositions = currentState.selectedPositions.filter(
                pos => !(pos.row === row && pos.col === col)
            );
        } else {
            // Sélectionner la position (max 3)
            if (currentState.selectedPositions.length < 3) {
                currentState.selectedPositions.push({ row, col });
            } else {
                return false; // Déjà 3 positions sélectionnées
            }
        }

        this.gameState$.next({ ...currentState });
        return true;
    }

    confirmMove(): boolean {
        const currentState = this.gameState$.value;
        if (!currentState || currentState.selectedPositions.length !== 3) {
            return false;
        }

        // Placer les pions sur le plateau
        for (const pos of currentState.selectedPositions) {
            currentState.board[pos.row][pos.col] = currentState.currentPlayer.symbol;
        }

        // Vérifier la victoire
        if (this.checkWinner(currentState.board, currentState.currentPlayer.symbol)) {
            currentState.winner = currentState.currentPlayer;
            currentState.gameOver = true;
        } else {
            // Changer de joueur
            currentState.currentPlayer = currentState.players.find(
                p => p.id !== currentState.currentPlayer.id
            )!;
        }

        // Réinitialiser les positions sélectionnées
        currentState.selectedPositions = [];
        currentState.moveCount++;

        this.gameState$.next({ ...currentState });
        return true;
    }

    resetGame(): void {
        this.gameState$.next(null);
    }

    private checkWinner(board: (string | null)[][], symbol: string): boolean {
        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal \
            [1, -1]   // diagonal /
        ];

        for (let row = 0; row < this.BOARD_ROWS; row++) {
            for (let col = 0; col < this.BOARD_COLS; col++) {
                if (board[row][col] === symbol) {
                    for (const [dx, dy] of directions) {
                        if (this.checkDirection(board, row, col, dx, dy, symbol)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private checkDirection(
        board: (string | null)[][],
        startRow: number,
        startCol: number,
        dx: number,
        dy: number,
        symbol: string
    ): boolean {
        let count = 0;
        let row = startRow;
        let col = startCol;

        while (row >= 0 && row < this.BOARD_ROWS &&
        col >= 0 && col < this.BOARD_COLS &&
        board[row][col] === symbol) {
            count++;
            row += dx;
            col += dy;
        }

        return count >= 6;
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}
export interface Player {
    id: string;
    name: string;
    symbol: 'X' | 'O';
    color: string;
}

export interface Position {
    row: number;
    col: number;
}

export interface GameState {
    id: string;
    board: (string | null)[][];
    players: Player[];
    currentPlayer: Player;
    winner: Player | null;
    gameOver: boolean;
    selectedPositions: Position[];
    moveCount: number;
}
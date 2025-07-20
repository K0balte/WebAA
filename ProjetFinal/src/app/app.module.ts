import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        GameBoardComponent,
        PlayerInfoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
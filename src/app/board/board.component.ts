import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  isDraw = false;
  playWithSystem = this.service.isSystemPlaying;
  isSystemTurn = false;
  lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor(private service: PlayerService) { }

  ngOnInit() {
    this.newGame();
  }

  getPlayer(player: string){
    return player === 'x'? this.service.xPlayer: this.service.yPlayer
  }
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.isDraw = false;
    this.xIsNext = true;
    if(this.playWithSystem){
      this.isSystemTurn = true;
    }
  }

  get player() {
    return this.xIsNext ? 'x' : 'o';
  }

  makeMove(idx) {
    if (!this.winner) {
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
        if (this.playWithSystem) {
          if (this.isSystemTurn) { this.evaluateSystemMove(this.player); }
          else { this.isSystemTurn = true; }
        }
      }
      this.winner = this.calculateWinner();
    }
  }
  calculateWinner() {
    for (let i = 0; i < this.lines.length; i++) {
      const [a, b, c] = this.lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    if (this.squares.filter(i => i).length >= 9) {
      this.isDraw = true;
    }
    return null;
  }
  evaluateSystemMove(systemSymbol: string) {
    const availableSquares = this.squares.map((x, i) => { if (!x) { return i + 1; } }).filter(x => x)
    if (availableSquares.length) {
      // let winningSquares = [];
      // this.calculateWinningMoves(availableSquares, systemSymbol).forEach(x => {
      //   availableSquares.forEach(i => { if(i===x){
      //     winningSquares.push(x);
      //   }});
      // });
      // const systemMove = winningSquares[Math.floor(Math.random() * winningSquares.length)];
      const systemMove = availableSquares[Math.floor(Math.random() * availableSquares.length)] - 1;

      this.isSystemTurn = false;
      setTimeout(_ => this.makeMove(systemMove), 100);
    }
  }
  // calculateWinningMoves(movesAvaialble: Array<number>, symbol: string): number[] {
  //   const arr = movesAvaialble.map(i => i - 1);
  //   let move;
  //   arr.forEach(i => {
  //     this.lines.forEach(x => {
  //       if (x.includes(i)) {
  //         move = x;
  //         return;
  //       }
  //     })
  //   })
  //   return move;
  // }
}

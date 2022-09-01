import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  xPlayer= 'X';
  yPlayer= 'O';
  isSystemPlaying = false;
  constructor() {}
}

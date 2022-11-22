import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  isSystem = false;

  xPlayer = new UntypedFormControl();
  yPlayer = new UntypedFormControl();

  constructor(private router: Router, private service: PlayerService) { }

  ngOnInit(): void {

  }

  setSystem(val){
    this.isSystem = val;
    if(this.isSystem){
      this.yPlayer.reset();
      this.yPlayer.disable();
    }
  }

  play() {
    this.service.xPlayer = this.xPlayer.value || 'X';
    this.service.yPlayer = this.isSystem ? 'System' : this.yPlayer.value || 'O';
    this.service.isSystemPlaying = this.isSystem;
    this.router.navigate(['game-play']);
  }

}

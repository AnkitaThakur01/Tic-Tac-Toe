import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button [class]="getClass()">{{value}}</button>
  `,
  styles: ['button{height:100%; width:100%; font-size:8rem;margin:0}']
})
export class SquareComponent {

  @Input() value: 'x' | 'o';

  getClass() {
    return `btn btn-${this.value ? this.value === 'x' ? 'info' : 'warning': 'default'}`
  }
}

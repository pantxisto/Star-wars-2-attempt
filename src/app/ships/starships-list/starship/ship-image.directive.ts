import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appShipImage]',
  host: {
    '[src]': 'src',
    '(error)': 'onError()',
  },
})
export class ShipImageDirective {
  constructor() {}
  @Input() src: string;
  defaultImg: string = '/assets/no_image.svg';
  onError() {
    this.src = this.defaultImg;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer',
})
export class ImageSanitizerPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}
  transform(value: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}

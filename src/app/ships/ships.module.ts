import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsRoutingModule } from './ships-routing.module';
import { ShipsService } from './services/ships.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageSanitizerPipe } from './starships-list/starship/image-sanitizer.pipe';
import { ShipsComponent } from './ships.component';
import { StarshipsListComponent } from './starships-list/starships-list.component';
import { StarshipComponent } from './starships-list/starship/starship.component';
import { ShipsInterceptor } from './ships-interceptor.interceptor';

@NgModule({
  declarations: [
    ShipsComponent,
    StarshipsListComponent,
    StarshipComponent,
    ImageSanitizerPipe,
  ],
  imports: [CommonModule, ShipsRoutingModule, HttpClientModule],
  providers: [
    ShipsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShipsInterceptor,
      multi: true,
    },
  ],
})
export class ShipsModule {}

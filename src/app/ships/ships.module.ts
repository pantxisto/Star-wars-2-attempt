import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsRoutingModule } from './ships-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { ShipsComponent } from './ships.component';
import { StarshipsListComponent } from './starships-list/starships-list.component';
import { StarshipComponent } from './starships-list/starship/starship.component';
import { ShipCardComponent } from './ship-card/ship-card.component';

import { ImageSanitizerPipe } from './starships-list/starship/image-sanitizer.pipe';
import { ShipImageDirective } from './starships-list/starship/ship-image.directive';
import { ShipsInterceptor } from './ships-interceptor.interceptor';

import { ShipsService } from './services/ships.service';
import { ShipsResolver } from './ships-resolver.service';

@NgModule({
  declarations: [
    ShipsComponent,
    StarshipsListComponent,
    StarshipComponent,
    ImageSanitizerPipe,
    ShipImageDirective,
    ShipCardComponent,
  ],
  imports: [CommonModule, ShipsRoutingModule, HttpClientModule, MatCardModule],
  providers: [
    ShipsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShipsInterceptor,
      multi: true,
    },
    ShipsResolver,
  ],
})
export class ShipsModule {}

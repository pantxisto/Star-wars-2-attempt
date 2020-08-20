import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsComponent } from './ships.component';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { ShipsResolver } from './ships-resolver.service';

const routes: Routes = [
  { path: '', component: ShipsComponent, resolve: { response: ShipsResolver }},
  {
    path: ':id',
    component: ShipCardComponent,
    resolve: { ship: ShipsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipsRoutingModule {}

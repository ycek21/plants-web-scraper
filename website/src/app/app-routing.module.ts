import { PlantPageComponent } from "./modules/plant-page/plant-page.component";
import { PlantCardComponent } from "./modules/plant-card/plant-card.component";
import { HomePageComponent } from "./modules/home-page/home-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "home", component: HomePageComponent },
  { path: ':plantType/:id/:pexelsId', component: PlantPageComponent},
  { path: ':plantType/:id', component: PlantPageComponent },
  { path: "**", component: HomePageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [HomePageComponent, PlantCardComponent];

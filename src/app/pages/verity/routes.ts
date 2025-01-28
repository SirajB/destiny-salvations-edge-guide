import { Route } from "@angular/router";
import { VerityMechanicsComponent } from "./mechanics/mechanics.component";
import { VerityDisectionComponent } from "./disection/disection.component";

export const VERITY_ROUTES: Route[] = [
    {path: 'mechanics', component: VerityMechanicsComponent},
    {path: 'disection', component: VerityDisectionComponent},
    
]
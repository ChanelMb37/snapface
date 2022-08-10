import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SingleFaceSnapComponent } from "./components/single-face-snap/single-face-snap.component";
import { FaceSnapListComponent } from "./components/face-snap-list/face-snap-list.component";
import { NewFaceSnapComponent } from "./components/new-face-snap/new-face-snap.component";

const routes: Routes = [
  {path: 'create', component: NewFaceSnapComponent},
  {path: ':id', component: SingleFaceSnapComponent},
  {path: '', component: FaceSnapListComponent},
  
];

@NgModule({
  // Au lieu d'utiliser RouterModule.forRoot() (qui ne doit être appelée qu'une seule fois par votre routeur racine), vous utilisez RouterModule.forChild() pour enregistrer ces routes au routeur déjà créé.
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceSnapsRoutingModule {}
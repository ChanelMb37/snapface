import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

// tableau routes va lier les routes d'application (les différentes URL) aux components correspondants.
// Pour enregistrer ces routes dans application, il faut les passer au routeur en passant un objet de configuration au décorateur  @NgModule()  de AppRoutingModule
const routes: Routes = [
  {
    path: 'facesnaps',
    loadChildren: () =>
      import('./face-snaps/face-snaps.module').then((m) => m.FaceSnapsModule),
  },
  { path: '', component: LandingPageComponent },
];

// Ici, vous dites à Angular que les routes de ce fichier seront les routes à la racine de votre application, et vous réexportez le routeur configuré.
// Pour l'utiliser, il faut ajouter votre module de routing aux imports de AppModule, le module principal de votre application
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

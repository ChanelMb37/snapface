import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FaceSnap } from "../models/face-snap.model";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
  constructor (private http: HttpClient) {}

  faceSnaps: FaceSnap[] = [];

    // méthode getAllFaceSnaps retournera tous les FaceSnaps contenus dans le service.
    getAllFaceSnaps(): Observable<FaceSnap[]> {
      return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps') ;
    }

    // méthode getFaceSnapById 
    // cherche un FaceSnap par son  id  dans le tableau faceSnaps avec la fonction  find() 
    // retourne un FaceSnap si elle le trouve (d'où son type de retour), 
    // et  throw  une erreur sinon.
    getFaceSnapById(faceSnapId:number): FaceSnap {
      const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
      if (!faceSnap) {
        throw new Error('FaceSnap not found');
      } else {
        return faceSnap;
      }
    }
//  méthode snapFaceSnapById:
// utilise  getFaceSnapById()  pour récupérer le FaceSnap, et si le deuxième argument est  'snap', rajoute un snap ; 
// sinon, elle enlève un snap.
// Pour tester cette méthode, il faudra injecter FaceSnapsService dans FaceSnapComponent. 
    snapFaceSnapById(faceSnapId: number, snapType:'snap' | 'unsnap'): void {
      const faceSnap = this.getFaceSnapById(faceSnapId);
      snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
    }
// méthode addFaceSnap:
// accepte un objet comme argument, qui correspond à l'objet généré par le formulaire ;
// crée un nouvel objet à partir de l'argument en ajoutant les champs manquants ;
// ajoute 1 à l' id  du dernier ajouté au tableau pour générer le nouveau, puisque les  id  des FaceSnap sont des entiers croissants ;
// ajoute le FaceSnap au tableau.
    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }) {
    const faceSnap: FaceSnap = {
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
    };
    this.faceSnaps.push(faceSnap);
}

}
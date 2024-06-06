import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  constructor(private http: HttpClient) {}

  faceSnaps: FaceSnap[] = [];

  // méthode getAllFaceSnaps retournera tous les FaceSnaps contenus dans le service.
  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  // méthode getFaceSnapById
  // cherche un FaceSnap par son  id  dans le tableau faceSnaps avec la fonction  find()
  // retourne un FaceSnap si elle le trouve (d'où son type de retour),
  // et  throw  une erreur sinon.
  // getFaceSnapById(faceSnapId:number): FaceSnap {
  //   const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
  //   if (!faceSnap) {
  //     throw new Error('FaceSnap not found');
  //   } else {
  //     return faceSnap;
  //   }
  // }

  // modifier l'implémentation de la méthode de service  getFaceSnapById  .
  // Le backend de développement propose une route pour récupérer un FaceSnap par son  id  :
  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    );
  }

  //  méthode snapFaceSnapById:
  // utilise  getFaceSnapById()  pour récupérer le FaceSnap, et si le deuxième argument est  'snap', rajoute un snap ;
  // sinon, elle enlève un snap.
  // Pour tester cette méthode, il faudra injecter FaceSnapsService dans FaceSnapComponent.
  // snapFaceSnapById(faceSnapId: number, snapType:'snap' | 'unsnap'): void {
  // const faceSnap = this.getFaceSnapById(faceSnapId);
  // snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
  // }

  // modifier l'implémentation de  snapFaceSnapById()  pour implémenter la requête composée.
  snapFaceSnapById(
    faceSnapId: number,
    snapType: 'snap' | 'unsnap'
  ): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      // opérateur  map()  vous permet de prendre le FaceSnap retourné par le serveur,
      // et de le transformer en un FaceSnap avec un snap de plus ou de moins, selon que le  snapType  est  'snap'  ou  'unsnap'  .
      map((faceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      // opérateur  switchMap()  prend le FaceSnap modifié, et en génère une requête PUT avec la méthode  put  de HttpClient.
      // put  prend l'URL comme premier argument et le corps de la requête à envoyer comme deuxième argument, et retourne l'Observable qui correspond à cette requête.
      switchMap((updatedFaceSnap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updatedFaceSnap
        )
      )
    );
  }

  // méthode addFaceSnap:
  // accepte un objet comme argument, qui correspond à l'objet généré par le formulaire ;
  // crée un nouvel objet à partir de l'argument en ajoutant les champs manquants ;
  // ajoute 1 à l' id  du dernier ajouté au tableau pour générer le nouveau, puisque les  id  des FaceSnap sont des entiers croissants ;
  // ajoute le FaceSnap au tableau.
  //   addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }) {
  //   const faceSnap: FaceSnap = {
  //       ...formValue,
  //       snaps: 0,
  //       createdDate: new Date(),
  //       id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
  //   };
  //   this.faceSnaps.push(faceSnap);
  // }

  addFaceSnap(formValue: {
    title: string;
    description: string;
    imageUrl: string;
    location?: string;
  }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      // On retourne un tableau trié par ID pour s'assurer que le dernier élément du tableau possède l'ID le plus élevé.
      map((facesnaps) => [...facesnaps].sort((a, b) => a.id - b.id)),
      //  On retourne ensuite le dernier élément de ce tableau.
      map((sortedFacesnaps) => sortedFacesnaps[sortedFacesnaps.length - 1]),
      //  On retourne le nouveau FaceSnap avec son ID valable.
      map((previousFacesnap) => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id + 1,
      })),
      // switchMap()  , génère la requête POST finale.
      switchMap((newFacesnap) =>
        this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap)
      )
    );
  }
}

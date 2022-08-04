import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap.model";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  faceSnaps: FaceSnap[] = [
    {
      id: 1,
      title: 'Archibald',
      description: 'mon meilleur ami',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      createdDate: new Date(),
      snaps: 0,
      location: 'Paris'
    },
    {
      id: 2,
      title: 'La montagne',
      description: 'mon meilleur voyage',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/07/25/10/19/mountain-7343375_960_720.jpg',
      createdDate: new Date(),
      snaps: 150,
      location: 'montagne'
    },
     {
      id: 3,
      title:'My Dog',
      description: 'mon meilleur chien',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/07/18/19/57/dog-7330712_960_720.jpg',
      createdDate: new Date(),
      snaps: 0,
    }
    ];

    // méthode getAllFaceSnaps retournera tous les FaceSnaps contenus dans le service.
    getAllFaceSnaps(): FaceSnap[] {
      return this.faceSnaps;
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

}
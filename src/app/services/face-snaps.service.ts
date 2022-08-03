import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap.model";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  faceSnaps: FaceSnap[] = [
    {
      title: 'Archibald',
      description: 'mon meilleur ami',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      createdDate: new Date(),
      snaps: 0,
      location: 'Paris'
    },
    {
      title: 'La montagne',
      description: 'mon meilleur voyage',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/07/25/10/19/mountain-7343375_960_720.jpg',
      createdDate: new Date(),
      snaps: 150,
      location: 'montagne'
    },
     {
      title:'My Dog',
      description: 'mon meilleur chien',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/07/18/19/57/dog-7330712_960_720.jpg',
      createdDate: new Date(),
      snaps: 0,
    }
    ];

}
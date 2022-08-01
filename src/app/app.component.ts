import { Component, OnInit } from '@angular/core';
import { FaceSnap } from './models/face-snap.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mySnap!: FaceSnap;
  myOtherSnap!: FaceSnap;
  myLastSnap!: FaceSnap;
  

  ngOnInit() {
    this.mySnap = new FaceSnap(
      'Archibald',
      'mon meilleur ami',
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      new Date(),
      0
    );
    this.myOtherSnap = new FaceSnap(
      'Montagne',
      'mon meilleur voyage',
      'https://cdn.pixabay.com/photo/2022/07/25/10/19/mountain-7343375_960_720.jpg',
      new Date(),
      0
    );
    this.myLastSnap = new FaceSnap(
      'Dog',
      'mon meilleur chien',
      'https://cdn.pixabay.com/photo/2022/07/18/19/57/dog-7330712_960_720.jpg',
      new Date(),
      0,
    );
  }
}

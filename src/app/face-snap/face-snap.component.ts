import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  // Pour "promettre" à TypeScript qu'on va les initialiser, on peut ajouter un bang  !  à chaque propriété :
  title!: string;
  description!: string;
  createdDate!: Date;
  snaps!: number;
  imageUrl!: string;
  buttonText!: string;
  
  // On va  initialiser les quatre propriétés dans la méthode  ngOnInit()
  ngOnInit() {
    this.title = 'Archibald';
    this.description = 'mon meilleur ami';
    this.createdDate = new Date();
    this.snaps = 6;
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
    this.buttonText = "Oh Snap!"
  }

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
      this.snaps++;
      this.buttonText = 'Oops, unSnap';
    } else {
      this.snaps--;
      this.buttonText = 'Oh Snap';
    }
    
  }
}

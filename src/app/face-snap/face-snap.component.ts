import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
@Input() faceSnap!: FaceSnap;

  // Pour "promettre" à TypeScript qu'on va les initialiser, on peut ajouter un bang  !  à chaque propriété :
  buttonText!: string;
  
  // On va  initialiser les quatre propriétés dans la méthode  ngOnInit()
  ngOnInit() {
    this.buttonText = "Oh Snap!"
  }

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap.snaps++;
      this.buttonText = 'Oops, unSnap!';
    } else {
      this.faceSnap.snaps--;
      this.buttonText = 'Oh Snap!';
    }
    
  }
}

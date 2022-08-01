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
  
  // On va  initialiser les quatre propriétés dans la méthode  ngOnInit()
  ngOnInit() {
    this.title = 'Archibald';
    this.description = 'mon meilleur ami';
    this.createdDate = new Date();
    this.snaps = 6;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FaceSnap } from '../core/models/face-snap.model';
import { FaceSnapsService } from '../core/services/face-snaps.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  buttonText!: string;
  faceSnap$!: Observable<FaceSnap>;

  constructor(private faceSnapsService:FaceSnapsService,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.buttonText = "Oh Snap!";

    const faceSnapId = +this.route.snapshot.params['id'];
    // Avec cet  id, on peut appeler la méthode  getFaceSnapById()  du service pour récupérer le FaceSnap correspondant :
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
            tap(() => this.buttonText = 'Oops, unSnap!')
        );
    } else {
        this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
            tap(() => this.buttonText = 'Oh Snap!')
        );
    }
}

}

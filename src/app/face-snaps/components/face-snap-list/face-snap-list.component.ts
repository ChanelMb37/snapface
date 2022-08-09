import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { tap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnap[]; 
  faceSnaps$!: Observable<FaceSnap[]>
  
  // Un Subject est un Observable que vous pouvez faire émettre à la demande. 
  // Vous allez donc créer un Subject appelé  destroy$  qui émettra une seule fois, au moment de la destruction du component.
  private destroy$!: Subject<boolean>;

constructor(private faceSnapsService: FaceSnapsService ) {

}
  ngOnInit():void {
    this.destroy$ = new Subject<boolean>();
    // this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
     this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

    interval(1000).pipe(
      // take() prend un nombre comme argument, et complète l'Observable quand il a émis ce nombre de valeurs.
      // take(3),
      tap(console.log),
      // opérateur takeUntil dit à l'Observable  interval  de continuer à émettre tant que  destroy$  n'a pas émis, 
      // mais dès que  destroy$  émet, de compléter l'Observable.
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}

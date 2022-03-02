import { Component } from '@angular/core';
import { Photo } from './models/photo';
import { PhotosService } from './photos.service';

@Component({
  selector: 'app-root',
  template: `
    <app-favorites></app-favorites>
    <div class="cards-container">
      <div fxLayout="row wrap" fxLayoutGap="16px grid" *ngIf="photos; else loading">
          <div fxFlex="25%" *ngFor="let photo of photos; let i = index">
            <mat-card>
              <img mat-card-image [src]="photo.thumbnailUrl" alt="..." />
              <mat-card-content>
                <mat-card-title>{{ photo.title | cut}}</mat-card-title>
                <mat-card-actions>
                  <button
                    mat-fab
                    color="primary"
                    style="margin-right:2em;"
                    (click)="onDeletePhoto(photo.id, i)"
                    aria-label="Example icon button with a delete icon"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                  <button
                    mat-fab
                    (click)="onFavorite()"
                    style="color:white; background-color:red;"
                    aria-label="Example icon button with a heart icon"
                  >
                    <mat-icon>favorite</mat-icon>
                  </button>
                </mat-card-actions>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
    </div>
    <ng-template #loading>
      <!-- <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> -->
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styles: [
    `
       .cards-container {
        padding: 2em;
        text-align:center;
      }
    `,
  ],
})
export class AppComponent {
  photos: Photo[] | undefined;
  constructor(private photoSrv: PhotosService) {}

  ngOnInit(): void {
    this.photoSrv.get().subscribe(
      (photos) => {
        this.photos = photos;
        console.log(photos);
      },
      (err) => {
        alert(err);
      }
    );
  }

  onDeletePhoto(id: number, index: number) {
    this.photoSrv.delete(id).subscribe(
      (ris) => {
        console.log(ris);
        this.photos?.splice(index, 1);
      },
      (err) => {
        alert(err);
      }
    );
  }

  onFavorite() {
    this.photoSrv.addFavorite();
  }
}

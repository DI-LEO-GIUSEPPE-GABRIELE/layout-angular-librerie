import { state, style, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Photo } from './models/photo';
import { PhotosService } from './photos.service';

@Component({
  selector: 'app-root',
  animations: [
    trigger('change', [
      state(
        'start',
        style({
          'background-color': 'white',
        })
      ),
      state(
        'end',
        style({
          'background-color': 'black',
          color: 'white',
        })
      ),
    ]),
    trigger('chcol', [
      state(
        'start',
        style({
          'background-color': 'white',
        })
      ),
      state(
        'end',
        style({
          'background-color': '#933e3e',
          color: 'white',
        })
      ),
    ]),
  ],
  template: `
    <!-- <div class="cards-container">
      <div
        fxLayout="row wrap"
        fxLayoutGap="16px grid"
        *ngIf="photos; else loading"
      >
        <div fxFlex="25%" *ngFor="let photo of photos; let i = index">
          <mat-card>
            <img mat-card-image [src]="photo.thumbnailUrl" alt="..." />
            <mat-card-content>
              <mat-card-title>{{ photo.title | cut }}</mat-card-title>
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
    </div> -->

    <!-- ESERCIZIO 2 -->
    <!-- <div
        fxLayout="row wrap"
        fxLayoutGap="16px grid"
        *ngIf="photos; else loading"
      > -->

    <!-- <cdk-virtual-scroll-viewport
      appendOnly
      itemSize="50"
      class="example-viewport"
    >
      <div *cdkVirtualFor="let item of items" class="example-item">
        {{ item }}
      </div>
    </cdk-virtual-scroll-viewport> -->

   <div [@chcol]="stato" style="text-align: center;">
      <mat-slide-toggle

        style="height: 5em;"
        (change)="cambiaColor()"
        [color]="color"
        [checked]="checked"
        [disabled]="disabled"
      >
        <span *ngIf="status" class="material-icons"> light_mode </span>
        <span *ngIf="!status" class="material-icons"> dark_mode </span>
      </mat-slide-toggle>
   </div>

    <cdk-virtual-scroll-viewport
      [@change]="stato"
      appendOnly
      class="example-viewport"
      itemSize="50"
      *ngIf="photos; else loading"
    >
      <app-favorites></app-favorites>
      <div
        class="example-item"
        *cdkVirtualFor="let photo of photos; let i = index"
      >
        <mat-card [@chcol]="stato" style="padding:3em;">
          <img mat-card-image [src]="photo.thumbnailUrl" alt="..." />
          <mat-card-content>
            <mat-card-title>{{ photo.title | cut }}</mat-card-title>
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
    </cdk-virtual-scroll-viewport>
    <ng-template #loading>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styles: [
    `
      .example-viewport {
        height: 100%;
        width: 100%;
        border: 1px solid black;
      }

      .example-item {
        margin: 0 auto;
        width: 500px;
        height: 650px;
        text-align: center;
      }

      /* cdk-virtual-scroll-viewport {
        height: 500px;
        width: 500px;
        border: 1px solid black;
      }

      .alt {
        height: 50px;
        padding: 2em;
        text-align: center;
      } */
    `,
  ],
})
export class AppComponent {
  photos: Photo[] | undefined;
  stato = 'start';
  status=true;
  constructor(private photoSrv: PhotosService) {}

  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  cambiaColor() {
    this.stato = this.stato == 'start' ? 'end' : 'start';
    this.status = this.status == true ? false : true;
  }

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

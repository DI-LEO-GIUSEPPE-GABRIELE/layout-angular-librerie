import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites.component';
import { ErrorsInterceptor } from './errors.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CutPipe } from './cut.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    CutPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatSlideToggleModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorsInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

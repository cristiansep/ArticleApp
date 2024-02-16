import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

import { CardArticleComponent } from './components/card-article/card-article.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { ArticleListComponent } from './pages/article-list/article-list.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    CardArticleComponent,
    ArticleListComponent,
    NewArticleComponent,
    ConfirmDialogComponent,
    LayoutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

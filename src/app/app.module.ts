import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './components/exposants/list/list.component';
import { AddComponent } from './components/exposants/add/add.component';
import { EditComponent } from './components/exposants/edit/edit.component';
import { DeleteComponent } from './components/exposants/delete/delete.component';
import { UpdateComponent } from './components/exposants/update/update.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/exposants/details/details.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'add', component: AddComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    UpdateComponent,
    AuthComponent,
    NotFoundComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

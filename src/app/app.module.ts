import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './components/exposants/list/list.component';
import { AddComponent } from './components/exposants/add/add.component';
import { EditComponent } from './components/exposants/edit/edit.component';
import { UpdateComponent } from './components/exposants/update/update.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/exposants/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { OnParleDeNousComponent } from './components/on-parle-de-nous/on-parle-de-nous.component';
import { ContactComponent } from './components/contact/contact.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'add', component: AddComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'details/:index', component: DetailsComponent },
  { path: 'exposants', component: EditComponent },
  { path: 'articles', component: OnParleDeNousComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    UpdateComponent,
    AuthComponent,
    NotFoundComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
    FooterComponent,
    OnParleDeNousComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

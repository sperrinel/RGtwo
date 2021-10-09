import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './components/exposants/list/list.component';
import { AddComponent } from './components/exposants/add/add.component';
import { EditComponent } from './components/exposants/edit/edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/exposants/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { OnParleDeNousComponent } from './components/on-parle-de-nous/on-parle-de-nous.component';
import { InfosPratiquesComponent } from './components/infos-pratiques/infos-pratiques.component';
import { MentionsLegalesComponent } from './components/mentions-legales/mentions-legales.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'add', canActivate: [AuthGuard], component: AddComponent },
  { path: 'infos', component: InfosPratiquesComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
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
    AuthComponent,
    NotFoundComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
    FooterComponent,
    OnParleDeNousComponent,
    InfosPratiquesComponent,
    MentionsLegalesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

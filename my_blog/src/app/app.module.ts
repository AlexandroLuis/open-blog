import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostsComponent } from './components/posts/posts.component';

import { TranslatePipe } from './services/translation.pipe';

import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'posts/new', component: PostEditorComponent },
  { path: 'posts/edit/:id', component: PostEditorComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    PostEditorComponent,
    ProfilePageComponent,
    AdminDashboardComponent,
    LoginComponent,
    TranslatePipe,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { PostModifyComponent } from './components/post-modify/post-modify.component';

import { TranslatePipe } from './services/translation.pipe';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';



const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'posts/new', component: PostEditorComponent },
  { path: 'posts/edit/:id', component: PostModifyComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostEditorComponent,
    ProfilePageComponent,
    AdminDashboardComponent,
    LoginComponent,
    TranslatePipe,
    PostsComponent,
    SignupComponent,
    RecoverPasswordComponent,
    PostModifyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

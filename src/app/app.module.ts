import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { TicketComponent } from './user/ticket/ticket.component';
import { BookMovieComponent } from './user/book-movie/book-movie.component';
import { ListMovieComponent } from './user/list-movie/list-movie.component';
import { CreateMovieTheatreComponent } from './admin/create-movie-theatre/create-movie-theatre.component';
import { UpdateMovieTheatreComponent } from './admin/update-movie-theatre/update-movie-theatre.component';
import { DeleteMovieTheatreComponent } from './admin/delete-movie-theatre/delete-movie-theatre.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, AdminComponent, TicketComponent, BookMovieComponent, ListMovieComponent, CreateMovieTheatreComponent, UpdateMovieTheatreComponent, DeleteMovieTheatreComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }

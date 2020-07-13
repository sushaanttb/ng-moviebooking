import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { TicketComponent } from './user/ticket/ticket.component';
import { BookMovieComponent } from './user/book-movie/book-movie.component';
import { ListMovieComponent } from './user/list-movie/list-movie.component';
import { CreateMovieTheatreComponent } from './admin/create-movie-theatre/create-movie-theatre.component';
import { UpdateMovieTheatreComponent } from './admin/update-movie-theatre/update-movie-theatre.component';
import { DeleteMovieTheatreComponent } from './admin/delete-movie-theatre/delete-movie-theatre.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'ticket', component: TicketComponent },
      { path: 'book-movie', component: BookMovieComponent },
      { path: 'list-movie', component: ListMovieComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'create-movie-theatre', component: CreateMovieTheatreComponent },
      { path: 'update-movie-theatre', component: UpdateMovieTheatreComponent },
      { path: 'delete-movie-theatre', component: DeleteMovieTheatreComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

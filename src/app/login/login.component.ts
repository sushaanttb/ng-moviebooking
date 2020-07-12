import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void { }

  username = '';
  password = '';

  onSubmit() {
    this.userService.loginSubscription(this.username, this.password)
      .subscribe(
        (user: User) => {
          if (!user.userName) alert("Username or Password is incorrect!")
          else this.redirect(user);
        },
        (error: any) => alert("Some error occured.")
      );

  }

  redirect(user: User): void {
    alert("Welcome " + user.userName + "!");

    // ToDo: JSON bug removes 'is' from boolean names
    // if (user.isAdmin) this.router.navigate(['/admin']);
    if (user['admin']) this.router.navigate(['/admin']);
    else this.router.navigate(['/user']);
  }
}

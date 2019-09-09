import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  // Méthode pour les 2 btn connection
  onSignIn() {
    this.authService.signIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
        // console.log('Connexion réussie !');        
      }
    )  
  }
  onSignOut() {
    this.authService.signeOut();
    this.authStatus = this.authService.isAuth;
    this.router.navigate(['auth']);
  }

}

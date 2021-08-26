import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Auth0Service {

  constructor(private auth0: AuthService) { }

  signUpWithPopup() {
    return this.auth0.loginWithPopup({screen_hint: 'signup'});
  }
  signInWithPopup() {
    return this.auth0.loginWithPopup();
  }

  logout(options?: any) {
    return this.auth0.logout(options);
  }

  get isAuthenticated$() {
    return this.auth0.isAuthenticated$;
  }

  get user$() {
    return this.auth0.user$;
  }

  get isLoading$() {
    return this.auth0.isLoading$;
  }

}
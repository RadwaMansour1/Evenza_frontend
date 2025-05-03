import { Injectable } from '@angular/core';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  constructor() {
    // SDK المفروض يكون اتحمّل من index.html
  }

  loginWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          FB.api('/me', { fields: 'name,email' }, (userInfo: any) => {
            resolve({
              facebookId: userInfo.id,
              email: userInfo.email,
              name: userInfo.name,
              accessToken: response.authResponse.accessToken
            });
          });
        } else {
          reject('User cancelled login or did not authorize.');
        }
      }, { scope: 'email' });
    });
  }
}

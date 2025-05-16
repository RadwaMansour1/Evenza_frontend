import { Component, Input, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-google-auth-button',
  template: `<div id="google-btn"></div>`,
  standalone: true
})
export class GoogleAuthButtonComponent implements OnInit {
  @Input() clientId!: string;
  @Input() callback!: (response: any) => void;

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.callback,
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      width: 600,
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left'
    });

    google.accounts.id.prompt(); // Display the One Tap prompt
    google.accounts.id.disableAutoSelect(); // Disable auto-select
    // google.accounts.id.revoke((response: any) => {
    //   console.log('User signed out:', response);
    // });
    // google.accounts.id.onSignIn((response: any) => {
    //   console.log('User signed in:', response);
    // });
    // google.accounts.id.onError((error: any) => {
    //   console.error('Error during Google Sign-In:', error);
    // });
    // google.accounts.id.onCancel((error: any) => {
    //   console.warn('Google Sign-In cancelled:', error);
    // });
    // google.accounts.id.onPrompt((response: any) => {
    //   console.log('Prompt response:', response);
    // });
    // google.accounts.id.onSuccess((response: any) => {
    //   console.log('Sign-In successful:', response);
    // });
    // google.accounts.id.onFailure((error: any) => {
    //   console.error('Sign-In failed:', error);
    // });
    // google.accounts.id.onClick((event: any) => {
    //   console.log('Button clicked:', event);
    // });
    // google.accounts.id.onLoad((response: any) => {
    //   console.log('Google API loaded:', response);
    // });
    // google.accounts.id.onError((error: any) => {
    //   console.error('Error during Google Sign-In:', error);
    // });
  }
}

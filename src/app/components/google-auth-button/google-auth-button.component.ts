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
      width: 300,
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left'
    });
  }
}

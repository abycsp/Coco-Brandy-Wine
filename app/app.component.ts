// app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // ... your other code
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private platform: Platform, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Other initialization code

      // Hide the splash screen when your app is ready
      SplashScreen['hide']();

    });
  }

  // Ensure that the signOut method is defined correctly
  signOut() {
    // Perform any sign-out logic if needed

    // Navigate to login-signup.page.html
    this.router.navigate(['/login-signup']);
  }
}
  
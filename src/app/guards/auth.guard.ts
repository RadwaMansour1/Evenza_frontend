import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const tokenDataStr = localStorage.getItem('userData') || sessionStorage.getItem('userData');
  if (!tokenDataStr) {
    router.navigate(['/profile']);
    return false;
  }

  try {
    const tokenData = JSON.parse(tokenDataStr);
    const now = Math.floor(Date.now() / 1000);
    // Check if the token is expired
    if (!tokenData.exp || tokenData.exp < now) {
      router.navigate(['/login']);
      return false;
    }
    // Check if the token is expired
    if (!tokenData.emailVerified) {
      router.navigate(['/verify-email'], { queryParams: { email: tokenData.email } });
      return false;
    }

    return true;

  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
};

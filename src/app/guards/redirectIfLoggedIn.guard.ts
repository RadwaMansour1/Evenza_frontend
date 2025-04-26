import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const redirectIfLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');

  if (userData) {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};

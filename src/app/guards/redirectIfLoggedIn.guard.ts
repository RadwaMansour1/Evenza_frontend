import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CONSTANTS } from '../constants';

export const redirectIfLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem(CONSTANTS.userData) || sessionStorage.getItem(CONSTANTS.userData);

  if (userData) {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};

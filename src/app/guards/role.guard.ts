import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CONSTANTS } from '../constants';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const userData = JSON.parse(localStorage.getItem(CONSTANTS.userData) || sessionStorage.getItem(CONSTANTS.userData) || 'null');

    if (userData && allowedRoles.includes(userData.role)) {
      return true;
    }

    // If the user is not logged in or does not have the required role, redirect to the login page
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  };
};

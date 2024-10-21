import { CanActivateFn } from '@angular/router';

export const denyLoginRedirectGuard: CanActivateFn = (route, state) => {
  if('token' in localStorage) {
    window.history.back();
    return false;
  }
  else {
    return true;
  }
};

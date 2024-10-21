import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);

  if('token' in localStorage) {
    return true;
  }
  else {
    router.navigate(['/']);
    return false;
  }
};

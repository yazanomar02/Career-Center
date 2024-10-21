import { CanActivateFn, Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { Inject, inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const utilities: UtilitiesService = Inject(UtilitiesService);
  const router:Router = inject(Router);

  var roles = `${localStorage.getItem('roles')}`;
  var check = roles.includes('Admin');
  console.log(roles);
  console.log(check);
  if(!check) {
    window.history.back();
    return false;
  }
  else {
    return true;
  }
};

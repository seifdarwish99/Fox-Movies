import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';


export const logGuardGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  return apiService.$isLoggedin.pipe(
    map(isLoggedin =>{
      if(isLoggedin){
        return true;
      }else {
        return false
      }
    })
  )
  // return true;
};
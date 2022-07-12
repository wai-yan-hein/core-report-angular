import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'src/app/user/user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route:Router,private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const user=this.userService.userValue;
    if(user)
    {
      return true
    }
    this.route.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }


}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Users } from '../_services/user.api';
import { GlobalService } from 'src/_shared/api/service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public user: Users, private globalservice: GlobalService,) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
        if (this.user.getCurrentUser() && this.user.getCurrentUser().accessToken !== null) {
            const user = JSON.parse(localStorage.getItem('userData'));
            const result = await (this.globalservice.postData("Auth","refreshToken", user)) as any;
            if (result.errorCode == 400) {
                return true;
            }
            if (result.errorCode == 401) {
                localStorage.removeItem('userData');
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            else {
                localStorage.setItem("userData", JSON.stringify(result));
                return true;
            }
        }

        localStorage.removeItem('userData');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
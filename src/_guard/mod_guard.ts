import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Users } from '../_services/user.api';

@Injectable({ providedIn: 'root' })
export class NavGuard implements CanActivate {

    constructor(private router: Router, public user: Users) { }
    canActivate(route: ActivatedRouteSnapshot) {

        let mod_name: string = route.data['mod_name'];

        if (this.user.canAccessModule(mod_name)) {
            return true;
        }
        this.router.navigate(['/401']);
        return false;
    }
}
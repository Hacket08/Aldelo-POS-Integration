import { Injectable } from '@angular/core'; 
import { ApiHttpService } from './api-http.service';
import { SwalService } from './swal-service';

@Injectable({ providedIn: 'root' })

export class Users {
    constructor(public http: ApiHttpService, public swal: SwalService) {
    }
    
    public user_api_link(username: any = '', password: any = '') {
        return this.http.getAPI('Useraccount') + '/' + username + '/' + password;
    }

    public getCurrentUser(): any {
        return JSON.parse(localStorage.getItem('userData')!);
    }


    public getCurrentUserApprover(): string {
        const result = JSON.parse(localStorage.getItem('userApprover'));
        let output = [];
        for (var a of result as any) {
            output.push(a.ins_EmailAddress);
        }
        return output.toString();
    }

    public getUserName(): string {
        return this.getCurrentUser().userName;
    }
    
    public getPassword(): string {
        return this.getCurrentUser().password;
    }
    
    public isLoggedIn(): boolean {
        const data = this.getCurrentUser();
        return data ? true : false;
    }
    
    public getUserRole(): number {
        return this.getCurrentUser().securityLevel;
    }

    public getUserFullName() : string {
        
        const data = this.getCurrentUser();
        return data.fullName;
    }

    public canAccessModule(mod_name: string = "") {
        let status: boolean = true;

        // if (this.getRoleAccess() === "all") {
        //   status = true;
        // }
        // else {
        //     if (this.getRoleAccess().split(',').indexOf(mod_name.toLowerCase()) > -1) {
        //         status = true;
        //     }
        //     else {
        //         status = false;
        //     }
        // }
        return status;
    }
}
import { Component } from '@angular/core';
import { ValidationFormsService } from '../../../../_services/validation-forms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../../_services/swal-service';
import { Users } from '../../../../_services/user.api';
import { ApiHttpService } from '../../../../_services/api-http.service';
import { GlobalService } from 'src/_shared/api/service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationFormsService]
})
export class LoginComponent {

  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  constructor(private fb: FormBuilder, public vf: ValidationFormsService,
    private globalservice: GlobalService, public swal: SwalService, public user: Users, 
    public http: ApiHttpService) {
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }
  
  createForm() {
    this.simpleForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(this.vf.formRules.usernameMin),
            Validators.pattern(this.vf.formRules.nonEmpty),
          ]
        ],
        password: ['', 
          [
            Validators.required
            // Validators.minLength(this.vf.formRules.passwordMin),
            // Validators.pattern(this.vf.formRules.passwordPattern),
          ]
        ]
      }
    );
  }

  get f() {
    return this.simpleForm.controls;
  }

  onValidate() {
    this.submitted = true;
    return this.simpleForm.status === 'VALID';
  }

  async onSubmit() {
    if (this.onValidate()) {

      const body = {
        username:  this.simpleForm.value.username,
        password: this.simpleForm.value.password,
      };

      let result: any;
      result = (await this.globalservice.postData("Auth","Login", body)) as any;
      const output = Object.entries(result).map(([key, value]) => ({[key]: value}))
      if(output.length > 0)
      {
        localStorage.setItem("userData", JSON.stringify(result));
        let approvers = (await this.globalservice.getAuthData("UserApprover", result.userId)) as any;
        localStorage.setItem("userApprover", JSON.stringify(approvers));

        location.replace('/dashboard');
      }
    }
  }
}

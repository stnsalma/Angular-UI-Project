import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  formBuiler = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toastr=inject(ToastrService);
  employeeForm = this.formBuiler.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    age: [0, [Validators.required]],
    salary: [0, [Validators.required]],
    description: ['', [Validators.required]]
  });
  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe(result => {
        console.log(result);
        this.employeeForm.patchValue(result);
        //this.employeeForm.controls.email.disable();
      })
    }
  }
  save() {
    console.log(this.employeeForm.value);

    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      phone: this.employeeForm.value.phone!,
      age: this.employeeForm.value.age!,
      salary: this.employeeForm.value.salary!,
      description: this.employeeForm.value.description!,
    };
    if(this.isEdit){
      this.httpService.updateEmployee(this.employeeId,employee).subscribe(() => {
        console.log("success");
        this.toastr.success("Employee records updated.");
        this.router.navigateByUrl("/employees-list");
      });
    }else{
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log("success");
        this.toastr.success("Employee records created.");
        this.router.navigateByUrl("/employees-list");
      });
    }
    
  }
}

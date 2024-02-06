import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employee';
import { HttpService } from '../../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent {
  router = inject(Router);
  employeeList: IEmployee[] = [];
  httpservice = inject(HttpService);
  toastr=inject(ToastrService);
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'age', 'salary', 'description', 'action'];

  ngOnInit() {
    this.httpservice.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }
  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/employee/" + id);
  }
  delete(id: number) {
    console.log(id);
    this.httpservice.deleteEmployee(id).subscribe(() => {
      console.log("deleted");
      this.toastr.success("Employee's record deleted successfully.");
      this.employeeList=this.employeeList.filter(x=>x.id!=id);
    });
  }
}

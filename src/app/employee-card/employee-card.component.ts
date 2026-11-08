import { Component, input, output } from '@angular/core'
import { Employee } from '../models/employee.model';


@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
  standalone: true,
})

export class EmployeeCardComponent{

  employee = input.required<Employee>();

  archive = output<number>();

  archiveEmployee(){
    this.archive.emit(this.employee().id);
  }
}

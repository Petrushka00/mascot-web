import { Component, signal, computed } from "@angular/core"
import { Employee } from '../models/employee.model';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { ActiveEmployeesFilterComponent } from '../active-employees-filter/active-employees-filter.component';


@Component({
  selector: "app-employees",
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  standalone: true,

  imports: [
    EmployeeCardComponent,
    ActiveEmployeesFilterComponent,
  ],
})

export class EmployeesComponent {

  employees = signal<Employee[]>([
    {
      id: 1,
      name: 'Александр Федолвич Иванов',
      position: 'Frontend-разработчик',
      department: 'Разработка',
      evaluation: 92,
      status: 'active'
    },
    {
      id: 2,
      name: 'Мария Семеновна Смирнова',
      position: 'Backend-разработчик',
      department: 'Разработка',
      evaluation: 87,
      status: 'active'
    },
    {
      id: 3,
      name: 'Дмитрий Иванович Петров',
      position: 'Аналитик',
      department: 'Аналитика',
      evaluation: 78,
      status: 'archived'
    }
  ]);


  onlyActive = signal(false);


  totalEmployees = computed(() => this.employees().length);


  visibleEmployees = computed(() => {
    if (this.onlyActive()) {
      return this.employees().filter(
        employee => employee.status === 'active'
      );
    }

    return this.employees();
  });


  archiveEmployee(id: number) {
  this.employees.update((list: Employee[]) =>
    list.map(employee =>
      employee.id === id
        ? { ...employee, status: 'archived' }
        : employee
    )
  );
}
}


import { Component } from "@angular/core"

@Component({
  selector: "app-employees",
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  standalone: true
})

export class EmployeesComponent{
  protected employees = [
    { id: 1, name: 'Иван Петров', meta: 'Frontend разработчик', position: 'Разработчик', department: 'Разработка', rating: 9.2, status: 'Активен', isTest: false },
    { id: 2, name: 'Мария Федорова', meta: 'UX/UI дизайнер', position: 'Продукт', department: 'Продукт', rating: 8.8, status: 'Активен', isTest: true },
    { id: 3, name: 'Алексей Смирнов', meta: 'Backend разработчик', position: 'Разработчик', department: 'Разработка', rating: 8.4, status: 'Активен', isTest: false },
    { id: 4, name: 'Екатерина Лебедева', meta: 'Маркетолог', position: 'Маркетолог', department: 'Маркетинг', rating: 8.1, status: 'Активен', isTest: false },
    { id: 5, name: 'Дмитрий Волков', meta: 'DevOps инженер', position: 'DevOps инженер', department: 'Инфраструктура', rating: 7.9, status: 'Активен', isTest: true },
    { id: 6, name: 'Ольга Кузнецова', meta: 'Аналитик', position: 'Аналитик', department: 'Аналитика', rating: 7.6, status: 'В отпуске', isTest: false }
  ];
}


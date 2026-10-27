import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesComponent } from './employees/employees.component';
import { Projects_infoComponent } from './projects_info/projects_info.component';
import { TeamsComponent } from './teams/teams.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DashboardComponent, SidebarComponent, EmployeesComponent, Projects_infoComponent, TeamsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mascot-web');

  public readonly currentPage = signal<string>('dashboard');

  public navigateTo(pageName: string): void {
  console.log('Кликнута страница:', pageName); // <-- Добавьте эту строку
  this.currentPage.set(pageName);
}
}

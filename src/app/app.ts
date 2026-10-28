import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesComponent } from './employees/employees.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { TeamsComponent } from './teams/teams.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DashboardComponent, SidebarComponent, EmployeesComponent, EvaluateComponent, TeamsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mascot-web');

  public readonly currentPage = signal<string>('dashboard');

  public navigateTo(pageName: string): void {
  this.currentPage.set(pageName);
}
}

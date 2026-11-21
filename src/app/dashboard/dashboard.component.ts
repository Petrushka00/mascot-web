import { Component, inject } from '@angular/core'
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})

export class DashboardComponent{
  protected readonly projectService = inject(ProjectService);
}

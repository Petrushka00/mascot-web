import { Component, computed, inject, signal } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectSandboxComponent } from './project-sandbox.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  standalone: true,
  imports: [ProjectSandboxComponent]
})
export class ProjectsComponent {
  protected readonly projectService = inject(ProjectService);

  public onlyActiveProjects = signal<boolean>(false);

  public totalProjectsCount = this.projectService.totalProjectsCount;
  public totalActiveBudget = this.projectService.totalActiveBudget;

  public filteredProjects = computed(() => {
    const list = this.projectService.projects();
    return this.onlyActiveProjects()
      ? list.filter(project => project.status === 'active')
      : list;
  });

  public createProject(projectName: string, budget: number): void {
    this.projectService.createProject(projectName, budget);
  }

  public archiveProject(id: number): void {
    this.projectService.archiveProject(id);
  }

  public removeAllProjects(): void {
    this.projectService.removeAllProjects();
  }
}

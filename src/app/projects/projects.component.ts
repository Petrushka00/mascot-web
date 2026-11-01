
import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal, effect } from '@angular/core';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed';
  budget: number;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  standalone: true,
  imports: [CurrencyPipe]
})
export class ProjectsComponent {

  private readonly storageKey = 'mascot_projects_state';

  private readonly initialProjects: Project[] = [
    {
      id: 1,
      name: 'Разработка личного кабинета',
      status: 'active',
      budget: 150000
    },
    {
      id: 2,
      name: 'Внедрение ИИ-агентов',
      status: 'active',
      budget: 450000
    },
    {
      id: 3,
      name: 'Аудит безопасности (Архив)',
      status: 'completed',
      budget: 80000
    }
  ];

  private loadProjects(): Project[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (saved === null) {
        return this.initialProjects;
      }

      const parsed: unknown = JSON.parse(saved);

      if (
        !Array.isArray(parsed) ||
        !parsed.every(project =>
          project &&
          typeof project.id === 'number' &&
          typeof project.name === 'string' &&
          (project.status === 'active' || project.status === 'completed') &&
          typeof project.budget === 'number'
        )
      ) {
        return this.initialProjects;
      }

      return parsed;
    } catch {
      return this.initialProjects;
    }
  }

  public projects = signal<Project[]>(this.loadProjects());

  public onlyActiveProjects = signal<boolean>(false);

  private newProjectId = signal<number>(
    Math.max(0, ...this.projects().map(project => project.id)) + 1
  );

  public totalProjectsCount = computed(() =>
    this.projects().length
  );

  public filteredProjects = computed(() => {
    const list = this.projects();

    return this.onlyActiveProjects()
      ? list.filter(project => project.status === 'active')
      : list;
  });

  public totalActiveBudget = computed(() => {
    return this.projects()
    .filter(project => project.status === 'active')
    .reduce((total, project) => total + Number(project.budget), 0);
  }
  );

  public createProject(projectName: string, budget: number): void {
  const name = projectName.trim();
  const projectBudget = Number(budget);

  if (!name || !Number.isFinite(projectBudget) || projectBudget <= 0) {
    return;
  }

  const newProject: Project = {
    id: this.newProjectId(),
    name: name,
    status: 'active',
    budget: projectBudget
  };

  this.projects.update(projects => [...projects, newProject]);

  this.newProjectId.update(id => id + 1);
}

  public archiveProject(id: number): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id === id
          ? { ...project, status: 'completed' }
          : project
      )
    );
  }

  public removeAllProjects(): void {
    this.projects.set([]);
  }

  constructor() {
    effect(() => {
      const currentList = this.projects();

      try {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify(currentList)
        );

        console.log(
          `[MASCOT]: Сохранено проектов: ${currentList.length}`
        );
      } catch (error) {
        console.error('[MASCOT]: Ошибка сохранения проектов', error);
      }
    });
  }
}

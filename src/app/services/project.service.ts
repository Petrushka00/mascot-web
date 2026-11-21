import { Injectable, InjectionToken, computed, effect, inject, signal } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed';
  budget: number;
}


export interface ProjectConfig {
  maxProjects: number;
  minBudget: number;
}

export const PROJECT_CONFIG = new InjectionToken<ProjectConfig>('PROJECT_CONFIG', {
  providedIn: 'root',
  factory: () => ({ maxProjects: 10, minBudget: 1000 })
});


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly config = inject(PROJECT_CONFIG);
  private readonly storageKey = 'mascot_projects_state';

  private readonly initialProjects: Project[] = [
    { id: 1, name: 'Разработка личного кабинета', status: 'active', budget: 150000 },
    { id: 2, name: 'Внедрение ИИ-агентов', status: 'active', budget: 450000 },
    { id: 3, name: 'Аудит безопасности (Архив)', status: 'completed', budget: 80000 }
  ];

  private readonly _projects = signal<Project[]>(this.loadProjects());
  readonly projects = this._projects.asReadonly();

  // Computed-счётчики
  readonly totalProjectsCount = computed(() => this._projects().length);
  readonly totalActiveBudget = computed(() =>
    this._projects()
      .filter(p => p.status === 'active')
      .reduce((total, p) => total + Number(p.budget), 0)
  );

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this._projects()));
      } catch (e) {
        console.error('[MASCOT]: Ошибка сохранения', e);
      }
    });
  }

  private loadProjects(): Project[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return this.initialProjects;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : this.initialProjects;
    } catch {
      return this.initialProjects;
    }
  }

  createProject(projectName: string, budget: number): boolean {
    const name = projectName.trim();
    const projectBudget = Number(budget);

    if (
      !name ||
      !Number.isFinite(projectBudget) ||
      projectBudget < this.config.minBudget ||
      this.totalProjectsCount() >= this.config.maxProjects
    ) {
      return false;
    }

    const nextId = Math.max(0, ...this._projects().map(p => p.id)) + 1;
    const newProject: Project = {
      id: nextId,
      name,
      status: 'active',
      budget: projectBudget
    };

    this._projects.update(list => [...list, newProject]);
    return true;
  }


  archiveProject(id: number): void {
    this._projects.update(list =>
      list.map(p => (p.id === id ? { ...p, status: 'completed' } : p))
    );
  }


  removeProject(id: number): void {
    this._projects.update(list => list.filter(p => p.id !== id));
  }

  removeAllProjects(): void {
    this._projects.set([]);
  }
}

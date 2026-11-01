import { CurrencyPipe } from '@angular/common';
import {Component, effect, computed, signal } from '@angular/core';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed';
  budget: number;
}


@Component({
  selector: 'app-projects',
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.css",
  standalone: true,
  imports: [CurrencyPipe]
})

export class ProjectsComponent {

  public projects = signal<Project[]>([
    { id: 1, name: 'Разработка личного кабинета', status: 'active', budget: 150000 },
    { id: 2, name: 'Внедрение ИИ-агентов', status: 'active', budget: 450000 },
    { id: 3, name: 'Аудит безопасности (Архив)', status: 'completed', budget: 80000 }
  ]);

  public onlyActiveProjects = signal<boolean>(false);

  private newProjectId = signal<number>(4);

  public createProject(projectName: string, budget: number){
    if (!projectName.trim()){
      return
    }

    const newProject: Project ={
      id: this.newProjectId(),
      name: projectName,
      status: 'active',
      budget: budget,
    };

    this.projects.update(projects => [...projects, newProject]);

    this.newProjectId.update(id => id + 1);
  }

  
   public archiveProject(id: number): void {
    this.projects.update(currentProjects => 
      currentProjects.map(proj => 
        proj.id === id ? { ...proj, status: 'completed' } : proj
      )
    );
  }

  public removeAllProjects(): void {
    this.projects.set([]); 
  }

   public totalProjectsCount = computed(() => this.projects().length);
  
   public filteredProjects = computed(() => {
    const list = this.projects();
    if (this.onlyActiveProjects()) {
      return list.filter(p => p.status === 'active');
    }
    return list;
  });

  public totalActiveBudget = computed(() => {
    return this.projects()
      .filter(p => p.status === 'active')
      .reduce((sum, p) => sum + p.budget, 0);
  });

  constructor() {
    
    effect(() => {
      const currentList = this.projects();
      
      localStorage.setItem('mascot_projects_state', JSON.stringify(currentList));
      
      console.log(`[MASCOT Системный Лог]: База проектов синхронизирована. Записей: ${currentList.length}`);
    });
  }

}
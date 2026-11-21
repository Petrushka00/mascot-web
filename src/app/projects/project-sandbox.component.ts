import { Component, inject } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-sandbox',
  standalone: true,
  providers: [ProjectService], // Изолированный экземпляр сервиса
  template: `
    <div style="margin-top: 24px; padding: 16px; border: 1px dashed #6366f1; border-radius: 8px;">
      <h4> Демонстрационная область приложения с локальным Provider</h4>
      <p>Проекты: <strong>{{ localService.totalProjectsCount() }}</strong></p>
      <p>Бюджет: <strong>{{ localService.totalActiveBudget() }} ₽</strong></p>

      <button (click)="localService.createProject('Тест-проект', 50000)" style="margin-right: 8px;">
        + Добавить проект
      </button>
      <button (click)="localService.removeAllProjects()">
        Очистить
      </button>
    </div>
  `
})
export class ProjectSandboxComponent {
  protected readonly localService = inject(ProjectService);
}

import { Component } from "@angular/core"

@Component({
  selector: "app-evaluate",
  templateUrl: "./evaluate.component.html",
  styleUrl: "./evaluate.component.css",
  standalone: true
})

export class EvaluateComponent{
  protected evaluations = [
    { id: 1, project: 'QuestEdu', criterion: 'Сроки', score: 8.7 },
    { id: 2, project: 'MultiAgent', criterion: 'Качество', score: 9.1 }
  ];
}
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.css',
  templateUrl: './sidebar.component.html',
  standalone: true
})

export class SidebarComponent{
  @Input() activePage: string = 'dashboard';

  @Output() pageChanged = new EventEmitter<string>();

  public selectPage(pageName: string): void {
    this.pageChanged.emit(pageName);
  }
}

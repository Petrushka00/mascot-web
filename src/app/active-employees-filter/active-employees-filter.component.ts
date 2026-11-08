import { Component, model } from "@angular/core";


@Component({
  selector: 'app-active-employees-filter',
  templateUrl: './active-employees-filter.component.html',
  styleUrl: './active-employees-filter.component.css',
  standalone: true,
})

export class ActiveEmployeesFilterComponent{
  checked = model(false);

  toggleFilter() {
    this.checked.set(!this.checked());
  }
}

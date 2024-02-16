import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  public sidebarItems = [
    { label: 'Listado de Artículos', icon: 'label', url: './list' },
    { label: 'Añadir Artículo', icon: 'add', url: './new-article' },
  ]

}

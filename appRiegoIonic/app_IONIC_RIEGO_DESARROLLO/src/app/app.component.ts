import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dispositivos', url: '/home', icon: 'home' },
  // { title: 'Dispositivos', url: '/dispositivos', icon: 'menu' },
  ];
  public labels = ['Lic. Leandro Ciribé'];
  constructor() {}
}

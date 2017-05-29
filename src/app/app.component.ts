import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.unicorn-dark-theme]': 'dark',
  },
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  dark = false;

  navItems = [
    { name: 'Create Observables', route: 'create-observables' },
    { name: 'Hot & Cold Observables', route: 'hot-and-cold-observables' },
    { name: 'Subjects', route: 'subjects' },
    { name: 'Latest', route: 'latest' },
    { name: 'Merge', route: 'merge' },
    { name: 'Filter', route: 'filter' },
    { name: 'Scan', route: 'scan' },
    { name: 'Reduce', route: 'reduce' },
    { name: 'Buffer', route: 'buffer' }
    /*
     TODO..
    { name: 'Concat', route: 'concat' }
    ,
    */
  ];
}

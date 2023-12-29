import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { RoutePaths } from 'src/app/models/routepaths';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavigationComponent {
  @Input() active!: boolean;
  navData = navbarData;
  routes=RoutePaths
}

export const navbarData = [
  {
    icon: 'pi pi-home',
    label: 'Dashboard',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.DASHBOARD}`,
  },
  

  
  
];

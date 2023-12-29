import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './features/shared/layout/layout.component';

import { RoutePaths } from './models/routepaths';


const routes: Routes = [
 
  

  
  {
  
    path: `${RoutePaths.GESTION}`,
    component: LayoutComponent,
    children: [
     
      
      {
        path: `${RoutePaths.DASHBOARD}`,
        loadChildren: () => import('./features/bloc/bloc.module').then((m) => m.BlocModule),
      },
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

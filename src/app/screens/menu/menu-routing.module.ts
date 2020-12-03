import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then( m => m.FeedPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then( m => m.HistoryPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

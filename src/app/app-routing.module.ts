import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPhotosComponent } from '@app/pages/user-photos/user-photos.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user/:id', component: UserPhotosComponent },
    { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

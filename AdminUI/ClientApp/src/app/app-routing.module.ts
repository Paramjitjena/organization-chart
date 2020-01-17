import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './Layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { depchartComponent } from './departments-chart/department-char.component';
import {OrgTelericComponent} from './org-teleric/org-teleric.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        "path": "",
        "component": LayoutComponent,
         canActivate : [AuthGuard],
        "children": [
            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "users",
                component: UsersComponent
            },
            {
                path: "groups",
                component: GroupsComponent
            },
            {
                path: "org-chart",
                component: OrgChartComponent
            },
           
            {
                path: "org-teleric",
                component:OrgTelericComponent
            },
            
            {
                path: "dep-chart",
                component: depchartComponent
            },
            {
                path: "settings",
                loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
            }
        ]
    },
    {
        "path": "login",
        "component": LoginComponent
    }
];

@NgModule({

  imports: [
      RouterModule.forRoot(routes)
     ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

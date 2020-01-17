import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { SettingsHomeComponent } from './settings-home/settingsHome.component';
import { ConfigurationComponent } from './options-configuration/configuration.component';
const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [{
            path: '',
            children: [
                { path: '', component: SettingsHomeComponent , pathMatch: 'full' },

                { path: 'options-configuration', component: ConfigurationComponent },
            ]
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }

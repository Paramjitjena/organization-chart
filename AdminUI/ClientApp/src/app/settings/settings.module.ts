import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsHomeComponent } from './settings-home/settingsHome.component';
import { ConfigurationComponent } from './options-configuration/configuration.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
        RouterModule,
        SettingsRoutingModule,
        FormsModule
  ],
    declarations: [
        SettingsComponent,
        SettingsHomeComponent,
        ConfigurationComponent
  ],
    exports: [
        SettingsComponent,
        SettingsHomeComponent,
        ConfigurationComponent
  ]
})
export class SettingsModule { }

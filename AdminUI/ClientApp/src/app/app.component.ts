import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    constructor(private commonSvc: CommonService, private authSvc: AuthService) {
        if (!this.authSvc.isLogedIn) {
            this.commonSvc.initializeData().subscribe((res) => {
                console.log(res);
            })
        }
      
    }
}

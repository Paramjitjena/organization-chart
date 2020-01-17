import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { User } from '../../services/Data/Users';
import { Group } from '../../services/Data/Groups';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

    public users: User[];
    public groups: Group[];
    public orgLevel: number = 0;
    constructor(private commonSvc: CommonService) {

    }
    ngOnInit() {
        this.commonSvc.getUsers().subscribe((res) => {
            this.users = res;
        });
        this.commonSvc.getGroups().subscribe((res) => {
            this.groups = res;
        });
        this.commonSvc.getOrganizationLevel().subscribe((res) => {
            this.orgLevel = res;
        })
    }
}

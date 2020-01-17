import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { UtilityService } from '../../../shared/utils/utility.service';
import { Option } from '../../../services/Data/Options';

@Component({
  selector: 'settings-configuration',
    templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
    public options: Option[];
    public activeId: any;
    constructor(private commonSvc: CommonService, private utilitySvc: UtilityService) {
        this.getOptions();
    }

  ngOnInit() {
  }
    getOptions() {
        this.commonSvc.getOptions().subscribe((res) => {
            this.options = res;
        });
    }
    update(id) {
        this.activeId = id;
    }
   
    updateOpton(option) 
    {
        
         this.commonSvc.updateOptions(option).subscribe((res) => {
            if (res) 
            {
                
                this.getOptions();
                this.utilitySvc.showNotification('success', 'Option updated successfully');
            }
        });
          
      
    }
}

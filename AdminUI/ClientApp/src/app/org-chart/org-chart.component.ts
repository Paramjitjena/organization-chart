import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../services/Data/Users';
import { CommonService } from '../../services/common.service';
import { Group } from '../../services/Data/Groups';
import { OrgChartM } from '../../services/Data/OrgChartsData';
import { UtilityService } from '../../shared/utils/utility.service';
 
declare const OrgChart: any;
declare const BALKANGraph: any;
declare const $: any;

@Component({
    selector: 'app-org-chart-component',
    styleUrls:['./style.css'],
    templateUrl: './org-chart.component.html'
})

export class OrgChartComponent implements OnInit{
    public orgData: OrgChartM[];
    closeResult: string;
    public users: User[];
    public groups: Group[];
    public selectedUser: number =0;
    public selectedOrgUser: any = 0;
    public selectedgroup: any = 0;
    public activeUser: User;
    public activeOrgUser: OrgChartM;
    public throughGraph: boolean = true;
    public viewDetail: boolean = false;
    public addUToOrg: boolean = false;
    public nodeID: any;
    public x:any=[];
    constructor(private modalService: NgbModal,private http: HttpClient, private utilitySvc: UtilityService, private commonSvc: CommonService, @Inject('BASE_URL') baseUrl: string) {

    }
   
    ngOnInit() {
        this.http.get('/api/Users/getOrgs').subscribe((result)=>{this.x=result
            //this.x[0].pid=0;
            delete(this.x[0].pid);
            this.x[1].pid=1;
            this.x[2].pid=1;
            this.x[3].pid=2;
            this.x[4].pid=3;
            this.x[5].pid=3;
            this.x[6].pid=4;
            this.x[7].pid=4;
            this.x[8].pid=4;
            this.x[9].pid=4; 
           
            
            this.orgData=this.x;
            //this.x[0].splice(4,1)
        console.log("api",this.orgData);
        });
        this.users = JSON.parse(localStorage.getItem('users'));
            //this.orgData=this.x;
           // this.orgData.push(this.x);
        console.log("this.x",this.x)
       //  this.orgData = JSON.parse(localStorage.getItem('orgChart'));
        this.groups = JSON.parse(localStorage.getItem('Groups'));
        this.fetchOrganization();
      //  

    } 
    getTitle(id) {
        return this.commonSvc.getOptionTitle(id)
    }
  

   
    fetchOrganization()
     {
         debugger
        let that = this;
        setTimeout(() => {
           // var orgChartData = JSON.parse(localStorage.getItem('orgChart'));
            var orgChartData = that.x;
            for(var i = 0; i < orgChartData.length; i++)
             {
                orgChartData[i].field_number_children = childCount(orgChartData.id) + "/" + orgChartData.length;
                // orgChartData[i].field_number_children = childCount(orgChartData[i].id[0].id) + "/" + orgChartData.length;
             }

            function childCount(id) { 
                let count = 0;
                for (var i = 0; i < orgChartData.length; i++) {
                    if (orgChartData[i].pid == id) {
                        count++;
                        count += childCount(orgChartData[i].id);
                       //count += childCount(orgChartData[i].id[0].id);
                    }
                }
                return count;
            }

            OrgChart.templates.ula.field_number_children = '<text fill="#3c4858" x="25" y="115" text-anchor="middle">{val}</text>';
      
            new OrgChart(document.getElementById("tree"), {
                template: "ula",
                layout: BALKANGraph.tree,
                align: BALKANGraph.ORIENTATION,
                nodeMenu: {
                    details: { text: "Details", icon: OrgChart.icon.details(18, 18, '#092863'), onClick: callDetailHandler},
                    addT: { text: "Add new", icon: OrgChart.icon.add(18, 18, '#092863'), onClick: callAddHandler },
                    removeT: { text: "Remove", icon: OrgChart.icon.remove(18, 18, '#092863'), onClick: callRemoveHandler },
                    AddG: { text: "Add To Group", icon: OrgChart.icon.add(18, 18, '#092863'), onClick: callAddGroupHandler }
                },
                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img",
                    field_number_children: "field_number_children"
                },
                nodes: orgChartData
           });      
        }, 200);
        

      

        function callDetailHandler(nodeId)
         {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.addUToOrg = false;
            that.viewDetail = true;
            that.commonSvc.getOrgChart(nodeId).subscribe((res) => {
                that.activeOrgUser = res;
                $('#addToOrg').click();
            })
          
        }
        function callAddGroupHandler(nodeId) 
        {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.addUToOrg = true;
            that.viewDetail = false;
           
        that.commonSvc.getOrgChart(nodeId).subscribe((res) => {
                that.activeOrgUser = res;
                $('#addToGroup').click();
            })


        }
        function callAddHandler(nodeId) 
        {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.addUToOrg = true;
            that.viewDetail = false;
            $('#addToOrg').click();
        }
        

        function callRemoveHandler(nodeId) 
        {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.commonSvc.removeFromOrganization(nodeId).subscribe((isRemoved) => {
                if (isRemoved) {
                    that.fetchOrganization();
                    that.utilitySvc.showNotification('success', 'Record removed from organization successfully!');
                }
            });
        }
    }
    
    addToOrganization()
     {
         debugger
        if (!this.throughGraph && this.nodeID)
        {
            this.selectedOrgUser = this.nodeID;
        }
        this.commonSvc.addToOrganization(this.selectedUser, this.selectedOrgUser, this.selectedgroup).subscribe((isAdded) => {
            if (isAdded)
             {
                this.fetchOrganization();
                this.modalService.dismissAll();
                this.utilitySvc.showNotification('success', 'Record added to organization successfully!');
            }
        })
    }
    addToGroup()
    {  
        debugger
        if (!this.throughGraph && this.nodeID)
        {
            this.selectedUser = this.nodeID;
        }
       
        this.commonSvc.addToGroup(this.selectedUser, this.selectedgroup).subscribe((isAdded) => {
            
            if (isAdded)
             {
                this.fetchOrganization();
                this.modalService.dismissAll();
                this.utilitySvc.showNotification('success', 'Added to Group successfully!');
             }
             else
             {
                this.utilitySvc.showNotification('danger', 'Already added');
             }
        })
    }

    onSelectOrg() {
        debugger
        this.commonSvc.getOrgChart(this.selectedOrgUser).subscribe((res) => {
            this.activeOrgUser = res;
            console.log(res);
        }) 
    }
    onselectUser() {
        debugger
        this.commonSvc.getUser(this.selectedUser).subscribe((res) => {
            this.activeUser = res;
            console.log(this.activeUser)
        })
    }
    open(content, type, modalDimension, option) {
        if (option == 1) {
            this.throughGraph = true;
            this.addUToOrg = false;
        } else {
            this.throughGraph = false;
        }
        if (this.throughGraph || this.addUToOrg) {
            this.selectedUser = 0;
            this.selectedOrgUser = 0;
            this.selectedgroup = 0;
            this.activeOrgUser = new OrgChartM();
            this.activeUser = new User();
        }
        this.commonSvc.getUsersForOrganization().subscribe((res) => {
            this.users = res;
        });
        this.orgData=this.x;

        console.log("orgmsg",this.x);
         //this.orgData = JSON.parse(localStorage.getItem('orgChart'));
        this.groups = JSON.parse(localStorage.getItem('Groups'));
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}

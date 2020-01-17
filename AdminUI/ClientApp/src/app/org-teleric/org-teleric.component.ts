import {Component} from '@angular/core';
import { Alert, AlertPromise } from 'selenium-webdriver';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { TelericServices } from '../../services/teleric.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../services/Data/Users';
import { Group } from '../../services/Data/Groups';
import { CommonService } from '../../services/common.service';
import { OrgChartM } from '../../services/Data/OrgChartsData';
import { UtilityService } from '../../shared/utils/utility.service';
import { TelericUsersChart} from '../../services/Data/TelericUsersChart';
declare const $:any;
declare const kendo: any;
enum option {
    ADD = 1,
    EDIT = 2,
    DETAIL= 3
}

@Component({
    selector: 'org-teleric',
    templateUrl: './org-teleric.component.html',
    styleUrls: ['./org-teleric.component.css']
})

export class OrgTelericComponent {
    public model:[];
    public user:[]; 
    closeResult: string;
    public users: User[];
   
    public selectedUser: number =0;
    public selectedOrgUser: number = 0;
    public selectedgroup: any = 0;
    public activeUser: User;
    public orgData: OrgChartM[];
    public activeOrgUser: OrgChartM;
    public groups: Group[];
    public userId:any;
    public UserName:any;
    public UsersDesignation:any;
    public userImg:any;
    public throughGraph: boolean = true;
    public viewDetail: boolean = false;
    public addUToOrg: boolean = false;
    public nodeID: any;
   
    public modelDialog: {
        headerTitle: any,
        buttonTitle: any
    }
     
 constructor(private router: Router,private utilitySvc: UtilityService,private commonSvc: CommonService, private http: HttpClient, private teleric:TelericServices,private modalService: NgbModal) 
    {}
ngOnInit()
    {
         
        this.fetchChart();
        this.users = JSON.parse(localStorage.getItem('users'));
        this.orgData = JSON.parse(localStorage.getItem('orgChart'));
        this.groups = JSON.parse(localStorage.getItem('Groups'));
   
        console.log( this.teleric.readchart())
           
   }

    updateUser()
    {
        
    }
openCity(evt, cityName)
{
     
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
} 

    fetchChart()
    {
      
 let that=this    
var ser=this.teleric.shapeOperations();
var connectionData=this.teleric.connectionsData();
$("#diagram").kendoDiagram({
      
                dataSource: ser,
                connectionsDataSource: connectionData,
                layout: {
                    type: "tree",
                   subtype: "tipover",
                   tipOverTreeStartLevel: 10,
                    underneathHorizontalOffset: 0,
                },
                shapeDefaults: {
                   
                    visual: visualTemplate,

                  

                 },
                connectionDefaults: {
//_______________option 4___________________
              toConnector: "top",  
                //    fromConnector: "top",  

                    //__________________option 2______________________
        //    endCap: {
        //      type: "FilledCircle",
        //       fill: {
        //         color: "#193C9A",
        //         height:5,
        //         width:5,
        //         },
           // },
//_________________option 3______________________
        //    type: "polyline",
        //    startCap: "FilledCircle",
        //    endCap: "ArrowEnd",


        

////for start caps of the connectors
        startCap: {
            type: "FilledCircle",
            fill: {
              color: "black"
            },},
            endCap: "ArrowEnd",
            stroke: {
                        color: "#193C9A",
                        width: 1,
//__________________option 5___________________________
                        // dashType: "dashDot",

                    },
                    hover: {
                        stroke: {color: "black"}
                      },
                },
                
                  select: onSelect,
                  click: onClick,
                  dataBound: onDataBound,
                  remove: onRemove,
                 
                 
            });
        

        function onDataBound(e) 
        {
            var that = this;
            setTimeout(function () {
                that.bringIntoView(that.shapes);
            }, 0);
          
        }

        

        function onRemove(e) {
              
           var id=e.shape.dataItem.id;
           
               
        }

      

        function onSelect(e) {
            var action;
            var items;
            if (e.selected.length) {
                action = "Selected";
                items = e.selected;
            } else if (e.deselected.length) {
                action = "Deselected";
                items = e.deselected;
            }
     }

         
        function onClick(e)
           {
             $('#userpop').click();  
           // console.log(that.teleric.readchart())
           }

        
        var diagram = kendo.dataviz.diagram;
        var Shape = diagram.Shape;
        var Connection = diagram.Connection;
        var Point = diagram.Point;

        function visualTemplate(options) {
            var dataviz = kendo.dataviz;
            var g = new dataviz.diagram.Group();
            var dataItem = options.dataItem;
 
               g.append(new dataviz.diagram.Rectangle({
                 
              
                width: 500,
                    height: 200,
                    fill:{
                        color:"white",
                    },
                      toConnector: "top",
                    stroke: {
                        toConnector: "top",
                        width: 1,
                       color:"#001264",
                      },
                      
                    //option 2
                    //  fill: {
                    //     gradient: {
                    //         type: "linear",
                    //         stops: [{
                    //             color: "#D4EBFC",
                    //             offset: 0,
                    //             opacity: 0.5
                    //         }, {
                    //             color: "white",
                    //             offset: 1,
                    //             opacity: 1
                    //         }]
                    //     }
                    // }
                     
                   }));
                 



                  g.append(new dataviz.diagram.Image({
                    source:dataItem.Image,
                          x: 30,
                          y: 30,
                        width: 130,
                        height: 130,
                        }));
               
                     g.append(new dataviz.diagram.TextBlock({
                    text: dataItem.JobTitle,

                    x: 170,
                    y: 35,
                    fill: "black",
                    wordbreak: "break-all",
                   fontSize:25
                }));
              return g;
        }  

         
    
    }
  deleteUser(id)
  {
    this.teleric.DeleteShap(id)
  }
    addaMember()
     {
      this.teleric.CreateShap(this.selectedUser,this.selectedOrgUser)
       this.fetchChart();
       }
  
   
    getTitle(id) {
        return this.commonSvc.getOptionTitle(id)
    }

    onSelectOrg() {
        this.commonSvc.getOrgChart(this.selectedOrgUser).subscribe((res) => {
            this.activeOrgUser = res;
            console.log(res);
        }) 
    }
    onselectUser() {
        this.commonSvc.getUser(this.selectedUser).subscribe((res) => {
            this.activeUser = res;
            console.log(this.activeUser)
        })
    }
    open(content, type, modalDimension, option) 
    {
        if (option == 1) {
            this.throughGraph = true;
            this.addUToOrg = false;
        }
       else 
        {
            this.throughGraph = false;
        }
        if(this.throughGraph || this.addUToOrg) 
        {
            this.selectedUser = 0;
            this.selectedOrgUser = 0;
            this.selectedgroup = 0;
            this.activeOrgUser = new OrgChartM();
            this.activeUser = new User();
        }
        this.commonSvc.getUsersForOrganization().subscribe((res) => {
            this.users = res;
        });
       
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




import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { Users, User } from './Data/Users';
import { Groups, Group , groupinfo } from './Data/Groups';
import { OrgChartM } from './Data/OrgChartsData';
import { Option, Options } from './Data/Options';
import { AddToGroup, AddToGroups } from './Data/AddToGroup';
import { UtilityService } from '../shared/utils/utility.service';
import { TelericUsersChart} from './Data/TelericUsersChart';
import{NgxNotificationService}from 'ngx-notification'
@Injectable()
export class CommonService {

    public x:any=[];
    constructor(private router: Router,private utilitySvc: UtilityService , private http: HttpClient,private notification:NgxNotificationService) {

  }

  
    initializeData(): Observable<string>  
    {
        debugger;
        this.http.get('/api/Users/getOrgs').subscribe((result)=>{this.x=result
            delete(this.x[0].pid);
            //this.x[0].pid=0;
            this.x[1].pid=1;
            this.x[2].pid=1;
            this.x[3].pid=1;
            this.x[4].pid=2;
            this.x[5].pid=3;
            this.x[6].pid=3;
            this.x[7].pid=4;
            this.x[8].pid=4;
            this.x[9].pid=4; 
           
        console.log("api1",this.x);
        });
        localStorage.setItem('options', JSON.stringify(Options))
        localStorage.setItem('users', JSON.stringify(Users));
        localStorage.setItem('Groups', JSON.stringify(Groups));
        // localStorage.setItem('orgChart', JSON.stringify(OrgCharts));
        localStorage.setItem('addtogrp', JSON.stringify(AddToGroups));
        localStorage.setItem('TelericUsers', JSON.stringify(TelericUsersChart));
         return Observable.of("Data Initialized");

    }

    //Options
    getOptions(): Observable<Option[]> 
    {
        let data = JSON.parse(localStorage.getItem('options'));
        return Observable.of(data);
    }

    getOption(id): Observable<Option> {
        let data = JSON.parse(localStorage.getItem('options'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }

    updateOptions(option): Observable<boolean> 
    {
        let data = JSON.parse(localStorage.getItem('options'));
        for (let i = 0; i < data.length; i++) 
        {
            if (data[i].id == option.id) {
                data[i] = option;
                break;
            }
        }
        localStorage.setItem('options', JSON.stringify(data));
        return Observable.of(true);
    }


    getOptionTitle(id): string {
        debugger;
        let data = JSON.parse(localStorage.getItem('options'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i].name;
                break;
            }
        }
        return result;
    }

    getUsers(): Observable<User[]>{
        let data = JSON.parse(localStorage.getItem('users'));
        return Observable.of(data);
    }

    getUser(id): Observable<User> {
        let data = JSON.parse(localStorage.getItem('users'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }

    addUser(user): Observable<boolean> {
        let data = JSON.parse(localStorage.getItem('users'));
        let allIds = [];
        for (let i = 0; i < data.length; i++) {
            allIds.push(data[i].id);
        }
        let maxIDNumber = Math.max(...allIds);
      //  user.id = maxIDNumber + 1;
     user.id = maxIDNumber + 1;
        user.img = `https://randomuser.me/api/portraits/women/${maxIDNumber+1}.jpg`;
        data.push(user);
        this.notification.sendMessage('User added','success','top-right');
        localStorage.setItem('users', JSON.stringify(data));
        return Observable.of(true);
    }

    deleteUser(id): Observable<boolean> {
debugger        

        let data = JSON.parse(localStorage.getItem('users'));
        var result :any=[];
        var status;
           for (let i=0;i<data.length;i++)
           {
               if(data[i].id == id)
               {
                   result =data[i].id
                   break; 
               }
            }
               if(result || result == null)
               {
                let newData = data.filter((item) => {
                    return item.id != id;
                });
                   localStorage.setItem('users', JSON.stringify(newData));
                   status=true;
               }

    //        }
    //     let orgdata = this.x;
    //    // let orgdata = JSON.parse(localStorage.getItem('orgChart'));
    //     var allIds = _.map(orgdata, 'id');
    //     var result;
    //     var status = false;
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].id[0].id == id) {
    //             result = data[i];
    //             break;
    //         }
    //     }
    //     if (!allIds.includes(result.id)) {
    //         let newData = data.filter((item) => {
    //             return item.id != id;
    //         });
    //         debugger
    //         localStorage.setItem('users', JSON.stringify(newData));
            
    //         this.notification.sendMessage('user-deleted','success','top-right');
    //         status = true;

    //     } else {
    //         this.notification.sendMessage('User existed','danger','top-right');
    //         status = false;
    //     }
        
     return Observable.of(status);
       
    
    }
    updateUser(user): Observable<boolean> {
        let data = JSON.parse(localStorage.getItem('users'));
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == user.id) {
                data[i] = user;
                break;
            }
        }
        localStorage.setItem('users', JSON.stringify(data));
        this.notification.sendMessage('User updated','success','top-right');
        return Observable.of(true);
    }

    getGroups(): Observable<Group[]> {
        let data = JSON.parse(localStorage.getItem('Groups'));
        return Observable.of(data);
    }

    getGroup(id): Observable<Group> {
        let data = JSON.parse(localStorage.getItem('Groups'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }

    deleteGroup(id): Observable<boolean>  
    {
        // let data = JSON.parse(localStorage.getItem('Groups'));
        // var result :any=[];
        // var status;
        //    for (let i=0;i<data.length;i++)
        //    {
        //        if(data[i].id == id)
        //        {
        //            result =data[i].id
        //            break; 
        //        }
        //     }
        //        if(result)
        //        {
        //         let newData = data.filter((item) => {
        //             return item.id != id;
        //         });
        //            localStorage.setItem('users', JSON.stringify(newData));
        //            status=true;
        //        }
        debugger
        let data = JSON.parse(localStorage.getItem('Groups'));
        var result :any=[];
        var status;
           for (let i=0;i<data.length;i++)
           {
               if(data[i].id == id)
               {
                   result =data[i].id
                   break; 
               }
            }
               if(result || result == null)
               {
                let newData = data.filter((item) => {
                    return item.id != id;
                });
                   localStorage.setItem('Groups', JSON.stringify(newData));
                   status=true;
               }
        
        return Observable.of(status);
    }

    addSubGroup(group,subgrupid): Observable<boolean> 
    {
 debugger   
//------------------------------this data will save inside addgrp array---------------------------- //
       let addgrpdata = JSON.parse(localStorage.getItem('addtogrp'));
       let users = JSON.parse(localStorage.getItem('users'));
        var d;
        let allIds = [];
      // let alluserid = [];
       let  maxIDNumber 
       var id=[]
      
        
        if(addgrpdata.length>0)
        {
            for(let i = 0; i < addgrpdata.length; i++) 
            {
                 if(addgrpdata[i].id<999)
                 {

                  id[i]=addgrpdata[i].id;
                 // alert(id[i])
                  /// maxIDNumber = Math.max(...id)+1;
                   maxIDNumber=id[i]+1
                 }
            }
            debugger
            addgrpdata.id =maxIDNumber
        }
        else
        {
            addgrpdata.id =1;
        }
        debugger
            d={id:addgrpdata.id,img:"",name:group.name,pid:subgrupid,tags:group.name,title: ""};
             addgrpdata.push(d)
             localStorage.setItem('addtogrp', JSON.stringify(addgrpdata));
        

 //----------------------this data will save groups ----------------------------//           
             let data = JSON.parse(localStorage.getItem('Groups'));
            
              if(data.length>0)
            {
                for (let i = 0; i < data.length; i++) 
                {
                    allIds.push(data[i].id);
                }
                let maxIDNumber = Math.max(...allIds);
                group.id = maxIDNumber + 1;
            }
            else
            {
                group.id =1;
            }
         var temp= new groupinfo(); 
         temp.groupName=group.name;       
         group[group.name] = temp;    
         group[group.pid]=subgrupid;            
         data.push(group);          
         console.log(data)
         localStorage.setItem('Groups', JSON.stringify(data));
       
         return Observable.of(true);
    }



    addGroup(group): Observable<boolean> 
    {
 debugger   
//------------------------------this data will save inside addgrp array---------------------------- //
       let addgrpdata = JSON.parse(localStorage.getItem('addtogrp'));
       let users = JSON.parse(localStorage.getItem('users'));
        var d;
        let allIds = [];
      // let alluserid = [];
       let  maxIDNumber 
       
      var id=[];
        debugger
        if(addgrpdata.length>0)
        {
          for(let i = 0; i < addgrpdata.length; i++) 
            {
                 if(addgrpdata[i].id<999)
                 {
                   id[i]=addgrpdata[i].id;
                   maxIDNumber=id[i]+1;
                 //  maxIDNumber = Math.max(...id)+1;
                 }
            }
            debugger
            addgrpdata.id =maxIDNumber
            
 //  addgrpdata.id =addgrpdata.length+1;
        }
        else
        {
            addgrpdata.id =1;
        }
       
            d={id:addgrpdata.id,img:"",name:group.name,pid:0,tags:group.name,title: ""};
             addgrpdata.push(d)
             localStorage.setItem('addtogrp', JSON.stringify(addgrpdata));
        

 //----------------------this data will save groups ----------------------------//     
 debugger;
        
             let data = JSON.parse(localStorage.getItem('Groups'));
             console.log(data)
            
              if(data.length>0)
            {
                for (let i = 0; i < data.length; i++) 
                {
                    allIds.push(data[i].id);
                }
                let maxIDNumber = Math.max(...allIds);
                group.id = maxIDNumber + 1;
            }
            else
            {
                group.id =1;
            }
        var temp= new groupinfo(); 
       temp.groupName=group.name;       
         group[group.name] = temp;                
         data.push(group);          
         console.log(data)
    localStorage.setItem('Groups', JSON.stringify(data));
    
    this.notification.sendMessage('Group added','success','top-right');
         return Observable.of(true);
    }
    updateGroup(group): Observable<boolean> 
    {
        
        let data = JSON.parse(localStorage.getItem('Groups'));
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == group.id) {
                data[i] = group;
                break;
            }
        }
        localStorage.setItem('Groups', JSON.stringify(data));
        this.notification.sendMessage('group updated','success','top-right');
        return Observable.of(true);
    }

    getOrgChart(id): Observable<OrgChartM> {
        debugger
       // let data = JSON.parse(localStorage.getItem('orgChart'));
       let data = this.x;
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id[0].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }
    
    addToGroup(UserID,groupId): Observable<boolean> 
    {var userid:number=+UserID;
        userid=userid+1000;
     
     try
     {
        debugger
        let user = JSON.parse(localStorage.getItem('users'));
        let group = JSON.parse(localStorage.getItem('Groups'));
        var filteredUser;
        var filteredGroup;
        
        for (let i = 0; i < user.length; i++) 
        {
            // if (user[i].id == UserID) 
            // {
            //     filteredUser = user[i];
            //     break;
            // }
            if (user[i].id == userid) 
            {
                filteredUser = user[i];
                break;
            }
        }
        for (let i = 0; i < group.length; i++)
         {
            if (group[i].id == groupId) 
            {
                filteredGroup = group[i];
                break;
            }
        }
         
        let data = JSON.parse(localStorage.getItem('addtogrp'));
        let allIds = [];
        for (let i = 0; i < data.length; i++) 
        {
            allIds.push(data[i].id);
        }
      
       // ---------------user tittle is not given in user array so i jsut pass null it , if you changes in future user array than pass here tittle values 
     
       var d={id:filteredUser.id,pid:filteredGroup.id,tags:[filteredGroup.name],name:filteredUser.name,title:" ",img:filteredUser.img};
      var dataname,dataid;
    
      for (let i = 0; i < data.length; i++) 
       {  
       
        // if (data[i].id == UserID) 
        // {
          
        //     dataid=data[i].id; 
        //     dataname=data[i].tags;
        // }
        if (data[i].id == userid) 
        {
          
            dataid=data[i].id; 
            dataname=data[i].tags;
        }
      } 
     
    
       
    if(filteredGroup.isActive==true)
    {
      
            if(dataid==filteredUser.id  && dataname==filteredGroup.name)
            {
                return Observable.of(false);
            }
            else
            {
                data.push(d);
                localStorage.setItem('addtogrp', JSON.stringify(data));
                return Observable.of(true);
            }  
    }
    else
    {
        this.utilitySvc.showNotification('danger', 'Group is Inactive');
    }
     }
      catch(error)
     {
        return Observable.of(false);
     }
    }
    addToOrganization(userId, orgId, groupId): Observable<boolean> {
        
        debugger
                try {
            let user = JSON.parse(localStorage.getItem('users'));
            let group = JSON.parse(localStorage.getItem('Groups'));
            var filteredUser;
            var filteredGroup;
            for (let i = 0; i < user.length; i++) {
                if (user[i].id == userId) {
                    filteredUser = user[i];
                    break;
                }
            }
            for (let i = 0; i < group.length; i++) {
                if (group[i].id == groupId) {
                    filteredGroup = group[i];
                    break;
                }
            }
            let data = this.x;
           // let data = JSON.parse(localStorage.getItem('orgChart'));
            let allIds = [];
            for (let i = 0; i < data.length; i++) 
            {
                allIds.push(data[i].id);
            }
            let maxIDNumber = Math.max(...allIds);
            var d = { date: "", id: filteredUser.id, name: filteredUser.name, pid: parseInt(orgId), img: filteredUser.img, title: filteredGroup ? filteredGroup.name : '' };
            data.push(d);
            localStorage.setItem('orgChart', JSON.stringify(data));
            return Observable.of(true);
        } catch (ex) 
        {
            return Observable.of(false);
        } 
    }


    removeFromOrganization(id): Observable<boolean> {
        debugger
        let data = this.x;
      //let data = JSON.parse(localStorage.getItem('orgChart'));
        let newData = data.filter((item) => {
            return item.id != id;
        })
        localStorage.setItem('orgChart', JSON.stringify(newData));
        return Observable.of(true);
    }
    getUsersForOrganization(): Observable<User[]> {
        debugger
        let users = JSON.parse(localStorage.getItem('users'));
    let data = this.x;
//let data = JSON.parse(localStorage.getItem('orgChart'));
        let allUsersIds = _.map(users, 'id');
        let allOrgIds = _.map(data, 'id');
        let ids = allUsersIds.filter(e => !allOrgIds.includes(e));
        let result = users.filter(e => ids.includes(e.id));
       
        return Observable.of(result);
    }

    getOrganizationLevel(): Observable<number> {
        debugger
        let data = this.x;
       // let data = JSON.parse(localStorage.getItem('orgChart'));
        let allIds = _.map(data, 'pid');
        let uniqIds = Array.from(new Set(allIds));
        return Observable.of(uniqIds.length);
    }
   
       shoenotification(msg:any,theme:any,position:any)
       {
           this.notification.sendMessage(msg,theme,position)
       }
}
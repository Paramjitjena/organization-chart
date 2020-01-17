import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Component, ViewChild } from '@angular/core';
import {environment} from 'src/environments/environment'
import {TelericUsersChart} from "../services/Data/TelericUsersChart";
declare const kendo: any;
export class TelericServices
{
    public model:[];
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    serviceRoot=environment.serviceRoot;
    constructor(private router: Router, private http: HttpClient,)
    {}
     shapeOperations()
    {
        this.http.get('/api/Users/getUsers').subscribe((result)=>{
            console.log("data",result);
        })
       
      var shapesDataSourcessds = {
        batch: false,
        transport:
        {
            read: {
                url:this.serviceRoot+'/api/Users/getUsers',
                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                }
            }
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "Id", type: "number", editable: false },
                    JobTitle: { type: "string" },
                    Color: { type: "string" }
               //  Name: { type: "string" }
                }
            }
        }
       }
          return shapesDataSourcessds
     }
connectionsData()
{
    this.http.get('/api/Users/getConnections').subscribe((result)=>{
         
    })
    var connectionsDataSource = {
        batch: false,
        transport: {
            read: {
                url:this.serviceRoot+"/api/Users/getConnections",
                dataType: "json"
            },
        
            parameterMap: function (options, operation) {
                if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                }
            }
        },
        schema:
        {
            model: {
                id: "id",
                fields:
                 {
                    id: { from: "Id", type: "number", editable: false },
                    from: { from: "FromShapeId", type: "number" },
                    to: { from: "ToShapeId", type: "number" },
                    fromX: { from: "FromPointX", type: "number" },
                    fromY: { from: "FromPointY", type: "number" },
                    toX: { from: "ToPointX", type: "number" },
                    toY: { from: "ToPointY", type: "number" }
                }
            }
        }
    };
  return connectionsDataSource;
}
    
   public readchart():Observable<TelericUsersChart>
         {
           var  res;
       
          this.http.get(this.serviceRoot+'/api/Users/getConnections').subscribe((result)=>{
            res=Observable.of(<TelericServices[]>result);
    
         });
        return res
     
       }
    DeleteShap(id:any)
    {
             let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        console.log(id)
      //  return this.http.post("https://demos.telerik.com/kendo-ui/service/DiagramShapes/Destroy", { Id: id }, { headers });
    }
    UpdateShap(user)
    {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
      //  return this.http.post("/api/Groups/updateGroup", { GroupId: user.id, Name: group.name, IsActive: group.isActive }, { headers });
    }
    CreateShap(selectedUserId,AssignToUserId)
    {
 //  return this.http.post("/api/Groups/updateGroup", { GroupId: user.id, Name: group.name, IsActive: group.isActive }, { headers });
    }
}
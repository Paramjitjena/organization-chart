export class Group 
{
    public id: number;
    public name: string;
    public isActive: boolean;
    public img?: string;
    public pid:number=1;
    public groupinfo:groupinfo;
}
export class groupinfo
{
    public group:boolean=true;
    public groupName:string;
    public groupState:number=0;
    public template:string="group_orange";
}
export const Groups: Group[] = []

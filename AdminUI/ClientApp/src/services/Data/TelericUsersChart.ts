export class TelericUsersChart
{
"Id":number;
"JobTitle":string;
"Color": string;
"EntityState": number;
"EntityKey": keyInfo;
}
class keyInfo
{
    "EntitySetName":string;
    "EntityContainerName": string;
   "EntityKeyValues":EntityKeyValues[];
    "IsTemporary":string;
}
class EntityKeyValues
{
"key":string;
"value":number;
}

export const telericusers:TelericUsersChart[]=[]
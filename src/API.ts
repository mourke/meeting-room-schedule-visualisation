import { Client } from "@microsoft/microsoft-graph-client";
export {API}


namespace API {
    const ENDPOINT = "https://graph.microsoft.com/v1.0/me/calendars";

    /*
    * description: fetches the list of calendar names and their IDs
    * input: client object
    * output: two dimensional string array containing an array of names and an array of IDs
    * example output: [["name1", "name2", "name3"]["ID1", "ID2", "ID3"]]
    * */
    export function getListOfCalendarNamesAndIDs(client:any): string[][] {
        let calendars = client.api.get(ENDPOINT);

        let namesAndIDs:string[][] = [[],[]]
        for(let i=0; i<calendars.value.length; i++){
            let name:string = calendars.value[i].name;
            let id:string = calendars.value[i].id;
            namesAndIDs[0].push(name)
            namesAndIDs[1].push(id)
        }
        return namesAndIDs
    }

    /*
     * description: fetches the calendar with the specified ID
     * input: client object, id of calendar
     * output: Calendar object if fetch successful
     *         -1 if fetch not successful(no corresponding ID)
     * */
    export function getCalendar(client:any, id:string){
        let calendars = client.api.get(ENDPOINT);

        for(let i=0; i<calendars.value.length; i++){
            if(id == calendars.value[i].id){
                return calendars.value[i]
            }
        }
        return -1
    }

}
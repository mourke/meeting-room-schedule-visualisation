import { Client } from '@microsoft/microsoft-graph-client';
import { strict as assert } from 'assert';


export type Room = {
    name: string
    id: string
}

export namespace API {
    import DateTimeFormat = Intl.DateTimeFormat;
    let client: Client

    /*
    * description: fetches the list of calendar names and their IDs
    * input: -
    * output: array of the Room type
    * */
    export async function getListOfCalendarNamesAndIDs():Promise<Room[]> {
        assert(client, "Client must be initialised to call API methods.");
        const calendars = await client.api("/me/calendars").get()
        let rooms:Room[] = []
        for (let value of calendars.value) {
            rooms.push(value.name)
            rooms.push(value.id)
        }
        return rooms
    }

    /*
     * description: fetches the calendar with the specified ID or name
     * input: id OR name of calendar in string form
     * output: Calendar object if fetch successful
     *         Undefined if fetch not successful (no corresponding ID or name)
     * */
    export async function getCalendar(id:string):Promise<object | undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const calendar = await client.api("/me/calendars/" + id ).get()
        if(calendar.id == id){
            return calendar
        }
        return undefined
    }

    /*
    * description: fetches the meetings for a calender with a certain ID or name within a specified date range in a sorted manner
    * input: id OR name of calendar in string form
    *        startDateTime in string format "YYYY-MM-DDTHH:MM:SS" eg "2020-12-30T00:00:00"
    *        endDateTime in string format "YYYY-MM-DDTHH:MM:SS" eg "2020-12-30T023:59:59"
    * output: meetings object array if fetch successful (last element = most recent)
    *         undefined if fetch not successful
    * */
    export async function getMeetings(id:string, startDateTime:string, endDateTime:string):Promise<object[]|undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const meetings = await client.api("/me/calendars/" + id + "/calendarView?startDateTime= " + startDateTime + "&endDateTime= " + endDateTime + "&orderby=start/dateTime").get()
        if (meetings.hasOwnProperty("value")) {
            return meetings.value
        }
        return undefined
    }

    /*
    * description: fetches TODAYS meetings for a calender with a certain ID or name in a sorted manner
    * input: id OR name of calendar in string form
    * output: meetings object array if fetch successful (last element = most recent)
    *         undefined if fetch not successful
    * */
    export async function getMeetingsToday(id:string):Promise<object[]|undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const today = new Date();
        const startDateTime = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay() + "T00:00:00"
        const endDateTime = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay() + "T23:59:59"
        const calendarEvents = await client.api("/me/calendars/" + id + "/calendarView?startDateTime= " + startDateTime + "&endDateTime= " + endDateTime + "&orderby=start/dateTime").get()
        if (calendarEvents.hasOwnProperty("value")) {
            return calendarEvents.value
        }
        return undefined
    }


}
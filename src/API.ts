import { Client } from '@microsoft/microsoft-graph-client';
import { strict as assert } from 'assert';
import {Room} from './models/Room'


export namespace API {
    let client: Client = Client.initWithMiddleware({})

    /*
    * description: fetches the list of calendar names and their IDs
    * input: -
    * output: array of the Room type
    * */
    export async function getListOfCalendarNamesAndIDs(): Promise<Room[]> {
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
    export async function getCalendar(id: string): Promise<object | undefined> {
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
    *        startDate typescript Date object
    *        endDate typescript Date object
    * output: dictionary with dates and keys and arrays of meeting objects as values (first element = most recent)
    *         undefined if fetch not successful
    * */
    export async function getMeetings(id:string, startDate:Date, endDate:Date):Promise<{[key:string]: object[]}|undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const startDateTime:string = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDay() + "T" + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds()
        const endDateTime:string  = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDay() + "T" + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds()
        const meetings = await client.api("https://graph.microsoft.com/v1.0/me/calendars/" + id + "/calendarView?startDateTime= " + startDateTime + "&endDateTime= " + endDateTime + "&orderby=start/dateTime").get()
        if (meetings.hasOwnProperty("value")) {
            let dateMeetingDictionary: {[key:string]: object[]} = {}
            for (let meeting of meetings) {
                const meetingDate = meeting.start.dateTime.split("T").pop()
                if (!dateMeetingDictionary[meetingDate]) {
                    dateMeetingDictionary[meetingDate] = []
                }
                dateMeetingDictionary[meetingDate].push(meeting)
            }
            return dateMeetingDictionary
        }
        return undefined
    }

    /*
    * description: fetches TODAYS meetings for a calender with a certain ID or name in a sorted manner
    * input: id OR name of calendar in string form
    * output: array of meeting objects (first element = most recent)
    *         undefined if fetch not successful
    * */
    export async function getMeetingsToday(id:string):Promise<object[]|undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const today = new Date();
        const startDateTime = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay() + "T00:00:00"
        const endDateTime = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay() + "T23:59:59"
        const meetings = await client.api("/me/calendars/" + id + "/calendarView?startDateTime= " + startDateTime + "&endDateTime= " + endDateTime + "&orderby=start/dateTime").get()
        if (meetings.hasOwnProperty("value")) {
            return meetings
        }
        return undefined
    }


}
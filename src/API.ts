import { Client } from '@microsoft/microsoft-graph-client';
import { strict as assert } from 'assert';
import {Room} from './models/Room'
import {Person} from './models/Person'
import {Event as Meeting, Event, EventType} from './models/Event'


export module API {
    let client: Client

    /*
    * description: fetches the list of calendar names and their IDs
    * input: -
    * output: array of the Room type
    * */
    export async function getListOfCalendarNamesAndIDs():Promise<Room[]> {
        assert(client, "Client must be initialised to call API methods.");
        const calendars = await client.api("/me/calendars").get()
        const rooms:Room[] = []
        for (const value of calendars.value) {
            rooms.push({name: value.name, id: value.id})
        }
        return rooms
    }

    /*
     * description: fetches the calendar with the specified ID or name
     * input: id OR name of calendar in string form
     * output: Calendar object if fetch successful
     *         Undefined if fetch not successful (no corresponding ID or name)
     * */
    export async function getCalendar(id:string):Promise<object|undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const calendar = await client.api(`/me/calendars/${id}`).get()
        if (calendar.id === id) {
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
    export async function getMeetings(id: string, startDate: Date, endDate: Date): Promise<Record<string, Meeting[]> | undefined> {
        const testImageURL = new URL("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
        const today = new Date()
        const dateString = today.toDateString()
        const eightThirty = new Date(today)
        eightThirty.setHours(8, 30)
        const twelve = new Date(today)
        twelve.setHours(12, 0)
        const oneThirty = new Date(today)
        oneThirty.setHours(13, 30)
        const three = new Date(today)
        three.setHours(15, 6)
        return {
            [dateString]: [{
                name: "Kickoff Meeting",
                overview: "Sample meeting overview.",
                time: eightThirty,
                duration: 170,
                category: EventType.conference,
                attendees: [
                    {name: "John", image: testImageURL, email: "john@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"},
                    {name: "Mark", image: testImageURL, email: "mark@gmail.com"}]
            },
                {
                    name: "Planning",
                    overview: "Sample meeting overview.",
                    time: twelve,
                    duration: 60,
                    category: EventType.birthday,
                    attendees: [
                        {name: "John", image: testImageURL, email: "john@gmail.com"},
                        {name: "Mark", image: testImageURL, email: "mark@gmail.com"}]
                },
                {
                    name: "Design Review",
                    overview: "Sample meeting overview.",
                    time: oneThirty,
                    duration: 60,
                    category: EventType.call,
                    attendees: [
                        {name: "John", image: testImageURL, email: "john@gmail.com"},
                        {name: "Mark", image: testImageURL, email: "mark@gmail.com"}]
                },
                {
                    name: "Project Meeting",
                    overview: "Sample meeting overview.",
                    time: three,
                    duration: 46,
                    category: EventType.catchup,
                    attendees: [
                        {name: "John", image: testImageURL, email: "john@gmail.com"},
                        {name: "Mark", image: testImageURL, email: "mark@gmail.com"}]
                }]
        }
        // assert(client, "Client must be initialised to call API methods.")
        // const startDateTime = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDay()}T${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`
        // const endDateTime  = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDay()}T${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`
        // const meetings = await client.api(`me/calendars/${id}/calendarView?startDateTime=${startDateTime}&endDateTime=${endDateTime}&orderby=start/dateTime`).get()
        // if (meetings.hasOwnProperty("value")) {
        //     const dateMeetingDictionary: {[key:string]: object[]} = {}
        //     for (const meeting of meetings) {
        //         const meetingDate = meeting.start.dateTime.split("T").pop()
        //         if (!dateMeetingDictionary[meetingDate]) {
        //             dateMeetingDictionary[meetingDate] = []
        //         }
        //         dateMeetingDictionary[meetingDate].push(meeting)
        //     }
        //     return dateMeetingDictionary
        // }
        // return undefined
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
        const startDateTime = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}T00:00:00`
        const endDateTime = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}T23:59:59`
        const meetings = await client.api(`/me/calendars/${id}/calendarView?startDateTime=${startDateTime}&endDateTime=${endDateTime}&orderby=start/dateTime`).get()
        if (meetings.hasOwnProperty("value")) {
            return meetings
        }
        return undefined
    }

    /*
    * description: creates and adds events with given input parameters
    * input: id OR name of calendar(meeting room), name of meeting, category of meeting, start date of meeting, duration of meeting in minutes, location of meeting, description of meeting, attendees in meeting
    * output: meeting object if successful or undefined if not successful
    * */

    export async function addMeeting(id:string, name:string, category:EventType, date:Date, duration:number, location:string, description:string, attendees:Person[]):Promise<object|undefined>{
        /*assert(client, "Client must be initialised to call API methods.");
        const endDate = new Date(date.getTime() + duration*60000)
        const startDateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const endDateTime = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDay()}T${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`

        const meetingAttendees:{emailAddress: {address: string, name: string}, type: string}[] = []
        for (const attendee of attendees) {
            meetingAttendees.push({emailAddress: {address: attendee.email,name: attendee.name},type:"required"})
        }

        const event = {
            subject: name,
            body: {
                contentType: "text",
                content: description
            },
            categories: [category],
            start: {
                dateTime: startDateTime,
                timeZone: "IE"
            },
            end: {
                dateTime: endDateTime,
                timeZone: "IE"
            },
            location: {
                display: location
            },
            attendees: meetingAttendees
        }

        const response = await client.api(`/me/calendars/${id}/events`).post(event)
        //not sure about this part, will need access to api to test
        if (response.hasOwnProperty("error")) {
            return undefined
        }
        return response*/
        return {response:"response"}
    }



    /*
    * description: checks if meeting user wants to add clashes with another meeting
    * input: id OR name of calendar(meeting room), date of the start of meeting, duration of meeting in minutes
    * output: true if there is a meeting clash
    *         false if there is no meeting clash
    *         undefined if an error occured
    * */
    export async function checkForMeetingClash(id:string, date:Date, duration:number):Promise<Boolean|undefined>{
        assert(client, "Client must be initialised to call API methods.");
        /*const endDate = new Date(date.getTime() + duration*60000)
        const startDateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const endDateTime = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDay()}T${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`
        const meetings = await client.api(`me/calendars/${id}/calendarView?startDateTime=${startDateTime}&endDateTime=${endDateTime}&orderby=start/dateTime`).get()
        if (meetings.hasOwnProperty("value")) {
            return Object.keys(meetings.value).length === 0;
        }
        return undefined*/
        return false
    }



}
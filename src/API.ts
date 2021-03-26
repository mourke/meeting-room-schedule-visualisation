import { Client } from '@microsoft/microsoft-graph-client';
import { strict as assert } from 'assert';
import {Room} from './models/Room'


export namespace API {
    let client: Client

    /*
    * description: fetches the list of calendar names and their IDs
    * input: -
    * output: array of the Room type
    * */
    export async function getListOfCalendarNamesAndIDs(): Promise<Room[]> {
        assert(client, "Client must be initialised to call API methods.");
        const calendars = await client.api("/me/calendar").get()
        const rooms: Room[] = []
        for (const value of calendars.value) {
            rooms.push(value.name)
            rooms.push(value.id)
        }
        return rooms
    }

    /*
     * description: fetches the calendar with the specified ID
     * input: id of calendar in string form
     * output: Calendar object if fetch successful
     *         Undefined if fetch not successful (no corresponding ID)
     * */
    export async function getCalendar(id: string): Promise<object | undefined> {
        assert(client, "Client must be initialised to call API methods.");
        const calendars = await client.api("/me/calendar").get()
        for (const value of calendars.value) {
            if (id == value.id) {
                return value
            }
        }
        return undefined
    }

}
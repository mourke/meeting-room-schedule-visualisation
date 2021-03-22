import {API} from './API'
import {Room} from './models/Room'

/*
* Tests the getListOfCalendarNamesAndIDs function
* expects to return an array of the Room type */
test.skip("testGetListOfCalendarNamesAndIDs", () => {
    let rooms:Room[] = []
    API.getListOfCalendarNamesAndIDs().then((value) =>  {rooms = value})
    expect(rooms).toMatchObject([{name:String, id:String}])
})

/*
* Tests the getCalendar function
* depends on correctness of getListOfCalendarNamesAndIDs to get an id to pass in
* expects to return an object type matching the calendar type */
test.skip("getCalendar", () => {
    let rooms:Room[] = []
    API.getListOfCalendarNamesAndIDs().then((value) =>  {rooms = value})
    const idOfFirstRoom = rooms[0].id
    let calendar:object|undefined
    API.getCalendar(idOfFirstRoom).then((value) =>  {calendar = value})
    expect(calendar).toMatchObject({id: String, name:String, color:String, hexColor:String, isDefaultCalendar:Boolean, changeKey:String, canShare:Boolean, canViewPrivateItems: Boolean, canEdit:Boolean, allowedOnlineMeetingProviders:[String], defaultOnlineMeetingProvider:String, isTallyingResponses:Boolean, isRemovable:Boolean, owner: {name:String, address:String}})
})
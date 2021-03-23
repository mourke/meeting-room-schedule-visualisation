import {API, Room} from './API'

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
* expects to not return undefined */
test.skip("getCalendar", () => {
    let rooms:Room[] = []
    API.getListOfCalendarNamesAndIDs().then((value) =>  {rooms = value})
    const idOfFirstRoom = rooms[0].id
    let calendar:object|undefined
    API.getCalendar(idOfFirstRoom).then((value) =>  {calendar = value})
    expect(calendar).not.toMatchObject(typeof undefined)
})

/*
* Tests the getMeetings function
* depends on correctness of getListOfCalendarNamesAndIDs to get an id to pass in
* expects to not return undefined */
test.skip("getMeetings", () => {
    let rooms:Room[] = []
    API.getListOfCalendarNamesAndIDs().then((value) =>  {rooms = value})
    const idOfFirstRoom = rooms[0].id
    let events:object[]|undefined
    API.getMeetings(idOfFirstRoom, "2021-00-00T00:00:00", "2021-12-12T23:59:59").then((value) =>  {events = value})
    expect(events).not.toMatchObject(typeof undefined)
})

/*
* Tests the getMeetingsToday function
* depends on correctness of getListOfCalendarNamesAndIDs to get an id to pass in
* expects to not return undefined */
test.skip("getMeetingsToday", () => {
    let rooms:Room[] = []
    API.getListOfCalendarNamesAndIDs().then((value) =>  {rooms = value})
    const idOfFirstRoom = rooms[0].id
    let events:object[]|undefined
    API.getMeetingsToday(idOfFirstRoom).then((value) =>  {events = value})
    expect(events).not.toMatchObject(typeof undefined)
})
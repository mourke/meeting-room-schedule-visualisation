export {}
const APIFile = require("./API")
const APIFunctions = APIFile.API

/*
* Tests the getListOfCalendarNamesAndIDs function
* expects to return an array of the Room type */
test("testGetListOfCalendarNamesAndIDs", () => {
    expect(typeof APIFunctions.getListOfCalendarNamesAndIDs()).toMatchObject([APIFile.Room])
})

/*
* Tests the getCalendar function
* depends on correctness of getListOfCalendarNamesAndIDs to get an id to pass in
* expects to return an object type matching the calendar type */
test("getCalendar", () => {
    expect(typeof APIFunctions.getCalendar(APIFunctions.getListOfCalendarNamesAndIDs()[0].id)).toMatchObject({id: String, name:String, color:String, hexColor:String, isDefaultCalendar:Boolean, changeKey:String, canShare:Boolean, canViewPrivateItems: Boolean, canEdit:Boolean, allowedOnlineMeetingProviders:[String], defaultOnlineMeetingProvider:String, isTallyingResponses:Boolean, isRemovable:Boolean, owner: {name:String, address:String}})
})
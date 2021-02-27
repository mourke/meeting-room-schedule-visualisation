# [API DOC](https://docs.microsoft.com/en-us/graph/api/resources/calendar)

0. [Register application](https://apps.dev.microsoft.com/)
1. [Add API wrapper package](https://github.com/microsoftgraph/msgraph-sdk-javascript)

## Authentication

Authenticate at the start. Store JWT in secure browser storage.

https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize
https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token

https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols

## Fetch Calendars (Select room)

Instead of filtering or having a separate email per room, when the website is signed into, a screen will be presented to select room. 
This will be fetched from the `/me/calendars` endpoint and the name of the calendar will be taken as the room name. 
This calendar ID returned will then be used for all future requests.

https://docs.microsoft.com/en-us/graph/api/user-list-calendars?view=graph-rest-1.0

## Create Calendar (New room)

A room can be created if it doesn't exist. This is done by `POST`ing a name to `me/calendars`. The ID returned will be used for future requests.

https://docs.microsoft.com/en-us/graph/api/user-post-calendars?view=graph-rest-1.0


## Fetch Calendar Data

/me/calendarGroups/{id}/calendars/{id}/events

https://docs.microsoft.com/en-us/graph/api/calendar-list-events?view=graph-rest-1.0

// GET /me/calendarview?startDateTime=''&endDateTime=''
    // &$select=subject,organizer,start,end
    // &$orderby=start/dateTime
    // &$top=50
    
## Create New Event

`POST /me/calendars/{id}/events`

https://docs.microsoft.com/en-us/graph/api/calendar-post-events?view=graph-rest-1.0
    

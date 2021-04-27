import './MeetingsOverviewView.css'
import React from 'react'
import {API} from '../API'
import {Event as Meeting, EventType} from '../models/Event'
import Book from '../images/icons/Book.svg'
import Camera from '../images/icons/Camera.svg'
import Group from '../images/icons/Group.svg'
import Present from '../images/icons/Present.svg'

type MeetingsOverviewViewState = {
    loading: boolean
    error?: Error
    empty: boolean
}

type MeetingsOverviewViewProps = {
    dateRange: {startDate: Date, endDate: Date}
}

export default class MeetingsOverviewView extends React.Component<MeetingsOverviewViewProps, MeetingsOverviewViewState> {

    // A date string key and an array of event values
    private meetings: Record<string, Meeting[]>

    constructor(props: MeetingsOverviewViewProps) {
        super(props)

        this.meetings = {}
        this.state = {loading: false, error: undefined, empty: true}
    }

    async componentDidMount() {
        this.setState({loading: true})

        // Call API

        const result = await API.getMeetings("", this.props.dateRange.startDate, this.props.dateRange.endDate)

        if (result === undefined) {
            // handle error
            return
        }

        this.meetings = result as Record<string, Meeting[]>
        this.setState({loading: false, empty: Object.keys(this.meetings).length === 0, error: undefined})
    }

    errorView(error: Error) {
        return this.emptyView(error.name, error.message)
    }

    emptyView(title = "Looks like there's no meetings", message = "Have a day off!") {
        return (
            <div style={{height: "100%"}}>
                <div className={"meetings-overview-empty-view"}>
                    <h4 className={"meetings-overview-empty-view-header"}>{title}</h4>
                    <span className={"meetings-overview-empty-view-message"}>{message}</span>
                </div>
            </div>
        )
    }

    loadingView() {
        return (
            <div className={"meetings-overview-loading-view"}>
                <div className={"meetings-overview-loading-view-spinner"}>
                </div>
            </div>
        )
    }

    static meetingStringFromMeeting(meeting: Meeting) {
        const start = meeting.time
        const minutesInMilliseconds = 60000
        const end = new Date(start.getTime() + meeting.duration*minutesInMilliseconds)
        const options: Intl.DateTimeFormatOptions = {hour12: false, hour: "2-digit", minute: "2-digit"}

        return `${start.toLocaleTimeString("default", options)} - ${end.toLocaleTimeString("default", options)}`
    }

    imageForMeetingCategory(category: EventType) {
        switch (category) {
            case EventType.conference:
                return Group
            case EventType.birthday:
                return Present
            case EventType.call:
                return Camera
            case EventType.catchup:
                return Book
        }
    }

    cssFilterForMeetingCategory(category: EventType) {
        // colours generated from https://codepen.io/sosuke/pen/Pjoqqp using code from https://stackoverflow.com/a/43960991/604861
        // we could alternatively just put the function here but the code would have to be torn apart to return exactly what we want
        switch (category) {
            case EventType.conference:
                return "invert(62%) sepia(8%) saturate(7333%) hue-rotate(215deg) brightness(104%) contrast(101%)"
            case EventType.birthday:
                return "invert(49%) sepia(78%) saturate(2895%) hue-rotate(338deg) brightness(106%) contrast(101%)"
            case EventType.call:
                return "invert(61%) sepia(84%) saturate(6031%) hue-rotate(184deg) brightness(93%) contrast(102%)"
            case EventType.catchup:
                return "invert(47%) sepia(86%) saturate(2495%) hue-rotate(145deg) brightness(93%) contrast(101%)"
        }
    }

    listView() {
        return (
            <ul className={"meetings-overview-meetings"}>
                {Object.entries(this.meetings).map(([dateString, meetings]) =>
                    (
                        <React.Fragment>
                            <h6 className={"meetings-overview-header-text"}>{new Date(dateString).toLocaleDateString("default", {weekday: "long", month: "long", day: "numeric"})}</h6>
                            {meetings.map((meeting, index) =>
                                (
                                    <li>
                                        <div className={"meetings-overview-meeting-color-tab"}
                                             style={{backgroundColor: meeting.category}}/>
                                        <div className={"meetings-overview-meeting-text"}>
                                            <h6>{meeting.name}</h6>
                                            <span>{MeetingsOverviewView.meetingStringFromMeeting(meeting)}</span>
                                            <div className={"meetings-overview-meeting-icon"}
                                                 style={{backgroundColor: `${meeting.category}59`}}> {/* 59 is alpha 0.35*/}
                                                <img src={this.imageForMeetingCategory(meeting.category)}
                                                     style={{filter: this.cssFilterForMeetingCategory(meeting.category)}}
                                                     alt={""}/>
                                            </div>
                                        </div>
                                        <ul className={"meetings-overview-meeting-attendees"}>
                                            {meeting.attendees.flatMap((person, index) => {
                                                if (person.image === undefined || index > 5) { // only have a max of 6 images
                                                    return []
                                                }
                                                return [(
                                                    <li>
                                                        <img src={person.image.toString()}
                                                             alt={`${person.name}'s avatar`}/>
                                                    </li>
                                                )]
                                            })}
                                        </ul>
                                    </li>
                                ))}
                        </React.Fragment>
                    ))}
            </ul>
        )
    }
    
    render() {
        let body: JSX.Element

        if (this.state.loading) {
            body = this.loadingView()
        } else if (this.state.empty) {
            body = this.emptyView()
        } else if (this.state.error != null) {
            body = this.errorView(this.state.error)
        } else {
            body = this.listView()
        }
        
        return (
            <div className={"meetings-overview-scroll-container scroll-container-hidden-bars"}>
                <h5 className={"meetings-overview-heading"}>Meetings</h5>
                {body}
            </div>
        )
    }
}
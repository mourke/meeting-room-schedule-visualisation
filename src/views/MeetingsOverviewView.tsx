import './MeetingsOverviewView.css'
import React from 'react'
//import API from '../API'
import {Event as Meeting} from '../models/Event'

type MeetingsOverviewViewState = {
    loading: boolean
    error?: Error
    empty: boolean
}

type MeetingsOverviewViewProps = {
    dateRange: {startDate: Date, endDate: Date}
}

export default class MeetingsOverviewView extends React.Component<MeetingsOverviewViewProps, MeetingsOverviewViewState> {

    private meetings: Meeting[]

    constructor(props: MeetingsOverviewViewProps) {
        super(props);

        this.meetings = []
        this.state = {loading: false, error: undefined, empty: true}
    }

    componentDidMount() {
        this.setState({loading: true})

        // Call API

        this.setState({loading: false, empty: this.meetings.length === 0, error: undefined})
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

    listView() {
        return (
            <ol>
                {this.meetings.map((meeting) => {
                    return (
                        <li>
                            <div className={"meetings-overview-meeting-color-tab"}/>
                            <h6 className={"meetings-overview-meeting-title"}>{meeting.name}</h6>
                            <span className={"meetings-overview-meeting-time"}>{meeting.time}</span>
                            <img src={""}/>
                            <ul>
                                {meeting.attendees.map((person) => {
                                    return (
                                        <li>
                                            <img src={person.image.toString()}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ol>
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
            <div className={"meetings-overview-scroll-container"}>
                <h5 className={"meetings-overview-heading"}>Meetings</h5>
                {body}
            </div>
        );
    }
}
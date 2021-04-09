import './CalendarView.css'
import React from 'react'
import RightChevron from '../images/icons/Right Chevron.svg'
import {Col, Container, Row} from 'react-bootstrap'
import {Event as Meeting} from '../models/Event'
import {API} from '../API'
import MeetingsOverviewView from "./MeetingsOverviewView"

type CalendarViewState = {
    loading: boolean
    currentWeek: Date
    now: Date
    meetings: Record<string, Meeting[]>
}

type CalendarViewProps = {
}

export default class CalendarView extends React.Component<CalendarViewProps, CalendarViewState> {

    private readonly DAYS_IN_A_WEEK = 7
    private readonly HOURS_IN_A_DAY = 24

    private readonly CELL_HEIGHT = 80

    constructor(props: CalendarViewProps) {
        super(props)

        this.state = {loading: false, currentWeek: new Date(), now: new Date(), meetings: {}}
        this.nextWeek = this.nextWeek.bind(this)
        this.previousWeek = this.previousWeek.bind(this)

        const minuteInMilliseconds = 60 * 1000
        setInterval(() => this.setState({now: new Date()}), minuteInMilliseconds)
    }

    async componentDidMount() {
        await this.loadFromAPI() // trigger initial load
    }

    async componentDidUpdate(prevProps: Readonly<CalendarViewProps>, prevState: Readonly<CalendarViewState>, snapshot?: any) {
        if (prevState.loading !== this.state.loading) {
            return // stop recursive calling
        }

        // this will be called when week is changed and when now is updated (every minute)
        await this.loadFromAPI()
    }

    async loadFromAPI() {
        this.setState({loading: true})

        const firstDay = this.firstDayOfWeek(this.state.currentWeek)
        const lastDay = new Date(firstDay)
        lastDay.setDate(firstDay.getDate() + this.DAYS_IN_A_WEEK - 1)
        const result = await API.getMeetings("", firstDay, lastDay)

        if (result === undefined) {
            // handle error
            return
        }

        const meetings = result as Record<string, Meeting[]>

        this.setState({meetings, loading: false})
    }

    firstDayOfWeek(date: Date) {
        const startOfWeek = date.getDate() - date.getDay() // First day is the day of the month - the day of the week
        const firstDay = new Date(date)
        firstDay.setDate(startOfWeek)
        return firstDay
    }

    weekString(date: Date) {
        const firstDay = this.firstDayOfWeek(date)
        const lastDay = new Date(firstDay)
        lastDay.setDate(firstDay.getDate() + this.DAYS_IN_A_WEEK - 1)
        const month = lastDay.toLocaleString('default', { month: 'long' }) // use the month of the last date in case we have changed month

        return `${firstDay.getDate()} - ${lastDay.getDate()} ${month}`
    }

    previousWeek() {
        const currentWeek = this.state.currentWeek
        const lastWeek = new Date(currentWeek)
        lastWeek.setDate(currentWeek.getDate() - this.DAYS_IN_A_WEEK)
        this.setState({currentWeek: lastWeek})
    }

    nextWeek() {
        const currentWeek = this.state.currentWeek
        const nextWeek = new Date(currentWeek)
        nextWeek.setDate(currentWeek.getDate() + this.DAYS_IN_A_WEEK)
        this.setState({currentWeek: nextWeek})
    }

    datesAreSameDay(lhs: Date, rhs: Date) {
        return lhs.getDate() === rhs.getDate() &&
               lhs.getFullYear() === rhs.getFullYear() &&
               lhs.getMonth() === rhs.getMonth()
    }

    meetingDurationToHeight(duration: number) {
        const heightPerMinute = this.CELL_HEIGHT/60 // 60 minutes in an hour
        return duration * heightPerMinute
    }

    meetingTimeToYOffset(time: Date) {
        return ((this.CELL_HEIGHT/60) * time.getMinutes()) + this.CELL_HEIGHT * time.getHours()
    }

    currentTimeIndicator() {
        const offset = this.meetingTimeToYOffset(this.state.now)
        return (
            <React.Fragment>
                <div className={"calendar-view-calendar-time-now-ball"} style={{top: offset}}/>
                <div className={"calendar-view-calendar-time-now-bar"} style={{top: offset}}/>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div style={{marginTop: "30px", paddingLeft: "25px", borderBottom: "1px solid lightgray"}}>
                    <div className={"calendar-view-stepper-control"}>
                        <button onClick={this.previousWeek} type={"button"} className={"btn btn-light"}>
                            <img className={"calendar-view-stepper-control-left-image"} src={RightChevron} alt={"Go back a week"}/>
                        </button>
                        <div className={"calendar-view-stepper-control-separator"}/>
                        <button onClick={this.nextWeek} type={"button"} className={"btn btn-light"}>
                            <img src={RightChevron} alt={"Go forward a week"}/>
                        </button>
                    </div>
                    <h5 className={"calendar-view-current-week"}>{this.weekString(this.state.currentWeek)}</h5>
                </div>
                <Container className={"calendar-view"}>
                    <Row className={"calendar-view-header"}>
                        {
                            [...Array(this.DAYS_IN_A_WEEK)].map((value, index) => {
                                const firstDay = this.firstDayOfWeek(this.state.currentWeek)
                                const day = new Date(firstDay)
                                day.setDate(firstDay.getDate() + index)
                                const dayName = day.toLocaleString('default', { weekday: 'short' })
                                const isCurrentDay = this.datesAreSameDay(day, this.state.now)

                                return (
                                    <Col className={`calendar-view-header-weekday ${isCurrentDay ? "calendar-view-header-current-weekday" : "" }`}>
                                        <h6>{dayName}</h6>
                                        <h5>{day.getDate()}</h5>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Row className={"calendar-view-calendar scroll-container-hidden-bars"}>
                        <div className={"calendar-view-calendar-times"}>
                            {
                                [...Array(this.HOURS_IN_A_DAY)].map((value, index) => {
                                    const time = new Date(this.state.now)
                                    time.setHours(index)
                                    return (
                                        <div className={"calendar-view-calendar-time"} style={{height: this.CELL_HEIGHT}}>
                                            <span>{time.toLocaleTimeString("default", {hour12: true, hour: "numeric"})}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Row noGutters={true} style={{flex: 1, marginLeft: "-10px"}}>
                            <div className={"calendar-view-horizontal-separators"}>
                                {
                                    [...Array(this.HOURS_IN_A_DAY)].map((value, index) => <div
                                        className={"calendar-view-horizontal-separator"} style={{height: this.CELL_HEIGHT}}/>)
                                }
                            </div>
                            {
                                [...Array(this.DAYS_IN_A_WEEK)].map((value, column) => {
                                    const firstDay = this.firstDayOfWeek(this.state.currentWeek)
                                    const currentDay = new Date(firstDay)
                                    currentDay.setDate(firstDay.getDate() + column)
                                    return (
                                        <Col className={"calendar-view-calendar-days"}>
                                            {
                                                [...Array(this.HOURS_IN_A_DAY)].map((value, row) => <div
                                                    style={{height: this.CELL_HEIGHT}}/>)
                                            }
                                            {
                                                Object.entries(this.state.meetings).filter((value) => {
                                                    const dateString = value[0]
                                                    const day = new Date(dateString)
                                                    return this.datesAreSameDay(day, currentDay)
                                                })[0]?.flatMap((value) => (typeof value === "string") ? [] : (value as Meeting[])).map((meeting) => (
                                                    <div className={"calendar-view-calendar-meeting"} style={
                                                        {
                                                            backgroundColor: `${meeting.category}CC`, // CC is the HEX code for 80% transparency
                                                            top: this.meetingTimeToYOffset(meeting.time),
                                                            height: this.meetingDurationToHeight(meeting.duration)
                                                        }
                                                    }>
                                                        <p className={"calendar-view-calendar-meeting-name"}>{meeting.name}</p>
                                                        <p className={"calendar-view-calendar-meeting-time"}>{MeetingsOverviewView.meetingStringFromMeeting(meeting)}</p>
                                                    </div>
                                                ))
                                            }
                                            {
                                                this.datesAreSameDay(this.state.now, currentDay) ? this.currentTimeIndicator() : undefined
                                            }
                                        </Col>
                                    )})
                            }
                        </Row>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
import './CalendarView.css'
import React from 'react'
import RightChevron from '../images/icons/Right Chevron.svg'
import {Col, Container, Row} from "react-bootstrap"

type CalendarViewState = {
    loading: boolean
    now: Date
}

type CalendarViewProps = {
}

export default class CalendarView extends React.Component<CalendarViewProps, CalendarViewState> {

    private readonly DAYS_IN_A_WEEK = 7
    private readonly HOURS_IN_A_DAY = 24

    constructor(props: CalendarViewProps) {
        super(props)

        this.state = {loading: false, now: new Date()}
        this.nextWeek = this.nextWeek.bind(this)
        this.previousWeek = this.previousWeek.bind(this)
    }

    firstDayOfWeek(date: Date) {
        const startOfWeek = date.getDate() - date.getDay() // First day is the day of the month - the day of the week
        return new Date(date.setDate(startOfWeek))
    }

    weekString(date: Date) {
        const firstDay = this.firstDayOfWeek(date)
        const lastDay = new Date(date.setDate(firstDay.getDate() + this.DAYS_IN_A_WEEK - 1))
        const month = lastDay.toLocaleString('default', { month: 'long' }) // use the month of the last date in case we have changed month

        return `${firstDay.getDate()} - ${lastDay.getDate()} ${month}`
    }

    previousWeek() {
        const currentDate = this.state.now
        currentDate.setDate(currentDate.getDate() - this.DAYS_IN_A_WEEK)
        this.setState({now: currentDate})
    }

    nextWeek() {
        const currentDate = this.state.now
        currentDate.setDate(currentDate.getDate() + this.DAYS_IN_A_WEEK)
        this.setState({now: currentDate})
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
                    <h5 className={"calendar-view-current-week"}>{this.weekString(this.state.now)}</h5>
                </div>
                <Container className={"calendar-view"}>
                    <Row className={"calendar-view-header"}>
                        {
                            [...Array(this.DAYS_IN_A_WEEK)].map((value, index) => {
                                const firstDay = this.firstDayOfWeek(this.state.now)
                                const day = new Date(firstDay.setDate(firstDay.getDate() + index))
                                const dayName = day.toLocaleString('default', { weekday: 'short' })
                                const isCurrentDay = day.getDate() === this.state.now.getDate()

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
                                    const time = new Date(this.state.now.setHours(index))
                                    return (
                                        <div className={"calendar-view-calendar-time"}>
                                            <span>{time.toLocaleTimeString("default", {hour12: true, hour: "numeric"})}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Row noGutters={true} style={{flex: 1, marginLeft: "-10px"}}>
                            <div className={"calendar-view-horizontal-separators"}>
                                {
                                    [...Array(this.HOURS_IN_A_DAY)].map((value, index) => {
                                        return <div className={"calendar-view-horizontal-separator"}/>
                                    })
                                }
                            </div>
                            {
                                [...Array(this.DAYS_IN_A_WEEK)].map((value, column) => {
                                    return (
                                        <Col className={"calendar-view-calendar-days"}>
                                            {
                                                [...Array(this.HOURS_IN_A_DAY)].map((value, row) => {
                                                    return (
                                                        <div className={"calendar-view-calendar-hours"}>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
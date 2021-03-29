import './CalendarView.css'
import React from 'react'
import RightChevron from '../images/icons/Right Chevron.svg'

type CalendarViewState = {
    loading: boolean
    now: Date
}

type CalendarViewProps = {
}

export default class CalendarView extends React.Component<CalendarViewProps, CalendarViewState> {

    constructor(props: CalendarViewProps) {
        super(props)

        this.state = {loading: false, now: new Date()}
        this.nextWeek = this.nextWeek.bind(this)
        this.previousWeek = this.previousWeek.bind(this)
    }

    weekString(date: Date) {
        const startOfWeek = date.getDate() - date.getDay() // First day is the day of the month - the day of the week

        const firstDay = new Date(date.setDate(startOfWeek))
        const lastDay = new Date(date.setDate(firstDay.getDate() + 6))
        const month = lastDay.toLocaleString('default', { month: 'long' }) // use the month of the last date in case we have changed month

        return `${firstDay.getDate()} - ${lastDay.getDate()} ${month}`
    }

    previousWeek() {
        const currentDate = this.state.now
        currentDate.setDate(currentDate.getDate() - 7)
        this.setState({now: currentDate})
    }

    nextWeek() {
        const currentDate = this.state.now
        currentDate.setDate(currentDate.getDate() + 7)
        this.setState({now: currentDate})
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}
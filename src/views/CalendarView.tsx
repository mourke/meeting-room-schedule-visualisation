import './CalendarView.css';
import React from 'react';

type CalendarViewState = {
    loading: boolean
}

type CalendarViewProps = {
}

export default class CalendarView extends React.Component<CalendarViewProps, CalendarViewState> {

    render() {
        return <div>Calendar view</div>;
    }
}
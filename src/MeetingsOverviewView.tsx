import './MeetingsOverviewView.css';
import React from 'react';

type MeetingsOverviewViewState = {
    loading: boolean
}

type MeetingsOverviewViewProps = {
    meetings: object
}

export default class MeetingsOverviewView extends React.Component<MeetingsOverviewViewProps, MeetingsOverviewViewState> {

    render() {
        return <div>Overview view</div>;
    }
}
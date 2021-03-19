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
        return (
            <div>
                <h5>Meetings</h5>
            </div>
        );
    }
}
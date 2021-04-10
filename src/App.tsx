import React from 'react';
import SidebarSplitViewController from './views/SidebarSplitViewController'
import LoginView from './views/LoginView'
import MeetingsOverviewView from './views/MeetingsOverviewView'
import CalendarView from './views/CalendarView'
import SettingsView from './views/SettingsView'
import AddMeetingView from './views/addMeetingView'
import calendar from './images/icons/Calendar.svg'
import settings from './images/icons/Settings.svg'
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import {
    usePopupState,
    bindTrigger,
    bindPopover,
} from 'material-ui-popup-state/hooks'
import Popover from '@material-ui/core/Popover'
import {Event as Meeting} from "./models/Event";


// export const APP_COLOR = "#6a53e4";

function App() {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })
    if (isSignedIn()) {
        let meetings:Record<string, Meeting[]>
        const mainView = <CalendarView/>
        const detailView = <MeetingsOverviewView dateRange={{startDate: new Date(), endDate: new Date()}}/>
        const mainPage = {mainView, detailView, icon:calendar}
        const settingsView = <SettingsView />
        const settingsPage = {mainView: settingsView, icon:settings}
        const addMeetingView = <AddMeetingView popupState={popupState}/>
        return (
            <React.Fragment>
                <SidebarSplitViewController pages={[mainPage, settingsPage]}/>
                <Fab color="primary" aria-label="add">
                    <Add {...bindTrigger(popupState)}/>
                </Fab>
                <Popover style={{height:"1000px"}}
                         {...bindPopover(popupState)}
                         anchorOrigin={{
                             vertical: "top",
                             horizontal: "center",
                         }}
                         transformOrigin={{
                             vertical: "bottom",
                             horizontal: "center",
                         }}
                >
                    {addMeetingView}
                </Popover>
            </React.Fragment>

        )
    } else {
        return <LoginView />;
    }
}

function isSignedIn() {
    return true; // TODO: Implement this to read from browser storage
}

export default App;

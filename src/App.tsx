import React from 'react';
import SidebarSplitViewController from './views/SidebarSplitViewController'
import LoginView from './views/LoginView'
import MeetingsOverviewView from './views/MeetingsOverviewView'
import CalendarView from './views/CalendarView'
import SettingsView from './views/SettingsView'
import calendar from './images/icons/Calendar.svg'
import settings from './images/icons/Settings.svg'
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

// export const APP_COLOR = "#6a53e4";

function App() {
  if (isSignedIn()) {
    const mainView = <CalendarView/>
    const detailView = <MeetingsOverviewView dateRange={{startDate: new Date(), endDate: new Date()}}/>
    const mainPage = {mainView, detailView, icon:calendar}
    const settingsView = <SettingsView />
    const settingsPage = {mainView: settingsView, icon:settings}
    return (
        <React.Fragment>
          <SidebarSplitViewController pages={[mainPage, settingsPage]}/>
          <Fab color="primary" aria-label="add">
            <Add />
          </Fab>
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

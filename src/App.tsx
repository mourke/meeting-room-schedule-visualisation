import React from 'react';
import SidebarSplitViewController from './SidebarSplitViewController'
import LoginView from "./LoginView";
import MeetingsOverviewView from "./MeetingsOverviewView";
import CalendarView from "./CalendarView";
import calendar from './images/icons/Calendar.svg'
import settings from './images/icons/Settings.svg'

// export const APP_COLOR = "#6a53e4";

function App() {
  if (isSignedIn()) {
    const meetings: any[] = []; // TODO: fetch from API
    const mainView = <CalendarView meetings={meetings}/>;
    const detailView = <MeetingsOverviewView meetings={meetings}/>;
    const mainPage = {mainView, detailView, icon:calendar};
    const settingsPage = {mainView, detailView, icon:settings}
    return <SidebarSplitViewController  pages={[mainPage, settingsPage]}/>;
  } else {
    return <LoginView />;
  }
}

function isSignedIn() {
  return false; // TODO: Implement this to read from browser storage
}

export default App;

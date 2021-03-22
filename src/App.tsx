import React from 'react';
import SidebarSplitViewController from './views/SidebarSplitViewController'
import LoginView from "./views/LoginView";
import MeetingsOverviewView from "./views/MeetingsOverviewView";
import CalendarView from "./views/CalendarView";
import calendar from './images/icons/Calendar.svg'
import settings from './images/icons/Settings.svg'

// export const APP_COLOR = "#6a53e4";

function App() {
  if (isSignedIn()) {
    const mainView = <CalendarView/>;
    const detailView = <MeetingsOverviewView dateRange={{startDate: new Date(), endDate: new Date()}}/>;
    const mainPage = {mainView, detailView, icon:calendar};
    const settingsPage = {mainView, detailView, icon:settings}
    return <SidebarSplitViewController  pages={[mainPage, settingsPage]}/>;
  } else {
    return <LoginView />;
  }
}

function isSignedIn() {
  return true; // TODO: Implement this to read from browser storage
}

export default App;

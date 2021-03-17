import React from 'react';
import SidebarSplitViewController from './SidebarSplitViewController'
import LoginView from "./LoginView";
import MeetingsOverviewView from "./MeetingsOverviewView";
import CalendarView from "./CalendarView";
import calendar from './icons/Calendar.svg'
import settings from './icons/Settings.svg'

export const APP_COLOR = "#6a53e4";

function App() {
  if (isSignedIn()) {
    let meetings: any[] = []; // TODO: fetch from API
    const mainView = <CalendarView meetings={meetings}/>;
    const detailView = <MeetingsOverviewView meetings={meetings}/>;
    const mainPage = {mainView:mainView, detailView:detailView, icon:calendar};
    const settingsPage = {mainView:mainView, detailView: detailView, icon:settings}
    return <SidebarSplitViewController  pages={[mainPage, settingsPage]}/>;
  } else {
    return <LoginView />;
  }
}

function isSignedIn() {
  return true; // TODO: Implement this to read from browser storage
}

export default App;

import React from 'react';
import SidebarSplitViewController from './SidebarSplitViewController'
import LoginView from "./LoginView";
import MeetingsOverviewView from "./MeetingsOverviewView";
import CalendarView from "./CalendarView";
import calendar from './icons/Calendar.svg'

export const APP_COLOR = "#6a53e4";

function App() {
  if (isSignedIn()) {
    let meetings: any[] = []; // TODO: fetch from API
    const mainView = <CalendarView meetings={meetings}/>;
    const detailView = <MeetingsOverviewView meetings={meetings}/>;
    const page = {mainView:mainView, detailView:detailView, icon:calendar};
    return <SidebarSplitViewController  pages={[page]}/>;
  } else {
    return <LoginView />;
  }
}

function isSignedIn() {
  return true; // TODO: Implement this to read from browser storage
}

export default App;

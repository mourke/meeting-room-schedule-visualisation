import React from 'react';
import SidebarSplitViewController from './SidebarSplitViewController'
import LoginView from "./LoginView";
import MeetingsOverviewView from "./MeetingsOverviewView";
import CalendarView from "./CalendarView";

function App() {
  if (isSignedIn()) {
    let meetings: any[] = []; // TODO: fetch from API
    let mainView = <CalendarView meetings={meetings}/>;
    let detailView = <MeetingsOverviewView meetings={meetings}/>;
    let icon = ''; // TODO: add icon asset
    let page = {mainView:mainView, detailView:detailView, icon:icon};
    return <SidebarSplitViewController  pages={[page]}/>;
  } else {
    return <LoginView />;
  }
}

function isSignedIn() {
  return true; // TODO: Implement this to read from browser storage
}

export default App;

(this["webpackJsonpmeeting-room-schedule-visualisation"]=this["webpackJsonpmeeting-room-schedule-visualisation"]||[]).push([[0],{44:function(e,t,a){},46:function(e,t,a){},48:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n,r,i=a(0),c=a.n(i),s=a(16),o=a.n(s),l=a(9),u=a(10),m=a(12),d=a(11),g=(a(44),a(80)),h=a(81),v=a(82),j=a.p+"static/media/Active indicator.a5368acb.svg",b=a(1),p=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={index:0},n}return Object(u.a)(a,[{key:"currentPage",value:function(){return this.props.pages[this.state.index]}},{key:"activityIndicatorForIndex",value:function(e){return this.state.index===e?Object(b.jsx)("img",{className:"toolbar-active-indicator",src:j,alt:"Active"}):void 0}},{key:"changeTab",value:function(e){this.setState({index:e})}},{key:"sidebar",value:function(){var e=this;return Object(b.jsxs)("div",{className:"toolbar",children:[Object(b.jsx)("div",{}),Object(b.jsx)("div",{className:"toolbar-items-section",children:this.props.pages.map((function(t,a){return Object(b.jsxs)("div",{className:"toolbar-item",children:[e.activityIndicatorForIndex(a),Object(b.jsx)("img",{onClick:function(){return e.changeTab(a)},style:{opacity:e.state.index===a?"100%":"40%"},className:"toolbar-item-img",src:t.icon,alt:"Toolbar item ".concat(a)})]})}))})]})}},{key:"render",value:function(){var e;return e=void 0!==this.currentPage().detailView?Object(b.jsx)(g.a,{className:"splitview-detail-column",xs:3,children:this.currentPage().detailView}):void 0,Object(b.jsx)(h.a,{fluid:!0,style:{height:"100vh"},children:Object(b.jsxs)(v.a,{style:{height:"100%"},children:[this.sidebar(),Object(b.jsx)(g.a,{style:{padding:0,height:"100%",display:"flex",flexDirection:"column"},children:this.currentPage().mainView}),e]})})}}]),a}(c.a.Component),f=a(15),y=(a(46),c.a.Component,a(37)),w=a(4),O=a.n(w),x=a(7),k=(a(48),a(31)),D=a(30),N=a(27);!function(e){e.call="#0085e3",e.birthday="#ff623b",e.catchup="#00a89d",e.conference="#b891ff"}(n||(n={})),function(e){var t;function a(){return(a=Object(x.a)(O.a.mark((function e(){var a,n,r,i,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(N.strict)(t,"Client must be initialised to call API methods."),e.next=3,t.api("/me/calendars").get();case 3:a=e.sent,n=[],r=Object(D.a)(a.value);try{for(r.s();!(i=r.n()).done;)c=i.value,n.push({name:c.name,id:c.id})}catch(s){r.e(s)}finally{r.f()}return e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function r(){return(r=Object(x.a)(O.a.mark((function e(a){var n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(N.strict)(t,"Client must be initialised to call API methods."),e.next=3,t.api("/me/calendars/".concat(a)).get();case 3:if((n=e.sent).id!==a){e.next=6;break}return e.abrupt("return",n);case 6:return e.abrupt("return",void 0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function i(){return(i=Object(x.a)(O.a.mark((function e(t,a,r){var i,c,s,o,l,u,m;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=new URL("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"),c=new Date,s=c.toDateString(),(o=new Date(c)).setHours(8,30),(l=new Date(c)).setHours(12,0),(u=new Date(c)).setHours(13,30),(m=new Date(c)).setHours(15,6),e.abrupt("return",Object(k.a)({},s,[{name:"Kickoff Meeting",overview:"Sample meeting overview.",time:o,duration:170,category:n.conference,attendees:[{name:"John",image:i,email:"john@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"}]},{name:"Planning",overview:"Sample meeting overview.",time:l,duration:60,category:n.birthday,attendees:[{name:"John",image:i,email:"john@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"}]},{name:"Design Review",overview:"Sample meeting overview.",time:u,duration:60,category:n.call,attendees:[{name:"John",image:i,email:"john@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"}]},{name:"Project Meeting",overview:"Sample meeting overview.",time:m,duration:46,category:n.catchup,attendees:[{name:"John",image:i,email:"john@gmail.com"},{name:"Mark",image:i,email:"mark@gmail.com"}]}]));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function c(){return(c=Object(x.a)(O.a.mark((function e(a){var n,r,i,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(N.strict)(t,"Client must be initialised to call API methods."),n=new Date,r="".concat(n.getFullYear(),"-").concat(n.getMonth(),"-").concat(n.getDay(),"T00:00:00"),i="".concat(n.getFullYear(),"-").concat(n.getMonth(),"-").concat(n.getDay(),"T23:59:59"),e.next=6,t.api("/me/calendars/".concat(a,"/calendarView?startDateTime=").concat(r,"&endDateTime=").concat(i,"&orderby=start/dateTime")).get();case 6:if(!(c=e.sent).hasOwnProperty("value")){e.next=9;break}return e.abrupt("return",c);case 9:return e.abrupt("return",void 0);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function s(){return(s=Object(x.a)(O.a.mark((function e(a,n,r,i,c,s,o,l){var u,m,d,g,h,v,j,b,p;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(N.strict)(t,"Client must be initialised to call API methods."),u=new Date(i.getTime()+6e4*c),m="".concat(i.getFullYear(),"-").concat(i.getMonth(),"-").concat(i.getDay(),"T").concat(i.getHours(),":").concat(i.getMinutes(),":").concat(i.getSeconds()),d="".concat(u.getFullYear(),"-").concat(u.getMonth(),"-").concat(u.getDay(),"T").concat(u.getHours(),":").concat(u.getMinutes(),":").concat(u.getSeconds()),g=[],h=Object(D.a)(l);try{for(h.s();!(v=h.n()).done;)j=v.value,g.push({emailAddress:{address:j.email,name:j.name},type:"required"})}catch(f){h.e(f)}finally{h.f()}return b={subject:n,body:{contentType:"text",content:o},categories:[r],start:{dateTime:m,timeZone:"IE"},end:{dateTime:d,timeZone:"IE"},location:{display:s},attendees:g},e.next=10,t.api("/me/calendars/".concat(a,"/events")).post(b);case 10:if(!(p=e.sent).hasOwnProperty("error")){e.next=13;break}return e.abrupt("return",void 0);case 13:return e.abrupt("return",p);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.getListOfCalendarNamesAndIDs=function(){return a.apply(this,arguments)},e.getCalendar=function(e){return r.apply(this,arguments)},e.getMeetings=function(e,t,a){return i.apply(this,arguments)},e.getMeetingsToday=function(e){return c.apply(this,arguments)},e.addMeeting=function(e,t,a,n,r,i,c,o){return s.apply(this,arguments)}}(r||(r={}));var S=a.p+"static/media/Book.500a8c14.svg",_=a.p+"static/media/Camera.9f633ba0.svg",A=a.p+"static/media/Group.ab6a2326.svg",M=a.p+"static/media/Present.ed74593a.svg",T=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).meetings=void 0,n.meetings={},n.state={loading:!1,error:void 0,empty:!0},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(x.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({loading:!0}),e.next=3,r.getMeetings("",this.props.dateRange.startDate,this.props.dateRange.endDate);case 3:if(void 0!==(t=e.sent)){e.next=6;break}return e.abrupt("return");case 6:this.meetings=t,this.setState({loading:!1,empty:0===Object.keys(this.meetings).length,error:void 0});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"errorView",value:function(e){return this.emptyView(e.name,e.message)}},{key:"emptyView",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Looks like there's no meetings",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Have a day off!";return Object(b.jsx)("div",{style:{height:"100%"},children:Object(b.jsxs)("div",{className:"meetings-overview-empty-view",children:[Object(b.jsx)("h4",{className:"meetings-overview-empty-view-header",children:e}),Object(b.jsx)("span",{className:"meetings-overview-empty-view-message",children:t})]})})}},{key:"loadingView",value:function(){return Object(b.jsx)("div",{className:"meetings-overview-loading-view",children:Object(b.jsx)("div",{className:"meetings-overview-loading-view-spinner"})})}},{key:"imageForMeetingCategory",value:function(e){switch(e){case n.conference:return A;case n.birthday:return M;case n.call:return _;case n.catchup:return S}}},{key:"cssFilterForMeetingCategory",value:function(e){switch(e){case n.conference:return"invert(62%) sepia(8%) saturate(7333%) hue-rotate(215deg) brightness(104%) contrast(101%)";case n.birthday:return"invert(49%) sepia(78%) saturate(2895%) hue-rotate(338deg) brightness(106%) contrast(101%)";case n.call:return"invert(61%) sepia(84%) saturate(6031%) hue-rotate(184deg) brightness(93%) contrast(102%)";case n.catchup:return"invert(47%) sepia(86%) saturate(2495%) hue-rotate(145deg) brightness(93%) contrast(101%)"}}},{key:"listView",value:function(){var e=this;return Object(b.jsx)("ul",{className:"meetings-overview-meetings",children:Object.entries(this.meetings).map((function(t){var n=Object(y.a)(t,2),r=n[0],i=n[1];return Object(b.jsxs)(c.a.Fragment,{children:[Object(b.jsx)("h6",{className:"meetings-overview-header-text",children:new Date(r).toLocaleDateString("default",{weekday:"long",month:"long",day:"numeric"})}),i.map((function(t,n){return Object(b.jsxs)("li",{children:[Object(b.jsx)("div",{className:"meetings-overview-meeting-color-tab",style:{backgroundColor:t.category}}),Object(b.jsxs)("div",{className:"meetings-overview-meeting-text",children:[Object(b.jsx)("h6",{children:t.name}),Object(b.jsx)("span",{children:a.meetingStringFromMeeting(t)}),Object(b.jsxs)("div",{className:"meetings-overview-meeting-icon",style:{backgroundColor:"".concat(t.category,"59")},children:[" ",Object(b.jsx)("img",{src:e.imageForMeetingCategory(t.category),style:{filter:e.cssFilterForMeetingCategory(t.category)},alt:""})]})]}),Object(b.jsx)("ul",{className:"meetings-overview-meeting-attendees",children:t.attendees.flatMap((function(e,t){return void 0===e.image||t>5?[]:[Object(b.jsx)("li",{children:Object(b.jsx)("img",{src:e.image.toString(),alt:"".concat(e.name,"'s avatar")})})]}))})]})}))]})}))})}},{key:"render",value:function(){var e;return e=this.state.loading?this.loadingView():this.state.empty?this.emptyView():null!=this.state.error?this.errorView(this.state.error):this.listView(),Object(b.jsxs)("div",{className:"meetings-overview-scroll-container scroll-container-hidden-bars",children:[Object(b.jsx)("h5",{className:"meetings-overview-heading",children:"Meetings"}),e]})}}],[{key:"meetingStringFromMeeting",value:function(e){var t=e.time,a=new Date(t.getTime()+6e4*e.duration),n={hour12:!1,hour:"2-digit",minute:"2-digit"};return"".concat(t.toLocaleTimeString("default",n)," - ").concat(a.toLocaleTimeString("default",n))}}]),a}(c.a.Component),I=a(21),C=(a(54),a.p+"static/media/Right Chevron.4e4a1046.svg"),E=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(l.a)(this,a),(n=t.call(this,e)).DAYS_IN_A_WEEK=7,n.HOURS_IN_A_DAY=24,n.CELL_HEIGHT=80,n.state={loading:!1,currentWeek:new Date,now:new Date,meetings:{}},n.nextWeek=n.nextWeek.bind(Object(f.a)(n)),n.previousWeek=n.previousWeek.bind(Object(f.a)(n));return setInterval((function(){return n.setState({now:new Date})}),6e4),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(x.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadFromAPI();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(x.a)(O.a.mark((function e(t,a,n){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.loading===this.state.loading){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.loadFromAPI();case 4:case"end":return e.stop()}}),e,this)})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"loadFromAPI",value:function(){var e=Object(x.a)(O.a.mark((function e(){var t,a,n,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({loading:!0}),t=this.firstDayOfWeek(this.state.currentWeek),(a=new Date(t)).setDate(t.getDate()+this.DAYS_IN_A_WEEK-1),e.next=6,r.getMeetings("",t,a);case 6:if(void 0!==(n=e.sent)){e.next=9;break}return e.abrupt("return");case 9:i=n,this.setState({meetings:i,loading:!1});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"firstDayOfWeek",value:function(e){var t=e.getDate()-e.getDay(),a=new Date(e);return a.setDate(t),a}},{key:"weekString",value:function(e){var t=this.firstDayOfWeek(e),a=new Date(t);a.setDate(t.getDate()+this.DAYS_IN_A_WEEK-1);var n=a.toLocaleString("default",{month:"long"});return"".concat(t.getDate()," - ").concat(a.getDate()," ").concat(n)}},{key:"previousWeek",value:function(){var e=this.state.currentWeek,t=new Date(e);t.setDate(e.getDate()-this.DAYS_IN_A_WEEK),this.setState({currentWeek:t})}},{key:"nextWeek",value:function(){var e=this.state.currentWeek,t=new Date(e);t.setDate(e.getDate()+this.DAYS_IN_A_WEEK),this.setState({currentWeek:t})}},{key:"datesAreSameDay",value:function(e,t){return e.getDate()===t.getDate()&&e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()}},{key:"meetingDurationToHeight",value:function(e){return e*(this.CELL_HEIGHT/60)}},{key:"meetingTimeToYOffset",value:function(e){return this.CELL_HEIGHT/60*e.getMinutes()+this.CELL_HEIGHT*e.getHours()}},{key:"currentTimeIndicator",value:function(){var e=this.meetingTimeToYOffset(this.state.now);return Object(b.jsxs)(c.a.Fragment,{children:[Object(b.jsx)("div",{className:"calendar-view-calendar-time-now-ball",style:{top:e}}),Object(b.jsx)("div",{className:"calendar-view-calendar-time-now-bar",style:{top:e}})]})}},{key:"render",value:function(){var e=this;return Object(b.jsxs)(c.a.Fragment,{children:[Object(b.jsxs)("div",{style:{marginTop:"30px",paddingLeft:"25px",borderBottom:"1px solid lightgray"},children:[Object(b.jsxs)("div",{className:"calendar-view-stepper-control",children:[Object(b.jsx)("button",{onClick:this.previousWeek,type:"button",className:"btn btn-light",children:Object(b.jsx)("img",{className:"calendar-view-stepper-control-left-image",src:C,alt:"Go back a week"})}),Object(b.jsx)("div",{className:"calendar-view-stepper-control-separator"}),Object(b.jsx)("button",{onClick:this.nextWeek,type:"button",className:"btn btn-light",children:Object(b.jsx)("img",{src:C,alt:"Go forward a week"})})]}),Object(b.jsx)("h5",{className:"calendar-view-current-week",children:this.weekString(this.state.currentWeek)})]}),Object(b.jsxs)(h.a,{className:"calendar-view",children:[Object(b.jsx)(v.a,{className:"calendar-view-header",children:Object(I.a)(Array(this.DAYS_IN_A_WEEK)).map((function(t,a){var n=e.firstDayOfWeek(e.state.currentWeek),r=new Date(n);r.setDate(n.getDate()+a);var i=r.toLocaleString("default",{weekday:"short"}),c=e.datesAreSameDay(r,e.state.now);return Object(b.jsxs)(g.a,{className:"calendar-view-header-weekday ".concat(c?"calendar-view-header-current-weekday":""),children:[Object(b.jsx)("h6",{children:i}),Object(b.jsx)("h5",{children:r.getDate()})]})}))}),Object(b.jsxs)(v.a,{className:"calendar-view-calendar scroll-container-hidden-bars",children:[Object(b.jsx)("div",{className:"calendar-view-calendar-times",children:Object(I.a)(Array(this.HOURS_IN_A_DAY)).map((function(t,a){var n=new Date(e.state.now);return n.setHours(a),Object(b.jsx)("div",{className:"calendar-view-calendar-time",style:{height:e.CELL_HEIGHT},children:Object(b.jsx)("span",{children:n.toLocaleTimeString("default",{hour12:!0,hour:"numeric"})})})}))}),Object(b.jsxs)(v.a,{noGutters:!0,style:{flex:1,marginLeft:"-10px"},children:[Object(b.jsx)("div",{className:"calendar-view-horizontal-separators",children:Object(I.a)(Array(this.HOURS_IN_A_DAY)).map((function(t,a){return Object(b.jsx)("div",{className:"calendar-view-horizontal-separator",style:{height:e.CELL_HEIGHT}})}))}),Object(I.a)(Array(this.DAYS_IN_A_WEEK)).map((function(t,a){var n,r=e.firstDayOfWeek(e.state.currentWeek),i=new Date(r);return i.setDate(r.getDate()+a),Object(b.jsxs)(g.a,{className:"calendar-view-calendar-days",children:[Object(I.a)(Array(e.HOURS_IN_A_DAY)).map((function(t,a){return Object(b.jsx)("div",{style:{height:e.CELL_HEIGHT}})})),null===(n=Object.entries(e.state.meetings).filter((function(t){var a=t[0],n=new Date(a);return e.datesAreSameDay(n,i)}))[0])||void 0===n?void 0:n.flatMap((function(e){return"string"===typeof e?[]:e})).map((function(t){return Object(b.jsxs)("div",{className:"calendar-view-calendar-meeting",style:{backgroundColor:"".concat(t.category,"CC"),top:e.meetingTimeToYOffset(t.time),height:e.meetingDurationToHeight(t.duration)},children:[Object(b.jsx)("p",{className:"calendar-view-calendar-meeting-name",children:t.name}),Object(b.jsx)("p",{className:"calendar-view-calendar-meeting-time",children:T.meetingStringFromMeeting(t)})]})})),e.datesAreSameDay(e.state.now,i)?e.currentTimeIndicator():void 0]})}))]})]})]})]})}}]),a}(c.a.Component),H=(a(55),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return Object(b.jsx)("div",{children:"Settings view"})}}]),a}(c.a.Component)),W=a.p+"static/media/Calendar.bb613596.svg",F=a.p+"static/media/Settings.2cbb9c21.svg",L=a(83),Y=a(84);var P=function(){var e={mainView:Object(b.jsx)(E,{}),detailView:Object(b.jsx)(T,{dateRange:{startDate:new Date,endDate:new Date}}),icon:W},t={mainView:Object(b.jsx)(H,{}),icon:F};return Object(b.jsxs)(c.a.Fragment,{children:[Object(b.jsx)(p,{pages:[e,t]}),Object(b.jsx)(L.a,{color:"primary","aria-label":"add",children:Object(b.jsx)(Y.a,{})})]})},V=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,85)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))};a(60),a(61);o.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(P,{})}),document.getElementById("root")),V()}},[[62,1,2]]]);
//# sourceMappingURL=main.9a991dc1.chunk.js.map
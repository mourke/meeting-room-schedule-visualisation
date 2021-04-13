import React from 'react'
import {EventType} from '../models/Event'
import {Person} from '../models/Person'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateFnsUtils from '@date-io/date-fns'
import {Divider, List, ListItem, ListItemText} from '@material-ui/core'
import {PopupState} from 'material-ui-popup-state/hooks'
import {API} from '../API'

type AddMeetingViewProps = {
    popupState:PopupState
}
type AddMeetingViewState = {
    name:string,
    description:string,
    location:string,
    date:Date,
    currentDateTimeString:string,
    meetingType:EventType,
    durationString: string,
    duration:number,
    attendees:Person[],
    attendeeName:string,
    attendeeEmail:string,
    addAttendeePopoverOpen:boolean,
}

export default class AddMeetingView extends React.Component<AddMeetingViewProps, AddMeetingViewState>
{
    constructor(props:AddMeetingViewProps) {
        super(props);
        const today = new Date()
        this.state = {
            name: "",
            description: "",
            location: "",
            date: new Date(),
            currentDateTimeString: `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}T${today.getHours()}:${today.getMinutes()}`,
            meetingType: EventType.conference,
            durationString: "60",
            duration: 60,
            attendees: [/*{name: "John", email: "John@gmail.com"}, {name: "Danny", email: "Danny@gmail.com"}*/],
            attendeeName: "",
            attendeeEmail: "",
            addAttendeePopoverOpen: false,
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleButtonsToggled = this.handleButtonsToggled.bind(this)
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
        this.handleDurationChange = this.handleDurationChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleAttendeeNameChange = this.handleAttendeeNameChange.bind(this)
        this.handleAttendeeEmailChange = this.handleAttendeeEmailChange.bind(this)
        this.handleAddAttende = this.handleAddAttende.bind(this)
        this.submit = this.submit.bind(this)
    }

    renderAttendees(){
        const testImageURL = new URL("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
        return this.state.attendees.map(attendee => {
            return <ListItem divider>
                <img src={testImageURL.toString()} style={{width: '25px', height: '25px', borderRadius: '50%'}}/>
                <ListItemText primary={`${attendee.name}   ${attendee.email}`} />
            </ListItem>
        })
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({name: event.target.value})
    }

    handleButtonsToggled(event:React.MouseEvent<HTMLElement, MouseEvent>, value:any){
        if(String(value) === "Conference"){
            this.setState({meetingType: EventType.conference})
        }else if(String(value) === "Call"){
            this.setState({meetingType: EventType.call})
        }else if(String(value) === "Birthday"){
            this.setState({meetingType: EventType.birthday})
        }else if(String(value) === "Catchup"){
            this.setState({meetingType: EventType.catchup})
        }
    }

    handleDateTimeChange(date:MaterialUiPickersDate){
        if(date != null){
            const newDate = new Date()
            newDate.setFullYear(date.getFullYear())
            newDate.setMonth(date.getMonth())
            newDate.setDate(date.getDay())
            newDate.setHours(date.getHours())
            newDate.setMinutes(date.getMinutes())
            newDate.setSeconds(date.getSeconds())
            this.setState({date: newDate})
        }
    }

    handleDurationChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.value === "" || event.target.value === " "){
            this.setState({durationString: event.target.value})
            this.setState({duration: 0})
        }
        if(typeof Number(event.target.value) === "number"){
            if(Number(event.target.value) > 0 && Number(event.target.value)<=3600) {
                this.setState({durationString: event.target.value})
                this.setState({duration: Number(event.target.value)})
            }
        }
    }

    handleLocationChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({location: event.target.value})
    }

    handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({description: event.target.value})
    }

    handleAttendeeNameChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({attendeeName: event.target.value})
    }

    handleAttendeeEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({attendeeEmail: event.target.value})
    }

    handleAddAttende() {
        const attendee: Person = {name: this.state.attendeeName, email: this.state.attendeeEmail}
        const attendees: Person[] = this.state.attendees
        if (attendee.name!=="" && attendee.email!==""){
            attendees.push(attendee)
            this.setState({attendeeName: ""})
            this.setState({attendeeEmail: ""})
            this.setState({attendees: attendees})
        }
    }

    submit(){
        this.props.popupState.close()
        //TODO: Call API
        if(!API.checkForMeetingClash("", this.state.date, this.state.duration)) {
            API.addMeeting("", this.state.name, this.state.meetingType, this.state.date, this.state.duration, this.state.location, this.state.description, this.state.attendees)
        }

    }

    render() {

        return(
            <div className="AddMeetingView" style={{
                width: '350px',
                height: '700px;'
            }}>
                <header className="AddMeetingView-Header">

                    <TextField style={{marginLeft:"10px", marginRight:"10px", width:"330px"}} variant="outlined"  margin="normal" id="Meeting Name" label="Meeting Name" name="Meeting Name" autoFocus value={this.state.name} onChange={this.handleNameChange} />

                    <ToggleButtonGroup style={{marginLeft:"10px", marginRight:"10px", width:"330px"}} value={this.state.meetingType}  exclusive id="Meeting Type" size="small" orientation="horizontal" onChange={this.handleButtonsToggled}>
                        <ToggleButton style={this.state.meetingType===EventType.conference ? {backgroundColor:EventType.conference, color:"white"} : {}} value="Conference">
                            💬 conference
                        </ToggleButton>
                        <Divider></Divider>
                        <ToggleButton style={this.state.meetingType===EventType.call ? {backgroundColor:EventType.call, color:"white"} : {}} value="Call">
                            📞 Call
                        </ToggleButton>
                        <ToggleButton style={this.state.meetingType===EventType.birthday ? {backgroundColor:EventType.birthday, color:"white"} : {}} value="Birthday">
                            🎁 birthday
                        </ToggleButton>
                        <ToggleButton style={this.state.meetingType===EventType.catchup ? {backgroundColor:EventType.catchup, color:"white"} : {}} value="Catchup">
                            ❐ catchup
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                        <DateTimePicker style={{marginTop:"12px", width:"150px", marginLeft:"10px", marginRight:"30px"}} label="Meeting Time"  value={this.state.date} onChange={this.handleDateTimeChange} />
                    </MuiPickersUtilsProvider>

                    <TextField variant="outlined" style={{width: '145px', marginTop:"20px"}} type="number" margin="dense" id="Duration" label="Duration" name="Duration" autoFocus value={this.state.durationString} onChange={this.handleDurationChange}InputProps={{
                        endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                    }} />

                    <TextField style={{marginLeft:"10px", marginRight:"10px", width:"330px", }} variant="outlined" fullWidth color="primary" margin="normal" id="Add Location" label="📍 Add Location" name="Add Location" autoFocus value={this.state.location} onChange={this.handleLocationChange}/>

                    <TextField style={{marginLeft:"10px", marginRight:"10px", width:"330px"}} color="primary" variant="outlined" fullWidth margin="normal" id="Add Description" label="☰ Add Description" name="Add Description" autoFocus value={this.state.description} onChange={this.handleDescriptionChange}/>

                    <h6 style={{marginLeft:"10px", marginRight:"10px", width:"330px"}}>Attendees:</h6>


                    <List component="nav" style={{maxHeight:"80px", overflow:"auto"}}>
                        {this.renderAttendees()}
                    </List>

                    <TextField style={{width: "128px", height:"50px", marginLeft:"10px"}} color="primary" variant="outlined" margin="normal" id="Attendee Name" label="Attendee Name" name="Attendee Name" autoFocus value={this.state.attendeeName} onChange={this.handleAttendeeNameChange}/>
                    <TextField style={{width: "128px", height:"50px", marginLeft:"5px"}} color="primary" variant="outlined" margin="normal" id="Attendee Email" label="Attendee Email" name="Attendee Email" autoFocus value={this.state.attendeeEmail} onChange={this.handleAttendeeEmailChange}/>
                    <Button style={{backgroundColor: "#6a53e4", height:"56px", marginTop:"16px", marginLeft:"5px"}} className={"AddMeetingView-Header-addAttendee-Button"} type="submit" color="primary"  variant="contained" onClick={this.handleAddAttende}>
                        Add
                    </Button>

                    <Button style={{backgroundColor: "#6a53e4", marginTop:"20px", marginBottom:"10px", marginLeft:"10px", marginRight:"10px", width:"330px"}} className={"AddMeetingView-Header-Submit-Button"} type="submit" color="primary" variant="contained" onClick={this.submit}>
                        Create meeting
                    </Button>
                </header>
            </div>
        )
    }
}
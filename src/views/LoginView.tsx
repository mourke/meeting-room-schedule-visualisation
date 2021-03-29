import './LoginView.css'
import React from 'react'

type LoginViewState = {
    login: boolean
    error?: Error
    roomSelection: boolean
}

type LoginViewProps = {
}

export default class LoginView extends React.Component<LoginViewProps, LoginViewState> {

    constructor(props: LoginViewProps) {
        super(props)

        this.loginButtonClicked = this.loginButtonClicked.bind(this)
    }

    loginButtonClicked() {
        console.log("Button clicked") // TODO: Call API
    }

    render() {
        return (
            <div className={"login-background"}>
                <div className={"login-popover"}>
                    <div style={{width: "76%", margin: "0 auto", textAlign: "center"}}>
                        <h3 className={"login-header-text"}>Sign in to Microsoft Account</h3>
                        <p className={"login-information-text"}>Connect your Microsoft account to sync, edit and add calendar data</p>
                        <button onClick={this.loginButtonClicked} className={"btn login-button"}>Sign in with Outlook</button>
                    </div>
                    <span className={"login-copyright-text"}>Copyright © TCD SWENG 2021 Group 3</span>
                </div>
            </div>
        )
    }
}

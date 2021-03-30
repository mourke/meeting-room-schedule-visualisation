import './SidebarSplitViewController.css'
import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import activeIndicator from '../images/icons/Active indicator.svg'

type SidebarSplitViewControllerState = {
    index: number
}

type SidebarSplitViewControllerChildren = {
    mainView: React.ComponentElement<any, any>
    detailView?: React.ComponentElement<any, any>
    icon: string
}

type SidebarSplitViewControllerProps = {
    pages: SidebarSplitViewControllerChildren[]
}

export default class SidebarSplitViewController extends React.Component<SidebarSplitViewControllerProps, SidebarSplitViewControllerState> {

    constructor(props: SidebarSplitViewControllerProps) {
        super(props)

        this.state = {index: 0}
    }

    currentPage() {
        return this.props.pages[this.state.index]
    }

    activityIndicatorForIndex(index: number) {
        if (this.state.index === index) {
            return <img className="toolbar-active-indicator" src={activeIndicator} alt={"Active"}/>
        } else {
            return undefined
        }
    }

    changeTab(index: number) {
        this.setState({index})
    }

    sidebar() {
        return (
            <div className="toolbar">
                <div>

                </div>
                <div className="toolbar-items-section">
                    {
                        this.props.pages.map((value, index) => {
                            return (
                                <div className={"toolbar-item"}>
                                    {this.activityIndicatorForIndex(index)}
                                    <img onClick={() => this.changeTab(index)} style={{opacity: this.state.index === index ? "100%" : "40%"}} className="toolbar-item-img" src={value.icon} alt={`Toolbar item ${index}`}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        let detail: JSX.Element | undefined

        if (this.currentPage().detailView !== undefined) {
            detail = <Col className="splitview-detail-column" xs={3}>{this.currentPage().detailView}</Col>
        } else {
            detail = undefined
        }

        return (
            <Container fluid style={{height: "100vh"}}>
                <Row style={{height: "100%"}}>
                    {this.sidebar()}
                    <Col style={{padding: 0, height: "100%", display: "flex", flexDirection: "column"}}>
                        {this.currentPage().mainView}
                    </Col>
                    {detail}
                </Row>
            </Container>
        )
    }
}
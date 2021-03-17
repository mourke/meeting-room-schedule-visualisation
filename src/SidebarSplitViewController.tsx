import './SidebarSplitViewController.css';
import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import activeIndicator from './icons/Active indicator.svg'

type SidebarSplitViewControllerState = {
    index: number
}

type SidebarSplitViewControllerChildren = {
    mainView: React.ComponentElement<any, any>
    detailView: React.ComponentElement<any, any>
    icon: string
}

type SidebarSplitViewControllerProps = {
    pages: SidebarSplitViewControllerChildren[]
}

export default class SidebarSplitViewController extends React.Component<SidebarSplitViewControllerProps, SidebarSplitViewControllerState> {

    constructor(props: SidebarSplitViewControllerProps) {
        super(props);

        this.state = {index: 0};
    }

    currentPage() {
        return this.props.pages[this.state.index]
    }

    activityIndicatorForIndex(index: number) {
        if (this.state.index == index) {
            return <img className="toolbar-active-indicator" src={activeIndicator} alt={"Active"}/>;
        } else {
            return undefined;
        }
    }

    changeTab(index: number) {
        this.setState({index: index});
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
                                    <img onClick={() => this.changeTab(index)} style={{opacity: this.state.index == index ? "100%" : "40%"}} className="toolbar-item-img" src={value.icon}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    {this.sidebar()}
                    <Col>{this.currentPage().mainView}</Col>
                    <Col className="splitview-detail-column" xs={4}>{this.currentPage().detailView}</Col>
                </Row>
            </Container>
        )
    }
}
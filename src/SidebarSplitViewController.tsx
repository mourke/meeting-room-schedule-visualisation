import './SidebarSplitViewController.css';
import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

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

        this.state = {
            index: 0
        }
    }

    sidebar() {
        return undefined;
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={1}>{this.sidebar()}</Col>
                    <Col>{this.props.pages[this.state.index].mainView}</Col>
                    <Col xs={4}>{this.props.pages[this.state.index].detailView}</Col>
                </Row>
            </Container>
        )
    }
}
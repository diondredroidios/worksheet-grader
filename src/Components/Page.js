import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import GradingForm from './GradingForm';

export default class Page extends Component {
    render() {
        return (
            <div>
                {/* Menu */}
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Worksheet Grader</Navbar.Brand>
                    </Container>
                </Navbar>

                {/* Page content */}
                <Container>
                    <GradingForm />
                </Container>
            </div>
        )
    }
}

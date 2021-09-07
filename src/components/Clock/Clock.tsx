import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component<{}, { date: Date }> {

    timer: any;

    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date()
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.tick()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    clickHandler() {
    
    }

    render() {
        return (
            <div className="clock-container">
                <h5>It is {this.state.date.toLocaleTimeString()}.</h5>
            </div>
        );
    }
}

export default Clock;
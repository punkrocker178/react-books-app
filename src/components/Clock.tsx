import React, { Component } from 'react';


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
            <div>
                <h4>It is {this.state.date.toLocaleTimeString()}.</h4>
            </div>
        );
    }
}

export default Clock;
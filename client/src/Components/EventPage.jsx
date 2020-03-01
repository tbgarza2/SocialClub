import React, { Component } from 'react';
import axios from 'axios'


class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData: [],
          }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `api/db/events/${this.props.eventID}`,
          })
          .then( res => this.setState({eventData: res.data[0]}) )
    }

    render() {

        return (
            <div>
                <p>{this.state.eventData.name}</p>
            </div>
        )
    }
}
export default EventPage;
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import 'react-dropdown/style.css';
import Select from 'react-select';
import { addEvent } from '../actions/events';
import { get_available_slots } from '../helpers/slots';
class EventInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      slotOptions: [],
      eventName: '',
      eventType: '',
      date: '',
      start: '',
      end: ''
    };
  }
  componentDidMount() {
    this.getOptions();
  }
  async getOptions() {
    let data = [
      'Bootcamp',
      'Charity',
      'Charitable auctions',
      'Exhibitions',
      'Corporate',
      'Family',
      'Fundraising',
      'Holiday',
      'Music events',
      'Networking events',
      'Product launches',
      'Sports events',
      'Sponsored runs',
      'Trade shows'
    ];
    let options = data.map((d) => ({
      label: d
    }));
    // data = this.props.slots;
    // let slot_options = data.map((d) => ({
    //   label: d
    // }));
    this.setState({ selectOptions: options });
  }
  handleEventChange = (e) => {
    console.log(e.target.value);
    this.setState({
      eventName: e.target.value
    });
  };
  handleChange = (event) => {
    console.log(event.label);
    this.setState({
      eventType: event.label
    });
  };
  handleDateChange = (e) => {
    this.setState({
      date: e.target.value
    });
  };
  handleSlotChange = (e) => {
    let [start, end] = e.label.split(' ');
    this.setState({
      start: start,
      end: end
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { eventName, eventType, start, end, date } = this.state;
    if (eventName && eventType && start && end && date) {
      this.props.onSave({});
      this.props.dispatch(addEvent(eventName, eventType, start, end, date));
    }
  };

  render() {
    let event = this.props.event;
    let available_slots = get_available_slots(event);
    let slot_options = available_slots.map((d) => ({
      label: d
    }));

    return (
      <form className="login-form">
        <span className="login-signup-header">Add Event</span>
        <button onClick={this.props.onClose}>X</button>
        <div className="field">
          <input
            type="text"
            placeholder="Event Name"
            required
            onChange={this.handleEventChange}
            value={this.state.eventName}
          />
        </div>
        <div className="field">
          <Select
            options={this.state.selectOptions}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="field">
          <Select
            options={slot_options}
            onChange={this.handleSlotChange.bind(this)}
          />
        </div>
        <div className="field">
          <input
            type="date"
            placeholder="date"
            required
            onChange={this.handleDateChange}
            value={this.state.date}
          />
        </div>

        {/* <div className="field">
          <input
            type="datetime-local"
            placeholder="start time"
            required
            onChange={this.handleStartChange}
            value={this.state.start}
          />
        </div>
        <div className="field">
          <input
            type="datetime-local"
            placeholder="end time"
            required
            onChange={this.handleEndChange}
            value={this.state.end}
          />
        </div> */}
        <div className="field">
          <button onClick={this.handleFormSubmit}>Add Event</button>
        </div>
      </form>
    );
  }
}

export default connect()(EventInput);

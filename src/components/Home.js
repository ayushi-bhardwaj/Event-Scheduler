import React, { Component } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux';
import { getColor } from '../helpers/colorCode';
import { fetchEvents } from '../actions/events';
import EventInput from './EventInput';
import { Redirect } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.findEventType = this.findEventType.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchEvents());
  }
  handleSave() {
    window.location.reload(false);
  }
  findEventType(date, event) {
    let found_event = event.find((obj) => {
      return (
        moment(obj.start).format('DD-MM-YYYY') ===
        moment(date).format('DD-MM-YYYY')
      );
    });

    console.log(found_event);
    return found_event.event_type;
  }
  render() {
    const { isLoggedin } = this.props.auth;
    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />;
    }
    let mark = [];
    let { event } = this.props;
    event = Array.from(event);
    const { showForm } = this.state;

    event.forEach((element) => {
      console.log(element.start);
      mark.push(moment(element.start).format('DD-MM-YYYY'));
    });

    return (
      <section>
        <div className="event-content">
          {isLoggedin ? (
            <button
              className="btn-add-event"
              onClick={() => this.setState({ showForm: true })}
            >
              Add Event
            </button>
          ) : null}

          {showForm ? (
            <EventInput
              onSave={this.handleSave}
              onClose={() => this.setState({ showForm: false })}
              event={event}
            />
          ) : null}

          <div className="event-list">
            {event.map((e) => (
              <div className="event-card">
                <h1
                  className="event-card-title"
                  style={{ background: getColor(e.event_type) }}
                >
                  {e.name}
                </h1>
                <div className="event-card-content">
                  <p class="price">{e.event_type}</p>
                  <p>{e.start}</p>
                  <p>{e.end}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="calendar">
          <Calendar
            tileClassName={({ date, view }) => {
              if (mark.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
                var event_type = this.findEventType(date, event);

                return getColor(event_type);
              }
            }}
          ></Calendar>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.event,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Home);

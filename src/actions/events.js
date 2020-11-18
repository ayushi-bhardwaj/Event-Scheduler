import { APIUrl } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { UPDATE_EVENTS } from '../actions/actionTypes';
export function fetchEvents() {
  return (dispatch) => {
    const url = APIUrl.fetchEvents();
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        //console.log(data[0]);
        // console.log(data);
        dispatch(updateEvents(data));
      });
  };
}
export function updateEvents(event) {
  return {
    type: UPDATE_EVENTS,
    event
  };
}

export function addEvent(eventName, eventType, start, end, date) {
  return (dispatch) => {
    const url = APIUrl.postEvent();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
      },
      body: JSON.stringify({
        name: eventName,
        event_type: eventType,
        start: date + 'T' + start + ':00Z',
        end: date + 'T' + end + ':00Z'
      })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
}

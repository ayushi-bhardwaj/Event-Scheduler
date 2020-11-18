import { UPDATE_EVENTS } from "../actions/actionTypes";


export default function event (state=[],action)
{
    switch(action.type){
        case UPDATE_EVENTS:
            return action.event
    
        default:
             return state;
    }
    
}
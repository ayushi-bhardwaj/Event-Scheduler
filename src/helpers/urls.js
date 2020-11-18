const API_ROOT='https://ik-react-task.herokuapp.com'

export const APIUrl={
    login:()=>`${API_ROOT}/accounts/login/`,
    signup:()=>`${API_ROOT}/accounts/register/`,
    fetchEvents:()=>`${API_ROOT}/events/`,
    postEvent:()=>`${API_ROOT}/events/`
    
}
import { APIUrl } from "../helpers/urls";
import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOG_OUT, SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS } from "./actionTypes";

export function startLogin (){
    return {
        type:LOGIN_START
    };
}


export function loginFailed (error){
    return {
        type:LOGIN_FAILED,
        error:error
    };
}
export function loginSuccess(user){
    return {
        type:LOGIN_SUCCESS,
        user
    }
}
export function login(email,password){
    return (dispatch)=>{
        dispatch(startLogin())
         const url=APIUrl.login();
         fetch(url,{
             method:'POST',
             headers: new Headers(
                {"Content-Type": "application/json",
                 "Accept":"application/json"}
             ),
             body:JSON.stringify({
                 email,
                 password
             })
         })
         .then(response=>{
             
           return response.json()  
         })
         .then(data=>{
            
             if(data.token){
                //dispatch action to save token
                const x ={
                    token:data.token,
                    user:{
                        email:email,
                        password:password
                    }
                }
                console.log(x)
                localStorage.setItem('token',data.token)
                dispatch(loginSuccess(x.user))
                return;
             }
             dispatch(loginFailed(data.non_field_errors[0]))
         })
    }
}


export function signup(email,password,confirmPassword,name){
    return (dispatch)=>{
       const url=APIUrl.signup();
       fetch(url,{
        method:'POST',
        headers: new Headers(
           {"Content-Type": "application/json",
            "Accept":"application/json"}
        ),
        body:JSON.stringify({
            email,
            password
        })
    })
    .then((response)=> {return response.json()})
    .then((data)=>{
        console.log(data);
        if(data.message){
        const user={
            email:email,
            password:password,
            name:name
        }
        dispatch(signupSuccessful(user));
        return;}
        dispatch(signupFailed(data.errors))
    })
     
    }
}

export function startSignup(){
    return {
        type:SIGNUP_START
    }
}

export function signupFailed(error){
    return {
        type:SIGNUP_FAILED,
        error
    }
}

export function signupSuccessful(user){
    return {
        type:SIGNUP_SUCCESS,
        user
    }
}

export function authenticateUser(user){
    return {
        type:AUTHENTICATE_USER,
        user
    }
}


export function logoutUser(user){
    return {
        type:LOG_OUT
    }
}

export function clearAuthState(){
    return {
        type:CLEAR_AUTH_STATE
    }
}
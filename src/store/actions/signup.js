import * as actionType from './actionType';
import axios from '../../axios-orders';

export const signup = (email, pass, isSignup) => {
    return dispatch => {
        dispatch(signupStart())
        let url;
        if (isSignup)
            url = '/signup';
        else
            url = '/login'
        axios.post(url,
            {
                email: email,
                password: pass,
            }).then(response => {
                console.log(response);
                if (!response.data.success) {
                    dispatch(signupFail(response.data.error))
                }
                else {
                    const expDate = new Date(new Date().getTime() + response.data.body.expiresIn * 1000);
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('expirationDate', expDate);
                    localStorage.setItem('email', response.data.body.email);
                    console.log(response.data.body.expiresIn);
                    dispatch(logoutAfter(response.data.body.expiresIn));
                    dispatch(signupSuccess(response.data.body));
                }
            }
            ).catch(
                err => {
                    console.log('abc', err)
                    // if(err.response !=null)
                    dispatch(signupFail(err.response.data.error))
                }
            )
    }
}

const logoutAfter = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    }
}

export const logout = () => {
    return dispatch=>{
        axios.get('/logout').then(res=>{
            console.log('res', res);
            if(res.data.success)
                dispatch(logoutSuccess());
        }).catch(
            err => {
                console.log('err', err)
            }
        )
    }
}

const logoutSuccess=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationDate');
    return {
        type: actionType.LOGOUT
    }
}

const signupSuccess = (response) => {
    return {
        type: actionType.SIGNUP_SUCCESS,
        response: response
    }
}

const signupStart = () => {
    return {
        type: actionType.SIGNUP_START
    }
}

const signupFail = (error) => {
    return {
        type: actionType.SIGNUP_FAIL,
        error
    }
}

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const expTime =((new Date(localStorage.getItem('expirationDate'))).getTime()- (new Date()).getTime())/1000;
        if(!token || expTime<=0)
            dispatch(logoutSuccess())
        else{
            dispatch(logoutAfter(expTime))
            dispatch(signupSuccess({idToken:token, email}))
        }
    }
}
import * as actionType from '../actions/actionType';
import DialogBox from '../../components/UI/DialogBoxModel/DialogBoxModel';

const initialState = {
    loading:false,
    success: false,
    email: null,
    token: null,
    error:null
}

const signupSuccess=(state, action)=>{
    console.log(action);
    return {
        ...state,
        success: true,
        loading:false,
        token:action.idToken,
        email:action.email
    }
}

const signupFail=(state, error)=>{
    console.log(error);
    return {
        ...state,
        success: false,
        loading:false,
        error:error
    }
}

const signupStart=(state)=>{
    return {
        ...initialState,
    }
}

const logout=(state)=>{
    return{
        ...initialState,
        building:false
    }
}

const setupAuth=(state, token)=>{
    return{
        ...state,
        token:token
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionType.SIGNUP_START): return signupStart(state)
        case (actionType.SIGNUP_SUCCESS): return signupSuccess(state, action.response);
        case (actionType.SIGNUP_FAIL): return signupFail(state, action.error);
        case (actionType.LOGOUT): return logout(state);
        case (actionType.LOGOUT): return logout(state);
        case (actionType.CHECK_AUTH): return setupAuth(state, action.token);
            
    }
    return state;
}

export default reducer;
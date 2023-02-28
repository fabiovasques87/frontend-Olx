const initialState = {
    email: ''
}

export default  (state= initialState, action  )=> {

    //Ações...
    if(action.type ===   'SET_EMAIL'){
        return {...state, email: action.payload.email};
    }
    
    return state;
}
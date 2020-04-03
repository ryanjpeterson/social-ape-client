import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/login', userData)
    .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });

        history.push('/');
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
}

export const signupUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/signup', userData)
    .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });

        history.push('/');
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', `Bearer ${token}`);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

// axios.post('/signup', newUserData)
// .then(res => {
//     console.log(res.data);
//     localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
//     this.setState({
//         loading: false
//     });
//     this.props.history.push('/');
// })
// .catch(err => {
//     console.log(err.response.data);
//     this.setState({
//         errors: err.response.data,
//         loading: false
//     });
// });
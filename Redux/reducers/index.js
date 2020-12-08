import { combineReducers } from 'redux';
import superheroesReducers from './superheroesReducer';
import authReducer from './authReducer';

export default combineReducers({
    superheroes: superheroesReducers,
    auth: authReducer
})
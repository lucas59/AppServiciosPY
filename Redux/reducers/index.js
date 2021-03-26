import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer'
import infoReducer from './infoReducer'
import tagReducer from './tagsReducer'
import signupReducer from './signupReducer'
import categoryReducer from './categoryReducer'
import panelReducer from './panelReducer'
import searchReducer from './searchReducer'
import tabsReducers from './tabsReducers'

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    info: infoReducer,
    tags: tagReducer,
    signup: signupReducer,
    category: categoryReducer,
    panel: panelReducer,
    filters: searchReducer,

    tabsManager: tabsReducers
})
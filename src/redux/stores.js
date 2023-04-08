import { legacy_createStore as createStore, combineReducers} from 'redux'
import userReducer from "./reducers/userReducer"
import roomReducer from "./reducers/roomReducer"
import fromCreateGroupReducer from "./reducers/fromCreateGroupReducer"
import themeReducer from './reducers/themeReducer'
import roomWaitReducer from './reducers/roomwaitRuducer'
import userOnlineReducer from './reducers/userOnlineReducer'
import onOffForm from './reducers/onOffForm'
import verifyForm from './reducers/verifyForm'
import chatWindow from './reducers/chatWindow'

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  createGroup: fromCreateGroupReducer,
  theme: themeReducer,
  roomsWait: roomWaitReducer,
  usersOnline: userOnlineReducer,
  formOn: onOffForm,
  verifyForm: verifyForm,
  StatuschatWindow: chatWindow
});

const stores = createStore(rootReducer);

export default stores
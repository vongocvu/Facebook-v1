const ListUserOnline = []

const userOnlineReducer = (state = ListUserOnline, action) => {
  switch(action.type) {
    case 'ADD_USERS_ONLINE':
          return [...new Set ([ ...state, ...action.payload ])]
    case "DELETE_USERS_ONLINE":
          return [...new Set (state.filter(user => user._id !== action.payload._id))]
    case "RESET_USER_ONLINE" : return []
    default: return [...new Set ([ ...state ])]
  }
}


export default userOnlineReducer
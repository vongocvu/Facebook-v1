const chatWindow = (state = false, action) => {
   switch (action.type) {
      case "ON_CHAT_WINDOW": return true
      case "OFF_CHAT_WINDOW": return false
      default: return state
   }
}

export default chatWindow
const verifyForm = (state = false, action) => {
    switch (action.type) {
      case 'ON-FORM-LEAVE':
         return'verifyForm'
      case 'OFF-FORM-LEAVE':
         return ""
      case "LEAVE":
         return 'OK'
      case 'NOT-LEAVE':
         return ""
      default: return state
    }
}

export default verifyForm
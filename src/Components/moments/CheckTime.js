import moment from "moment";

const formatTime = "YYYY-MM-DD HH:mm"

const checkBefore = (curentTime, beforeTime) => {
     return moment(curentTime, formatTime).isBefore(moment(beforeTime, formatTime))
}

const checkBetween = (curentTime, beforeTime, afterTime) => {
    return moment(curentTime, formatTime).isBetween(moment(beforeTime, formatTime), moment(afterTime, formatTime))
}

const checkAfter = (curentTime, afterTime) => {
  return moment(curentTime, formatTime).isAfter(moment(afterTime, formatTime))
}

export {
  checkBefore,
  checkBetween,
  checkAfter
}
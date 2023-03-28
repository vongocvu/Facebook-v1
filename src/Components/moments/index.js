const moment = require('moment');
const Moment = (times) => {

  const vietnamTime = moment.utc(times).utcOffset(7).format('HH:mm'); // chuyển đổi timestamps sang múi giờ Việt Nam 
  return vietnamTime

}

export default Moment


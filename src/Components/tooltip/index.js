/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const ShowTabName = ({ children, tabName, className, position = 'top', theme ="dark" }) => {

  return (
      <Tooltip title={tabName} className={className} theme={theme} position={position}>
         {children}
      </Tooltip>
  );
}

export default ShowTabName
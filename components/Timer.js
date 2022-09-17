import React from 'react';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

function Timer(props) {

   const {initialMinute = 30,initialSeconds = 30} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

  return (
      <TextField
         sx={{width: '70px'}}
        hiddenLabel
        disabled
        size="small"
        value={`${minutes} : ${seconds < 10 ?  `0${seconds}` : seconds} `}
      />
  );
}

export default Timer;
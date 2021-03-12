import React from 'react';

const morning = {
    color: "red"
}

const afternoon = {
    color: "green"
}

const evening = {
    color: "blue"
}

function TheDay(){
    let day = new Date();
    let hour = day.getHours();

    let message="";
    let useColor;

    if(hour >= 18){
        message = "Good Evening!";
        useColor = evening;
    }
    else if((hour >= 12)){
        message = "Good Afternoon!";
        useColor = afternoon;
    }
    else{
        message = "Good Morning!";
        useColor = morning;
    }

    return(
        <div>
            <h1 className="heading" style={useColor}>{message}</h1>
        </div>
    );
}

export default TheDay;
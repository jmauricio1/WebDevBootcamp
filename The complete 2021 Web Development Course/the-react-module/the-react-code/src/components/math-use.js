import React from 'react';
import {add, subtract, multiply, divide} from './some-math';

function MathUse(){
    return(
        <div>
            <ul>
                <li>{add(1, 2)}</li>
                <li>{multiply(2, 3)}</li>
                <li>{subtract(7, 2)}</li>
                <li>{divide(5, 2)}</li>
            </ul>
        </div>
    );
}

export default MathUse;
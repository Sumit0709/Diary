import React from 'react';

import classes from './Card.module.css';

const Card = (props)=>{
    return <div className={classes.card} style={{'backgroundImage':`url(${props.bgUrl})`}}>
        <div>{props.children}</div>
    </div>
}

export default Card;
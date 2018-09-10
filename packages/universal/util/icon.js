import React from 'react';

import style from './icon.scss';

export default function(props) {
    return (
        <div className={`${props.className} ${style.component}`} dangerouslySetInnerHTML={ {__html: props.icon } }/>
    )
}
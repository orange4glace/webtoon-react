import React from 'react';

import Icon from './icon.js';
import style from './button.scss';

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ripples: []
        }
    }


    onMouseDown(e) {
        if (e.button != 0) return;
        let src = e.nativeEvent.srcElement;
        let siz = Math.max(src.offsetWidth, src.offsetHeight);
        let pos = src.getBoundingClientRect();
        let x = e.pageX - pos.left - (siz / 2);
        let y = e.pageY - pos.top - (siz / 2);
        let id = parseInt(Date.now() * Math.random());
        let style = {
            width: `${siz}px`,
            height: `${siz}px`,
            left: `${x}px`,
            top: `${y}px`
        }
        this.current = {
            id: id,
            state: 'down',
            style: style
        };
        this.setState({
            ripples: [...this.state.ripples, this.current]
        })
    }

    onMouseUp(e) {
        if (!this.current) return;
        let index = -1;
        for (var i = 0; i < this.state.ripples.length; i ++)
            if (this.state.ripples[i].id == this.current.id) index = i;
        if (index == -1) return;
        let nextCurrent = {
            ...this.current,
            state: 'up'
        }
        this.setState({
            ripples: [...this.state.ripples.slice(0, index), nextCurrent, ...this.state.ripples.slice(index + 1)]
        })
        setTimeout(() => {
            let cl = this.state.ripples.slice(0);
            cl.splice(0, 1);
            this.setState({
                ripples: cl
            });
        }, 2000)
        this.current = null;
    }

    render() {
        let color = this.props.color || 'red';
        let componentStyle = {
            color: color
        };
        let rippleStyle = {
            backgroundColor: color
        };
        return (
            <div className={style.component} style={componentStyle}>
                <div className='ripple-container'>
                    {
                        this.state.ripples.map((el, i) => (
                            <div className={`ripple ${el.state}`} style={{...el.style, ...rippleStyle}} key={el.id}/>
                        ))
                    }
                </div>
                <div className='overlay' onMouseDown={(event)=>this.onMouseDown(event)} onMouseUp={(event)=>this.onMouseUp(event)}/>
                <div className='content-container'>
                    {
                        this.props.icon &&
                        <Icon className='icon' icon={this.props.icon}/>
                    }
                    <div className='content'>{this.props.children}</div>
                </div>
            </div>
        )
    }

}

export default Button;
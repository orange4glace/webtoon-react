import React from 'react';
import { Form, asField, Text, Checkbox, RadioGroup, Radio, Scope } from 'informed';

import { StyledInputText, StyledTextArea } from 'universal/styled-informed';
import { Button } from 'universal/util';
import { Localized } from 'universal/localize';
import { CATEGORIES, WEBTOON_TYPES } from 'universal/util';
import style from './write-view.scss';

class StyledCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: Math.random().toString()
        }
    }

    render() {
        console.log(this.props.form.getValue('genre'));
        return (
            <div className={`checkbox ${this.props.disabled && 'disabled'}`}>
                <Checkbox className='inp-cbx' field={this.props.field} id={this.state.id} disabled={this.props.disabled}/>
                <label className="cbx" htmlFor={this.state.id}>
                    <span className='box'>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                    </span>
                    <span>{this.props.children}</span>
                </label>
            </div>
        )
    }
}

class StyledRadio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: Math.random().toString()
        }
    }

    render() {
        return (
            <div className='radio'>
                <Radio className='inp-cbx' value={this.props.value} id={this.state.id}/>
                <label className="radio" htmlFor={this.state.id}>
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                    </span>
                    <span>{this.props.children}</span>
                </label>
            </div>
        )
    }
}

class StyledFileInput_ extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: Math.random().toString()
        }

        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    dragOverHandler(e) {
        console.log("Over",e);
    }

    dragLeaveHandler(e) {
        console.log("Leave",e);
    }

    dragOverHandler(e) {
        console.log("Over", e);
        e.preventDefault();
    }

    dropHandler(e) {
        this.props.fieldApi.setValue(e.nativeEvent.dataTransfer.files[0])
        e.preventDefault();
    }

    changeHandler(e) {
        this.props.fieldApi.setValue(e.nativeEvent.target.files[0])
    }

    render() {
        const { fieldState, fieldApi, forwardedRef } = this.props;
        const file = fieldApi.getValue();
        console.log(file);
        return (
            <React.Fragment>
                <label className='dropper' htmlFor={this.state.id} onDragEnter={this.dragOverHandler}
                    onDragLeave={this.dragLeaveHandler} onDragOver={this.dragOverHandler} onDrop={this.dropHandler} onChange={this.changeHandler}>
                    <input type='file' id={this.state.id} ref={forwardedRef}/>
                    {
                        file ? (
                            <div className='placeholder'>{file.name}</div>
                        ) : (
                            <div className='placeholder'>{this.props.placeholder}</div>
                        )
                    }
                </label>
            </React.Fragment>
        )
    }
}

const StyledFileInput = asField(StyledFileInput_);

class View extends React.Component {

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps() {
        console.log("# Get Derived");
        return null;
    }

    render() {
        return (
            <div className={style.component}>
                <Form>
                    {({ formState, formApi }) => (
                    <div className='spliter'>
                        <div className='split'>
                            <div className='row'>
                                <div className='legend'>제목</div>
                                <StyledInputText form={formApi} field='title' maxLength={54}/>
                            </div>
                            <div className='row genre'>
                                <div className='legend'><Localized>GENRE</Localized></div>
                                <ul className='items'>
                                    <Scope scope='genre'>
                                    {(() => {
                                    let count = formState.values.genre ? ((()=>{
                                        let _count = 0;
                                        for (var i in formState.values.genre)
                                            if (formState.values.genre[i]) _count++;
                                        return _count;
                                    })()) : 0;
                                    let limit = count >= 1;
                                    return CATEGORIES.map(el => {
                                        let disabled = limit && (formState.values.genre ?
                                            !!!formState.values.genre[el.value] : false)
                                        return (
                                        <li className='item' key={el.value}>
                                            <StyledCheckbox form={formApi} field={el.value} disabled={disabled}>
                                                <Localized>{el.name}</Localized>
                                            </StyledCheckbox>
                                        </li>
                                        )
                                    })
                                    })()}
                                    </Scope>
                                </ul>
                            </div>
                            <div className='row description'>
                                <div className='legend'><Localized>STORY</Localized></div>
                                <StyledTextArea form={formApi} field='description' maxLength={100} className='textarea'/>
                            </div>
                            <div className='row file'>
                                <div className='legend'><Localized>THUMBNAIL</Localized></div>
                                <StyledFileInput field='thumbnail' placeholder={<Localized>PLACEHOLDER_COMIC_THUMBNAIL</Localized>}/>
                            </div>
                        </div>
                    </div>
                    )}
                </Form>
            </div>
        )
    }

}

export default View;
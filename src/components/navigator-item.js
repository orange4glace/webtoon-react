import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Localize from '../localize';

class NavigatorItem extends React.Component {
    render() {
        let classes = classNames(
            this.props.active ? 'active' : '',
            'navigator-item'
        );
        return (
            <Link className={classes} to={this.props.link}>
                <Localize>{this.props.name}</Localize>
            </Link>
        )
    }
}

export default NavigatorItem
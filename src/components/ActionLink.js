import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';

export default class ActionLink extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const url = _.get(action, 'url');
        const label = _.get(action, 'label');
        const style = _.get(action, 'style', 'link');
        const classes = classNames({
            button: style !== 'link'
        });

        return (
            <Link href={withPrefix(url)} className={classes}>
                {label}
            </Link>
        );
    }
}

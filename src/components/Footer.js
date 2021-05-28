import React from 'react';
import _ from 'lodash';

import ActionLink from './ActionLink';
import { htmlToReact } from '../utils';

export default class Footer extends React.Component {
    render() {
        const config = _.get(this.props, 'config');
        const footer = _.get(config, 'footer');
        const copyright = _.get(footer, 'content');
        const links = _.get(footer, 'links');

        return (
            <footer id="colophon" className="site-footer inner">
                <div className="site-info">
                    {copyright && <span className="copyright">{htmlToReact(copyright)}</span>}
                    {_.map(links, (action, index) => (
                        <ActionLink key={index} action={action} />
                    ))}
                </div>
            </footer>
        );
    }
}

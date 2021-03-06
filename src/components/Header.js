import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import ActionLink from './ActionLink';

export default class Header extends React.Component {
    renderNavLinks(navLinks, pageUrl) {
        return (
            <React.Fragment>
                <nav id="main-navigation" className="site-nav" aria-label="Main Navigation">
                    <div className="site-nav-inside">
                        <ul className="menu">
                            {_.map(navLinks, (action, index) => {
                                const actionUrl = _.trim(_.get(action, 'url'), '/');
                                const actionStyle = _.get(action, 'style', 'link');
                                return (
                                    <li
                                        key={index}
                                        className={classNames('menu-item', {
                                            'current-menu-item': pageUrl === actionUrl,
                                            'menu-button': actionStyle !== 'link'
                                        })}
                                    >
                                        <ActionLink action={action} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageUrl = _.trim(getPageUrl(page), '/');
        const pageLayout = _.get(page, 'layout');
        const config = _.get(this.props, 'config');
        const header = _.get(config, 'header');
        const logo = _.get(header, 'logo_img');
        const logoAlt = _.get(header, 'logo_img_alt', '');
        const title = _.get(header, 'title');
        const hasNav = _.get(header, 'has_nav');
        const navLinks = _.get(header, 'nav_links');

        return (
            <header id="masthead" className="site-header outer">
                <div className="inner">
                    <div className="site-header-inside">
                        <div className="site-branding">
                            {logo && (
                                <p className="site-logo">
                                    <Link href={withPrefix('/')}>
                                        <img src={withPrefix(logo)} alt={logoAlt} />
                                    </Link>
                                </p>
                            )}
                            {pageLayout === 'home' ? (
                                <h1 className="site-title">
                                    <Link href={withPrefix('/')}>{title}</Link>
                                </h1>
                            ) : (
                                <p className="site-title">
                                    <Link href={withPrefix('/')}>{title}</Link>
                                </p>
                            )}
                        </div>
                        {hasNav && !_.isEmpty(navLinks) && this.renderNavLinks(navLinks, pageUrl)}
                    </div>
                </div>
            </header>
        );
    }
}

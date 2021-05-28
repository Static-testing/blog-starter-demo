import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { markdownify, Link, getPageUrl } from '../utils';
import ActionLink from '../components/ActionLink';

export default class Home extends React.Component {
    renderPost(post, index) {
        const title = _.get(post, 'title');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postUrl = getPageUrl(post, { withPrefix: true });

        return (
            <article key={index} className="post post-card">
                <div className="post-card-inside">
                    <div className="post-card-content">
                        <header className="post-header">
                            <h2 className="post-title">
                                <Link href={postUrl}>{title}</Link>
                            </h2>
                            <div className="post-meta">
                                <time className="published" dateTime={dateTimeAttr}>
                                    {formattedDate}
                                </time>
                            </div>
                        </header>
                    </div>
                </div>
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const hasIntro = _.get(page, 'has_intro');
        const introContent = _.get(page, 'intro_content');
        const introActions = _.get(page, 'intro_actions');
        const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');

        return (
            <Layout page={page} config={config}>
                {hasIntro && (
                    <div className="intro">
                        <div className="inner-md">
                            {introContent && <div className="intro-text">{markdownify(introContent)}</div>}
                            {!_.isEmpty(introActions) && (
                                <div className="intro-cta">
                                    {_.map(introActions, (action, index) => (
                                        <ActionLink key={index} action={action} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="post-feed">{_.map(posts, (post, index) => this.renderPost(post, index))}</div>
            </Layout>
        );
    }
}

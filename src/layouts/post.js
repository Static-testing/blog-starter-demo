import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { markdownify } from '../utils';

export default class Post extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const date = _.get(page, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%A, %B %e, %Y');
        const markdownContent = _.get(page, 'markdown_content');

        return (
            <Layout page={page} config={config}>
                <article className="post post-full">
                    <header className="post-header inner-md">
                        <h1 className="post-title">{title}</h1>
                        <div className="post-meta">
                            <time className="published" dateTime={dateTimeAttr}>
                                {formattedDate}
                            </time>
                        </div>
                    </header>
                    {markdownContent && <div className="post-content inner-md">{markdownify(markdownContent)}</div>}
                </article>
            </Layout>
        );
    }
}

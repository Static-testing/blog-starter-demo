import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { markdownify } from '../utils';

export default class Page extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const markdownContent = _.get(page, 'markdown_content');

        return (
            <Layout page={page} config={config}>
                <article className="post page post-full">
                    <header className="post-header inner-md">
                        <h1 className="post-title">{title}</h1>
                    </header>
                    {markdownContent && <div className="post-content inner-md">{markdownify(markdownContent)}</div>}
                </article>
            </Layout>
        );
    }
}

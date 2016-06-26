import React from 'react';
import classNames from 'classnames';
import {GithubIcon} from '~/components/icons';

import styles from './projects.less';

function Project(props) {
    const { project, ...rest } = props;
    const { className, title, github } = project;

    return <div title={title} {...rest}>
        <div className={className}>
            { github
                ? <GithubIcon onClick={(evt) => evt.stopPropagation()}
                    className={styles.icon}
                    href={github}
                    title="View on Github" />
                : <span className={classNames('mega-octicon',
                                              'octicon-lock',
                                              styles.icon)}
                    title="Sorry, this project's source is private!" />
            }
            <h3 className={styles.title}>{title}</h3>
        </div>
    </div>;
}

Project.propTypes = {
    project: React.PropTypes.object
}

export default function Projects(props) {
    const projects = [
        {
            title: 'audiovisual',
            className: styles.audiovisual,
            href: 'https://av.aspyrx.co',
            github: 'https://github.com/aspyrx/audiovisual'
        }, {
            title: 'tictactoe',
            className: styles.tictactoe,
            href: 'http://3t.aspyrx.co',
            github: 'https://github.com/aspyrx/tictactoe'
        }, {
            title: 'Carnegie Mellon Racing',
            className: styles.cmr,
            href: 'https://cmr.aspyrx.co'
        }
    ];

    const projectClicked = project => {
        const { href } = project;
        if (href) {
            window.open(href, '_blank');
        }
    }

    return <div className={styles.projects} {...props}>
        {projects.map((project, i) => {
            return <Project className={styles.project}
                key={i}
                project={project}
                onClick={() => projectClicked(project)} />;
        })}
    </div>;
}

export const page = {
    path: '/projects',
    title: 'projects'
}


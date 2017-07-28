import React from 'react';
import { shape, string } from 'prop-types';
import classNames from 'classnames';

import Anchor from '~/components/Anchor';
import { GithubIcon } from '~/components/icons';

import styles from './index.less';

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

function Project(props) {
    const { project } = props;
    const { className, title, github, href } = project;

    const repoLink = github
        ? <GithubIcon onClick={(evt) => evt.stopPropagation()}
            className={styles.icon}
            href={github}
            title="View on Github"
        />
        : <span
            className={classNames(
                'mega-octicon', 'octicon-lock', styles.icon
            )}
            title="Sorry, this project's source is private!"
        />;

    const buttonClasses = classNames(styles.button, className);
    return <div className={styles.project} title={title}>
        <Anchor className={buttonClasses} href={href}>
            <h3 className={styles.title}>{title}</h3>
        </Anchor>
        {repoLink}
    </div>;
}

Project.propTypes = {
    project: shape({
        title: string.isRequired,
        className: string,
        href: string,
        github: string
    })
};

export default function Projects() {
    const projectElems = projects.map((project, i) => {
        return <Project key={i} project={project} />;
    });
    return <div className={styles.projects}>
        {projectElems}
    </div>;
}

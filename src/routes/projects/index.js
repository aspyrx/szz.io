import React from 'react';
import { shape, string } from 'prop-types';
import classNames from 'classnames';

import Anchor from 'src/components/Anchor';
import { GithubIcon } from 'src/components/icons';

import * as styles from './index.less';

const projects = [{
    title: 'szz.io',
    className: styles.szzIo,
    href: 'https://github.com/aspyrx/szz.io',
    github: 'https://github.com/aspyrx/szz.io',
}, {
    title: 'audiovisual',
    className: styles.audiovisual,
    href: 'https://av.aspyrx.co',
    github: 'https://github.com/aspyrx/audiovisual',
}, {
    title: '711@Ingleside',
    className: styles.ingleside,
    href: 'https://711.ingleside.co',
}, {
    title: 'Ocean Ale House',
    className: styles.oah,
    href: 'https://oceanalehouse.com',
}];

/**
 * Project component.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
function Project(props) {
    const { project } = props;
    const { className, title, github, href } = project;

    const repoLink = github
        ? (
                <GithubIcon
                    onClick={(evt) => evt.stopPropagation()}
                    className={styles.icon}
                    href={github}
                    title="View on Github"
                />
            )
        : (
                <span
                    className={classNames(
                        'mega-octicon', 'octicon-lock', styles.icon,
                    )}
                    title="Sorry, this project's source is private!"
                />
            );

    const buttonClasses = classNames(styles.button, className);
    return (
        <div className={styles.project} title={title}>
            <Anchor className={buttonClasses} href={href}>
                <h3 className={styles.title}>{title}</h3>
            </Anchor>
            {repoLink}
        </div>
    );
}

Project.propTypes = {
    project: shape({
        title: string.isRequired,
        className: string,
        href: string,
        github: string,
    }),
};

/**
 * Projects page.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Projects() {
    const projectElems = projects.map((project) => {
        return <Project key={project.title} project={project} />;
    });
    return (
        <nav className={styles.projects}>
            {projectElems}
        </nav>
    );
}

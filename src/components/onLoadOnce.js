import React from 'react';
import classNames from 'classnames';

export default function onLoadOnce(Component) {
    let loadedOnce = false;

    return class onLoadComponent extends React.Component {
        static get propTypes() {
            return {
                className: React.PropTypes.any,
                loadedClass: React.PropTypes.any
            }
        }

        constructor() {
            super();

            this.state = { loaded: loadedOnce };
        }

        render() {
            const onLoad = () => {
                if (!loadedOnce) {
                    this.setState({ loaded: true });
                    loadedOnce = true;
                }
            }

            const { loaded } = this.state;
            const { className, loadedClass, ...rest } = this.props;
            const classes = classNames(className, { [loadedClass]: loaded });

            return <Component onLoad={onLoad} className={classes} {...rest} />
        }
    }
}

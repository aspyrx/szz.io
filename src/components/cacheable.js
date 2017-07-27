import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

const cached = Object.create(null);

export default function cacheable(Component) {
    return class CacheableComponent extends React.Component {
        static get propTypes() {
            return {
                className: string,
                loadedClass: string,
                src: string
            };
        }

        constructor(props) {
            super(props);

            const { src } = props;
            this.state = { loaded: cached[src] };
        }

        render() {
            const { src, className, loadedClass, ...rest } = this.props;

            const onLoad = () => {
                const { loaded } = this.state;
                if (!loaded) {
                    cached[src] = true;
                    this.setState({ loaded: true });
                }
            };

            const { loaded } = this.state;
            const classes = classNames(className, { [loadedClass]: loaded });

            return <Component onLoad={onLoad}
                className={classes}
                src={src}
                {...rest} />;
        }
    };
}


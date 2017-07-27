import 'normalize.css/normalize.css';
import styles from './index.less';

import backgroundData from 'public/assets/bg.svg';
import onAppLoaded from 'bundle-loader!~/app';

(function background(parent) {
    const elem = document.createElement('object');
    elem.classList.add(styles.bg);
    elem.data = backgroundData;
    elem.type = 'image/svg+xml';

    parent.appendChild(elem);
}(document.body));

let spinner = (function spinner() {
    const elem = document.createElement('div');
    elem.classList.add(styles.spinner);

    const logoS = document.createElement('div');
    logoS.classList.add(styles.logoS);

    const round = document.createElement('div');
    round.classList.add(styles.round);

    const line = document.createElement('div');
    line.classList.add(styles.line);

    logoS.appendChild(round);
    logoS.appendChild(line);
    elem.appendChild(logoS);

    return elem;
}());

document.body.appendChild(spinner);

const appDiv = document.createElement('div');
appDiv.id = 'app';

// check for CSS3 flexbox support
if (!('flex' in appDiv.style)) {
    setTimeout(() => window.alert( // eslint-disable-line no-alert
        'Your browser does not appear to support CSS Flexbox. Certain parts of'
        + ' the website may not display correctly. Apologies for any'
        + ' inconvenience!'
    ), 0);
}

function start() {
    onAppLoaded(app => {
        app.render(appDiv, function onAppRender() {
            if (!spinner) {
                return;
            }

            spinner.classList.add(styles.loaded);
            document.body.appendChild(appDiv);

            setTimeout(function removeSpinner() {
                spinner.parentElement.removeChild(spinner);
                spinner = null;
            }, 500);
        });
    });
}

start();

if (module.hot) {
    module.hot.accept('bundle-loader!./app', start);

    module.hot.dispose(() =>
        document.body.removeChild(appDiv)
    );
}


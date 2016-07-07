import styles from './preloader.less';

import backgroundData from '~/images/bg.svg';

(function background(parent) {
    const elem = document.createElement('object');
    elem.classList.add(styles.bg);
    elem.data = backgroundData;
    elem.type = 'image/svg+xml';

    parent.appendChild(elem);
})(document.body);

const spinner = (function spinner() {
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
})();

document.body.appendChild(spinner);

const appDiv = document.createElement('div');
appDiv.id = 'app';

require.ensure(['~/index'], function bundleLoaded(require) {
    const { renderApp } = require('~/index');
    renderApp(appDiv, function onAppRender() {
        spinner.parentElement.removeChild(spinner);
        document.body.appendChild(appDiv);
    });
});


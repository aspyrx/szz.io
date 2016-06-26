const pagesCtx = require.context('.', false, /^(.(?!index))*\.js$/);

const pages = [];

for (const key of pagesCtx.keys()) {
    pages.push(pagesCtx(key));
}

pages.indexPath = '/home';

export { pages as default };


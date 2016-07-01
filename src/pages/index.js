const pagesCtx = require.context('.', false, /^(.(?!index))*\.js$/);
const pages = pagesCtx.keys().map(key => pagesCtx(key));

pages.indexPath = '/home';

export { pages as default };


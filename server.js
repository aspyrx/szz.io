import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';

const publicPath = '/';
const bundleDir = path.resolve(import.meta.dirname, 'dist');
const publicDir = path.resolve(import.meta.dirname, 'public');
const index = path.join(bundleDir, 'index.html');

/**
 * Serve a file at the given path.
 * @param {http.ServerResponse} res - Response object to serve.
 * @param {string} filepath - File to serve.
 * @returns {Promise} Resolves when served, or rejects on error.
 */
function serveFile(res, filepath) {
    return new Promise((resolve, reject) => {
        console.log(filepath);
        fs.createReadStream(filepath)
            .on('error', reject)
            .pipe(res)
            .on('error', reject)
            .on('finish', resolve);
    });
}

/**
 * Serve with SPA router fallback.
 * @param {http.ServerResponse} res - Response object to serve.
 * @param {string} contentBase - Base for all content.
 * @param {string} pathname - Path name to serve.
 * @returns {Promise} Resolves when served, or rejects on error.
 */
function serve(res, contentBase, pathname) {
    const filepath = path.join(contentBase[0], pathname);
    contentBase = contentBase.slice(1);

    return serveFile(res, filepath).catch((err) => {
        if (err.code !== 'ENOENT' && err.code !== 'EISDIR') {
            res.statusCode = 500;
            res.end(err.message, 'utf8');
            return;
        }

        if (contentBase.length > 0) {
            return serve(res, contentBase, pathname);
        }

        // Fallback to SPA router
        return serveFile(res, index);
    });
}

http.createServer(function requestListener(req, res) {
    let { pathname } = url.parse(req.url);
    console.log(`${req.method} ${pathname}`);
    if (!pathname.startsWith(publicPath)) {
        res.statusCode = 302;
        res.setHeader('Location', path.posix.join(publicPath, pathname));
        res.end();
        return;
    }

    pathname = pathname.replace(publicPath, '/');
    if (req.method !== 'GET') {
        res.statusCode = 501;
        return res.end();
    }

    if (pathname === '/') {
        pathname = '/index.html';
    }

    return serve(res, [bundleDir, publicDir], pathname);
}).listen(process.argv[2] || '8080');

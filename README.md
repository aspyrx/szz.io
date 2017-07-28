# szz.io
My personal website.

## Usage
1. Clone the repo.
2. Install the dependencies: `npm install`

Several build-related scripts are included that can be run using
`npm run <script>`:
- `build`: builds the project and places the bundle into `./dist`
- `dist`: same as above, excepts does production-level optimizations
- `watch`: watches for changes, automatically rebuilding when necessary
- `live`: starts a [webpack-dev-server] and enables [hot module replacement].
  Access the server at [http://localhost:8080](http://localhost:8080).

[webpack-dev-server]: https://webpack.js.org/guides/development/#using-webpack-dev-server
[hot module replacement]: https://webpack.js.org/guides/hot-module-replacement/


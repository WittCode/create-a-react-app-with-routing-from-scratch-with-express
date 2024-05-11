import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.cjs';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log('-------------------------------------');
  console.log(`Request: ${req.method} ${req.url}`);
  return next();
});

const compiler = webpack(webpackConfig);
app.use(historyApiFallback({
  verbose: true,
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: (context) => context.parsedUrl.path
    }
  ]
}));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {}));

// Add api routes
const ApiRouter = express.Router();
ApiRouter.get('/home', (req, res) => {
  return res.json({message: 'Home page data from Express!'});
});
ApiRouter.get('/about', (req, res) => {
  return res.json({message: 'About page API data oh yeah!'});
});
ApiRouter.get('/contact', (req, res) => {
  return res.json({message: 'Thsdfgsdfgsdfgis is Express! Here are the contacts!'});
});
app.use('/api', ApiRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server started listening on ${HOST}:${PORT}`);
});
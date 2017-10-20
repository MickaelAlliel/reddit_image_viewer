const express = require('express');
const morgan = require('morgan');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');
const compiler = webpack(webpackConfig);


app.use(express.static(__dirname + '/www'));
app.use(morgan('combined'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    noInfo: true,
    historyApiFallback: true,
}));

app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

const server = app.listen(3000, "127.0.0.1", function() {
    const host = server.address().address;
    const port = server.address().port;
    
    console.log('App listening at http://%s:%s', host, port);
});

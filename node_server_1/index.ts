import * as http from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

import { IncomingMessage, ServerResponse } from 'http';

const publicPath = p.join(__dirname, 'public');

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request;

  const { pathname, search } = url.parse(path as string, true);

  console.log('object', pathname, search);


  switch (pathname) {
    case '/index.html':
      fs.readFile(p.resolve(publicPath, 'index.html'), (err, data) => {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end('404 Not Found');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(data.toString());
        }
      })
      break;

    case '/style.css':
      fs.readFile(p.resolve(publicPath, 'style.css'), (err, data) => {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end('404 Not Found');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
          response.end(data.toString());
        }
      })
      break;

    case '/main.js':
      fs.readFile(p.resolve(publicPath, 'main.js'), (err, data) => {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/css; charset=utf-8' });
          response.end('404 Not Found');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
          response.end(data.toString());
        }
      })
      break;

    default:
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end();
      break;

  }
})

server.listen(8888, () => {
  console.log('服务器启动成功');
})
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

  let fileName = pathname?.substring(1) as string;
  if (fileName === '') fileName = 'index.html';
  fs.readFile(p.resolve(publicPath, fileName), (err, data) => {
    if (err) {
      if (err.errno === -4058) {
        response.statusCode = 404
        response.end('你访问的文件不存在啊啊啊啊');
      } else {
        response.statusCode = 500
        response.end('服务器出错了');

      }
    } else {
      // response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data.toString());
    }
  })

})

server.listen(8888, () => {
  console.log('服务器启动成功');
})
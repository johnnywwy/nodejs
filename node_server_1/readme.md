# 学习nodejs 

## day01

### 前期准备
默认你已经安装了node.js，如果没有安装，请先安装node.js，安装教程请参考[nodejs安装](https://nodejs.org/en/download/)

### 1. 新建项目
```bash
mkdir node_server_1
cd node_server_1
```

### 2. 初始化项目
```bash
npm init
```

### 3. 安装@types/node ts-node-dev模块
```
yarn add @types/node --save-dev
yarn add ts-node-dev --dev

```

### 4. 新建index.ts文件
```
touch index.ts
```

### 5. 编写index.ts文件
```ts
import * as http from 'http';

const server = http.createServer()

server.on('request', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  // res.write('Hello World!')
  // res.end()
  console.log('有人请求了');
  res.end('hi')


})

server.listen(8888, () => {
  console.log('服务器启动成功');
})
```

### 6 运行index.ts文件
```
tsnd --respawn index.ts
```
> 运行命令后你将在控制台看到一下信息
> 
> [INFO] 10:40:40 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
> 
> 服务器启动成功

### 7. 访问
```
curl http://localhost:8888
```

> 你将看到
>   
> hi

### 8. 停止服务
```bash
ctrl + c
```

## day02

```js
import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  // res.write('Hello World!')
  // res.end()
  // console.log(request.constructor);
  console.log('method', request.method);
  console.log('headers', request.headers);
  console.log('url', request.url);
  const array: any = []
  request.on('data', (chunk) => {
    array.push(chunk)
  })
  request.on('end', () => {
    const buf = Buffer.concat(array).toString()
    console.log('我是上传完的数据', buf.toString())
    response.end('hi')
  })


  // console.log('有人请求了');
  // response.end('hi')


})

server.listen(8888, () => {
  console.log('服务器启动成功');
})
```


## day03
### 根据url返回不同的内容

```js
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

import { IncomingMessage, ServerResponse } from 'http';

const publicPath = path.join(__dirname, 'public');

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request;
  switch (url) {
    case '/index.html':
      fs.readFile(path.resolve(publicPath, 'index.html'), (err, data) => {
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
      fs.readFile(path.resolve(publicPath, 'style.css'), (err, data) => {
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
      fs.readFile(path.resolve(publicPath, 'main.js'), (err, data) => {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/css; charset=utf-8' });
          response.end('404 Not Found');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
          response.end(data.toString());
        }
      })
      break;
  }
})
server.listen(8888, () => {
  console.log('服务器启动成功');
})
```

## day04
### 使用url.parse()方法解析url

```js
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
```


## day05 
### 匹配任意文件

```js
```
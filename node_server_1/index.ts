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
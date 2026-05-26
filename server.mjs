import http from 'node:http';

const logger = {
  info: (ctx, msg) => console.log(JSON.stringify({ ...ctx, level: 'info', msg, timestamp: new Date().toISOString() })),
  warn: (ctx, msg) => console.error(JSON.stringify({ ...ctx, level: 'warn', msg, timestamp: new Date().toISOString() })),
};

const handler = (req, res) => {
  const start = Date.now();

  const send = (statusCode, body) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.method === 'GET' && req.url === '/') {
    send(200, { message: '👋 Hello, World!' });
    logger.info({ method: 'GET', url: '/', statusCode: 200, duration: Date.now() - start }, 'request completed');
  } else if (req.method === 'GET' && req.url.startsWith('/')) {
    const name = decodeURIComponent(req.url.slice(1));
    send(200, { message: `Hello, ${name}! 🙇‍♂` });
    logger.info({ method: 'GET', url: req.url, statusCode: 200, duration: Date.now() - start }, 'request completed');
  } else {
    send(404, { error: 'Not Found' });
    logger.warn({ method: req.method, url: req.url, statusCode: 404, duration: Date.now() - start }, 'route not found');
  }
};

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  http.createServer(handler).listen(80, () => {
    logger.info({ port: 80 }, 'server started');
  });
}

export default handler;

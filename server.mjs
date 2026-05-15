import http from 'node:http';

const handler = (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '👋 Hello, World!' }));
  } else if (req.method === 'GET' && req.url.startsWith('/')) {
    const name = decodeURIComponent(req.url.slice(1));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `👋 Hello, ${name}!` }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  http.createServer(handler).listen(80, () => {
    console.log('Server running at http://localhost:3000/');
  });
}

export default handler;
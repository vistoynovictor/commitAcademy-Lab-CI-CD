import { describe, it } from 'node:test';
import assert from 'node:assert';
import handler from './server.mjs';

const mockRes = () => {
  let data = '';
  let status = 200;
  return {
    writeHead: (s) => { status = s; },
    end: (d) => { data = d; },
    getData: () => JSON.parse(data),
    getStatus: () => status,
  };
};

describe('GET /', () => {
  it('returns Hello, World!', () => {
    const res = mockRes();
    handler({ method: 'GET', url: '/' }, res);
    assert.strictEqual(res.getStatus(), 200);
    assert.strictEqual(res.getData().message, '👋 Hello, World!');
  });
});

describe('GET /<name>', () => {
  it('returns Hello, Alice!', () => {
    const res = mockRes();
    handler({ method: 'GET', url: '/Alice' }, res);
    assert.strictEqual(res.getStatus(), 200);
    assert.strictEqual(res.getData().message, '👋 Hello, Alice!');
  });

  it('returns Hello, Bob!', () => {
    const res = mockRes();
    handler({ method: 'GET', url: '/Bob' }, res);
    assert.strictEqual(res.getStatus(), 200);
    assert.strictEqual(res.getData().message, '👋 Hello, Bob!');
  });

  it('handles URL-encoded names', () => {
    const res = mockRes();
    handler({ method: 'GET', url: '/John%20Doe' }, res);
    assert.strictEqual(res.getStatus(), 200);
    assert.strictEqual(res.getData().message, '👋 Hello, John Doe!');
  });

  it('returns Hello, unknown!', () => {
    const res = mockRes();
    handler({ method: 'GET', url: '/unknown' }, res);
    assert.strictEqual(res.getStatus(), 200);
    assert.strictEqual(res.getData().message, '👋 Hello, unknown!');
  });
});

describe('Other methods', () => {
  it('returns 404 for POST /', () => {
    const res = mockRes();
    handler({ method: 'POST', url: '/' }, res);
    assert.strictEqual(res.getStatus(), 404);
    assert.strictEqual(res.getData().error, 'Not Found');
  });
});
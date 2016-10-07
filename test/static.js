import test from 'ava';
import Server from './helpers/Server';
import PhantomJS from 'phantomjs-adapter';

const server = new Server();
const browser = new PhantomJS();

test.before(async () => {
  await server.start();
  await browser.open('http://127.0.0.1:8080');
});

test(async (t) => {
  const paragraph = await browser.find('p');
  t.not(paragraph, null);
  t.is(paragraph.textContent, 'Hello World!');
});

test.after.always(async () => {
  await browser.exit();
  await server.stop();
});

import {spawn} from 'child_process';

export default class {
  async start() {
    this.process = spawn('npm', ['start']);
    await new Promise((resolve, reject) => {
      this.process.once('close', () => {
        reject('Server did not start');
      });
      this.process.stdout.on('data', (data) => {
        if (data.includes('bundle is now VALID.')) {
          setTimeout(resolve, 1000);
        }
      });
    });
  }

  async stop() {
    this.process.kill();
    await new Promise((resolve) => {
      if (!this.process.connected) {
        resolve();
      }
      this.process.on('close', resolve);
    });
  }
}

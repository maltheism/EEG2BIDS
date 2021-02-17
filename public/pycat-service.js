const {fork} = require('child_process');

/**
 * PycatService
 */
module.exports = class PycatService {
  /**
   * constructor
   * @param {string} mode
   */
  constructor(mode) {
    const os = require('os');
    this.platform = os.platform(); // darwin or win32.
    this.process = null; // the service process.
    this.mode = mode;
  }
  /**
   * startup the service process
   */
  startup() {
    if (this.mode === 'development') return;
    const pathToService = require('path').join(
        __dirname,
        '..',
        this.platform === 'win32' ?
          'dist/pycat-service-windows.exe' :
          'dist/pycat-service'
    );
    this.process = fork(pathToService, {silent: true});
  }
  /**
   * shutdown the service process
   */
  shutdown() {
    if (this.mode === 'development') return;
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
  }
};
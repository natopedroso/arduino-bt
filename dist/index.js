/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8309:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const debug = __nccwpck_require__(7606)('serialport/binding-abstract')

/**
 * @name Binding
 * @type {AbstractBinding}
 * @since 5.0.0
 * @description The `Binding` is how Node-SerialPort talks to the underlying system. By default, we auto detect Windows, Linux and OS X, and load the appropriate module for your system. You can assign `SerialPort.Binding` to any binding you like. Find more by searching at [npm](https://npmjs.org/).
  Prevent auto loading the default bindings by requiring SerialPort with:
  ```js
  var SerialPort = require('@serialport/stream');
  SerialPort.Binding = MyBindingClass;
  ```
 */

/**
 * You never have to use `Binding` objects directly. SerialPort uses them to access the underlying hardware. This documentation is geared towards people who are making bindings for different platforms. This class can be inherited from to get type checking for each method.
 * @class AbstractBinding
 * @param {object} options options for the binding
 * @property {boolean} isOpen Required property. `true` if the port is open, `false` otherwise. Should be read-only.
 * @throws {TypeError} When given invalid arguments, a `TypeError` is thrown.
 * @since 5.0.0
 */
class AbstractBinding {
  /**
   * Retrieves a list of available serial ports with metadata. The `path` must be guaranteed, and all other fields should be undefined if unavailable. The `path` is either the path or an identifier (eg `COM1`) used to open the serialport.
   * @returns {Promise} resolves to an array of port [info objects](#module_serialport--SerialPort.list).
   */
  static async list() {
    debug('list')
  }

  constructor(opt = {}) {
    if (typeof opt !== 'object') {
      throw new TypeError('"options" is not an object')
    }
  }

  /**
   * Opens a connection to the serial port referenced by the path.
   * @param {string} path the path or com port to open
   * @param {openOptions} options openOptions for the serialport
   * @returns {Promise} Resolves after the port is opened and configured.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async open(path, options) {
    if (!path) {
      throw new TypeError('"path" is not a valid port')
    }

    if (typeof options !== 'object') {
      throw new TypeError('"options" is not an object')
    }
    debug('open')

    if (this.isOpen) {
      throw new Error('Already open')
    }
  }

  /**
   * Closes an open connection
   * @returns {Promise} Resolves once the connection is closed.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async close() {
    debug('close')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Request a number of bytes from the SerialPort. This function is similar to Node's [`fs.read`](http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback) except it will always return at least one byte.

The in progress reads must error when the port is closed with an error object that has the property `canceled` equal to `true`. Any other error will cause a disconnection.

   * @param {buffer} buffer Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object.
   * @param {integer} offset The offset in the buffer to start writing at.
   * @param {integer} length Specifies the maximum number of bytes to read.
   * @returns {Promise} Resolves with the number of bytes read after a read operation.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async read(buffer, offset, length) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError('"buffer" is not a Buffer')
    }

    if (typeof offset !== 'number' || isNaN(offset)) {
      throw new TypeError(`"offset" is not an integer got "${isNaN(offset) ? 'NaN' : typeof offset}"`)
    }

    if (typeof length !== 'number' || isNaN(length)) {
      throw new TypeError(`"length" is not an integer got "${isNaN(length) ? 'NaN' : typeof length}"`)
    }

    debug('read')
    if (buffer.length < offset + length) {
      throw new Error('buffer is too small')
    }

    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Write bytes to the SerialPort. Only called when there is no pending write operation.

The in progress writes must error when the port is closed with an error object that has the property `canceled` equal to `true`. Any other error will cause a disconnection.

   * @param {buffer} buffer - Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object.
   * @returns {Promise} Resolves after the data is passed to the operating system for writing.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async write(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError('"buffer" is not a Buffer')
    }

    debug('write', buffer.length, 'bytes')
    if (!this.isOpen) {
      debug('write', 'error port is not open')

      throw new Error('Port is not open')
    }
  }

  /**
   * Changes connection settings on an open port. Only `baudRate` is supported.
   * @param {object=} options Only supports `baudRate`.
   * @param {number=} [options.baudRate] If provided a baud rate that the bindings do not support, it should reject.
   * @returns {Promise} Resolves once the port's baud rate changes.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async update(options) {
    if (typeof options !== 'object') {
      throw TypeError('"options" is not an object')
    }

    if (typeof options.baudRate !== 'number') {
      throw new TypeError('"options.baudRate" is not a number')
    }

    debug('update')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Set control flags on an open port.
   * @param {object=} options All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. All options are always provided.
   * @param {Boolean} [options.brk=false] flag for brk
   * @param {Boolean} [options.cts=false] flag for cts
   * @param {Boolean} [options.dsr=false] flag for dsr
   * @param {Boolean} [options.dtr=true] flag for dtr
   * @param {Boolean} [options.rts=true] flag for rts
   * @param {Boolean} [options.lowLatency=false] flag for lowLatency mode on Linux
   * @returns {Promise} Resolves once the port's flags are set.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async set(options) {
    if (typeof options !== 'object') {
      throw new TypeError('"options" is not an object')
    }
    debug('set')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Get the control flags (CTS, DSR, DCD) on the open port.
   * @returns {Promise} Resolves with the retrieved flags.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async get() {
    debug('get')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Get the OS reported baud rate for the open port.
   * Used mostly for debugging custom baud rates.
   * @returns {Promise} Resolves with the current baud rate.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async getBaudRate() {
    debug('getbaudRate')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Flush (discard) data received but not read, and written but not transmitted.
   * @returns {Promise} Resolves once the flush operation finishes.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async flush() {
    debug('flush')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }

  /**
   * Drain waits until all output data is transmitted to the serial port. An in progress write should be completed before this returns.
   * @returns {Promise} Resolves once the drain operation finishes.
   * @rejects {TypeError} When given invalid arguments, a `TypeError` is rejected.
   */
  async drain() {
    debug('drain')
    if (!this.isOpen) {
      throw new Error('Port is not open')
    }
  }
}

module.exports = AbstractBinding


/***/ }),

/***/ 9450:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { promisify } = __nccwpck_require__(3837)
const binding = require(__nccwpck_require__.ab + "build/Release/bindings.node")
const AbstractBinding = __nccwpck_require__(8309)
const Poller = __nccwpck_require__(7251)
const unixRead = __nccwpck_require__(3498)
const unixWrite = __nccwpck_require__(808)
const { wrapWithHiddenComName } = __nccwpck_require__(4364)

const defaultBindingOptions = Object.freeze({
  vmin: 1,
  vtime: 0,
})

const asyncList = promisify(binding.list)
const asyncOpen = promisify(binding.open)
const asyncClose = promisify(binding.close)
const asyncUpdate = promisify(binding.update)
const asyncSet = promisify(binding.set)
const asyncGet = promisify(binding.get)
const asyncGetBaudRate = promisify(binding.getBaudRate)
const asyncDrain = promisify(binding.drain)
const asyncFlush = promisify(binding.flush)

/**
 * The Darwin binding layer for OSX
 */
class DarwinBinding extends AbstractBinding {
  static list() {
    return wrapWithHiddenComName(asyncList())
  }

  constructor(opt = {}) {
    super(opt)
    this.bindingOptions = { ...defaultBindingOptions, ...opt.bindingOptions }
    this.fd = null
    this.writeOperation = null
  }

  get isOpen() {
    return this.fd !== null
  }

  async open(path, options) {
    await super.open(path, options)
    this.openOptions = { ...this.bindingOptions, ...options }
    const fd = await asyncOpen(path, this.openOptions)
    this.fd = fd
    this.poller = new Poller(fd)
  }

  async close() {
    await super.close()
    const fd = this.fd
    this.poller.stop()
    this.poller.destroy()
    this.poller = null
    this.openOptions = null
    this.fd = null
    return asyncClose(fd)
  }

  async read(buffer, offset, length) {
    await super.read(buffer, offset, length)
    return unixRead({ binding: this, buffer, offset, length })
  }

  async write(buffer) {
    this.writeOperation = super.write(buffer).then(async () => {
      if (buffer.length === 0) {
        return
      }
      await unixWrite({ binding: this, buffer })
      this.writeOperation = null
    })
    return this.writeOperation
  }

  async update(options) {
    await super.update(options)
    return asyncUpdate(this.fd, options)
  }

  async set(options) {
    await super.set(options)
    return asyncSet(this.fd, options)
  }

  async get() {
    await super.get()
    return asyncGet(this.fd)
  }

  async getBaudRate() {
    await super.get()
    return asyncGetBaudRate(this.fd)
  }

  async drain() {
    await super.drain()
    await this.writeOperation
    return asyncDrain(this.fd)
  }

  async flush() {
    await super.flush()
    return asyncFlush(this.fd)
  }
}

module.exports = DarwinBinding


/***/ }),

/***/ 5036:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const debug = __nccwpck_require__(7606)('serialport/bindings')

switch (process.platform) {
  case 'win32':
    debug('loading WindowsBinding')
    module.exports = __nccwpck_require__(9325)
    break
  case 'darwin':
    debug('loading DarwinBinding')
    module.exports = __nccwpck_require__(9450)
    break
  default:
    debug('loading LinuxBinding')
    module.exports = __nccwpck_require__(8910)
}


/***/ }),

/***/ 4364:
/***/ ((module) => {

let warningSent = false

const wrapWithHiddenComName = async portsPromise => {
  const ports = await portsPromise
  return ports.map(port => {
    const newPort = { ...port }
    return Object.defineProperties(newPort, {
      comName: {
        get() {
          if (!warningSent) {
            warningSent = true
            console.warn(
              `"PortInfo.comName" has been deprecated. You should now use "PortInfo.path". The property will be removed in the next major release.`
            )
          }
          return newPort.path
        },
        enumerable: false,
      },
    })
  })
}

module.exports = {
  wrapWithHiddenComName,
}


/***/ }),

/***/ 6218:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const childProcess = __nccwpck_require__(2081)
const Readline = __nccwpck_require__(8246)

// get only serial port names
function checkPathOfDevice(path) {
  return /(tty(S|WCH|ACM|USB|AMA|MFD|O|XRUSB)|rfcomm)/.test(path) && path
}

function propName(name) {
  return {
    DEVNAME: 'path',
    ID_VENDOR_ENC: 'manufacturer',
    ID_SERIAL_SHORT: 'serialNumber',
    ID_VENDOR_ID: 'vendorId',
    ID_MODEL_ID: 'productId',
    DEVLINKS: 'pnpId',
  }[name.toUpperCase()]
}

function decodeHexEscape(str) {
  return str.replace(/\\x([a-fA-F0-9]{2})/g, (a, b) => {
    return String.fromCharCode(parseInt(b, 16))
  })
}

function propVal(name, val) {
  if (name === 'pnpId') {
    const match = val.match(/\/by-id\/([^\s]+)/)
    return (match && match[1]) || undefined
  }
  if (name === 'manufacturer') {
    return decodeHexEscape(val)
  }
  if (/^0x/.test(val)) {
    return val.substr(2)
  }
  return val
}

function listLinux() {
  return new Promise((resolve, reject) => {
    const ports = []
    const ude = childProcess.spawn('udevadm', ['info', '-e'])
    const lines = ude.stdout.pipe(new Readline())
    ude.on('close', code => code && reject(new Error(`Error listing ports udevadm exited with error code: ${code}`)))
    ude.on('error', reject)
    lines.on('error', reject)

    let port = {}
    let skipPort = false
    lines.on('data', line => {
      const lineType = line.slice(0, 1)
      const data = line.slice(3)
      // new port entry
      if (lineType === 'P') {
        port = {
          manufacturer: undefined,
          serialNumber: undefined,
          pnpId: undefined,
          locationId: undefined,
          vendorId: undefined,
          productId: undefined,
        }
        skipPort = false
        return
      }

      if (skipPort) {
        return
      }

      // Check dev name and save port if it matches flag to skip the rest of the data if not
      if (lineType === 'N') {
        if (checkPathOfDevice(data)) {
          ports.push(port)
        } else {
          skipPort = true
        }
        return
      }

      // parse data about each port
      if (lineType === 'E') {
        const keyValue = data.match(/^(.+)=(.*)/)
        if (!keyValue) {
          return
        }
        const key = propName(keyValue[1])
        if (!key) {
          return
        }
        port[key] = propVal(key, keyValue[2])
      }
    })

    lines.on('finish', () => resolve(ports))
  })
}

module.exports = listLinux


/***/ }),

/***/ 8910:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { promisify } = __nccwpck_require__(3837)
const binding = require(__nccwpck_require__.ab + "build/Release/bindings.node")
const AbstractBinding = __nccwpck_require__(8309)
const linuxList = __nccwpck_require__(6218)
const Poller = __nccwpck_require__(7251)
const unixRead = __nccwpck_require__(3498)
const unixWrite = __nccwpck_require__(808)
const { wrapWithHiddenComName } = __nccwpck_require__(4364)

const defaultBindingOptions = Object.freeze({
  vmin: 1,
  vtime: 0,
})

const asyncOpen = promisify(binding.open)
const asyncClose = promisify(binding.close)
const asyncUpdate = promisify(binding.update)
const asyncSet = promisify(binding.set)
const asyncGet = promisify(binding.get)
const asyncGetBaudRate = promisify(binding.getBaudRate)
const asyncDrain = promisify(binding.drain)
const asyncFlush = promisify(binding.flush)

/**
 * The linux binding layer
 */
class LinuxBinding extends AbstractBinding {
  static list() {
    return wrapWithHiddenComName(linuxList())
  }

  constructor(opt = {}) {
    super(opt)
    this.bindingOptions = { ...defaultBindingOptions, ...opt.bindingOptions }
    this.fd = null
    this.writeOperation = null
  }

  get isOpen() {
    return this.fd !== null
  }

  async open(path, options) {
    await super.open(path, options)
    this.openOptions = { ...this.bindingOptions, ...options }
    const fd = await asyncOpen(path, this.openOptions)
    this.fd = fd
    this.poller = new Poller(fd)
  }

  async close() {
    await super.close()
    const fd = this.fd
    this.poller.stop()
    this.poller.destroy()
    this.poller = null
    this.openOptions = null
    this.fd = null
    return asyncClose(fd)
  }

  async read(buffer, offset, length) {
    await super.read(buffer, offset, length)
    return unixRead({ binding: this, buffer, offset, length })
  }

  async write(buffer) {
    this.writeOperation = super.write(buffer).then(async () => {
      if (buffer.length === 0) {
        return
      }
      await unixWrite({ binding: this, buffer })
      this.writeOperation = null
    })
    return this.writeOperation
  }

  async update(options) {
    await super.update(options)
    return asyncUpdate(this.fd, options)
  }

  async set(options) {
    await super.set(options)
    return asyncSet(this.fd, options)
  }

  async get() {
    await super.get()
    return asyncGet(this.fd)
  }

  async getBaudRate() {
    await super.get()
    return asyncGetBaudRate(this.fd)
  }

  async drain() {
    await super.drain()
    await this.writeOperation
    return asyncDrain(this.fd)
  }

  async flush() {
    await super.flush()
    return asyncFlush(this.fd)
  }
}

module.exports = LinuxBinding


/***/ }),

/***/ 7251:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const debug = __nccwpck_require__(7606)
const logger = debug('serialport/bindings/poller')
const EventEmitter = __nccwpck_require__(2361)
const PollerBindings = require(__nccwpck_require__.ab + "build/Release/bindings.node").Poller

const EVENTS = {
  UV_READABLE: 0b0001,
  UV_WRITABLE: 0b0010,
  UV_DISCONNECT: 0b0100,
}

function handleEvent(error, eventFlag) {
  if (error) {
    logger('error', error)
    this.emit('readable', error)
    this.emit('writable', error)
    this.emit('disconnect', error)
    return
  }
  if (eventFlag & EVENTS.UV_READABLE) {
    logger('received "readable"')
    this.emit('readable', null)
  }
  if (eventFlag & EVENTS.UV_WRITABLE) {
    logger('received "writable"')
    this.emit('writable', null)
  }
  if (eventFlag & EVENTS.UV_DISCONNECT) {
    logger('received "disconnect"')
    this.emit('disconnect', null)
  }
}

/**
 * Polls unix systems for readable or writable states of a file or serialport
 */
class Poller extends EventEmitter {
  constructor(fd, FDPoller = PollerBindings) {
    logger('Creating poller')
    super()
    this.poller = new FDPoller(fd, handleEvent.bind(this))
  }
  /**
   * Wait for the next event to occur
   * @param {string} event ('readable'|'writable'|'disconnect')
   * @returns {Poller} returns itself
   */
  once(event, callback) {
    switch (event) {
      case 'readable':
        this.poll(EVENTS.UV_READABLE)
        break
      case 'writable':
        this.poll(EVENTS.UV_WRITABLE)
        break
      case 'disconnect':
        this.poll(EVENTS.UV_DISCONNECT)
        break
    }
    return super.once(event, callback)
  }

  /**
   * Ask the bindings to listen for an event, it is recommend to use `.once()` for easy use
   * @param {EVENTS} eventFlag polls for an event or group of events based upon a flag.
   * @returns {undefined}
   */
  poll(eventFlag) {
    eventFlag = eventFlag || 0

    if (eventFlag & EVENTS.UV_READABLE) {
      logger('Polling for "readable"')
    }
    if (eventFlag & EVENTS.UV_WRITABLE) {
      logger('Polling for "writable"')
    }
    if (eventFlag & EVENTS.UV_DISCONNECT) {
      logger('Polling for "disconnect"')
    }

    this.poller.poll(eventFlag)
  }

  /**
   * Stop listening for events and cancel all outstanding listening with an error
   * @returns {undefined}
   */
  stop() {
    logger('Stopping poller')
    this.poller.stop()
    this.emitCanceled()
  }

  destroy() {
    logger('Destroying poller')
    this.poller.destroy()
    this.emitCanceled()
  }

  emitCanceled() {
    const err = new Error('Canceled')
    err.canceled = true
    this.emit('readable', err)
    this.emit('writable', err)
    this.emit('disconnect', err)
  }
}

Poller.EVENTS = EVENTS

module.exports = Poller


/***/ }),

/***/ 3498:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(7147)
const debug = __nccwpck_require__(7606)
const logger = debug('serialport/bindings/unixRead')
const { promisify } = __nccwpck_require__(3837)

const readAsync = promisify(fs.read)

const readable = binding => {
  return new Promise((resolve, reject) => {
    binding.poller.once('readable', err => (err ? reject(err) : resolve()))
  })
}

const unixRead = async ({ binding, buffer, offset, length, fsReadAsync = readAsync }) => {
  logger('Starting read')
  if (!binding.isOpen) {
    const err = new Error('Port is not open')
    err.canceled = true
    throw err
  }

  try {
    const { bytesRead } = await fsReadAsync(binding.fd, buffer, offset, length, null)
    if (bytesRead === 0) {
      return unixRead({ binding, buffer, offset, length, fsReadAsync })
    }
    logger('Finished read', bytesRead, 'bytes')
    return { bytesRead, buffer }
  } catch (err) {
    logger('read error', err)
    if (err.code === 'EAGAIN' || err.code === 'EWOULDBLOCK' || err.code === 'EINTR') {
      if (!binding.isOpen) {
        const err = new Error('Port is not open')
        err.canceled = true
        throw err
      }
      logger('waiting for readable because of code:', err.code)
      await readable(binding)
      return unixRead({ binding, buffer, offset, length, fsReadAsync })
    }

    const disconnectError =
      err.code === 'EBADF' || // Bad file number means we got closed
      err.code === 'ENXIO' || // No such device or address probably usb disconnect
      err.code === 'UNKNOWN' ||
      err.errno === -1 // generic error

    if (disconnectError) {
      err.disconnect = true
      logger('disconnecting', err)
    }

    throw err
  }
}

module.exports = unixRead


/***/ }),

/***/ 808:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(7147)
const debug = __nccwpck_require__(7606)
const logger = debug('serialport/bindings/unixWrite')
const { promisify } = __nccwpck_require__(3837)

const writeAsync = promisify(fs.write)

const writable = binding => {
  return new Promise((resolve, reject) => {
    binding.poller.once('writable', err => (err ? reject(err) : resolve()))
  })
}

const unixWrite = async ({ binding, buffer, offset = 0, fsWriteAsync = writeAsync }) => {
  const bytesToWrite = buffer.length - offset
  logger('Starting write', buffer.length, 'bytes offset', offset, 'bytesToWrite', bytesToWrite)
  if (!binding.isOpen) {
    throw new Error('Port is not open')
  }
  try {
    const { bytesWritten } = await fsWriteAsync(binding.fd, buffer, offset, bytesToWrite)
    logger('write returned: wrote', bytesWritten, 'bytes')
    if (bytesWritten + offset < buffer.length) {
      if (!binding.isOpen) {
        throw new Error('Port is not open')
      }
      return unixWrite({ binding, buffer, offset: bytesWritten + offset, fsWriteAsync })
    }

    logger('Finished writing', bytesWritten + offset, 'bytes')
  } catch (err) {
    logger('write errored', err)
    if (err.code === 'EAGAIN' || err.code === 'EWOULDBLOCK' || err.code === 'EINTR') {
      if (!binding.isOpen) {
        throw new Error('Port is not open')
      }
      logger('waiting for writable because of code:', err.code)
      await writable(binding)
      return unixWrite({ binding, buffer, offset, fsWriteAsync })
    }

    const disconnectError =
      err.code === 'EBADF' || // Bad file number means we got closed
      err.code === 'ENXIO' || // No such device or address probably usb disconnect
      err.code === 'UNKNOWN' ||
      err.errno === -1 // generic error

    if (disconnectError) {
      err.disconnect = true
      logger('disconnecting', err)
    }

    logger('error', err)
    throw err
  }
}
module.exports = unixWrite


/***/ }),

/***/ 7489:
/***/ ((module) => {

const PARSERS = [/USB\\(?:.+)\\(.+)/, /FTDIBUS\\(?:.+)\+(.+?)A?\\.+/]

module.exports = pnpId => {
  if (!pnpId) {
    return null
  }
  for (const parser of PARSERS) {
    const sn = pnpId.match(parser)
    if (sn) {
      return sn[1]
    }
  }
  return null
}


/***/ }),

/***/ 9325:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const binding = require(__nccwpck_require__.ab + "build/Release/bindings.node")
const AbstractBinding = __nccwpck_require__(8309)
const { promisify } = __nccwpck_require__(3837)
const serialNumParser = __nccwpck_require__(7489)

const asyncList = promisify(binding.list)
const asyncOpen = promisify(binding.open)
const asyncClose = promisify(binding.close)
const asyncRead = promisify(binding.read)
const asyncWrite = promisify(binding.write)
const asyncUpdate = promisify(binding.update)
const asyncSet = promisify(binding.set)
const asyncGet = promisify(binding.get)
const asyncGetBaudRate = promisify(binding.getBaudRate)
const asyncDrain = promisify(binding.drain)
const asyncFlush = promisify(binding.flush)
const { wrapWithHiddenComName } = __nccwpck_require__(4364)

/**
 * The Windows binding layer
 */
class WindowsBinding extends AbstractBinding {
  static async list() {
    const ports = await asyncList()
    // Grab the serial number from the pnp id
    return wrapWithHiddenComName(
      ports.map(port => {
        if (port.pnpId && !port.serialNumber) {
          const serialNumber = serialNumParser(port.pnpId)
          if (serialNumber) {
            return {
              ...port,
              serialNumber,
            }
          }
        }
        return port
      })
    )
  }

  constructor(opt = {}) {
    super(opt)
    this.bindingOptions = { ...opt.bindingOptions }
    this.fd = null
    this.writeOperation = null
  }

  get isOpen() {
    return this.fd !== null
  }

  async open(path, options) {
    await super.open(path, options)
    this.openOptions = { ...this.bindingOptions, ...options }
    const fd = await asyncOpen(path, this.openOptions)
    this.fd = fd
  }

  async close() {
    await super.close()
    const fd = this.fd
    this.fd = null
    return asyncClose(fd)
  }

  async read(buffer, offset, length) {
    await super.read(buffer, offset, length)
    try {
      const bytesRead = await asyncRead(this.fd, buffer, offset, length)
      return { bytesRead, buffer }
    } catch (err) {
      if (!this.isOpen) {
        err.canceled = true
      }
      throw err
    }
  }

  async write(buffer) {
    this.writeOperation = super.write(buffer).then(async () => {
      if (buffer.length === 0) {
        return
      }
      await asyncWrite(this.fd, buffer)
      this.writeOperation = null
    })
    return this.writeOperation
  }

  async update(options) {
    await super.update(options)
    return asyncUpdate(this.fd, options)
  }

  async set(options) {
    await super.set(options)
    return asyncSet(this.fd, options)
  }

  async get() {
    await super.get()
    return asyncGet(this.fd)
  }

  async getBaudRate() {
    await super.get()
    return asyncGetBaudRate(this.fd)
  }

  async drain() {
    await super.drain()
    await this.writeOperation
    return asyncDrain(this.fd)
  }

  async flush() {
    await super.flush()
    return asyncFlush(this.fd)
  }
}

module.exports = WindowsBinding


/***/ }),

/***/ 8877:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Transform } = __nccwpck_require__(2781)

/**
 * Emit data every number of bytes
 * @extends Transform
 * @param {Object} options parser options object
 * @param {Number} options.length the number of bytes on each data event
 * @summary A transform stream that emits data as a buffer after a specific number of bytes are received. Runs in O(n) time.
 * @example
const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new ByteLength({length: 8}))
parser.on('data', console.log) // will have 8 bytes per data event
 */
class ByteLengthParser extends Transform {
  constructor(options = {}) {
    super(options)

    if (typeof options.length !== 'number') {
      throw new TypeError('"length" is not a number')
    }

    if (options.length < 1) {
      throw new TypeError('"length" is not greater than 0')
    }

    this.length = options.length
    this.position = 0
    this.buffer = Buffer.alloc(this.length)
  }

  _transform(chunk, encoding, cb) {
    let cursor = 0
    while (cursor < chunk.length) {
      this.buffer[this.position] = chunk[cursor]
      cursor++
      this.position++
      if (this.position === this.length) {
        this.push(this.buffer)
        this.buffer = Buffer.alloc(this.length)
        this.position = 0
      }
    }
    cb()
  }

  _flush(cb) {
    this.push(this.buffer.slice(0, this.position))
    this.buffer = Buffer.alloc(this.length)
    cb()
  }
}

module.exports = ByteLengthParser


/***/ }),

/***/ 4946:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Transform } = __nccwpck_require__(2781)

/**
 * Parse the CCTalk protocol
 * @extends Transform
 * @summary A transform stream that emits CCTalk packets as they are received.
 * @example
const SerialPort = require('serialport')
const CCTalk = require('@serialport/parser-cctalk')
const port = new SerialPort('/dev/ttyUSB0')
const parser = port.pipe(new CCtalk())
parser.on('data', console.log)
 */
class CCTalkParser extends Transform {
  constructor(maxDelayBetweenBytesMs = 50) {
    super()
    this.array = []
    this.cursor = 0
    this.lastByteFetchTime = 0
    this.maxDelayBetweenBytesMs = maxDelayBetweenBytesMs
  }
  _transform(buffer, _, cb) {
    if (this.maxDelayBetweenBytesMs > 0) {
      const now = Date.now()
      if (now - this.lastByteFetchTime > this.maxDelayBetweenBytesMs) {
        this.array = []
        this.cursor = 0
      }
      this.lastByteFetchTime = now
    }

    this.cursor += buffer.length
    // TODO: Better Faster es7 no supported by node 4
    // ES7 allows directly push [...buffer]
    // this.array = this.array.concat(Array.from(buffer)) //Slower ?!?
    Array.from(buffer).map(byte => this.array.push(byte))
    while (this.cursor > 1 && this.cursor >= this.array[1] + 5) {
      // full frame accumulated
      // copy command from the array
      const FullMsgLength = this.array[1] + 5

      const frame = Buffer.from(this.array.slice(0, FullMsgLength))
      // Preserve Extra Data
      this.array = this.array.slice(frame.length, this.array.length)
      this.cursor -= FullMsgLength
      this.push(frame)
    }
    cb()
  }
}

module.exports = CCTalkParser


/***/ }),

/***/ 7019:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Transform } = __nccwpck_require__(2781)

/**
 * A transform stream that emits data each time a byte sequence is received.
 * @extends Transform
 * @summary To use the `Delimiter` parser, provide a delimiter as a string, buffer, or array of bytes. Runs in O(n) time.
 * @example
const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Delimiter({ delimiter: '\n' }))
parser.on('data', console.log)
 */
class DelimiterParser extends Transform {
  constructor(options = {}) {
    super(options)

    if (options.delimiter === undefined) {
      throw new TypeError('"delimiter" is not a bufferable object')
    }

    if (options.delimiter.length === 0) {
      throw new TypeError('"delimiter" has a 0 or undefined length')
    }

    this.includeDelimiter = options.includeDelimiter !== undefined ? options.includeDelimiter : false
    this.delimiter = Buffer.from(options.delimiter)
    this.buffer = Buffer.alloc(0)
  }

  _transform(chunk, encoding, cb) {
    let data = Buffer.concat([this.buffer, chunk])
    let position
    while ((position = data.indexOf(this.delimiter)) !== -1) {
      this.push(data.slice(0, position + (this.includeDelimiter ? this.delimiter.length : 0)))
      data = data.slice(position + this.delimiter.length)
    }
    this.buffer = data
    cb()
  }

  _flush(cb) {
    this.push(this.buffer)
    this.buffer = Buffer.alloc(0)
    cb()
  }
}

module.exports = DelimiterParser


/***/ }),

/***/ 5907:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Transform } = __nccwpck_require__(2781)

/**
 * Emits data if there is a pause between packets for the specified amount of time.
 * @extends Transform
 * @param {Object} options parser options object
 * @param {Number} options.interval the period of silence in milliseconds after which data is emited
 * @param {Number} options.maxBufferSize the maximum number of bytes after which data will be emited. Defaults to 65536.
 * @summary A transform stream that emits data as a buffer after not receiving any bytes for the specified amount of time.
 * @example
const SerialPort = require('serialport')
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new InterByteTimeout({interval: 30}))
parser.on('data', console.log) // will emit data if there is a pause between packets greater than 30ms
 */

class InterByteTimeoutParser extends Transform {
  constructor(options) {
    super()
    options = { maxBufferSize: 65536, ...options }
    if (!options.interval) {
      throw new TypeError('"interval" is required')
    }

    if (typeof options.interval !== 'number' || Number.isNaN(options.interval)) {
      throw new TypeError('"interval" is not a number')
    }

    if (options.interval < 1) {
      throw new TypeError('"interval" is not greater than 0')
    }

    if (typeof options.maxBufferSize !== 'number' || Number.isNaN(options.maxBufferSize)) {
      throw new TypeError('"maxBufferSize" is not a number')
    }

    if (options.maxBufferSize < 1) {
      throw new TypeError('"maxBufferSize" is not greater than 0')
    }

    this.maxBufferSize = options.maxBufferSize
    this.currentPacket = []
    this.interval = options.interval
    this.intervalID = -1
  }
  _transform(chunk, encoding, cb) {
    clearTimeout(this.intervalID)
    for (let offset = 0; offset < chunk.length; offset++) {
      this.currentPacket.push(chunk[offset])
      if (this.currentPacket.length >= this.maxBufferSize) {
        this.emitPacket()
      }
    }
    this.intervalID = setTimeout(this.emitPacket.bind(this), this.interval)
    cb()
  }
  emitPacket() {
    clearTimeout(this.intervalID)
    if (this.currentPacket.length > 0) {
      this.push(Buffer.from(this.currentPacket))
    }
    this.currentPacket = []
  }
  _flush(cb) {
    this.emitPacket()
    cb()
  }
}

module.exports = InterByteTimeoutParser


/***/ }),

/***/ 8246:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const DelimiterParser = __nccwpck_require__(7019)

/**
 *  A transform stream that emits data after a newline delimiter is received.
 * @summary To use the `Readline` parser, provide a delimiter (defaults to `\n`). Data is emitted as string controllable by the `encoding` option (defaults to `utf8`).
 * @extends DelimiterParser
 * @example
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)
*/
class ReadLineParser extends DelimiterParser {
  constructor(options) {
    const opts = {
      delimiter: Buffer.from('\n', 'utf8'),
      encoding: 'utf8',
      ...options,
    }

    if (typeof opts.delimiter === 'string') {
      opts.delimiter = Buffer.from(opts.delimiter, opts.encoding)
    }

    super(opts)
  }
}

module.exports = ReadLineParser


/***/ }),

/***/ 509:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Transform } = __nccwpck_require__(2781)

/**
 * A transform stream that waits for a sequence of "ready" bytes before emitting a ready event and emitting data events
 * @summary To use the `Ready` parser provide a byte start sequence. After the bytes have been received a ready event is fired and data events are passed through.
 * @extends Transform
 * @example
const SerialPort = require('serialport')
const Ready = require('@serialport/parser-ready')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Ready({ delimiter: 'READY' }))
parser.on('ready', () => console.log('the ready byte sequence has been received'))
parser.on('data', console.log) // all data after READY is received
 */
class ReadyParser extends Transform {
  /**
   *
   * @param {object} options options for the parser
   * @param {string|Buffer|array} options.delimiter data to look for before emitted "ready"
   */
  constructor(options = {}) {
    if (options.delimiter === undefined) {
      throw new TypeError('"delimiter" is not a bufferable object')
    }

    if (options.delimiter.length === 0) {
      throw new TypeError('"delimiter" has a 0 or undefined length')
    }

    super(options)
    this.delimiter = Buffer.from(options.delimiter)
    this.readOffset = 0
    this.ready = false
  }

  _transform(chunk, encoding, cb) {
    if (this.ready) {
      this.push(chunk)
      return cb()
    }
    const delimiter = this.delimiter
    let chunkOffset = 0
    while (this.readOffset < delimiter.length && chunkOffset < chunk.length) {
      if (delimiter[this.readOffset] === chunk[chunkOffset]) {
        this.readOffset++
      } else {
        this.readOffset = 0
      }
      chunkOffset++
    }
    if (this.readOffset === delimiter.length) {
      this.ready = true
      this.emit('ready')
      const chunkRest = chunk.slice(chunkOffset)
      if (chunkRest.length > 0) {
        this.push(chunkRest)
      }
    }
    cb()
  }
}

module.exports = ReadyParser


/***/ }),

/***/ 1214:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Transform } = __nccwpck_require__(2781)

/**
 * A transform stream that uses a regular expression to split the incoming text upon.
 *
 * To use the `Regex` parser provide a regular expression to split the incoming text upon. Data is emitted as string controllable by the `encoding` option (defaults to `utf8`).
 * @extends Transform
 * @example
const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Regex({ regex: /[\r\n]+/ }))
parser.on('data', console.log)
 */
class RegexParser extends Transform {
  constructor(options) {
    const opts = {
      encoding: 'utf8',
      ...options,
    }

    if (opts.regex === undefined) {
      throw new TypeError('"options.regex" must be a regular expression pattern or object')
    }

    if (!(opts.regex instanceof RegExp)) {
      opts.regex = new RegExp(opts.regex)
    }
    super(opts)

    this.regex = opts.regex
    this.data = ''
  }

  _transform(chunk, encoding, cb) {
    const data = this.data + chunk
    const parts = data.split(this.regex)
    this.data = parts.pop()

    parts.forEach(part => {
      this.push(part)
    })
    cb()
  }

  _flush(cb) {
    this.push(this.data)
    this.data = ''
    cb()
  }
}

module.exports = RegexParser


/***/ }),

/***/ 2433:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const stream = __nccwpck_require__(2781)
const util = __nccwpck_require__(3837)
const debug = __nccwpck_require__(7606)('serialport/stream')

//  VALIDATION
const DATABITS = Object.freeze([5, 6, 7, 8])
const STOPBITS = Object.freeze([1, 1.5, 2])
const PARITY = Object.freeze(['none', 'even', 'mark', 'odd', 'space'])
const FLOWCONTROLS = Object.freeze(['xon', 'xoff', 'xany', 'rtscts'])

const defaultSettings = Object.freeze({
  autoOpen: true,
  endOnClose: false,
  baudRate: 9600,
  dataBits: 8,
  hupcl: true,
  lock: true,
  parity: 'none',
  rtscts: false,
  stopBits: 1,
  xany: false,
  xoff: false,
  xon: false,
  highWaterMark: 64 * 1024,
})

const defaultSetFlags = Object.freeze({
  brk: false,
  cts: false,
  dtr: true,
  dts: false,
  rts: true,
})

function allocNewReadPool(poolSize) {
  const pool = Buffer.allocUnsafe(poolSize)
  pool.used = 0
  return pool
}

/**
 * A callback called with an error or null.
 * @typedef {function} errorCallback
 * @param {?error} error
 */

/**
 * A callback called with an error or an object with the modem line values (cts, dsr, dcd).
 * @typedef {function} modemBitsCallback
 * @param {?error} error
 * @param {?object} status
 * @param {boolean} [status.cts=false]
 * @param {boolean} [status.dsr=false]
 * @param {boolean} [status.dcd=false]
 */

/**
 * @typedef {Object} openOptions
 * @property {boolean} [autoOpen=true] Automatically opens the port on `nextTick`.
 * @property {number=} [baudRate=9600] The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
 * @property {number} [dataBits=8] Must be one of these: 8, 7, 6, or 5.
 * @property {number} [highWaterMark=65536] The size of the read and write buffers defaults to 64k.
 * @property {boolean} [lock=true] Prevent other processes from opening the port. Windows does not currently support `false`.
 * @property {number} [stopBits=1] Must be one of these: 1 or 2.
 * @property {string} [parity=none] Must be one of these: 'none', 'even', 'mark', 'odd', 'space'.
 * @property {boolean} [rtscts=false] flow control setting
 * @property {boolean} [xon=false] flow control setting
 * @property {boolean} [xoff=false] flow control setting
 * @property {boolean} [xany=false] flow control setting
 * @property {object=} bindingOptions sets binding-specific options
 * @property {Binding=} binding The hardware access binding. `Bindings` are how Node-Serialport talks to the underlying system. By default we auto detect Windows (`WindowsBinding`), Linux (`LinuxBinding`) and OS X (`DarwinBinding`) and load the appropriate module for your system.
 * @property {number} [bindingOptions.vmin=1] see [`man termios`](http://linux.die.net/man/3/termios) LinuxBinding and DarwinBinding
 * @property {number} [bindingOptions.vtime=0] see [`man termios`](http://linux.die.net/man/3/termios) LinuxBinding and DarwinBinding
 */

/**
 * Create a new serial port object for the `path`. In the case of invalid arguments or invalid options, when constructing a new SerialPort it will throw an error. The port will open automatically by default, which is the equivalent of calling `port.open(openCallback)` in the next tick. You can disable this by setting the option `autoOpen` to `false`.
 * @class SerialPort
 * @param {string} path - The system path of the serial port you want to open. For example, `/dev/tty.XXX` on Mac/Linux, or `COM1` on Windows.
 * @param {openOptions=} options - Port configuration options
 * @param {errorCallback=} openCallback - Called after a connection is opened. If this is not provided and an error occurs, it will be emitted on the port's `error` event. The callback will NOT be called if `autoOpen` is set to `false` in the `openOptions` as the open will not be performed.
 * @property {number} baudRate The port's baudRate. Use `.update` to change it. Read-only.
 * @property {object} binding The binding object backing the port. Read-only.
 * @property {boolean} isOpen `true` if the port is open, `false` otherwise. Read-only. (`since 5.0.0`)
 * @property {string} path The system path or name of the serial port. Read-only.
 * @throws {TypeError} When given invalid arguments, a `TypeError` will be thrown.
 * @emits open
 * @emits data
 * @emits close
 * @emits error
 * @alias module:serialport
 */
function SerialPort(path, options, openCallback) {
  if (!(this instanceof SerialPort)) {
    return new SerialPort(path, options, openCallback)
  }

  if (options instanceof Function) {
    openCallback = options
    options = {}
  }

  const settings = { ...defaultSettings, ...options }

  stream.Duplex.call(this, {
    highWaterMark: settings.highWaterMark,
  })

  const Binding = settings.binding || SerialPort.Binding

  if (!Binding) {
    throw new TypeError('"Bindings" is invalid pass it as `options.binding` or set it on `SerialPort.Binding`')
  }

  if (!path) {
    throw new TypeError(`"path" is not defined: ${path}`)
  }

  if (settings.baudrate) {
    throw new TypeError(`"baudrate" is an unknown option, did you mean "baudRate"?`)
  }

  if (typeof settings.baudRate !== 'number') {
    throw new TypeError(`"baudRate" must be a number: ${settings.baudRate}`)
  }

  if (DATABITS.indexOf(settings.dataBits) === -1) {
    throw new TypeError(`"databits" is invalid: ${settings.dataBits}`)
  }

  if (STOPBITS.indexOf(settings.stopBits) === -1) {
    throw new TypeError(`"stopbits" is invalid: ${settings.stopbits}`)
  }

  if (PARITY.indexOf(settings.parity) === -1) {
    throw new TypeError(`"parity" is invalid: ${settings.parity}`)
  }

  FLOWCONTROLS.forEach(control => {
    if (typeof settings[control] !== 'boolean') {
      throw new TypeError(`"${control}" is not boolean: ${settings[control]}`)
    }
  })

  const binding = new Binding({
    bindingOptions: settings.bindingOptions,
  })

  Object.defineProperties(this, {
    binding: {
      enumerable: true,
      value: binding,
    },
    path: {
      enumerable: true,
      value: path,
    },
    settings: {
      enumerable: true,
      value: settings,
    },
  })

  this.opening = false
  this.closing = false
  this._pool = allocNewReadPool(this.settings.highWaterMark)
  this._kMinPoolSpace = 128

  if (this.settings.autoOpen) {
    this.open(openCallback)
  }
}

util.inherits(SerialPort, stream.Duplex)

Object.defineProperties(SerialPort.prototype, {
  isOpen: {
    enumerable: true,
    get() {
      return this.binding.isOpen && !this.closing
    },
  },
  baudRate: {
    enumerable: true,
    get() {
      return this.settings.baudRate
    },
  },
})

/**
 * The `error` event's callback is called with an error object whenever there is an error.
 * @event error
 */

SerialPort.prototype._error = function (error, callback) {
  if (callback) {
    callback.call(this, error)
  } else {
    this.emit('error', error)
  }
}

SerialPort.prototype._asyncError = function (error, callback) {
  process.nextTick(() => this._error(error, callback))
}

/**
 * The `open` event's callback is called with no arguments when the port is opened and ready for writing. This happens if you have the constructor open immediately (which opens in the next tick) or if you open the port manually with `open()`. See [Useage/Opening a Port](#opening-a-port) for more information.
 * @event open
 */

/**
 * Opens a connection to the given serial port.
 * @param {errorCallback=} openCallback - Called after a connection is opened. If this is not provided and an error occurs, it will be emitted on the port's `error` event.
 * @emits open
 * @returns {undefined}
 */
SerialPort.prototype.open = function (openCallback) {
  if (this.isOpen) {
    return this._asyncError(new Error('Port is already open'), openCallback)
  }

  if (this.opening) {
    return this._asyncError(new Error('Port is opening'), openCallback)
  }

  this.opening = true
  debug('opening', `path: ${this.path}`)
  this.binding.open(this.path, this.settings).then(
    () => {
      debug('opened', `path: ${this.path}`)
      this.opening = false
      this.emit('open')
      if (openCallback) {
        openCallback.call(this, null)
      }
    },
    err => {
      this.opening = false
      debug('Binding #open had an error', err)
      this._error(err, openCallback)
    }
  )
}

/**
 * Changes the baud rate for an open port. Throws if you provide a bad argument. Emits an error or calls the callback if the baud rate isn't supported.
 * @param {object=} options Only supports `baudRate`.
 * @param {number=} [options.baudRate] The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
 * @param {errorCallback=} [callback] Called once the port's baud rate changes. If `.update` is called without a callback, and there is an error, an error event is emitted.
 * @returns {undefined}
 */
SerialPort.prototype.update = function (options, callback) {
  if (typeof options !== 'object') {
    throw TypeError('"options" is not an object')
  }

  if (!this.isOpen) {
    debug('update attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  const settings = { ...defaultSettings, ...options }
  this.settings.baudRate = settings.baudRate

  debug('update', `baudRate: ${settings.baudRate}`)
  this.binding.update(this.settings).then(
    () => {
      debug('binding.update', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.update', 'error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Writes data to the given serial port. Buffers written data if the port is not open.

The write operation is non-blocking. When it returns, data might still not have been written to the serial port. See `drain()`.

Some devices, like the Arduino, reset when you open a connection to them. In such cases, immediately writing to the device will cause lost data as they wont be ready to receive the data. This is often worked around by having the Arduino send a "ready" byte that your Node program waits for before writing. You can also often get away with waiting around 400ms.

If a port is disconnected during a write, the write will error in addition to the `close` event.

From the [stream docs](https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback) write errors don't always provide the error in the callback, sometimes they use the error event.
> If an error occurs, the callback may or may not be called with the error as its first argument. To reliably detect write errors, add a listener for the 'error' event.

In addition to the usual `stream.write` arguments (`String` and `Buffer`), `write()` can accept arrays of bytes (positive numbers under 256) which is passed to `Buffer.from([])` for conversion. This extra functionality is pretty sweet.
 * @method SerialPort.prototype.write
 * @param  {(string|array|buffer)} data Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object, or a type that is accepted by the `Buffer` constructor (e.g. an array of bytes or a string).
 * @param  {string=} encoding The encoding, if chunk is a string. Defaults to `'utf8'`. Also accepts `'ascii'`, `'base64'`, `'binary'`, and `'hex'` See [Buffers and Character Encodings](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) for all available options.
 * @param  {function=} callback Called once the write operation finishes. Data may not yet be flushed to the underlying port. No arguments.
 * @returns {boolean} `false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.
 * @since 5.0.0
 */
const superWrite = SerialPort.prototype.write
SerialPort.prototype.write = function (data, encoding, callback) {
  if (Array.isArray(data)) {
    data = Buffer.from(data)
  }
  return superWrite.call(this, data, encoding, callback)
}

SerialPort.prototype._write = function (data, encoding, callback) {
  if (!this.isOpen) {
    return this.once('open', function afterOpenWrite() {
      this._write(data, encoding, callback)
    })
  }
  debug('_write', `${data.length} bytes of data`)
  this.binding.write(data).then(
    () => {
      debug('binding.write', 'write finished')
      callback(null)
    },
    err => {
      debug('binding.write', 'error', err)
      if (!err.canceled) {
        this._disconnected(err)
      }
      callback(err)
    }
  )
}

SerialPort.prototype._writev = function (data, callback) {
  debug('_writev', `${data.length} chunks of data`)
  const dataV = data.map(write => write.chunk)
  this._write(Buffer.concat(dataV), null, callback)
}

/**
 * Request a number of bytes from the SerialPort. The `read()` method pulls some data out of the internal buffer and returns it. If no data is available to be read, null is returned. By default, the data is returned as a `Buffer` object unless an encoding has been specified using the `.setEncoding()` method.
 * @method SerialPort.prototype.read
 * @param {number=} size Specify how many bytes of data to return, if available
 * @returns {(string|Buffer|null)} The data from internal buffers
 * @since 5.0.0
 */

/**
 * Listening for the `data` event puts the port in flowing mode. Data is emitted as soon as it's received. Data is a `Buffer` object with a varying amount of data in it. The `readLine` parser converts the data into string lines. See the [parsers](https://serialport.io/docs/api-parsers-overview) section for more information on parsers, and the [Node.js stream documentation](https://nodejs.org/api/stream.html#stream_event_data) for more information on the data event.
 * @event data
 */

SerialPort.prototype._read = function (bytesToRead) {
  if (!this.isOpen) {
    debug('_read', 'queueing _read for after open')
    this.once('open', () => {
      this._read(bytesToRead)
    })
    return
  }

  if (!this._pool || this._pool.length - this._pool.used < this._kMinPoolSpace) {
    debug('_read', 'discarding the read buffer pool because it is below kMinPoolSpace')
    this._pool = allocNewReadPool(this.settings.highWaterMark)
  }

  // Grab another reference to the pool in the case that while we're
  // in the thread pool another read() finishes up the pool, and
  // allocates a new one.
  const pool = this._pool
  // Read the smaller of rest of the pool or however many bytes we want
  const toRead = Math.min(pool.length - pool.used, bytesToRead)
  const start = pool.used

  // the actual read.
  debug('_read', `reading`, { start, toRead })
  this.binding.read(pool, start, toRead).then(
    ({ bytesRead }) => {
      debug('binding.read', `finished`, { bytesRead })
      // zero bytes means read means we've hit EOF? Maybe this should be an error
      if (bytesRead === 0) {
        debug('binding.read', 'Zero bytes read closing readable stream')
        this.push(null)
        return
      }
      pool.used += bytesRead
      this.push(pool.slice(start, start + bytesRead))
    },
    err => {
      debug('binding.read', `error`, err)
      if (!err.canceled) {
        this._disconnected(err)
      }
      this._read(bytesToRead) // prime to read more once we're reconnected
    }
  )
}

SerialPort.prototype._disconnected = function (err) {
  if (!this.isOpen) {
    debug('disconnected aborted because already closed', err)
    return
  }
  debug('disconnected', err)
  err.disconnected = true
  this.close(null, err)
}

/**
 * The `close` event's callback is called with no arguments when the port is closed. In the case of a disconnect it will be called with a Disconnect Error object (`err.disconnected == true`). In the event of a close error (unlikely), an error event is triggered.
 * @event close
 */

/**
 * Closes an open connection.
 *
 * If there are in progress writes when the port is closed the writes will error.
 * @param {errorCallback} callback Called once a connection is closed.
 * @param {Error} disconnectError used internally to propagate a disconnect error
 * @emits close
 * @returns {undefined}
 */
SerialPort.prototype.close = function (callback, disconnectError) {
  disconnectError = disconnectError || null

  if (!this.isOpen) {
    debug('close attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  this.closing = true
  debug('#close')
  this.binding.close().then(
    () => {
      this.closing = false
      debug('binding.close', 'finished')
      this.emit('close', disconnectError)
      if (this.settings.endOnClose) {
        this.emit('end')
      }
      if (callback) {
        callback.call(this, disconnectError)
      }
    },
    err => {
      this.closing = false
      debug('binding.close', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Set control flags on an open port. Uses [`SetCommMask`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363257(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for OS X and Linux.
 * @param {object=} options All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. If options isn't provided default options is used.
 * @param {Boolean} [options.brk=false] sets the brk flag
 * @param {Boolean} [options.cts=false] sets the cts flag
 * @param {Boolean} [options.dsr=false] sets the dsr flag
 * @param {Boolean} [options.dtr=true] sets the dtr flag
 * @param {Boolean} [options.rts=true] sets the rts flag
 * @param {errorCallback=} callback Called once the port's flags have been set.
 * @since 5.0.0
 * @returns {undefined}
 */
SerialPort.prototype.set = function (options, callback) {
  if (typeof options !== 'object') {
    throw TypeError('"options" is not an object')
  }

  if (!this.isOpen) {
    debug('set attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  const settings = { ...defaultSetFlags, ...options }
  debug('#set', settings)
  this.binding.set(settings).then(
    () => {
      debug('binding.set', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.set', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Returns the control flags (CTS, DSR, DCD) on the open port.
 * Uses [`GetCommModemStatus`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363258(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for mac and linux.
 * @param {modemBitsCallback=} callback Called once the modem bits are retrieved.
 * @returns {undefined}
 */
SerialPort.prototype.get = function (callback) {
  if (!this.isOpen) {
    debug('get attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  debug('#get')
  this.binding.get().then(
    status => {
      debug('binding.get', 'finished')
      if (callback) {
        callback.call(this, null, status)
      }
    },
    err => {
      debug('binding.get', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Flush discards data received but not read, and written but not transmitted by the operating system. For more technical details, see [`tcflush(fd, TCIOFLUSH)`](http://linux.die.net/man/3/tcflush) for Mac/Linux and [`FlushFileBuffers`](http://msdn.microsoft.com/en-us/library/windows/desktop/aa364439) for Windows.
 * @param  {errorCallback=} callback Called once the flush operation finishes.
 * @returns {undefined}
 */
SerialPort.prototype.flush = function (callback) {
  if (!this.isOpen) {
    debug('flush attempted, but port is not open')
    return this._asyncError(new Error('Port is not open'), callback)
  }

  debug('#flush')
  this.binding.flush().then(
    () => {
      debug('binding.flush', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.flush', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * Waits until all output data is transmitted to the serial port. After any pending write has completed it calls [`tcdrain()`](http://linux.die.net/man/3/tcdrain) or [FlushFileBuffers()](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364439(v=vs.85).aspx) to ensure it has been written to the device.
 * @param {errorCallback=} callback Called once the drain operation returns.
 * @returns {undefined}
 * @example
Write the `data` and wait until it has finished transmitting to the target serial port before calling the callback. This will queue until the port is open and writes are finished.

```js
function writeAndDrain (data, callback) {
  port.write(data);
  port.drain(callback);
}
```
 */
SerialPort.prototype.drain = function (callback) {
  debug('drain')
  if (!this.isOpen) {
    debug('drain queuing on port open')
    return this.once('open', () => {
      this.drain(callback)
    })
  }
  this.binding.drain().then(
    () => {
      debug('binding.drain', 'finished')
      if (callback) {
        callback.call(this, null)
      }
    },
    err => {
      debug('binding.drain', 'had an error', err)
      return this._error(err, callback)
    }
  )
}

/**
 * The `pause()` method causes a stream in flowing mode to stop emitting 'data' events, switching out of flowing mode. Any data that becomes available remains in the internal buffer.
 * @method SerialPort.prototype.pause
 * @see resume
 * @since 5.0.0
 * @returns `this`
 */

/**
 * The `resume()` method causes an explicitly paused, `Readable` stream to resume emitting 'data' events, switching the stream into flowing mode.
 * @method SerialPort.prototype.resume
 * @see pause
 * @since 5.0.0
 * @returns `this`
 */

/**
 * Retrieves a list of available serial ports with metadata. Only the `path` is guaranteed. If unavailable the other fields will be undefined. The `path` is either the path or an identifier (eg `COM1`) used to open the SerialPort.
 *
 * We make an effort to identify the hardware attached and have consistent results between systems. Linux and OS X are mostly consistent. Windows relies on 3rd party device drivers for the information and is unable to guarantee the information. On windows If you have a USB connected device can we provide a serial number otherwise it will be `undefined`. The `pnpId` and `locationId` are not the same or present on all systems. The examples below were run with the same Arduino Uno.
 * @type {function}
 * @returns {Promise} Resolves with the list of available serial ports.
 * @example
```js
// OSX example port
{
  path: '/dev/tty.usbmodem1421',
  manufacturer: 'Arduino (www.arduino.cc)',
  serialNumber: '752303138333518011C1',
  pnpId: undefined,
  locationId: '14500000',
  productId: '0043',
  vendorId: '2341'
}

// Linux example port
{
  path: '/dev/ttyACM0',
  manufacturer: 'Arduino (www.arduino.cc)',
  serialNumber: '752303138333518011C1',
  pnpId: 'usb-Arduino__www.arduino.cc__0043_752303138333518011C1-if00',
  locationId: undefined,
  productId: '0043',
  vendorId: '2341'
}

// Windows example port
{
  path: 'COM3',
  manufacturer: 'Arduino LLC (www.arduino.cc)',
  serialNumber: '752303138333518011C1',
  pnpId: 'USB\\VID_2341&PID_0043\\752303138333518011C1',
  locationId: 'Port_#0003.Hub_#0001',
  productId: '0043',
  vendorId: '2341'
}
```

```js
var SerialPort = require('serialport');

// promise approach
SerialPort.list()
  .then(ports) {...});
  .catch(err) {...});
```
 */
SerialPort.list = async function (callback) {
  debug('.list')
  if (!SerialPort.Binding) {
    throw new TypeError('No Binding set on `SerialPort.Binding`')
  }
  if (callback) {
    throw new TypeError('SerialPort.list no longer takes a callback and only returns a promise')
  }
  return SerialPort.Binding.list()
}

module.exports = SerialPort


/***/ }),

/***/ 7887:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(3735)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 3735:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(725);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 7606:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(7887);
} else {
	module.exports = __nccwpck_require__(4350);
}


/***/ }),

/***/ 4350:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(6224);
const util = __nccwpck_require__(3837);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(3259);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(3735)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 3109:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)

const BUF_LENGTH = 64 * 1024
const _buff = __nccwpck_require__(7273)(BUF_LENGTH)

function copyFileSync (srcFile, destFile, options) {
  const overwrite = options.overwrite
  const errorOnExist = options.errorOnExist
  const preserveTimestamps = options.preserveTimestamps

  if (fs.existsSync(destFile)) {
    if (overwrite) {
      fs.unlinkSync(destFile)
    } else if (errorOnExist) {
      throw new Error(`${destFile} already exists`)
    } else return
  }

  const fdr = fs.openSync(srcFile, 'r')
  const stat = fs.fstatSync(fdr)
  const fdw = fs.openSync(destFile, 'w', stat.mode)
  let bytesRead = 1
  let pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (preserveTimestamps) {
    fs.futimesSync(fdw, stat.atime, stat.mtime)
  }

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

module.exports = copyFileSync


/***/ }),

/***/ 5325:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const copyFileSync = __nccwpck_require__(3109)
const mkdir = __nccwpck_require__(5367)

function copySync (src, dest, options) {
  if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }

  options = options || {}
  options.recursive = !!options.recursive

  // default to true for now
  options.clobber = 'clobber' in options ? !!options.clobber : true
  // overwrite falls back to clobber
  options.overwrite = 'overwrite' in options ? !!options.overwrite : options.clobber
  options.dereference = 'dereference' in options ? !!options.dereference : false
  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false

  options.filter = options.filter || function () { return true }

  // Warn about using preserveTimestamps on 32-bit node:
  if (options.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  const stats = (options.recursive && !options.dereference) ? fs.lstatSync(src) : fs.statSync(src)
  const destFolder = path.dirname(dest)
  const destFolderExists = fs.existsSync(destFolder)
  let performCopy = false

  if (options.filter instanceof RegExp) {
    console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function')
    performCopy = options.filter.test(src)
  } else if (typeof options.filter === 'function') performCopy = options.filter(src, dest)

  if (stats.isFile() && performCopy) {
    if (!destFolderExists) mkdir.mkdirsSync(destFolder)
    copyFileSync(src, dest, {
      overwrite: options.overwrite,
      errorOnExist: options.errorOnExist,
      preserveTimestamps: options.preserveTimestamps
    })
  } else if (stats.isDirectory() && performCopy) {
    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest)
    const contents = fs.readdirSync(src)
    contents.forEach(content => {
      const opts = options
      opts.recursive = true
      copySync(path.join(src, content), path.join(dest, content), opts)
    })
  } else if (options.recursive && stats.isSymbolicLink() && performCopy) {
    const srcPath = fs.readlinkSync(src)
    fs.symlinkSync(srcPath, dest)
  }
}

module.exports = copySync


/***/ }),

/***/ 5681:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  copySync: __nccwpck_require__(5325)
}


/***/ }),

/***/ 2792:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const ncp = __nccwpck_require__(1049)
const mkdir = __nccwpck_require__(5367)
const pathExists = (__nccwpck_require__(8220).pathExists)

function copy (src, dest, options, callback) {
  if (typeof options === 'function' && !callback) {
    callback = options
    options = {}
  } else if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }
  callback = callback || function () {}
  options = options || {}

  // Warn about using preserveTimestamps on 32-bit node:
  if (options.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  // don't allow src and dest to be the same
  const basePath = process.cwd()
  const currentPath = path.resolve(basePath, src)
  const targetPath = path.resolve(basePath, dest)
  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'))

  fs.lstat(src, (err, stats) => {
    if (err) return callback(err)

    let dir = null
    if (stats.isDirectory()) {
      const parts = dest.split(path.sep)
      parts.pop()
      dir = parts.join(path.sep)
    } else {
      dir = path.dirname(dest)
    }

    pathExists(dir, (err, dirExists) => {
      if (err) return callback(err)
      if (dirExists) return ncp(src, dest, options, callback)
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        ncp(src, dest, options, callback)
      })
    })
  })
}

module.exports = copy


/***/ }),

/***/ 5196:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
module.exports = {
  copy: u(__nccwpck_require__(2792))
}


/***/ }),

/***/ 1049:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// imported from ncp (this is temporary, will rewrite)

var fs = __nccwpck_require__(2353)
var path = __nccwpck_require__(1017)
var utimes = __nccwpck_require__(3024)

function ncp (source, dest, options, callback) {
  if (!callback) {
    callback = options
    options = {}
  }

  var basePath = process.cwd()
  var currentPath = path.resolve(basePath, source)
  var targetPath = path.resolve(basePath, dest)

  var filter = options.filter
  var transform = options.transform
  var overwrite = options.overwrite
  // If overwrite is undefined, use clobber, otherwise default to true:
  if (overwrite === undefined) overwrite = options.clobber
  if (overwrite === undefined) overwrite = true
  var errorOnExist = options.errorOnExist
  var dereference = options.dereference
  var preserveTimestamps = options.preserveTimestamps === true

  var started = 0
  var finished = 0
  var running = 0

  var errored = false

  startCopy(currentPath)

  function startCopy (source) {
    started++
    if (filter) {
      if (filter instanceof RegExp) {
        console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function')
        if (!filter.test(source)) {
          return doneOne(true)
        }
      } else if (typeof filter === 'function') {
        if (!filter(source, dest)) {
          return doneOne(true)
        }
      }
    }
    return getStats(source)
  }

  function getStats (source) {
    var stat = dereference ? fs.stat : fs.lstat
    running++
    stat(source, function (err, stats) {
      if (err) return onError(err)

      // We need to get the mode from the stats object and preserve it.
      var item = {
        name: source,
        mode: stats.mode,
        mtime: stats.mtime, // modified time
        atime: stats.atime, // access time
        stats: stats // temporary
      }

      if (stats.isDirectory()) {
        return onDir(item)
      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
        return onFile(item)
      } else if (stats.isSymbolicLink()) {
        // Symlinks don't really need to know about the mode.
        return onLink(source)
      }
    })
  }

  function onFile (file) {
    var target = file.name.replace(currentPath, targetPath.replace('$', '$$$$')) // escapes '$' with '$$'
    isWritable(target, function (writable) {
      if (writable) {
        copyFile(file, target)
      } else {
        if (overwrite) {
          rmFile(target, function () {
            copyFile(file, target)
          })
        } else if (errorOnExist) {
          onError(new Error(target + ' already exists'))
        } else {
          doneOne()
        }
      }
    })
  }

  function copyFile (file, target) {
    var readStream = fs.createReadStream(file.name)
    var writeStream = fs.createWriteStream(target, { mode: file.mode })

    readStream.on('error', onError)
    writeStream.on('error', onError)

    if (transform) {
      transform(readStream, writeStream, file)
    } else {
      writeStream.on('open', function () {
        readStream.pipe(writeStream)
      })
    }

    writeStream.once('close', function () {
      fs.chmod(target, file.mode, function (err) {
        if (err) return onError(err)
        if (preserveTimestamps) {
          utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
            if (err) return onError(err)
            return doneOne()
          })
        } else {
          doneOne()
        }
      })
    })
  }

  function rmFile (file, done) {
    fs.unlink(file, function (err) {
      if (err) return onError(err)
      return done()
    })
  }

  function onDir (dir) {
    var target = dir.name.replace(currentPath, targetPath.replace('$', '$$$$')) // escapes '$' with '$$'
    isWritable(target, function (writable) {
      if (writable) {
        return mkDir(dir, target)
      }
      copyDir(dir.name)
    })
  }

  function mkDir (dir, target) {
    fs.mkdir(target, dir.mode, function (err) {
      if (err) return onError(err)
      // despite setting mode in fs.mkdir, doesn't seem to work
      // so we set it here.
      fs.chmod(target, dir.mode, function (err) {
        if (err) return onError(err)
        copyDir(dir.name)
      })
    })
  }

  function copyDir (dir) {
    fs.readdir(dir, function (err, items) {
      if (err) return onError(err)
      items.forEach(function (item) {
        startCopy(path.join(dir, item))
      })
      return doneOne()
    })
  }

  function onLink (link) {
    var target = link.replace(currentPath, targetPath)
    fs.readlink(link, function (err, resolvedPath) {
      if (err) return onError(err)
      checkLink(resolvedPath, target)
    })
  }

  function checkLink (resolvedPath, target) {
    if (dereference) {
      resolvedPath = path.resolve(basePath, resolvedPath)
    }
    isWritable(target, function (writable) {
      if (writable) {
        return makeLink(resolvedPath, target)
      }
      fs.readlink(target, function (err, targetDest) {
        if (err) return onError(err)

        if (dereference) {
          targetDest = path.resolve(basePath, targetDest)
        }
        if (targetDest === resolvedPath) {
          return doneOne()
        }
        return rmFile(target, function () {
          makeLink(resolvedPath, target)
        })
      })
    })
  }

  function makeLink (linkPath, target) {
    fs.symlink(linkPath, target, function (err) {
      if (err) return onError(err)
      return doneOne()
    })
  }

  function isWritable (path, done) {
    fs.lstat(path, function (err) {
      if (err) {
        if (err.code === 'ENOENT') return done(true)
        return done(false)
      }
      return done(false)
    })
  }

  function onError (err) {
    // ensure callback is defined & called only once:
    if (!errored && callback !== undefined) {
      errored = true
      return callback(err)
    }
  }

  function doneOne (skipped) {
    if (!skipped) running--
    finished++
    if ((started === finished) && (running === 0)) {
      if (callback !== undefined) {
        return callback(null)
      }
    }
  }
}

module.exports = ncp


/***/ }),

/***/ 4811:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const fs = __nccwpck_require__(7147)
const path = __nccwpck_require__(1017)
const mkdir = __nccwpck_require__(5367)
const remove = __nccwpck_require__(6752)

const emptyDir = u(function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, (err, items) => {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(item => path.join(dir, item))

    deleteItem()

    function deleteItem () {
      const item = items.pop()
      if (!item) return callback()
      remove.remove(item, err => {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
})

function emptyDirSync (dir) {
  let items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
}


/***/ }),

/***/ 1289:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const path = __nccwpck_require__(1017)
const fs = __nccwpck_require__(2353)
const mkdir = __nccwpck_require__(5367)
const pathExists = (__nccwpck_require__(8220).pathExists)

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', err => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir = path.dirname(file)
    pathExists(dir, (err, dirExists) => {
      if (err) return callback(err)
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  let stats
  try {
    stats = fs.statSync(file)
  } catch (e) {}
  if (stats && stats.isFile()) return

  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile: u(createFile),
  createFileSync
}


/***/ }),

/***/ 9007:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const file = __nccwpck_require__(1289)
const link = __nccwpck_require__(9036)
const symlink = __nccwpck_require__(8883)

module.exports = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
}


/***/ }),

/***/ 9036:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const path = __nccwpck_require__(1017)
const fs = __nccwpck_require__(2353)
const mkdir = __nccwpck_require__(5367)
const pathExists = (__nccwpck_require__(8220).pathExists)

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, err => {
      if (err) return callback(err)
      callback(null)
    })
  }

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, (err, stat) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      const dir = path.dirname(dstpath)
      pathExists(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, err => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath, callback) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir = path.dirname(dstpath)
  const dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink: u(createLink),
  createLinkSync
}


/***/ }),

/***/ 1166:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const path = __nccwpck_require__(1017)
const fs = __nccwpck_require__(2353)
const pathExists = (__nccwpck_require__(8220).pathExists)

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths (srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, (err, stat) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink')
        return callback(err)
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      })
    })
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    return pathExists(relativeToDst, (err, exists) => {
      if (err) return callback(err)
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, (err, stat) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink')
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync (srcpath, dstpath) {
  let exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    exists = fs.existsSync(relativeToDst)
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      }
    } else {
      exists = fs.existsSync(srcpath)
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      }
    }
  }
}

module.exports = {
  symlinkPaths,
  symlinkPathsSync
}


/***/ }),

/***/ 6667:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  let stats

  if (type) return type
  try {
    stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType,
  symlinkTypeSync
}


/***/ }),

/***/ 8883:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const path = __nccwpck_require__(1017)
const fs = __nccwpck_require__(2353)
const _mkdirs = __nccwpck_require__(5367)
const mkdirs = _mkdirs.mkdirs
const mkdirsSync = _mkdirs.mkdirsSync

const _symlinkPaths = __nccwpck_require__(1166)
const symlinkPaths = _symlinkPaths.symlinkPaths
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync

const _symlinkType = __nccwpck_require__(6667)
const symlinkType = _symlinkType.symlinkType
const symlinkTypeSync = _symlinkType.symlinkTypeSync

const pathExists = (__nccwpck_require__(8220).pathExists)

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, (err, relative) => {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, (err, type) => {
        if (err) return callback(err)
        const dir = path.dirname(dstpath)
        pathExists(dir, (err, dirExists) => {
          if (err) return callback(err)
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, err => {
            if (err) return callback(err)
            fs.symlink(srcpath, dstpath, type, callback)
          })
        })
      })
    })
  })
}

function createSymlinkSync (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  const relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir = path.dirname(dstpath)
  const exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: u(createSymlink),
  createSymlinkSync
}


/***/ }),

/***/ 7384:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const fs = __nccwpck_require__(2353)

const api = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copyFile',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchown',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'readFile',
  'readdir',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'writeFile'
].filter(key => {
  // Some commands are not available on some systems. Ex:
  // fs.copyFile was added in Node.js v8.5.0
  // fs.mkdtemp was added in Node.js v5.10.0
  // fs.lchown is not available on at least some Linux
  return typeof fs[key] === 'function'
})

// Export all keys:
Object.keys(fs).forEach(key => {
  exports[key] = fs[key]
})

// Universalify async methods:
api.forEach(method => {
  exports[method] = u(fs[method])
})

// We differ from mz/fs in that we still ship the old, broken, fs.exists()
// since we are a drop-in replacement for the native module
exports.exists = function (filename, callback) {
  if (typeof callback === 'function') {
    return fs.exists(filename, callback)
  }
  return new Promise(resolve => {
    return fs.exists(filename, resolve)
  })
}

// fs.read() & fs.write need special treatment due to multiple callback args

exports.read = function (fd, buffer, offset, length, position, callback) {
  if (typeof callback === 'function') {
    return fs.read(fd, buffer, offset, length, position, callback)
  }
  return new Promise((resolve, reject) => {
    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
      if (err) return reject(err)
      resolve({ bytesRead, buffer })
    })
  })
}

// Function signature can be
// fs.write(fd, buffer[, offset[, length[, position]]], callback)
// OR
// fs.write(fd, string[, position[, encoding]], callback)
// so we need to handle both cases
exports.write = function (fd, buffer, a, b, c, callback) {
  if (typeof arguments[arguments.length - 1] === 'function') {
    return fs.write(fd, buffer, a, b, c, callback)
  }

  // Check for old, depricated fs.write(fd, string[, position[, encoding]], callback)
  if (typeof buffer === 'string') {
    return new Promise((resolve, reject) => {
      fs.write(fd, buffer, a, b, (err, bytesWritten, buffer) => {
        if (err) return reject(err)
        resolve({ bytesWritten, buffer })
      })
    })
  }

  return new Promise((resolve, reject) => {
    fs.write(fd, buffer, a, b, c, (err, bytesWritten, buffer) => {
      if (err) return reject(err)
      resolve({ bytesWritten, buffer })
    })
  })
}


/***/ }),

/***/ 4399:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const assign = __nccwpck_require__(7002)

const fs = {}

// Export graceful-fs:
assign(fs, __nccwpck_require__(7384))
// Export extra methods:
assign(fs, __nccwpck_require__(5196))
assign(fs, __nccwpck_require__(5681))
assign(fs, __nccwpck_require__(5367))
assign(fs, __nccwpck_require__(6752))
assign(fs, __nccwpck_require__(8394))
assign(fs, __nccwpck_require__(7584))
assign(fs, __nccwpck_require__(4528))
assign(fs, __nccwpck_require__(4811))
assign(fs, __nccwpck_require__(9007))
assign(fs, __nccwpck_require__(4268))
assign(fs, __nccwpck_require__(8220))

module.exports = fs


/***/ }),

/***/ 8394:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const jsonFile = __nccwpck_require__(166)

jsonFile.outputJson = u(__nccwpck_require__(7043))
jsonFile.outputJsonSync = __nccwpck_require__(8871)
// aliases
jsonFile.outputJSON = jsonFile.outputJson
jsonFile.outputJSONSync = jsonFile.outputJsonSync
jsonFile.writeJSON = jsonFile.writeJson
jsonFile.writeJSONSync = jsonFile.writeJsonSync
jsonFile.readJSON = jsonFile.readJson
jsonFile.readJSONSync = jsonFile.readJsonSync

module.exports = jsonFile


/***/ }),

/***/ 166:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const jsonFile = __nccwpck_require__(5430)

module.exports = {
  // jsonfile exports
  readJson: u(jsonFile.readFile),
  readJsonSync: jsonFile.readFileSync,
  writeJson: u(jsonFile.writeFile),
  writeJsonSync: jsonFile.writeFileSync
}


/***/ }),

/***/ 8871:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const mkdir = __nccwpck_require__(5367)
const jsonFile = __nccwpck_require__(166)

function outputJsonSync (file, data, options) {
  const dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync


/***/ }),

/***/ 7043:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const path = __nccwpck_require__(1017)
const mkdir = __nccwpck_require__(5367)
const pathExists = (__nccwpck_require__(8220).pathExists)
const jsonFile = __nccwpck_require__(166)

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const dir = path.dirname(file)

  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson


/***/ }),

/***/ 5367:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const mkdirs = u(__nccwpck_require__(8497))
const mkdirsSync = __nccwpck_require__(7974)

module.exports = {
  mkdirs: mkdirs,
  mkdirsSync: mkdirsSync,
  // alias
  mkdirp: mkdirs,
  mkdirpSync: mkdirsSync,
  ensureDir: mkdirs,
  ensureDirSync: mkdirsSync
}


/***/ }),

/***/ 7974:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const invalidWin32Path = (__nccwpck_require__(8977).invalidWin32Path)

const o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    throw errInval
  }

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    switch (err0.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) throw err0
        made = mkdirsSync(path.dirname(p), opts, made)
        mkdirsSync(p, opts, made)
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        let stat
        try {
          stat = xfs.statSync(p)
        } catch (err1) {
          throw err0
        }
        if (!stat.isDirectory()) throw err0
        break
    }
  }

  return made
}

module.exports = mkdirsSync


/***/ }),

/***/ 8497:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const invalidWin32Path = (__nccwpck_require__(8977).invalidWin32Path)

const o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return callback(errInval)
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, er => {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, (er, made) => {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, (er2, stat) => {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) callback(er, made)
          else callback(null, made)
        })
        break
    }
  })
}

module.exports = mkdirs


/***/ }),

/***/ 8977:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const path = __nccwpck_require__(1017)

// get drive on windows
function getRootPath (p) {
  p = path.normalize(path.resolve(p)).split(path.sep)
  if (p.length > 0) return p[0]
  return null
}

// http://stackoverflow.com/a/62888/10333 contains more accurate
// TODO: expand to include the rest
const INVALID_PATH_CHARS = /[<>:"|?*]/

function invalidWin32Path (p) {
  const rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

module.exports = {
  getRootPath,
  invalidWin32Path
}


/***/ }),

/***/ 4528:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const copySync = (__nccwpck_require__(5681).copySync)
const removeSync = (__nccwpck_require__(6752).removeSync)
const mkdirpSync = (__nccwpck_require__(5367).mkdirsSync)
const buffer = __nccwpck_require__(7273)

function moveSync (src, dest, options) {
  options = options || {}
  const overwrite = options.overwrite || options.clobber || false

  src = path.resolve(src)
  dest = path.resolve(dest)

  if (src === dest) return fs.accessSync(src)

  if (isSrcSubdir(src, dest)) throw new Error(`Cannot move '${src}' into itself '${dest}'.`)

  mkdirpSync(path.dirname(dest))
  tryRenameSync()

  function tryRenameSync () {
    if (overwrite) {
      try {
        return fs.renameSync(src, dest)
      } catch (err) {
        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST' || err.code === 'EPERM') {
          removeSync(dest)
          options.overwrite = false // just overwriteed it, no need to do it again
          return moveSync(src, dest, options)
        }

        if (err.code !== 'EXDEV') throw err
        return moveSyncAcrossDevice(src, dest, overwrite)
      }
    } else {
      try {
        fs.linkSync(src, dest)
        return fs.unlinkSync(src)
      } catch (err) {
        if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
          return moveSyncAcrossDevice(src, dest, overwrite)
        }
        throw err
      }
    }
  }
}

function moveSyncAcrossDevice (src, dest, overwrite) {
  const stat = fs.statSync(src)

  if (stat.isDirectory()) {
    return moveDirSyncAcrossDevice(src, dest, overwrite)
  } else {
    return moveFileSyncAcrossDevice(src, dest, overwrite)
  }
}

function moveFileSyncAcrossDevice (src, dest, overwrite) {
  const BUF_LENGTH = 64 * 1024
  const _buff = buffer(BUF_LENGTH)

  const flags = overwrite ? 'w' : 'wx'

  const fdr = fs.openSync(src, 'r')
  const stat = fs.fstatSync(fdr)
  const fdw = fs.openSync(dest, flags, stat.mode)
  let bytesRead = 1
  let pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  fs.closeSync(fdr)
  fs.closeSync(fdw)
  return fs.unlinkSync(src)
}

function moveDirSyncAcrossDevice (src, dest, overwrite) {
  const options = {
    overwrite: false
  }

  if (overwrite) {
    removeSync(dest)
    tryCopySync()
  } else {
    tryCopySync()
  }

  function tryCopySync () {
    copySync(src, dest, options)
    return removeSync(src)
  }
}

// return true if dest is a subdir of src, otherwise false.
// extract dest base dir and check if that is the same as src basename
function isSrcSubdir (src, dest) {
  try {
    return fs.statSync(src).isDirectory() &&
           src !== dest &&
           dest.indexOf(src) > -1 &&
           dest.split(path.dirname(src) + path.sep)[1].split(path.sep)[0] === path.basename(src)
  } catch (e) {
    return false
  }
}

module.exports = {
  moveSync
}


/***/ }),

/***/ 7584:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// most of this code was written by Andrew Kelley
// licensed under the BSD license: see
// https://github.com/andrewrk/node-mv/blob/master/package.json

// this needs a cleanup

const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const fs = __nccwpck_require__(2353)
const ncp = __nccwpck_require__(1049)
const path = __nccwpck_require__(1017)
const remove = (__nccwpck_require__(6752).remove)
const mkdirp = (__nccwpck_require__(5367).mkdirs)

function move (src, dest, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const overwrite = options.overwrite || options.clobber || false

  isSrcSubdir(src, dest, (err, itIs) => {
    if (err) return callback(err)
    if (itIs) return callback(new Error(`Cannot move '${src}' to a subdirectory of itself, '${dest}'.`))
    mkdirp(path.dirname(dest), err => {
      if (err) return callback(err)
      doRename()
    })
  })

  function doRename () {
    if (path.resolve(src) === path.resolve(dest)) {
      fs.access(src, callback)
    } else if (overwrite) {
      fs.rename(src, dest, err => {
        if (!err) return callback()

        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
          remove(dest, err => {
            if (err) return callback(err)
            options.overwrite = false // just overwriteed it, no need to do it again
            move(src, dest, options, callback)
          })
          return
        }

        // weird Windows shit
        if (err.code === 'EPERM') {
          setTimeout(() => {
            remove(dest, err => {
              if (err) return callback(err)
              options.overwrite = false
              move(src, dest, options, callback)
            })
          }, 200)
          return
        }

        if (err.code !== 'EXDEV') return callback(err)
        moveAcrossDevice(src, dest, overwrite, callback)
      })
    } else {
      fs.link(src, dest, err => {
        if (err) {
          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
            return moveAcrossDevice(src, dest, overwrite, callback)
          }
          return callback(err)
        }
        return fs.unlink(src, callback)
      })
    }
  }
}

function moveAcrossDevice (src, dest, overwrite, callback) {
  fs.stat(src, (err, stat) => {
    if (err) return callback(err)

    if (stat.isDirectory()) {
      moveDirAcrossDevice(src, dest, overwrite, callback)
    } else {
      moveFileAcrossDevice(src, dest, overwrite, callback)
    }
  })
}

function moveFileAcrossDevice (src, dest, overwrite, callback) {
  const flags = overwrite ? 'w' : 'wx'
  const ins = fs.createReadStream(src)
  const outs = fs.createWriteStream(dest, { flags })

  ins.on('error', err => {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)

    // may want to create a directory but `out` line above
    // creates an empty file for us: See #108
    // don't care about error here
    fs.unlink(dest, () => {
      // note: `err` here is from the input stream errror
      if (err.code === 'EISDIR' || err.code === 'EPERM') {
        moveDirAcrossDevice(src, dest, overwrite, callback)
      } else {
        callback(err)
      }
    })
  })

  outs.on('error', err => {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)
    callback(err)
  })

  outs.once('close', onClose)
  ins.pipe(outs)

  function onClose () {
    fs.unlink(src, callback)
  }
}

function moveDirAcrossDevice (src, dest, overwrite, callback) {
  const options = {
    overwrite: false
  }

  if (overwrite) {
    remove(dest, err => {
      if (err) return callback(err)
      startNcp()
    })
  } else {
    startNcp()
  }

  function startNcp () {
    ncp(src, dest, options, err => {
      if (err) return callback(err)
      remove(src, callback)
    })
  }
}

// return true if dest is a subdir of src, otherwise false.
// extract dest base dir and check if that is the same as src basename
function isSrcSubdir (src, dest, cb) {
  fs.stat(src, (err, st) => {
    if (err) return cb(err)
    if (st.isDirectory()) {
      const baseDir = dest.split(path.dirname(src) + path.sep)[1]
      if (baseDir) {
        const destBasename = baseDir.split(path.sep)[0]
        if (destBasename) return cb(null, src !== dest && dest.indexOf(src) > -1 && destBasename === path.basename(src))
        return cb(null, false)
      }
      return cb(null, false)
    }
    return cb(null, false)
  })
}

module.exports = {
  move: u(move)
}


/***/ }),

/***/ 4268:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const mkdir = __nccwpck_require__(5367)
const pathExists = (__nccwpck_require__(8220).pathExists)

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, data, encoding) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync.apply(fs, arguments)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync.apply(fs, arguments)
}

module.exports = {
  outputFile: u(outputFile),
  outputFileSync
}


/***/ }),

/***/ 8220:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const u = (__nccwpck_require__(4899)/* .fromPromise */ .p)
const fs = __nccwpck_require__(7384)

function pathExists (path) {
  return fs.access(path).then(() => true).catch(() => false)
}

module.exports = {
  pathExists: u(pathExists),
  pathExistsSync: fs.existsSync
}


/***/ }),

/***/ 6752:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const u = (__nccwpck_require__(4899)/* .fromCallback */ .E)
const rimraf = __nccwpck_require__(2717)

module.exports = {
  remove: u(rimraf),
  removeSync: rimraf.sync
}


/***/ }),

/***/ 2717:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const path = __nccwpck_require__(1017)
const assert = __nccwpck_require__(9491)

const isWindows = (process.platform === 'win32')

function defaults (options) {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
}

function rimraf (p, options, cb) {
  let busyTries = 0

  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  rimraf_(p, options, function CB (er) {
    if (er) {
      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
          busyTries < options.maxBusyTries) {
        busyTries++
        let time = busyTries * 100
        // try again, with the same exact callback as this one.
        return setTimeout(() => rimraf_(p, options, CB), time)
      }

      // already gone
      if (er.code === 'ENOENT') er = null
    }

    cb(er)
  })
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null)
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb)
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb)
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null)
        }
        if (er.code === 'EPERM') {
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        }
        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb)
        }
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er) {
    assert(er instanceof Error)
  }

  options.chmod(p, 0o666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er)
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er)
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb)
        } else {
          options.unlink(p, cb)
        }
      })
    }
  })
}

function fixWinEPERMSync (p, options, er) {
  let stats

  assert(p)
  assert(options)
  if (er) {
    assert(er instanceof Error)
  }

  try {
    options.chmodSync(p, 0o666)
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er)
  } else {
    options.unlinkSync(p)
  }
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb)
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr)
    } else {
      cb(er)
    }
  })
}

function rmkids (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er) return cb(er)

    let n = files.length
    let errState

    if (n === 0) return options.rmdir(p, cb)

    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState) {
          return
        }
        if (er) return cb(errState = er)
        if (--n === 0) {
          options.rmdir(p, cb)
        }
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  let st

  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  try {
    st = options.lstatSync(p)
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er)
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null)
    } else {
      options.unlinkSync(p)
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
    } else if (er.code !== 'EISDIR') {
      throw er
    }
    rmdirSync(p, options, er)
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === 'ENOTDIR') {
      throw originalEr
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options)
    } else if (er.code !== 'ENOENT') {
      throw er
    }
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  const retries = isWindows ? 100 : 1
  let i = 0
  do {
    let threw = true
    try {
      const ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw) continue // eslint-disable-line
    }
  } while (true)
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),

/***/ 7002:
/***/ ((module) => {

"use strict";


// simple mutable assign
function assign () {
  const args = [].slice.call(arguments).filter(i => i)
  const dest = args.shift()
  args.forEach(src => {
    Object.keys(src).forEach(key => {
      dest[key] = src[key]
    })
  })

  return dest
}

module.exports = assign


/***/ }),

/***/ 7273:
/***/ ((module) => {

/* eslint-disable node/no-deprecated-api */
module.exports = function (size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    try {
      return Buffer.allocUnsafe(size)
    } catch (e) {
      return new Buffer(size)
    }
  }
  return new Buffer(size)
}


/***/ }),

/***/ 3024:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(2353)
const os = __nccwpck_require__(2037)
const path = __nccwpck_require__(1017)

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  const fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', (err, fd) => {
      if (err) return callback(err)
      fs.futimes(fd, d, d, err => {
        if (err) return callback(err)
        fs.close(fd, err => {
          if (err) return callback(err)
          fs.stat(tmpfile, (err, stats) => {
            if (err) return callback(err)
            callback(null, stats.mtime > 1435410243000)
          })
        })
      })
    })
  })
}

function timeRemoveMillis (timestamp) {
  if (typeof timestamp === 'number') {
    return Math.floor(timestamp / 1000) * 1000
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
  } else {
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
  }
}

function utimesMillis (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, futimesErr => {
      fs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

module.exports = {
  hasMillisRes,
  hasMillisResSync,
  timeRemoveMillis,
  utimesMillis
}


/***/ }),

/***/ 7430:
/***/ ((module) => {

"use strict";


module.exports = clone

var getPrototypeOf = Object.getPrototypeOf || function (obj) {
  return obj.__proto__
}

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: getPrototypeOf(obj) }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),

/***/ 2353:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var fs = __nccwpck_require__(7147)
var polyfills = __nccwpck_require__(6852)
var legacy = __nccwpck_require__(1773)
var clone = __nccwpck_require__(7430)

var util = __nccwpck_require__(3837)

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue
var previousSymbol

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue')
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous')
} else {
  gracefulQueue = '___graceful-fs.queue'
  previousSymbol = '___graceful-fs.previous'
}

function noop () {}

function publishQueue(context, queue) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue
    }
  })
}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

// Once time initialization
if (!fs[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue = global[gracefulQueue] || []
  publishQueue(fs, queue)

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs.close = (function (fs$close) {
    function close (fd, cb) {
      return fs$close.call(fs, fd, function (err) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          resetQueue()
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments)
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    })
    return close
  })(fs.close)

  fs.closeSync = (function (fs$closeSync) {
    function closeSync (fd) {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs, arguments)
      resetQueue()
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    })
    return closeSync
  })(fs.closeSync)

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(fs[gracefulQueue])
      __nccwpck_require__(9491).equal(fs[gracefulQueue].length, 0)
    })
  }
}

if (!global[gracefulQueue]) {
  publishQueue(global, fs[gracefulQueue]);
}

module.exports = patch(clone(fs))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    module.exports = patch(fs)
    fs.__patched = true;
}

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch

  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb, startTime) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb, startTime) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb, startTime) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$copyFile = fs.copyFile
  if (fs$copyFile)
    fs.copyFile = copyFile
  function copyFile (src, dest, flags, cb) {
    if (typeof flags === 'function') {
      cb = flags
      flags = 0
    }
    return go$copyFile(src, dest, flags, cb)

    function go$copyFile (src, dest, flags, cb, startTime) {
      return fs$copyFile(src, dest, flags, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  var noReaddirOptionVersions = /^v[0-5]\./
  function readdir (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    var go$readdir = noReaddirOptionVersions.test(process.version)
      ? function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }
      : function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, options, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }

    return go$readdir(path, options, cb)

    function fs$readdirCallback (path, options, cb, startTime) {
      return function (err, files) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([
            go$readdir,
            [path, options, cb],
            err,
            startTime || Date.now(),
            Date.now()
          ])
        else {
          if (files && files.sort)
            files.sort()

          if (typeof cb === 'function')
            cb.call(this, err, files)
        }
      }
    }
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype)
    ReadStream.prototype.open = ReadStream$open
  }

  var fs$WriteStream = fs.WriteStream
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype)
    WriteStream.prototype.open = WriteStream$open
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  // legacy names
  var FileReadStream = ReadStream
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val) {
      FileReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  var FileWriteStream = WriteStream
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val) {
      FileWriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new fs.WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb, startTime) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  fs[gracefulQueue].push(elem)
  retry()
}

// keep track of the timeout between retry() calls
var retryTimer

// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function resetQueue () {
  var now = Date.now()
  for (var i = 0; i < fs[gracefulQueue].length; ++i) {
    // entries that are only a length of 2 are from an older version, don't
    // bother modifying those since they'll be retried anyway.
    if (fs[gracefulQueue][i].length > 2) {
      fs[gracefulQueue][i][3] = now // startTime
      fs[gracefulQueue][i][4] = now // lastTime
    }
  }
  // call retry to make sure we're actively processing the queue
  retry()
}

function retry () {
  // clear the timer and remove it to help prevent unintended concurrency
  clearTimeout(retryTimer)
  retryTimer = undefined

  if (fs[gracefulQueue].length === 0)
    return

  var elem = fs[gracefulQueue].shift()
  var fn = elem[0]
  var args = elem[1]
  // these items may be unset if they were added by an older graceful-fs
  var err = elem[2]
  var startTime = elem[3]
  var lastTime = elem[4]

  // if we don't have a startTime we have no way of knowing if we've waited
  // long enough, so go ahead and retry this item now
  if (startTime === undefined) {
    debug('RETRY', fn.name, args)
    fn.apply(null, args)
  } else if (Date.now() - startTime >= 60000) {
    // it's been more than 60 seconds total, bail now
    debug('TIMEOUT', fn.name, args)
    var cb = args.pop()
    if (typeof cb === 'function')
      cb.call(null, err)
  } else {
    // the amount of time between the last attempt and right now
    var sinceAttempt = Date.now() - lastTime
    // the amount of time between when we first tried, and when we last tried
    // rounded up to at least 1
    var sinceStart = Math.max(lastTime - startTime, 1)
    // backoff. wait longer than the total time we've been retrying, but only
    // up to a maximum of 100ms
    var desiredDelay = Math.min(sinceStart * 1.2, 100)
    // it's been long enough since the last retry, do it again
    if (sinceAttempt >= desiredDelay) {
      debug('RETRY', fn.name, args)
      fn.apply(null, args.concat([startTime]))
    } else {
      // if we can't do this job yet, push it to the end of the queue
      // and let the next iteration check again
      fs[gracefulQueue].push(elem)
    }
  }

  // schedule our next run if one isn't already scheduled
  if (retryTimer === undefined) {
    retryTimer = setTimeout(retry, 0)
  }
}


/***/ }),

/***/ 1773:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Stream = (__nccwpck_require__(2781).Stream)

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),

/***/ 6852:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var constants = __nccwpck_require__(2057)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

// This check is needed until node.js 12 is required
if (typeof process.chdir === 'function') {
  var chdir = process.chdir
  process.chdir = function (d) {
    cwd = null
    chdir.call(process, d)
  }
  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (fs.chmod && !fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (fs.chown && !fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = typeof fs.rename !== 'function' ? fs.rename
    : (function (fs$rename) {
      function rename (from, to, cb) {
        var start = Date.now()
        var backoff = 0;
        fs$rename(from, to, function CB (er) {
          if (er
              && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY")
              && Date.now() - start < 60000) {
            setTimeout(function() {
              fs.stat(to, function (stater, st) {
                if (stater && stater.code === "ENOENT")
                  fs$rename(from, to, CB);
                else
                  cb(er)
              })
            }, backoff)
            if (backoff < 100)
              backoff += 10;
            return;
          }
          if (cb) cb(er)
        })
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename)
      return rename
    })(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = typeof fs.read !== 'function' ? fs.read
  : (function (fs$read) {
    function read (fd, buffer, offset, length, position, callback_) {
      var callback
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++
            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments)
        }
      }
      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
    }

    // This ensures `util.promisify` works as it does for native `fs.read`.
    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read)
    return read
  })(fs.read)

  fs.readSync = typeof fs.readSync !== 'function' ? fs.readSync
  : (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)

  function patchLchmod (fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open( path
             , constants.O_WRONLY | constants.O_SYMLINK
             , mode
             , function (err, fd) {
        if (err) {
          if (callback) callback(err)
          return
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function(err2) {
            if (callback) callback(err || err2)
          })
        })
      })
    }

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true
      var ret
      try {
        ret = fs.fchmodSync(fd, mode)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }
  }

  function patchLutimes (fs) {
    if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants.O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er)
            return
          }
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2)
            })
          })
        })
      }

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants.O_SYMLINK)
        var ret
        var threw = true
        try {
          ret = fs.futimesSync(fd, at, mt)
          threw = false
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd)
            } catch (er) {}
          } else {
            fs.closeSync(fd)
          }
        }
        return ret
      }

    } else if (fs.futimes) {
      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
      fs.lutimesSync = function () {}
    }
  }

  function chmodFix (orig) {
    if (!orig) return orig
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chmodFixSync (orig) {
    if (!orig) return orig
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }


  function chownFix (orig) {
    if (!orig) return orig
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chownFixSync (orig) {
    if (!orig) return orig
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }

  function statFix (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = null
      }
      function callback (er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000
          if (stats.gid < 0) stats.gid += 0x100000000
        }
        if (cb) cb.apply(this, arguments)
      }
      return options ? orig.call(fs, target, options, callback)
        : orig.call(fs, target, callback)
    }
  }

  function statFixSync (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options) {
      var stats = options ? orig.call(fs, target, options)
        : orig.call(fs, target)
      if (stats) {
        if (stats.uid < 0) stats.uid += 0x100000000
        if (stats.gid < 0) stats.gid += 0x100000000
      }
      return stats;
    }
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk (er) {
    if (!er)
      return true

    if (er.code === "ENOSYS")
      return true

    var nonroot = !process.getuid || process.getuid() !== 0
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true
    }

    return false
  }
}


/***/ }),

/***/ 5430:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var _fs
try {
  _fs = __nccwpck_require__(2353)
} catch (_) {
  _fs = __nccwpck_require__(7147)
}

function readFile (file, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }

  if (typeof options === 'string') {
    options = {encoding: options}
  }

  options = options || {}
  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  fs.readFile(file, options, function (err, data) {
    if (err) return callback(err)

    data = stripBom(data)

    var obj
    try {
      obj = JSON.parse(data, options ? options.reviver : null)
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ': ' + err2.message
        return callback(err2)
      } else {
        return callback(null, null)
      }
    }

    callback(null, obj)
  })
}

function readFileSync (file, options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {encoding: options}
  }

  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  try {
    var content = fs.readFileSync(file, options)
    content = stripBom(content)
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ': ' + err.message
      throw err
    } else {
      return null
    }
  }
}

function stringify (obj, options) {
  var spaces
  var EOL = '\n'
  if (typeof options === 'object' && options !== null) {
    if (options.spaces) {
      spaces = options.spaces
    }
    if (options.EOL) {
      EOL = options.EOL
    }
  }

  var str = JSON.stringify(obj, options ? options.replacer : null, spaces)

  return str.replace(/\n/g, EOL) + EOL
}

function writeFile (file, obj, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }
  options = options || {}
  var fs = options.fs || _fs

  var str = ''
  try {
    str = stringify(obj, options)
  } catch (err) {
    // Need to return whether a callback was passed or not
    if (callback) callback(err, null)
    return
  }

  fs.writeFile(file, str, options, callback)
}

function writeFileSync (file, obj, options) {
  options = options || {}
  var fs = options.fs || _fs

  var str = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

function stripBom (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8')
  content = content.replace(/^\uFEFF/, '')
  return content
}

var jsonfile = {
  readFile: readFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync
}

module.exports = jsonfile


/***/ }),

/***/ 725:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 5608:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {showConsole, hideConsole} = __nccwpck_require__(8090);

module.exports = {
    showConsole,
    hideConsole
}

/***/ }),

/***/ 7167:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var robotjs = __nccwpck_require__(8882);

module.exports = robotjs;

module.exports.screen = {};

function bitmap(width, height, byteWidth, bitsPerPixel, bytesPerPixel, image) 
{
    this.width = width;
    this.height = height;
    this.byteWidth = byteWidth;
    this.bitsPerPixel = bitsPerPixel;
    this.bytesPerPixel = bytesPerPixel;
    this.image = image;

    this.colorAt = function(x, y)
    {
        return robotjs.getColor(this, x, y);
    };

}

module.exports.screen.capture = function(x, y, width, height)
{
    //If coords have been passed, use them.
    if (typeof x !== "undefined" && typeof y !== "undefined" && typeof width !== "undefined" && typeof height !== "undefined")
    {
        b = robotjs.captureScreen(x, y, width, height);
    }
    else 
    {
        b = robotjs.captureScreen();
    }

    return new bitmap(b.width, b.height, b.byteWidth, b.bitsPerPixel, b.bytesPerPixel, b.image);
};


/***/ }),

/***/ 8878:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const { spawn, spawnSync } = __nccwpck_require__(2081)

const scriptFactory = () => keys => `
$wshell = New-Object -ComObject wscript.shell;
$wshell.SendKeys("${keys}");
`

const argumentChecker = (arg, type) => {
  if (typeof arg !== type) {
    throw new Error('Argument must be of type ' + type)
  }
}

const accum = stream => {
  const buffers = []
  stream.on('data', data => buffers.push(data))
  return () => Buffer.concat(buffers).toString()
}

const spawnPowershellScript = command => {
  const p = spawn('powershell', ['-command', command], {
    stdio: 'pipe'
  })
  const errData = accum(p.stderr)

  return new Promise((resolve, reject) => {
    p.on('close', code => {
      if (code !== 0) {
        return reject(errData())
      }
      resolve()
    })
  })
}

const spawnPowershellScriptSync = command => {
  const { stderr, status } = spawnSync('powershell', ['-command', command])
  if (status !== 0) {
    throw stderr
  }
}

const sendKeysFactory = (isSync, script, spawn, argumentChecker) => {
  const sendKeys = keys => {
    argumentChecker(keys, 'string')
    const command = script(keys)
    return spawn(command)
  }
  if (isSync) {
    return sendKeys
  }
  return keys => Promise.resolve().then(() => sendKeys(keys))
}

module.exports = {
  sendKeysFactory,
  spawnPowershellScript,
  spawnPowershellScriptSync,
  scriptFactory,
  argumentChecker
}


/***/ }),

/***/ 2864:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const {
  sendKeysFactory,
  spawnPowershellScript,
  spawnPowershellScriptSync,
  scriptFactory,
  argumentChecker
} = __nccwpck_require__(8878)

const script = scriptFactory()

const sendKeys = sendKeysFactory(
  false,
  script,
  spawnPowershellScript,
  argumentChecker
)

const sendKeysSync = sendKeysFactory(
  true,
  script,
  spawnPowershellScriptSync,
  argumentChecker
)

sendKeys.default = sendKeys // ES6
sendKeys.sync = sendKeysSync

module.exports = sendKeys


/***/ }),

/***/ 5013:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SerialPort = __nccwpck_require__(2433)
const Binding = __nccwpck_require__(5036)
const parsers = __nccwpck_require__(7434)

/**
 * @type {AbstractBinding}
 */
SerialPort.Binding = Binding

/**
 * @type {Parsers}
 */
SerialPort.parsers = parsers

module.exports = SerialPort


/***/ }),

/***/ 7434:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  ByteLength: __nccwpck_require__(8877),
  CCTalk: __nccwpck_require__(4946),
  Delimiter: __nccwpck_require__(7019),
  InterByteTimeout: __nccwpck_require__(5907),
  Readline: __nccwpck_require__(8246),
  Ready: __nccwpck_require__(509),
  Regex: __nccwpck_require__(1214),
}


/***/ }),

/***/ 735:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var child = __nccwpck_require__(2081);
var path = __nccwpck_require__(1017);
var os = __nccwpck_require__(2037);
var fs = __nccwpck_require__(4399);
var EventEmitter = __nccwpck_require__(2361);
var readline = __nccwpck_require__(4521);
var debug_1 = __nccwpck_require__(8311);
var pkg = __nccwpck_require__(6785);
var debug = debug_1.default(pkg.name);
var getTrayBinPath = function (debug, copyDir) {
    if (debug === void 0) { debug = false; }
    if (copyDir === void 0) { copyDir = false; }
    var binName = ({
        win32: "tray_windows" + (debug ? '' : '_release') + ".exe",
        darwin: "tray_darwin" + (debug ? '' : '_release'),
        linux: "tray_linux" + (debug ? '' : '_release'),
    })[process.platform];
    var binPath = __nccwpck_require__.ab + "traybin/" + binName;
    if (copyDir) {
        copyDir = path.join((typeof copyDir === 'string'
            ? copyDir
            : os.homedir() + "/.cache/node-systray/"), pkg.version);
        var copyDistPath = path.join(copyDir, binName);
        if (!fs.existsSync(copyDistPath)) {
            fs.ensureDirSync(copyDir);
            fs.copySync(binPath, copyDistPath);
        }
        return copyDistPath;
    }
    return binPath;
};
var CHECK_STR = ' (√)';
function updateCheckedInLinux(item) {
    if (process.platform !== 'linux') {
        return item;
    }
    if (item.checked) {
        item.title += CHECK_STR;
    }
    else {
        item.title = (item.title || '').replace(RegExp(CHECK_STR + '$'), '');
    }
    return item;
}
var SysTray = /** @class */ (function (_super) {
    __extends(SysTray, _super);
    function SysTray(conf) {
        var _this = _super.call(this) || this;
        _this._conf = conf;
        _this._binPath = getTrayBinPath(conf.debug, conf.copyDir);
        _this._process = child.spawn(_this._binPath, [], {
            windowsHide: true
        });
        _this._rl = readline.createInterface({
            input: _this._process.stdout,
        });
        conf.menu.items = conf.menu.items.map(updateCheckedInLinux);
        _this._rl.on('line', function (data) { return debug('onLine', data); });
        _this.onReady(function () { return _this.writeLine(JSON.stringify(conf.menu)); });
        return _this;
    }
    SysTray.prototype.onReady = function (listener) {
        this._rl.on('line', function (line) {
            var action = JSON.parse(line);
            if (action.type === 'ready') {
                listener();
                debug('onReady', action);
            }
        });
        return this;
    };
    SysTray.prototype.onClick = function (listener) {
        this._rl.on('line', function (line) {
            var action = JSON.parse(line);
            if (action.type === 'clicked') {
                debug('onClick', action);
                listener(action);
            }
        });
        return this;
    };
    SysTray.prototype.writeLine = function (line) {
        if (line) {
            debug('writeLine', line + '\n', '=====');
            this._process.stdin.write(line.trim() + '\n');
        }
        return this;
    };
    SysTray.prototype.sendAction = function (action) {
        switch (action.type) {
            case 'update-item':
                action.item = updateCheckedInLinux(action.item);
                break;
            case 'update-menu':
                action.menu.items = action.menu.items.map(updateCheckedInLinux);
                break;
            case 'update-menu-and-item':
                action.menu.items = action.menu.items.map(updateCheckedInLinux);
                action.item = updateCheckedInLinux(action.item);
                break;
        }
        debug('sendAction', action);
        this.writeLine(JSON.stringify(action));
        return this;
    };
    /**
     * Kill the systray process
     * @param exitNode Exit current node process after systray process is killed, default is true
     */
    SysTray.prototype.kill = function (exitNode) {
        if (exitNode === void 0) { exitNode = true; }
        if (exitNode) {
            this.onExit(function () { return process.exit(0); });
        }
        this._rl.close();
        this._process.kill();
    };
    SysTray.prototype.onExit = function (listener) {
        this._process.on('exit', listener);
    };
    SysTray.prototype.onError = function (listener) {
        var _this = this;
        this._process.on('error', function (err) {
            debug('onError', err, 'binPath', _this.binPath);
            listener(err);
        });
    };
    Object.defineProperty(SysTray.prototype, "killed", {
        get: function () {
            return this._process.killed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SysTray.prototype, "binPath", {
        get: function () {
            return this._binPath;
        },
        enumerable: true,
        configurable: true
    });
    return SysTray;
}(EventEmitter));
exports["default"] = SysTray;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9175:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __nccwpck_require__(9798)(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),

/***/ 9798:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __nccwpck_require__(725);
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),

/***/ 8311:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __nccwpck_require__(9175);
} else {
  module.exports = __nccwpck_require__(4172);
}



/***/ }),

/***/ 4172:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */
var tty = __nccwpck_require__(6224);

var util = __nccwpck_require__(3837);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __nccwpck_require__(3259);

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __nccwpck_require__(9798)(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n')
    .map(function (str) { return str.trim(); })
    .join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};



/***/ }),

/***/ 4899:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.E = function (fn) {
  return Object.defineProperty(function () {
    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)
    else {
      return new Promise((resolve, reject) => {
        arguments[arguments.length] = (err, res) => {
          if (err) return reject(err)
          resolve(res)
        }
        arguments.length++
        fn.apply(this, arguments)
      })
    }
  }, 'name', { value: fn.name })
}

exports.p = function (fn) {
  return Object.defineProperty(function () {
    const cb = arguments[arguments.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, arguments)
    else fn.apply(this, arguments).then(r => cb(null, r), cb)
  }, 'name', { value: fn.name })
}


/***/ }),

/***/ 5834:
/***/ ((__unused_webpack_module, exports) => {

exports.V =
  "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";


/***/ }),

/***/ 8090:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = require(__nccwpck_require__.ab + "build/Release/node-hide-console-window.node")

/***/ }),

/***/ 8882:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = require(__nccwpck_require__.ab + "build/Release/robotjs.node")

/***/ }),

/***/ 3259:
/***/ ((module) => {

module.exports = eval("require")("supports-color");


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 2057:
/***/ ((module) => {

"use strict";
module.exports = require("constants");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4521:
/***/ ((module) => {

"use strict";
module.exports = require("readline");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 6224:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 6785:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"systray","version":"1.0.5","description":"An systray libray for nodejs","main":"lib/index.js","typings":"lib/index.d.ts","scripts":{"build":"run-s clean build:lib doc && git add -A","build:lib":"tsc","clean":"del ./lib/**","lint":"tslint ./src/** --type-check -p ./tsconfig.json","test":"DEBUG=systray* mocha -r ts-node/register ./test/**/*.test.ts","doc":"typedoc --theme minimal --out ./docs ./src && touch ./docs/.nojekyll","cover":"cross-env NODE_ENV=development nyc ava","preversion":"npm run build && git add -A"},"engines":{"node":">=4.0.0"},"pre-commit":[],"repository":{"type":"git","url":"git+https://github.com/zaaack/node-systray.git"},"keywords":["systray","tray","gui"],"author":"zaaack","license":"MIT","bugs":{"url":"https://github.com/zaaack/node-systray/issues"},"homepage":"https://github.com/zaaack/node-systray#readme","devDependencies":{"@types/debug":"^0.0.30","@types/fs-extra":"^4.0.2","@types/mocha":"^5.2.0","@types/node":"^10.0.4","cross-env":"^5.0.5","del-cli":"^1.1.0","mocha":"^5.1.1","npm-run-all":"^4.0.2","nyc":"^11.2.1","pre-commit":"^1.2.2","ts-node":"^6.0.2","tslint":"^5.7.0","tslint-config-standard":"^6.0.1","typedoc":"^0.8.0","typescript":"^2.8.3"},"dependencies":{"debug":"^3.0.1","fs-extra":"^4.0.2"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/**
 * CONFIG FILE
 */
const fs = __nccwpck_require__(7147);
const config = JSON.parse(fs.readFileSync("./config.json"));
const MODE = config?.mode ?? "keyboard";

/**
 * PORT SETTINGS
 */
const SerialPort = __nccwpck_require__(5013);
const PORT = config?.port ?? "COM5";
const BAUDRATE = 9600;

/**
 * IMPORT SENDKEYS
 */
const sendkeys = __nccwpck_require__(2864);
const KEY = config?.key ?? " ";

/**
 * MOUSE ROBOTJS
 */
const robot = __nccwpck_require__(7167);

/**
 * IMPORT HIDE CONSOLE and SYSTRAY
 */
const { showConsole, hideConsole } = __nccwpck_require__(5608);
let show = true;

const systrayIcon = (__nccwpck_require__(5834)/* .base64Icon */ .V);

const SysTray = (__nccwpck_require__(735)["default"]);
const systray = new SysTray({
  menu: {
    icon: systrayIcon,
    items: [
      {
        title: "console (aparecer/esconder)",
        enabled: true,
      },
      {
        title: "sair",
        enabled: true,
      },
    ],
    title: "Arduino BT",
    tooltip: "Arduino BT",
  },
  copyDir: true,
});

systray.onClick((action) => {
  switch (action.seq_id) {
    case 0:
      if (show) {
        console.log("hide");
        hideConsole();
        show = false;
      } else {
        console.log("show");
        showConsole();
        show = true;
      }
      break;
    case 1:
      systray.kill();
      process.exit();
      break;
  }
});

let timeout;
function tryOpen() {
  const port = new SerialPort(
    PORT,
    {
      baudRate: BAUDRATE,
    },
    (err) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(err);
        if (port?.isOpen) return;
        tryOpen();
      }, 5000);
    }
  );

  port.on("open", () => {
    console.log("Port open");
    // hideConsole();
    show = false;
  });

  port.on("data", (data) => {
    console.log(data.toString());
    if (data?.toString() === "GO") {
      if (MODE === "mouse") {
        robot.mouseClick();
      } else sendkeys(KEY);
    }
  });

  port.on("close", () => {
    console.log("Port closed");
    setTimeout(() => {
      tryOpen();
    }, 1000);
  });
}

tryOpen();

})();

module.exports = __webpack_exports__;
/******/ })()
;
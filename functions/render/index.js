var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/@supabase/supabase-js/dist/main/lib/constants.js
var require_constants = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.DEFAULT_HEADERS = void 0;
  exports.DEFAULT_HEADERS = {};
});

// node_modules/node-fetch/lib/index.js
var require_lib = __commonJS((exports, module2) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var Stream2 = _interopDefault(require("stream"));
  var http2 = _interopDefault(require("http"));
  var Url = _interopDefault(require("url"));
  var https2 = _interopDefault(require("https"));
  var zlib2 = _interopDefault(require("zlib"));
  var Readable2 = Stream2.Readable;
  var BUFFER = Symbol("buffer");
  var TYPE = Symbol("type");
  var Blob2 = class {
    constructor() {
      this[TYPE] = "";
      const blobParts = arguments[0];
      const options2 = arguments[1];
      const buffers = [];
      let size = 0;
      if (blobParts) {
        const a = blobParts;
        const length = Number(a.length);
        for (let i = 0; i < length; i++) {
          const element = a[i];
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob2) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length;
          buffers.push(buffer);
        }
      }
      this[BUFFER] = Buffer.concat(buffers);
      let type = options2 && options2.type !== void 0 && String(options2.type).toLowerCase();
      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }
    get size() {
      return this[BUFFER].length;
    }
    get type() {
      return this[TYPE];
    }
    text() {
      return Promise.resolve(this[BUFFER].toString());
    }
    arrayBuffer() {
      const buf = this[BUFFER];
      const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      return Promise.resolve(ab);
    }
    stream() {
      const readable = new Readable2();
      readable._read = function() {
      };
      readable.push(this[BUFFER]);
      readable.push(null);
      return readable;
    }
    toString() {
      return "[object Blob]";
    }
    slice() {
      const size = this.size;
      const start = arguments[0];
      const end = arguments[1];
      let relativeStart, relativeEnd;
      if (start === void 0) {
        relativeStart = 0;
      } else if (start < 0) {
        relativeStart = Math.max(size + start, 0);
      } else {
        relativeStart = Math.min(start, size);
      }
      if (end === void 0) {
        relativeEnd = size;
      } else if (end < 0) {
        relativeEnd = Math.max(size + end, 0);
      } else {
        relativeEnd = Math.min(end, size);
      }
      const span = Math.max(relativeEnd - relativeStart, 0);
      const buffer = this[BUFFER];
      const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
      const blob = new Blob2([], {type: arguments[2]});
      blob[BUFFER] = slicedBuffer;
      return blob;
    }
  };
  Object.defineProperties(Blob2.prototype, {
    size: {enumerable: true},
    type: {enumerable: true},
    slice: {enumerable: true}
  });
  Object.defineProperty(Blob2.prototype, Symbol.toStringTag, {
    value: "Blob",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function FetchError2(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    if (systemError) {
      this.code = this.errno = systemError.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
  FetchError2.prototype = Object.create(Error.prototype);
  FetchError2.prototype.constructor = FetchError2;
  FetchError2.prototype.name = "FetchError";
  var convert;
  try {
    convert = require("encoding").convert;
  } catch (e) {
  }
  var INTERNALS2 = Symbol("Body internals");
  var PassThrough2 = Stream2.PassThrough;
  function Body2(body) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
    let size = _ref$size === void 0 ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
    if (body == null) {
      body = null;
    } else if (isURLSearchParams(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob2(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream2)
      ;
    else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS2] = {
      body,
      disturbed: false,
      error: null
    };
    this.size = size;
    this.timeout = timeout;
    if (body instanceof Stream2) {
      body.on("error", function(err) {
        const error2 = err.name === "AbortError" ? err : new FetchError2(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
        _this[INTERNALS2].error = error2;
      });
    }
  }
  Body2.prototype = {
    get body() {
      return this[INTERNALS2].body;
    },
    get bodyUsed() {
      return this[INTERNALS2].disturbed;
    },
    arrayBuffer() {
      return consumeBody2.call(this).then(function(buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },
    blob() {
      let ct = this.headers && this.headers.get("content-type") || "";
      return consumeBody2.call(this).then(function(buf) {
        return Object.assign(new Blob2([], {
          type: ct.toLowerCase()
        }), {
          [BUFFER]: buf
        });
      });
    },
    json() {
      var _this2 = this;
      return consumeBody2.call(this).then(function(buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body2.Promise.reject(new FetchError2(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
        }
      });
    },
    text() {
      return consumeBody2.call(this).then(function(buffer) {
        return buffer.toString();
      });
    },
    buffer() {
      return consumeBody2.call(this);
    },
    textConverted() {
      var _this3 = this;
      return consumeBody2.call(this).then(function(buffer) {
        return convertBody(buffer, _this3.headers);
      });
    }
  };
  Object.defineProperties(Body2.prototype, {
    body: {enumerable: true},
    bodyUsed: {enumerable: true},
    arrayBuffer: {enumerable: true},
    blob: {enumerable: true},
    json: {enumerable: true},
    text: {enumerable: true}
  });
  Body2.mixIn = function(proto) {
    for (const name of Object.getOwnPropertyNames(Body2.prototype)) {
      if (!(name in proto)) {
        const desc = Object.getOwnPropertyDescriptor(Body2.prototype, name);
        Object.defineProperty(proto, name, desc);
      }
    }
  };
  function consumeBody2() {
    var _this4 = this;
    if (this[INTERNALS2].disturbed) {
      return Body2.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    }
    this[INTERNALS2].disturbed = true;
    if (this[INTERNALS2].error) {
      return Body2.Promise.reject(this[INTERNALS2].error);
    }
    let body = this.body;
    if (body === null) {
      return Body2.Promise.resolve(Buffer.alloc(0));
    }
    if (isBlob2(body)) {
      body = body.stream();
    }
    if (Buffer.isBuffer(body)) {
      return Body2.Promise.resolve(body);
    }
    if (!(body instanceof Stream2)) {
      return Body2.Promise.resolve(Buffer.alloc(0));
    }
    let accum = [];
    let accumBytes = 0;
    let abort = false;
    return new Body2.Promise(function(resolve2, reject) {
      let resTimeout;
      if (_this4.timeout) {
        resTimeout = setTimeout(function() {
          abort = true;
          reject(new FetchError2(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
        }, _this4.timeout);
      }
      body.on("error", function(err) {
        if (err.name === "AbortError") {
          abort = true;
          reject(err);
        } else {
          reject(new FetchError2(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
        }
      });
      body.on("data", function(chunk) {
        if (abort || chunk === null) {
          return;
        }
        if (_this4.size && accumBytes + chunk.length > _this4.size) {
          abort = true;
          reject(new FetchError2(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
          return;
        }
        accumBytes += chunk.length;
        accum.push(chunk);
      });
      body.on("end", function() {
        if (abort) {
          return;
        }
        clearTimeout(resTimeout);
        try {
          resolve2(Buffer.concat(accum, accumBytes));
        } catch (err) {
          reject(new FetchError2(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
        }
      });
    });
  }
  function convertBody(buffer, headers) {
    if (typeof convert !== "function") {
      throw new Error("The package `encoding` must be installed to use the textConverted() function");
    }
    const ct = headers.get("content-type");
    let charset = "utf-8";
    let res, str;
    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    }
    str = buffer.slice(0, 1024).toString();
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (!res) {
        res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
        if (res) {
          res.pop();
        }
      }
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === "gb2312" || charset === "gbk") {
        charset = "gb18030";
      }
    }
    return convert(buffer, "UTF-8", charset).toString();
  }
  function isURLSearchParams(obj) {
    if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
      return false;
    }
    return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
  }
  function isBlob2(obj) {
    return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
  }
  function clone2(instance) {
    let p1, p2;
    let body = instance.body;
    if (instance.bodyUsed) {
      throw new Error("cannot clone body after it is used");
    }
    if (body instanceof Stream2 && typeof body.getBoundary !== "function") {
      p1 = new PassThrough2();
      p2 = new PassThrough2();
      body.pipe(p1);
      body.pipe(p2);
      instance[INTERNALS2].body = p1;
      body = p2;
    }
    return body;
  }
  function extractContentType2(body) {
    if (body === null) {
      return null;
    } else if (typeof body === "string") {
      return "text/plain;charset=UTF-8";
    } else if (isURLSearchParams(body)) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isBlob2(body)) {
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      return null;
    } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      return null;
    } else if (ArrayBuffer.isView(body)) {
      return null;
    } else if (typeof body.getBoundary === "function") {
      return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else if (body instanceof Stream2) {
      return null;
    } else {
      return "text/plain;charset=UTF-8";
    }
  }
  function getTotalBytes2(instance) {
    const body = instance.body;
    if (body === null) {
      return 0;
    } else if (isBlob2(body)) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (body && typeof body.getLengthSync === "function") {
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
        return body.getLengthSync();
      }
      return null;
    } else {
      return null;
    }
  }
  function writeToStream2(dest, instance) {
    const body = instance.body;
    if (body === null) {
      dest.end();
    } else if (isBlob2(body)) {
      body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
      dest.write(body);
      dest.end();
    } else {
      body.pipe(dest);
    }
  }
  Body2.Promise = global.Promise;
  var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
  var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
  function validateName(name) {
    name = `${name}`;
    if (invalidTokenRegex.test(name) || name === "") {
      throw new TypeError(`${name} is not a legal HTTP header name`);
    }
  }
  function validateValue(value) {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
      throw new TypeError(`${value} is not a legal HTTP header value`);
    }
  }
  function find(map, name) {
    name = name.toLowerCase();
    for (const key in map) {
      if (key.toLowerCase() === name) {
        return key;
      }
    }
    return void 0;
  }
  var MAP = Symbol("map");
  var Headers2 = class {
    constructor() {
      let init2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      this[MAP] = Object.create(null);
      if (init2 instanceof Headers2) {
        const rawHeaders = init2.raw();
        const headerNames = Object.keys(rawHeaders);
        for (const headerName of headerNames) {
          for (const value of rawHeaders[headerName]) {
            this.append(headerName, value);
          }
        }
        return;
      }
      if (init2 == null)
        ;
      else if (typeof init2 === "object") {
        const method = init2[Symbol.iterator];
        if (method != null) {
          if (typeof method !== "function") {
            throw new TypeError("Header pairs must be iterable");
          }
          const pairs = [];
          for (const pair of init2) {
            if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
              throw new TypeError("Each header pair must be iterable");
            }
            pairs.push(Array.from(pair));
          }
          for (const pair of pairs) {
            if (pair.length !== 2) {
              throw new TypeError("Each header pair must be a name/value tuple");
            }
            this.append(pair[0], pair[1]);
          }
        } else {
          for (const key of Object.keys(init2)) {
            const value = init2[key];
            this.append(key, value);
          }
        }
      } else {
        throw new TypeError("Provided initializer must be an object");
      }
    }
    get(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key === void 0) {
        return null;
      }
      return this[MAP][key].join(", ");
    }
    forEach(callback) {
      let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
      let pairs = getHeaders(this);
      let i = 0;
      while (i < pairs.length) {
        var _pairs$i = pairs[i];
        const name = _pairs$i[0], value = _pairs$i[1];
        callback.call(thisArg, value, name, this);
        pairs = getHeaders(this);
        i++;
      }
    }
    set(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      this[MAP][key !== void 0 ? key : name] = [value];
    }
    append(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        this[MAP][key].push(value);
      } else {
        this[MAP][name] = [value];
      }
    }
    has(name) {
      name = `${name}`;
      validateName(name);
      return find(this[MAP], name) !== void 0;
    }
    delete(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        delete this[MAP][key];
      }
    }
    raw() {
      return this[MAP];
    }
    keys() {
      return createHeadersIterator(this, "key");
    }
    values() {
      return createHeadersIterator(this, "value");
    }
    [Symbol.iterator]() {
      return createHeadersIterator(this, "key+value");
    }
  };
  Headers2.prototype.entries = Headers2.prototype[Symbol.iterator];
  Object.defineProperty(Headers2.prototype, Symbol.toStringTag, {
    value: "Headers",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Headers2.prototype, {
    get: {enumerable: true},
    forEach: {enumerable: true},
    set: {enumerable: true},
    append: {enumerable: true},
    has: {enumerable: true},
    delete: {enumerable: true},
    keys: {enumerable: true},
    values: {enumerable: true},
    entries: {enumerable: true}
  });
  function getHeaders(headers) {
    let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === "key" ? function(k) {
      return k.toLowerCase();
    } : kind === "value" ? function(k) {
      return headers[MAP][k].join(", ");
    } : function(k) {
      return [k.toLowerCase(), headers[MAP][k].join(", ")];
    });
  }
  var INTERNAL = Symbol("internal");
  function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target,
      kind,
      index: 0
    };
    return iterator;
  }
  var HeadersIteratorPrototype = Object.setPrototypeOf({
    next() {
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError("Value of `this` is not a HeadersIterator");
      }
      var _INTERNAL = this[INTERNAL];
      const target = _INTERNAL.target, kind = _INTERNAL.kind, index2 = _INTERNAL.index;
      const values = getHeaders(target, kind);
      const len = values.length;
      if (index2 >= len) {
        return {
          value: void 0,
          done: true
        };
      }
      this[INTERNAL].index = index2 + 1;
      return {
        value: values[index2],
        done: false
      };
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: "HeadersIterator",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function exportNodeCompatibleHeaders(headers) {
    const obj = Object.assign({__proto__: null}, headers[MAP]);
    const hostHeaderKey = find(headers[MAP], "Host");
    if (hostHeaderKey !== void 0) {
      obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }
    return obj;
  }
  function createHeadersLenient(obj) {
    const headers = new Headers2();
    for (const name of Object.keys(obj)) {
      if (invalidTokenRegex.test(name)) {
        continue;
      }
      if (Array.isArray(obj[name])) {
        for (const val of obj[name]) {
          if (invalidHeaderCharRegex.test(val)) {
            continue;
          }
          if (headers[MAP][name] === void 0) {
            headers[MAP][name] = [val];
          } else {
            headers[MAP][name].push(val);
          }
        }
      } else if (!invalidHeaderCharRegex.test(obj[name])) {
        headers[MAP][name] = [obj[name]];
      }
    }
    return headers;
  }
  var INTERNALS$12 = Symbol("Response internals");
  var STATUS_CODES = http2.STATUS_CODES;
  var Response3 = class {
    constructor() {
      let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      Body2.call(this, body, opts);
      const status = opts.status || 200;
      const headers = new Headers2(opts.headers);
      if (body != null && !headers.has("Content-Type")) {
        const contentType = extractContentType2(body);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      this[INTERNALS$12] = {
        url: opts.url,
        status,
        statusText: opts.statusText || STATUS_CODES[status],
        headers,
        counter: opts.counter
      };
    }
    get url() {
      return this[INTERNALS$12].url || "";
    }
    get status() {
      return this[INTERNALS$12].status;
    }
    get ok() {
      return this[INTERNALS$12].status >= 200 && this[INTERNALS$12].status < 300;
    }
    get redirected() {
      return this[INTERNALS$12].counter > 0;
    }
    get statusText() {
      return this[INTERNALS$12].statusText;
    }
    get headers() {
      return this[INTERNALS$12].headers;
    }
    clone() {
      return new Response3(clone2(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected
      });
    }
  };
  Body2.mixIn(Response3.prototype);
  Object.defineProperties(Response3.prototype, {
    url: {enumerable: true},
    status: {enumerable: true},
    ok: {enumerable: true},
    redirected: {enumerable: true},
    statusText: {enumerable: true},
    headers: {enumerable: true},
    clone: {enumerable: true}
  });
  Object.defineProperty(Response3.prototype, Symbol.toStringTag, {
    value: "Response",
    writable: false,
    enumerable: false,
    configurable: true
  });
  var INTERNALS$22 = Symbol("Request internals");
  var parse_url = Url.parse;
  var format_url = Url.format;
  var streamDestructionSupported = "destroy" in Stream2.Readable.prototype;
  function isRequest2(input) {
    return typeof input === "object" && typeof input[INTERNALS$22] === "object";
  }
  function isAbortSignal2(signal) {
    const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === "AbortSignal");
  }
  var Request2 = class {
    constructor(input) {
      let init2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let parsedURL;
      if (!isRequest2(input)) {
        if (input && input.href) {
          parsedURL = parse_url(input.href);
        } else {
          parsedURL = parse_url(`${input}`);
        }
        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }
      let method = init2.method || input.method || "GET";
      method = method.toUpperCase();
      if ((init2.body != null || isRequest2(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body");
      }
      let inputBody = init2.body != null ? init2.body : isRequest2(input) && input.body !== null ? clone2(input) : null;
      Body2.call(this, inputBody, {
        timeout: init2.timeout || input.timeout || 0,
        size: init2.size || input.size || 0
      });
      const headers = new Headers2(init2.headers || input.headers || {});
      if (inputBody != null && !headers.has("Content-Type")) {
        const contentType = extractContentType2(inputBody);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      let signal = isRequest2(input) ? input.signal : null;
      if ("signal" in init2)
        signal = init2.signal;
      if (signal != null && !isAbortSignal2(signal)) {
        throw new TypeError("Expected signal to be an instanceof AbortSignal");
      }
      this[INTERNALS$22] = {
        method,
        redirect: init2.redirect || input.redirect || "follow",
        headers,
        parsedURL,
        signal
      };
      this.follow = init2.follow !== void 0 ? init2.follow : input.follow !== void 0 ? input.follow : 20;
      this.compress = init2.compress !== void 0 ? init2.compress : input.compress !== void 0 ? input.compress : true;
      this.counter = init2.counter || input.counter || 0;
      this.agent = init2.agent || input.agent;
    }
    get method() {
      return this[INTERNALS$22].method;
    }
    get url() {
      return format_url(this[INTERNALS$22].parsedURL);
    }
    get headers() {
      return this[INTERNALS$22].headers;
    }
    get redirect() {
      return this[INTERNALS$22].redirect;
    }
    get signal() {
      return this[INTERNALS$22].signal;
    }
    clone() {
      return new Request2(this);
    }
  };
  Body2.mixIn(Request2.prototype);
  Object.defineProperty(Request2.prototype, Symbol.toStringTag, {
    value: "Request",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Request2.prototype, {
    method: {enumerable: true},
    url: {enumerable: true},
    headers: {enumerable: true},
    redirect: {enumerable: true},
    clone: {enumerable: true},
    signal: {enumerable: true}
  });
  function getNodeRequestOptions2(request) {
    const parsedURL = request[INTERNALS$22].parsedURL;
    const headers = new Headers2(request[INTERNALS$22].headers);
    if (!headers.has("Accept")) {
      headers.set("Accept", "*/*");
    }
    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError("Only absolute URLs are supported");
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError("Only HTTP(S) protocols are supported");
    }
    if (request.signal && request.body instanceof Stream2.Readable && !streamDestructionSupported) {
      throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
    }
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = "0";
    }
    if (request.body != null) {
      const totalBytes = getTotalBytes2(request);
      if (typeof totalBytes === "number") {
        contentLengthValue = String(totalBytes);
      }
    }
    if (contentLengthValue) {
      headers.set("Content-Length", contentLengthValue);
    }
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
    }
    if (request.compress && !headers.has("Accept-Encoding")) {
      headers.set("Accept-Encoding", "gzip,deflate");
    }
    let agent = request.agent;
    if (typeof agent === "function") {
      agent = agent(parsedURL);
    }
    if (!headers.has("Connection") && !agent) {
      headers.set("Connection", "close");
    }
    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: exportNodeCompatibleHeaders(headers),
      agent
    });
  }
  function AbortError2(message) {
    Error.call(this, message);
    this.type = "aborted";
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
  AbortError2.prototype = Object.create(Error.prototype);
  AbortError2.prototype.constructor = AbortError2;
  AbortError2.prototype.name = "AbortError";
  var PassThrough$1 = Stream2.PassThrough;
  var resolve_url = Url.resolve;
  function fetch3(url, opts) {
    if (!fetch3.Promise) {
      throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
    }
    Body2.Promise = fetch3.Promise;
    return new fetch3.Promise(function(resolve2, reject) {
      const request = new Request2(url, opts);
      const options2 = getNodeRequestOptions2(request);
      const send = (options2.protocol === "https:" ? https2 : http2).request;
      const signal = request.signal;
      let response = null;
      const abort = function abort2() {
        let error2 = new AbortError2("The user aborted a request.");
        reject(error2);
        if (request.body && request.body instanceof Stream2.Readable) {
          request.body.destroy(error2);
        }
        if (!response || !response.body)
          return;
        response.body.emit("error", error2);
      };
      if (signal && signal.aborted) {
        abort();
        return;
      }
      const abortAndFinalize = function abortAndFinalize2() {
        abort();
        finalize();
      };
      const req = send(options2);
      let reqTimeout;
      if (signal) {
        signal.addEventListener("abort", abortAndFinalize);
      }
      function finalize() {
        req.abort();
        if (signal)
          signal.removeEventListener("abort", abortAndFinalize);
        clearTimeout(reqTimeout);
      }
      if (request.timeout) {
        req.once("socket", function(socket) {
          reqTimeout = setTimeout(function() {
            reject(new FetchError2(`network timeout at: ${request.url}`, "request-timeout"));
            finalize();
          }, request.timeout);
        });
      }
      req.on("error", function(err) {
        reject(new FetchError2(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
        finalize();
      });
      req.on("response", function(res) {
        clearTimeout(reqTimeout);
        const headers = createHeadersLenient(res.headers);
        if (fetch3.isRedirect(res.statusCode)) {
          const location = headers.get("Location");
          const locationURL = location === null ? null : resolve_url(request.url, location);
          switch (request.redirect) {
            case "error":
              reject(new FetchError2(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
              finalize();
              return;
            case "manual":
              if (locationURL !== null) {
                try {
                  headers.set("Location", locationURL);
                } catch (err) {
                  reject(err);
                }
              }
              break;
            case "follow":
              if (locationURL === null) {
                break;
              }
              if (request.counter >= request.follow) {
                reject(new FetchError2(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                finalize();
                return;
              }
              const requestOpts = {
                headers: new Headers2(request.headers),
                follow: request.follow,
                counter: request.counter + 1,
                agent: request.agent,
                compress: request.compress,
                method: request.method,
                body: request.body,
                signal: request.signal,
                timeout: request.timeout,
                size: request.size
              };
              if (res.statusCode !== 303 && request.body && getTotalBytes2(request) === null) {
                reject(new FetchError2("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                finalize();
                return;
              }
              if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                requestOpts.method = "GET";
                requestOpts.body = void 0;
                requestOpts.headers.delete("content-length");
              }
              resolve2(fetch3(new Request2(locationURL, requestOpts)));
              finalize();
              return;
          }
        }
        res.once("end", function() {
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
        });
        let body = res.pipe(new PassThrough$1());
        const response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers,
          size: request.size,
          timeout: request.timeout,
          counter: request.counter
        };
        const codings = headers.get("Content-Encoding");
        if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          response = new Response3(body, response_options);
          resolve2(response);
          return;
        }
        const zlibOptions = {
          flush: zlib2.Z_SYNC_FLUSH,
          finishFlush: zlib2.Z_SYNC_FLUSH
        };
        if (codings == "gzip" || codings == "x-gzip") {
          body = body.pipe(zlib2.createGunzip(zlibOptions));
          response = new Response3(body, response_options);
          resolve2(response);
          return;
        }
        if (codings == "deflate" || codings == "x-deflate") {
          const raw = res.pipe(new PassThrough$1());
          raw.once("data", function(chunk) {
            if ((chunk[0] & 15) === 8) {
              body = body.pipe(zlib2.createInflate());
            } else {
              body = body.pipe(zlib2.createInflateRaw());
            }
            response = new Response3(body, response_options);
            resolve2(response);
          });
          return;
        }
        if (codings == "br" && typeof zlib2.createBrotliDecompress === "function") {
          body = body.pipe(zlib2.createBrotliDecompress());
          response = new Response3(body, response_options);
          resolve2(response);
          return;
        }
        response = new Response3(body, response_options);
        resolve2(response);
      });
      writeToStream2(req, request);
    });
  }
  fetch3.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  fetch3.Promise = global.Promise;
  module2.exports = exports = fetch3;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = exports;
  exports.Headers = Headers2;
  exports.Request = Request2;
  exports.Response = Response3;
  exports.FetchError = FetchError2;
});

// node_modules/cross-fetch/dist/node-ponyfill.js
var require_node_ponyfill = __commonJS((exports, module2) => {
  var nodeFetch = require_lib();
  var realFetch = nodeFetch.default || nodeFetch;
  var fetch3 = function(url, options2) {
    if (/^\/\//.test(url)) {
      url = "https:" + url;
    }
    return realFetch.call(this, url, options2);
  };
  fetch3.ponyfill = true;
  module2.exports = exports = fetch3;
  exports.fetch = fetch3;
  exports.Headers = nodeFetch.Headers;
  exports.Request = nodeFetch.Request;
  exports.Response = nodeFetch.Response;
  exports.default = fetch3;
});

// node_modules/@supabase/gotrue-js/dist/main/lib/fetch.js
var require_fetch = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.put = exports.post = exports.get = void 0;
  var cross_fetch_1 = __importDefault(require_node_ponyfill());
  var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var handleError = (error2, reject) => {
    if (typeof error2.json !== "function") {
      return reject(error2);
    }
    error2.json().then((err) => {
      return reject({
        message: _getErrorMessage(err),
        status: (error2 === null || error2 === void 0 ? void 0 : error2.status) || 500
      });
    });
  };
  var _getRequestParams = (method, options2, body) => {
    const params = {method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {}};
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({"Content-Type": "text/plain;charset=UTF-8"}, options2 === null || options2 === void 0 ? void 0 : options2.headers);
    params.body = JSON.stringify(body);
    return params;
  };
  function _handleRequest(method, url, options2, body) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve2, reject) => {
        cross_fetch_1.default(url, _getRequestParams(method, options2, body)).then((result) => {
          if (!result.ok)
            throw result;
          if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
            return resolve2;
          return result.json();
        }).then((data) => resolve2(data)).catch((error2) => handleError(error2, reject));
      });
    });
  }
  function get(url, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("GET", url, options2);
    });
  }
  exports.get = get;
  function post(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("POST", url, options2, body);
    });
  }
  exports.post = post;
  function put(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("PUT", url, options2, body);
    });
  }
  exports.put = put;
});

// node_modules/@supabase/gotrue-js/dist/main/lib/constants.js
var require_constants2 = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.COOKIE_OPTIONS = exports.STORAGE_KEY = exports.EXPIRY_MARGIN = exports.DEFAULT_HEADERS = exports.AUDIENCE = exports.GOTRUE_URL = void 0;
  exports.GOTRUE_URL = "http://localhost:9999";
  exports.AUDIENCE = "";
  exports.DEFAULT_HEADERS = {};
  exports.EXPIRY_MARGIN = 60 * 1e3;
  exports.STORAGE_KEY = "supabase.auth.token";
  exports.COOKIE_OPTIONS = {
    name: "sb:token",
    lifetime: 60 * 60 * 8,
    domain: "",
    path: "/",
    sameSite: "lax"
  };
});

// node_modules/@supabase/gotrue-js/dist/main/lib/cookies.js
var require_cookies = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.deleteCookie = exports.setCookie = exports.setCookies = void 0;
  function serialize(name, val, options2) {
    const opt = options2 || {};
    const enc = encodeURIComponent;
    const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    if (typeof enc !== "function") {
      throw new TypeError("option encode is invalid");
    }
    if (!fieldContentRegExp.test(name)) {
      throw new TypeError("argument name is invalid");
    }
    const value = enc(val);
    if (value && !fieldContentRegExp.test(value)) {
      throw new TypeError("argument val is invalid");
    }
    let str = name + "=" + value;
    if (opt.maxAge != null) {
      const maxAge = opt.maxAge - 0;
      if (isNaN(maxAge) || !isFinite(maxAge)) {
        throw new TypeError("option maxAge is invalid");
      }
      str += "; Max-Age=" + Math.floor(maxAge);
    }
    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError("option domain is invalid");
      }
      str += "; Domain=" + opt.domain;
    }
    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError("option path is invalid");
      }
      str += "; Path=" + opt.path;
    }
    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== "function") {
        throw new TypeError("option expires is invalid");
      }
      str += "; Expires=" + opt.expires.toUTCString();
    }
    if (opt.httpOnly) {
      str += "; HttpOnly";
    }
    if (opt.secure) {
      str += "; Secure";
    }
    if (opt.sameSite) {
      const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
      switch (sameSite) {
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return str;
  }
  function isSecureEnvironment(req) {
    if (!req || !req.headers || !req.headers.host) {
      throw new Error('The "host" request header is not available');
    }
    const host = req.headers.host.indexOf(":") > -1 && req.headers.host.split(":")[0] || req.headers.host;
    if (["localhost", "127.0.0.1"].indexOf(host) > -1) {
      return false;
    }
    return true;
  }
  function serializeCookie(cookie, secure) {
    var _a, _b, _c;
    return serialize(cookie.name, cookie.value, {
      maxAge: cookie.maxAge,
      expires: new Date(Date.now() + cookie.maxAge * 1e3),
      httpOnly: true,
      secure,
      path: (_a = cookie.path) !== null && _a !== void 0 ? _a : "/",
      domain: (_b = cookie.domain) !== null && _b !== void 0 ? _b : "",
      sameSite: (_c = cookie.sameSite) !== null && _c !== void 0 ? _c : "lax"
    });
  }
  function setCookies(req, res, cookies) {
    const strCookies = cookies.map((c) => serializeCookie(c, isSecureEnvironment(req)));
    const previousCookies = res.getHeader("Set-Cookie");
    if (previousCookies) {
      if (previousCookies instanceof Array) {
        Array.prototype.push.apply(strCookies, previousCookies);
      } else if (typeof previousCookies === "string") {
        strCookies.push(previousCookies);
      }
    }
    res.setHeader("Set-Cookie", strCookies);
  }
  exports.setCookies = setCookies;
  function setCookie(req, res, cookie) {
    setCookies(req, res, [cookie]);
  }
  exports.setCookie = setCookie;
  function deleteCookie(req, res, name) {
    setCookie(req, res, {
      name,
      value: "",
      maxAge: -1
    });
  }
  exports.deleteCookie = deleteCookie;
});

// node_modules/@supabase/gotrue-js/dist/main/lib/helpers.js
var require_helpers = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.LocalStorage = exports.getParameterByName = exports.isBrowser = exports.uuid = exports.expiresAt = void 0;
  function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1e3);
    return timeNow + expiresIn;
  }
  exports.expiresAt = expiresAt;
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  exports.uuid = uuid;
  exports.isBrowser = () => typeof window !== "undefined";
  function getParameterByName(name, url) {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  exports.getParameterByName = getParameterByName;
  var LocalStorage = class {
    constructor(localStorage) {
      this.localStorage = localStorage || globalThis.localStorage;
    }
    clear() {
      return this.localStorage.clear();
    }
    key(index2) {
      return this.localStorage.key(index2);
    }
    setItem(key, value) {
      return this.localStorage.setItem(key, value);
    }
    getItem(key) {
      return this.localStorage.getItem(key);
    }
    removeItem(key) {
      return this.localStorage.removeItem(key);
    }
  };
  exports.LocalStorage = LocalStorage;
});

// node_modules/@supabase/gotrue-js/dist/main/GoTrueApi.js
var require_GoTrueApi = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var fetch_1 = require_fetch();
  var constants_1 = require_constants2();
  var cookies_1 = require_cookies();
  var helpers_1 = require_helpers();
  var GoTrueApi = class {
    constructor({url = "", headers = {}, cookieOptions}) {
      this.url = url;
      this.headers = headers;
      this.cookieOptions = Object.assign(Object.assign({}, constants_1.COOKIE_OPTIONS), cookieOptions);
    }
    signUpWithEmail(email, password, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          if (options2.redirectTo) {
            headers["referer"] = options2.redirectTo;
          }
          const data = yield fetch_1.post(`${this.url}/signup`, {email, password}, {headers});
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = helpers_1.expiresAt(data.expires_in);
          return {data: session, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    signInWithEmail(email, password, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          if (options2.redirectTo) {
            headers["referer"] = options2.redirectTo;
          }
          const data = yield fetch_1.post(`${this.url}/token?grant_type=password`, {email, password}, {headers});
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = helpers_1.expiresAt(data.expires_in);
          return {data: session, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    sendMagicLinkEmail(email, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          if (options2.redirectTo) {
            headers["referer"] = options2.redirectTo;
          }
          const data = yield fetch_1.post(`${this.url}/magiclink`, {email}, {headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    inviteUserByEmail(email, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          if (options2.redirectTo) {
            headers["referer"] = options2.redirectTo;
          }
          const data = yield fetch_1.post(`${this.url}/invite`, {email}, {headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    resetPasswordForEmail(email, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          if (options2.redirectTo) {
            headers["referer"] = options2.redirectTo;
          }
          const data = yield fetch_1.post(`${this.url}/recover`, {email}, {headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    _createRequestHeaders(jwt) {
      const headers = Object.assign({}, this.headers);
      headers["Authorization"] = `Bearer ${jwt}`;
      return headers;
    }
    signOut(jwt) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield fetch_1.post(`${this.url}/logout`, {}, {headers: this._createRequestHeaders(jwt), noResolveJson: true});
          return {error: null};
        } catch (error2) {
          return {error: error2};
        }
      });
    }
    getUrlForProvider(provider, options2) {
      let urlParams = [`provider=${provider}`];
      if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
        urlParams.push(`redirect_to=${options2.redirectTo}`);
      }
      if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
        urlParams.push(`scopes=${options2.scopes}`);
      }
      return `${this.url}/authorize?${urlParams.join("&")}`;
    }
    getUser(jwt) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.get(`${this.url}/user`, {headers: this._createRequestHeaders(jwt)});
          return {user: data, data, error: null};
        } catch (error2) {
          return {user: null, data: null, error: error2};
        }
      });
    }
    updateUser(jwt, attributes) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.put(`${this.url}/user`, attributes, {
            headers: this._createRequestHeaders(jwt)
          });
          return {user: data, data, error: null};
        } catch (error2) {
          return {user: null, data: null, error: error2};
        }
      });
    }
    refreshAccessToken(refreshToken) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.post(`${this.url}/token?grant_type=refresh_token`, {refresh_token: refreshToken}, {headers: this.headers});
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = helpers_1.expiresAt(data.expires_in);
          return {data: session, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    setAuthCookie(req, res) {
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
      }
      const {event, session} = req.body;
      if (!event)
        throw new Error("Auth event missing!");
      if (event === "SIGNED_IN") {
        if (!session)
          throw new Error("Auth session missing!");
        cookies_1.setCookie(req, res, {
          name: this.cookieOptions.name,
          value: session.access_token,
          domain: this.cookieOptions.domain,
          maxAge: this.cookieOptions.lifetime,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        });
      }
      if (event === "SIGNED_OUT")
        cookies_1.deleteCookie(req, res, this.cookieOptions.name);
      res.status(200).json({});
    }
    getUserByCookie(req) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!req.cookies)
            throw new Error("Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!");
          if (!req.cookies[this.cookieOptions.name])
            throw new Error("No cookie found!");
          const token = req.cookies[this.cookieOptions.name];
          const {user, error: error2} = yield this.getUser(token);
          if (error2)
            throw error2;
          return {user, data: user, error: null};
        } catch (error2) {
          return {user: null, data: null, error: error2};
        }
      });
    }
  };
  exports.default = GoTrueApi;
});

// node_modules/@supabase/gotrue-js/dist/main/lib/polyfills.js
var require_polyfills = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.polyfillGlobalThis = void 0;
  function polyfillGlobalThis() {
    if (typeof globalThis === "object")
      return;
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  }
  exports.polyfillGlobalThis = polyfillGlobalThis;
});

// node_modules/@supabase/gotrue-js/dist/main/GoTrueClient.js
var require_GoTrueClient = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var GoTrueApi_1 = __importDefault(require_GoTrueApi());
  var helpers_1 = require_helpers();
  var constants_1 = require_constants2();
  var polyfills_1 = require_polyfills();
  polyfills_1.polyfillGlobalThis();
  var DEFAULT_OPTIONS = {
    url: constants_1.GOTRUE_URL,
    autoRefreshToken: true,
    persistSession: true,
    localStorage: globalThis.localStorage,
    detectSessionInUrl: true,
    headers: constants_1.DEFAULT_HEADERS
  };
  var GoTrueClient = class {
    constructor(options2) {
      this.stateChangeEmitters = new Map();
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
      this.currentUser = null;
      this.currentSession = null;
      this.autoRefreshToken = settings.autoRefreshToken;
      this.persistSession = settings.persistSession;
      this.localStorage = new helpers_1.LocalStorage(settings.localStorage);
      this.api = new GoTrueApi_1.default({
        url: settings.url,
        headers: settings.headers,
        cookieOptions: settings.cookieOptions
      });
      this._recoverSession();
      this._recoverAndRefresh();
      try {
        if (settings.detectSessionInUrl && helpers_1.isBrowser() && !!helpers_1.getParameterByName("access_token")) {
          this.getSessionFromUrl({storeSession: true});
        }
      } catch (error2) {
        console.log("Error getting session from URL.");
      }
    }
    signUp({email, password}, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          const {data, error: error2} = yield this.api.signUpWithEmail(email, password, {
            redirectTo: options2.redirectTo
          });
          if (error2) {
            throw error2;
          }
          if (!data) {
            throw "An error occurred on sign up.";
          }
          let session = null;
          let user = null;
          if (data.access_token) {
            session = data;
            user = session.user;
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          if (data.id) {
            user = data;
          }
          return {data, user, session, error: null};
        } catch (error2) {
          return {data: null, user: null, session: null, error: error2};
        }
      });
    }
    signIn({email, password, provider}, options2 = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          if (email && !password) {
            const {error: error2} = yield this.api.sendMagicLinkEmail(email, {
              redirectTo: options2.redirectTo
            });
            return {data: null, user: null, session: null, error: error2};
          }
          if (email && password) {
            return this._handleEmailSignIn(email, password, {
              redirectTo: options2.redirectTo
            });
          }
          if (provider) {
            return this._handleProviderSignIn(provider, {
              redirectTo: options2.redirectTo,
              scopes: options2.scopes
            });
          }
          throw new Error(`You must provide either an email or a third-party provider.`);
        } catch (error2) {
          return {data: null, user: null, session: null, error: error2};
        }
      });
    }
    user() {
      return this.currentUser;
    }
    session() {
      return this.currentSession;
    }
    refreshSession() {
      var _a;
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
            throw new Error("Not logged in.");
          const {error: error2} = yield this._callRefreshToken();
          if (error2)
            throw error2;
          return {data: this.currentSession, user: this.currentUser, error: null};
        } catch (error2) {
          return {data: null, user: null, error: error2};
        }
      });
    }
    update(attributes) {
      var _a;
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
            throw new Error("Not logged in.");
          const {user, error: error2} = yield this.api.updateUser(this.currentSession.access_token, attributes);
          if (error2)
            throw error2;
          if (!user)
            throw Error("Invalid user data.");
          const session = Object.assign(Object.assign({}, this.currentSession), {user});
          this._saveSession(session);
          this._notifyAllSubscribers("USER_UPDATED");
          return {data: user, user, error: null};
        } catch (error2) {
          return {data: null, user: null, error: error2};
        }
      });
    }
    getSessionFromUrl(options2) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!helpers_1.isBrowser())
            throw new Error("No browser detected.");
          const error_description = helpers_1.getParameterByName("error_description");
          if (error_description)
            throw new Error(error_description);
          const provider_token = helpers_1.getParameterByName("provider_token");
          const access_token = helpers_1.getParameterByName("access_token");
          if (!access_token)
            throw new Error("No access_token detected.");
          const expires_in = helpers_1.getParameterByName("expires_in");
          if (!expires_in)
            throw new Error("No expires_in detected.");
          const refresh_token = helpers_1.getParameterByName("refresh_token");
          if (!refresh_token)
            throw new Error("No refresh_token detected.");
          const token_type = helpers_1.getParameterByName("token_type");
          if (!token_type)
            throw new Error("No token_type detected.");
          const timeNow = Math.round(Date.now() / 1e3);
          const expires_at = timeNow + parseInt(expires_in);
          const {user, error: error2} = yield this.api.getUser(access_token);
          if (error2)
            throw error2;
          const session = {
            provider_token,
            access_token,
            expires_in: parseInt(expires_in),
            expires_at,
            refresh_token,
            token_type,
            user
          };
          if (options2 === null || options2 === void 0 ? void 0 : options2.storeSession) {
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
            if (helpers_1.getParameterByName("type") === "recovery") {
              this._notifyAllSubscribers("PASSWORD_RECOVERY");
            }
          }
          window.location.hash = "";
          return {data: session, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    signOut() {
      var _a;
      return __awaiter(this, void 0, void 0, function* () {
        const accessToken = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token;
        this._removeSession();
        this._notifyAllSubscribers("SIGNED_OUT");
        if (accessToken) {
          const {error: error2} = yield this.api.signOut(accessToken);
          if (error2)
            return {error: error2};
        }
        return {error: null};
      });
    }
    onAuthStateChange(callback) {
      try {
        const id = helpers_1.uuid();
        const self = this;
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            self.stateChangeEmitters.delete(id);
          }
        };
        this.stateChangeEmitters.set(id, subscription);
        return {data: subscription, error: null};
      } catch (error2) {
        return {data: null, error: error2};
      }
    }
    _handleEmailSignIn(email, password, options2 = {}) {
      var _a;
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const {data, error: error2} = yield this.api.signInWithEmail(email, password, {
            redirectTo: options2.redirectTo
          });
          if (error2 || !data)
            return {data: null, user: null, session: null, error: error2};
          if ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.confirmed_at) {
            this._saveSession(data);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          return {data, user: data.user, session: data, error: null};
        } catch (error2) {
          return {data: null, user: null, session: null, error: error2};
        }
      });
    }
    _handleProviderSignIn(provider, options2 = {}) {
      const url = this.api.getUrlForProvider(provider, {
        redirectTo: options2.redirectTo,
        scopes: options2.scopes
      });
      try {
        if (helpers_1.isBrowser()) {
          window.location.href = url;
        }
        return {provider, url, data: null, session: null, user: null, error: null};
      } catch (error2) {
        if (!!url)
          return {provider, url, data: null, session: null, user: null, error: null};
        return {data: null, user: null, session: null, error: error2};
      }
    }
    _recoverSession() {
      var _a;
      try {
        const json = helpers_1.isBrowser() && ((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(constants_1.STORAGE_KEY));
        if (!json || typeof json !== "string") {
          return null;
        }
        const data = JSON.parse(json);
        const {currentSession, expiresAt} = data;
        const timeNow = Math.round(Date.now() / 1e3);
        if (expiresAt >= timeNow && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
          this._saveSession(currentSession);
          this._notifyAllSubscribers("SIGNED_IN");
        }
      } catch (error2) {
        console.log("error", error2);
      }
    }
    _recoverAndRefresh() {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const json = helpers_1.isBrowser() && (yield this.localStorage.getItem(constants_1.STORAGE_KEY));
          if (!json) {
            return null;
          }
          const data = JSON.parse(json);
          const {currentSession, expiresAt} = data;
          const timeNow = Math.round(Date.now() / 1e3);
          if (expiresAt < timeNow) {
            if (this.autoRefreshToken && currentSession.refresh_token) {
              const {error: error2} = yield this._callRefreshToken(currentSession.refresh_token);
              if (error2) {
                console.log(error2.message);
                yield this._removeSession();
              }
            } else {
              this._removeSession();
            }
          } else if (!currentSession || !currentSession.user) {
            console.log("Current session is missing data.");
            this._removeSession();
          } else {
            this._saveSession(currentSession);
            this._notifyAllSubscribers("SIGNED_IN");
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      });
    }
    _callRefreshToken(refresh_token) {
      var _a;
      if (refresh_token === void 0) {
        refresh_token = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.refresh_token;
      }
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!refresh_token) {
            throw new Error("No current session.");
          }
          const {data, error: error2} = yield this.api.refreshAccessToken(refresh_token);
          if (error2)
            throw error2;
          if (!data)
            throw Error("Invalid session data.");
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    _notifyAllSubscribers(event) {
      this.stateChangeEmitters.forEach((x) => x.callback(event, this.currentSession));
    }
    _saveSession(session) {
      this.currentSession = session;
      this.currentUser = session.user;
      const expiresAt = session.expires_at;
      const timeNow = Math.round(Date.now() / 1e3);
      if (expiresAt)
        this._startAutoRefreshToken((expiresAt - timeNow - 60) * 1e3);
      if (this.persistSession && session.expires_at) {
        this._persistSession(this.currentSession);
      }
    }
    _persistSession(currentSession) {
      const data = {currentSession, expiresAt: currentSession.expires_at};
      helpers_1.isBrowser() && this.localStorage.setItem(constants_1.STORAGE_KEY, JSON.stringify(data));
    }
    _removeSession() {
      return __awaiter(this, void 0, void 0, function* () {
        this.currentSession = null;
        this.currentUser = null;
        if (this.refreshTokenTimer)
          clearTimeout(this.refreshTokenTimer);
        helpers_1.isBrowser() && (yield this.localStorage.removeItem(constants_1.STORAGE_KEY));
      });
    }
    _startAutoRefreshToken(value) {
      if (this.refreshTokenTimer)
        clearTimeout(this.refreshTokenTimer);
      if (!value || !this.autoRefreshToken)
        return;
      this.refreshTokenTimer = setTimeout(() => this._callRefreshToken(), value);
    }
  };
  exports.default = GoTrueClient;
});

// node_modules/@supabase/gotrue-js/dist/main/lib/types.js
var require_types = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
});

// node_modules/@supabase/gotrue-js/dist/main/index.js
var require_main = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.GoTrueClient = exports.GoTrueApi = void 0;
  var GoTrueApi_1 = __importDefault(require_GoTrueApi());
  exports.GoTrueApi = GoTrueApi_1.default;
  var GoTrueClient_1 = __importDefault(require_GoTrueClient());
  exports.GoTrueClient = GoTrueClient_1.default;
  __exportStar(require_types(), exports);
});

// node_modules/@supabase/supabase-js/dist/main/lib/SupabaseAuthClient.js
var require_SupabaseAuthClient = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SupabaseAuthClient = void 0;
  var gotrue_js_1 = require_main();
  var SupabaseAuthClient = class extends gotrue_js_1.GoTrueClient {
    constructor(options2) {
      super(options2);
    }
  };
  exports.SupabaseAuthClient = SupabaseAuthClient;
});

// node_modules/@supabase/postgrest-js/dist/main/lib/types.js
var require_types2 = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.PostgrestBuilder = void 0;
  var cross_fetch_1 = __importDefault(require_node_ponyfill());
  var PostgrestBuilder = class {
    constructor(builder) {
      Object.assign(this, builder);
    }
    then(onfulfilled, onrejected) {
      if (typeof this.schema === "undefined") {
      } else if (["GET", "HEAD"].includes(this.method)) {
        this.headers["Accept-Profile"] = this.schema;
      } else {
        this.headers["Content-Profile"] = this.schema;
      }
      if (this.method !== "GET" && this.method !== "HEAD") {
        this.headers["Content-Type"] = "application/json";
      }
      return cross_fetch_1.default(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      }).then((res) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let error2 = null;
        let data = null;
        let count = null;
        if (res.ok) {
          const isReturnMinimal = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.split(",").includes("return=minimal");
          if (this.method !== "HEAD" && !isReturnMinimal) {
            const text = yield res.text();
            if (text && text !== "")
              data = JSON.parse(text);
          }
          const countHeader = (_b = this.headers["Prefer"]) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
          const contentRange = (_c = res.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
          if (countHeader && contentRange && contentRange.length > 1) {
            count = parseInt(contentRange[1]);
          }
        } else {
          error2 = yield res.json();
        }
        const postgrestResponse = {
          error: error2,
          data,
          count,
          status: res.status,
          statusText: res.statusText,
          body: data
        };
        return postgrestResponse;
      })).then(onfulfilled, onrejected);
    }
  };
  exports.PostgrestBuilder = PostgrestBuilder;
});

// node_modules/@supabase/postgrest-js/dist/main/lib/PostgrestTransformBuilder.js
var require_PostgrestTransformBuilder = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var types_1 = require_types2();
  var PostgrestTransformBuilder = class extends types_1.PostgrestBuilder {
    select(columns = "*") {
      let quoted = false;
      const cleanedColumns = columns.split("").map((c) => {
        if (/\s/.test(c) && !quoted) {
          return "";
        }
        if (c === '"') {
          quoted = !quoted;
        }
        return c;
      }).join("");
      this.url.searchParams.set("select", cleanedColumns);
      return this;
    }
    order(column, {ascending = true, nullsFirst = false, foreignTable} = {}) {
      const key = typeof foreignTable === "undefined" ? "order" : `${foreignTable}.order`;
      const existingOrder = this.url.searchParams.get(key);
      this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}.${nullsFirst ? "nullsfirst" : "nullslast"}`);
      return this;
    }
    limit(count, {foreignTable} = {}) {
      const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
      this.url.searchParams.set(key, `${count}`);
      return this;
    }
    range(from, to, {foreignTable} = {}) {
      const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
      const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
      this.url.searchParams.set(keyOffset, `${from}`);
      this.url.searchParams.set(keyLimit, `${to - from + 1}`);
      return this;
    }
    single() {
      this.headers["Accept"] = "application/vnd.pgrst.object+json";
      return this;
    }
  };
  exports.default = PostgrestTransformBuilder;
});

// node_modules/@supabase/postgrest-js/dist/main/lib/PostgrestFilterBuilder.js
var require_PostgrestFilterBuilder = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
  var PostgrestFilterBuilder = class extends PostgrestTransformBuilder_1.default {
    constructor() {
      super(...arguments);
      this.cs = this.contains;
      this.cd = this.containedBy;
      this.sl = this.rangeLt;
      this.sr = this.rangeGt;
      this.nxl = this.rangeGte;
      this.nxr = this.rangeLte;
      this.adj = this.rangeAdjacent;
      this.ov = this.overlaps;
    }
    not(column, operator, value) {
      this.url.searchParams.append(`${column}`, `not.${operator}.${value}`);
      return this;
    }
    or(filters, {foreignTable} = {}) {
      const key = typeof foreignTable === "undefined" ? "or" : `${foreignTable}.or`;
      this.url.searchParams.append(key, `(${filters})`);
      return this;
    }
    eq(column, value) {
      this.url.searchParams.append(`${column}`, `eq.${value}`);
      return this;
    }
    neq(column, value) {
      this.url.searchParams.append(`${column}`, `neq.${value}`);
      return this;
    }
    gt(column, value) {
      this.url.searchParams.append(`${column}`, `gt.${value}`);
      return this;
    }
    gte(column, value) {
      this.url.searchParams.append(`${column}`, `gte.${value}`);
      return this;
    }
    lt(column, value) {
      this.url.searchParams.append(`${column}`, `lt.${value}`);
      return this;
    }
    lte(column, value) {
      this.url.searchParams.append(`${column}`, `lte.${value}`);
      return this;
    }
    like(column, pattern) {
      this.url.searchParams.append(`${column}`, `like.${pattern}`);
      return this;
    }
    ilike(column, pattern) {
      this.url.searchParams.append(`${column}`, `ilike.${pattern}`);
      return this;
    }
    is(column, value) {
      this.url.searchParams.append(`${column}`, `is.${value}`);
      return this;
    }
    in(column, values) {
      const cleanedValues = values.map((s2) => {
        if (typeof s2 === "string" && new RegExp("[,()]").test(s2))
          return `"${s2}"`;
        else
          return `${s2}`;
      }).join(",");
      this.url.searchParams.append(`${column}`, `in.(${cleanedValues})`);
      return this;
    }
    contains(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `cs.${value}`);
      } else if (Array.isArray(value)) {
        this.url.searchParams.append(`${column}`, `cs.{${value.join(",")}}`);
      } else {
        this.url.searchParams.append(`${column}`, `cs.${JSON.stringify(value)}`);
      }
      return this;
    }
    containedBy(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `cd.${value}`);
      } else if (Array.isArray(value)) {
        this.url.searchParams.append(`${column}`, `cd.{${value.join(",")}}`);
      } else {
        this.url.searchParams.append(`${column}`, `cd.${JSON.stringify(value)}`);
      }
      return this;
    }
    rangeLt(column, range) {
      this.url.searchParams.append(`${column}`, `sl.${range}`);
      return this;
    }
    rangeGt(column, range) {
      this.url.searchParams.append(`${column}`, `sr.${range}`);
      return this;
    }
    rangeGte(column, range) {
      this.url.searchParams.append(`${column}`, `nxl.${range}`);
      return this;
    }
    rangeLte(column, range) {
      this.url.searchParams.append(`${column}`, `nxr.${range}`);
      return this;
    }
    rangeAdjacent(column, range) {
      this.url.searchParams.append(`${column}`, `adj.${range}`);
      return this;
    }
    overlaps(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `ov.${value}`);
      } else {
        this.url.searchParams.append(`${column}`, `ov.{${value.join(",")}}`);
      }
      return this;
    }
    textSearch(column, query, {config, type = null} = {}) {
      let typePart = "";
      if (type === "plain") {
        typePart = "pl";
      } else if (type === "phrase") {
        typePart = "ph";
      } else if (type === "websearch") {
        typePart = "w";
      }
      const configPart = config === void 0 ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `${typePart}fts${configPart}.${query}`);
      return this;
    }
    fts(column, query, {config} = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `fts${configPart}.${query}`);
      return this;
    }
    plfts(column, query, {config} = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `plfts${configPart}.${query}`);
      return this;
    }
    phfts(column, query, {config} = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `phfts${configPart}.${query}`);
      return this;
    }
    wfts(column, query, {config} = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `wfts${configPart}.${query}`);
      return this;
    }
    filter(column, operator, value) {
      this.url.searchParams.append(`${column}`, `${operator}.${value}`);
      return this;
    }
    match(query) {
      Object.keys(query).forEach((key) => {
        this.url.searchParams.append(`${key}`, `eq.${query[key]}`);
      });
      return this;
    }
  };
  exports.default = PostgrestFilterBuilder;
});

// node_modules/@supabase/postgrest-js/dist/main/lib/PostgrestQueryBuilder.js
var require_PostgrestQueryBuilder = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var types_1 = require_types2();
  var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
  var PostgrestQueryBuilder = class extends types_1.PostgrestBuilder {
    constructor(url, {headers = {}, schema} = {}) {
      super({});
      this.url = new URL(url);
      this.headers = Object.assign({}, headers);
      this.schema = schema;
    }
    select(columns = "*", {head = false, count = null} = {}) {
      this.method = "GET";
      let quoted = false;
      const cleanedColumns = columns.split("").map((c) => {
        if (/\s/.test(c) && !quoted) {
          return "";
        }
        if (c === '"') {
          quoted = !quoted;
        }
        return c;
      }).join("");
      this.url.searchParams.set("select", cleanedColumns);
      if (count) {
        this.headers["Prefer"] = `count=${count}`;
      }
      if (head) {
        this.method = "HEAD";
      }
      return new PostgrestFilterBuilder_1.default(this);
    }
    insert(values, {upsert = false, onConflict, returning = "representation", count = null} = {}) {
      this.method = "POST";
      const prefersHeaders = [`return=${returning}`];
      if (upsert)
        prefersHeaders.push("resolution=merge-duplicates");
      if (upsert && onConflict !== void 0)
        this.url.searchParams.set("on_conflict", onConflict);
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder_1.default(this);
    }
    upsert(values, {onConflict, returning = "representation", count = null} = {}) {
      this.method = "POST";
      const prefersHeaders = ["resolution=merge-duplicates", `return=${returning}`];
      if (onConflict !== void 0)
        this.url.searchParams.set("on_conflict", onConflict);
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder_1.default(this);
    }
    update(values, {returning = "representation", count = null} = {}) {
      this.method = "PATCH";
      const prefersHeaders = [`return=${returning}`];
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder_1.default(this);
    }
    delete({returning = "representation", count = null} = {}) {
      this.method = "DELETE";
      const prefersHeaders = [`return=${returning}`];
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder_1.default(this);
    }
  };
  exports.default = PostgrestQueryBuilder;
});

// node_modules/@supabase/postgrest-js/dist/main/lib/PostgrestRpcBuilder.js
var require_PostgrestRpcBuilder = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var types_1 = require_types2();
  var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
  var PostgrestRpcBuilder = class extends types_1.PostgrestBuilder {
    constructor(url, {headers = {}, schema} = {}) {
      super({});
      this.url = new URL(url);
      this.headers = Object.assign({}, headers);
      this.schema = schema;
    }
    rpc(params, {count = null} = {}) {
      this.method = "POST";
      this.body = params;
      if (count) {
        if (this.headers["Prefer"] !== void 0)
          this.headers["Prefer"] += `,count=${count}`;
        else
          this.headers["Prefer"] = `count=${count}`;
      }
      return new PostgrestTransformBuilder_1.default(this);
    }
  };
  exports.default = PostgrestRpcBuilder;
});

// node_modules/@supabase/postgrest-js/dist/main/PostgrestClient.js
var require_PostgrestClient = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
  var PostgrestRpcBuilder_1 = __importDefault(require_PostgrestRpcBuilder());
  var PostgrestClient = class {
    constructor(url, {headers = {}, schema} = {}) {
      this.url = url;
      this.headers = headers;
      this.schema = schema;
    }
    auth(token) {
      this.headers["Authorization"] = `Bearer ${token}`;
      return this;
    }
    from(table) {
      const url = `${this.url}/${table}`;
      return new PostgrestQueryBuilder_1.default(url, {headers: this.headers, schema: this.schema});
    }
    rpc(fn, params, {count = null} = {}) {
      const url = `${this.url}/rpc/${fn}`;
      return new PostgrestRpcBuilder_1.default(url, {
        headers: this.headers,
        schema: this.schema
      }).rpc(params, {count});
    }
  };
  exports.default = PostgrestClient;
});

// node_modules/@supabase/postgrest-js/dist/main/index.js
var require_main2 = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.PostgrestBuilder = exports.PostgrestQueryBuilder = exports.PostgrestFilterBuilder = exports.PostgrestClient = void 0;
  var PostgrestClient_1 = __importDefault(require_PostgrestClient());
  exports.PostgrestClient = PostgrestClient_1.default;
  var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
  exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
  var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
  exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
  var types_1 = require_types2();
  Object.defineProperty(exports, "PostgrestBuilder", {enumerable: true, get: function() {
    return types_1.PostgrestBuilder;
  }});
});

// node_modules/@supabase/realtime-js/dist/main/lib/transformers.js
var require_transformers = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.toTimestampString = exports.toArray = exports.toJson = exports.toIntRange = exports.toInt = exports.toFloat = exports.toDateRange = exports.toDate = exports.toBoolean = exports.convertCell = exports.convertColumn = exports.convertChangeData = exports.PostgresTypes = void 0;
  var PostgresTypes;
  (function(PostgresTypes2) {
    PostgresTypes2["abstime"] = "abstime";
    PostgresTypes2["bool"] = "bool";
    PostgresTypes2["date"] = "date";
    PostgresTypes2["daterange"] = "daterange";
    PostgresTypes2["float4"] = "float4";
    PostgresTypes2["float8"] = "float8";
    PostgresTypes2["int2"] = "int2";
    PostgresTypes2["int4"] = "int4";
    PostgresTypes2["int4range"] = "int4range";
    PostgresTypes2["int8"] = "int8";
    PostgresTypes2["int8range"] = "int8range";
    PostgresTypes2["json"] = "json";
    PostgresTypes2["jsonb"] = "jsonb";
    PostgresTypes2["money"] = "money";
    PostgresTypes2["numeric"] = "numeric";
    PostgresTypes2["oid"] = "oid";
    PostgresTypes2["reltime"] = "reltime";
    PostgresTypes2["time"] = "time";
    PostgresTypes2["timestamp"] = "timestamp";
    PostgresTypes2["timestamptz"] = "timestamptz";
    PostgresTypes2["timetz"] = "timetz";
    PostgresTypes2["tsrange"] = "tsrange";
    PostgresTypes2["tstzrange"] = "tstzrange";
  })(PostgresTypes = exports.PostgresTypes || (exports.PostgresTypes = {}));
  exports.convertChangeData = (columns, records, options2 = {}) => {
    let result = {};
    let skipTypes = typeof options2.skipTypes !== "undefined" ? options2.skipTypes : [];
    Object.entries(records).map(([key, value]) => {
      result[key] = exports.convertColumn(key, columns, records, skipTypes);
    });
    return result;
  };
  exports.convertColumn = (columnName, columns, records, skipTypes) => {
    let column = columns.find((x) => x.name == columnName);
    if (!column || skipTypes.includes(column.type)) {
      return noop3(records[columnName]);
    } else {
      return exports.convertCell(column.type, records[columnName]);
    }
  };
  exports.convertCell = (type, stringValue) => {
    try {
      if (stringValue === null)
        return null;
      if (type.charAt(0) === "_") {
        let arrayValue = type.slice(1, type.length);
        return exports.toArray(stringValue, arrayValue);
      }
      switch (type) {
        case PostgresTypes.abstime:
          return noop3(stringValue);
        case PostgresTypes.bool:
          return exports.toBoolean(stringValue);
        case PostgresTypes.date:
          return noop3(stringValue);
        case PostgresTypes.daterange:
          return exports.toDateRange(stringValue);
        case PostgresTypes.float4:
          return exports.toFloat(stringValue);
        case PostgresTypes.float8:
          return exports.toFloat(stringValue);
        case PostgresTypes.int2:
          return exports.toInt(stringValue);
        case PostgresTypes.int4:
          return exports.toInt(stringValue);
        case PostgresTypes.int4range:
          return exports.toIntRange(stringValue);
        case PostgresTypes.int8:
          return exports.toInt(stringValue);
        case PostgresTypes.int8range:
          return exports.toIntRange(stringValue);
        case PostgresTypes.json:
          return exports.toJson(stringValue);
        case PostgresTypes.jsonb:
          return exports.toJson(stringValue);
        case PostgresTypes.money:
          return exports.toFloat(stringValue);
        case PostgresTypes.numeric:
          return exports.toFloat(stringValue);
        case PostgresTypes.oid:
          return exports.toInt(stringValue);
        case PostgresTypes.reltime:
          return noop3(stringValue);
        case PostgresTypes.time:
          return noop3(stringValue);
        case PostgresTypes.timestamp:
          return exports.toTimestampString(stringValue);
        case PostgresTypes.timestamptz:
          return noop3(stringValue);
        case PostgresTypes.timetz:
          return noop3(stringValue);
        case PostgresTypes.tsrange:
          return exports.toDateRange(stringValue);
        case PostgresTypes.tstzrange:
          return exports.toDateRange(stringValue);
        default:
          return noop3(stringValue);
      }
    } catch (error2) {
      console.log(`Could not convert cell of type ${type} and value ${stringValue}`);
      console.log(`This is the error: ${error2}`);
      return stringValue;
    }
  };
  var noop3 = (stringValue) => {
    return stringValue;
  };
  exports.toBoolean = (stringValue) => {
    switch (stringValue) {
      case "t":
        return true;
      case "f":
        return false;
      default:
        return null;
    }
  };
  exports.toDate = (stringValue) => {
    return new Date(stringValue);
  };
  exports.toDateRange = (stringValue) => {
    let arr = JSON.parse(stringValue);
    return [new Date(arr[0]), new Date(arr[1])];
  };
  exports.toFloat = (stringValue) => {
    return parseFloat(stringValue);
  };
  exports.toInt = (stringValue) => {
    return parseInt(stringValue);
  };
  exports.toIntRange = (stringValue) => {
    let arr = JSON.parse(stringValue);
    return [parseInt(arr[0]), parseInt(arr[1])];
  };
  exports.toJson = (stringValue) => {
    return JSON.parse(stringValue);
  };
  exports.toArray = (stringValue, type) => {
    let stringEnriched = stringValue.slice(1, stringValue.length - 1);
    let stringArray = stringEnriched.length > 0 ? stringEnriched.split(",") : [];
    let array = stringArray.map((string) => {
      return exports.convertCell(type, string);
    });
    return array;
  };
  exports.toTimestampString = (stringValue) => {
    return stringValue.replace(" ", "T");
  };
});

// node_modules/@supabase/realtime-js/dist/main/lib/constants.js
var require_constants3 = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TRANSPORTS = exports.CHANNEL_EVENTS = exports.CHANNEL_STATES = exports.SOCKET_STATES = exports.WS_CLOSE_NORMAL = exports.DEFAULT_TIMEOUT = exports.VSN = void 0;
  exports.VSN = "1.0.0";
  exports.DEFAULT_TIMEOUT = 1e4;
  exports.WS_CLOSE_NORMAL = 1e3;
  var SOCKET_STATES;
  (function(SOCKET_STATES2) {
    SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
    SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
    SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
    SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
  })(SOCKET_STATES = exports.SOCKET_STATES || (exports.SOCKET_STATES = {}));
  var CHANNEL_STATES;
  (function(CHANNEL_STATES2) {
    CHANNEL_STATES2["closed"] = "closed";
    CHANNEL_STATES2["errored"] = "errored";
    CHANNEL_STATES2["joined"] = "joined";
    CHANNEL_STATES2["joining"] = "joining";
    CHANNEL_STATES2["leaving"] = "leaving";
  })(CHANNEL_STATES = exports.CHANNEL_STATES || (exports.CHANNEL_STATES = {}));
  var CHANNEL_EVENTS;
  (function(CHANNEL_EVENTS2) {
    CHANNEL_EVENTS2["close"] = "phx_close";
    CHANNEL_EVENTS2["error"] = "phx_error";
    CHANNEL_EVENTS2["join"] = "phx_join";
    CHANNEL_EVENTS2["reply"] = "phx_reply";
    CHANNEL_EVENTS2["leave"] = "phx_leave";
  })(CHANNEL_EVENTS = exports.CHANNEL_EVENTS || (exports.CHANNEL_EVENTS = {}));
  var TRANSPORTS;
  (function(TRANSPORTS2) {
    TRANSPORTS2["websocket"] = "websocket";
  })(TRANSPORTS = exports.TRANSPORTS || (exports.TRANSPORTS = {}));
});

// node_modules/@supabase/realtime-js/dist/main/lib/timer.js
var require_timer = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = void 0;
      this.tries = 0;
      this.callback = callback;
      this.timerCalc = timerCalc;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  exports.default = Timer;
});

// node_modules/@supabase/realtime-js/dist/main/lib/push.js
var require_push = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var constants_1 = require_constants3();
  var Push = class {
    constructor(channel, event, payload = {}, timeout = constants_1.DEFAULT_TIMEOUT) {
      this.channel = channel;
      this.event = event;
      this.payload = payload;
      this.timeout = timeout;
      this.sent = false;
      this.timeoutTimer = void 0;
      this.ref = "";
      this.receivedResp = null;
      this.recHooks = [];
      this.refEvent = null;
    }
    resend(timeout) {
      this.timeout = timeout;
      this._cancelRefEvent();
      this.ref = "";
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
      this.send();
    }
    send() {
      if (this._hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref
      });
    }
    receive(status, callback) {
      var _a;
      if (this._hasReceived(status)) {
        callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
      }
      this.recHooks.push({status, callback});
      return this;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        return;
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this._cancelRefEvent();
        this._cancelTimeout();
        this.receivedResp = payload;
        this._matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    trigger(status, response) {
      if (this.refEvent)
        this.channel.trigger(this.refEvent, {status, response});
    }
    _cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    _cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = void 0;
    }
    _matchReceive({status, response}) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
  };
  exports.default = Push;
});

// node_modules/@supabase/realtime-js/dist/main/RealtimeSubscription.js
var require_RealtimeSubscription = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var constants_1 = require_constants3();
  var push_1 = __importDefault(require_push());
  var timer_1 = __importDefault(require_timer());
  var RealtimeSubscription = class {
    constructor(topic, params = {}, socket) {
      this.topic = topic;
      this.params = params;
      this.socket = socket;
      this.bindings = [];
      this.state = constants_1.CHANNEL_STATES.closed;
      this.joinedOnce = false;
      this.pushBuffer = [];
      this.timeout = this.socket.timeout;
      this.joinPush = new push_1.default(this, constants_1.CHANNEL_EVENTS.join, this.params, this.timeout);
      this.rejoinTimer = new timer_1.default(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
      this.joinPush.receive("ok", () => {
        this.state = constants_1.CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = constants_1.CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.isLeaving() || this.isClosed()) {
          return;
        }
        this.socket.log("channel", `error ${this.topic}`, reason);
        this.state = constants_1.CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.joinPush.receive("timeout", () => {
        if (!this.isJoining()) {
          return;
        }
        this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
        this.state = constants_1.CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.on(constants_1.CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }
    subscribe(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
      } else {
        this.joinedOnce = true;
        this.rejoin(timeout);
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(constants_1.CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      this.on(constants_1.CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      this.bindings.push({event, callback});
    }
    off(event) {
      this.bindings = this.bindings.filter((bind) => bind.event !== event);
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      if (!this.joinedOnce) {
        throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
      }
      let pushEvent = new push_1.default(this, event, payload, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    unsubscribe(timeout = this.timeout) {
      this.state = constants_1.CHANNEL_STATES.leaving;
      let onClose = () => {
        this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(constants_1.CHANNEL_EVENTS.close, "leave", this.joinRef());
      };
      let leavePush = new push_1.default(this, constants_1.CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(event, payload, ref) {
      return payload;
    }
    isMember(topic) {
      return this.topic === topic;
    }
    joinRef() {
      return this.joinPush.ref;
    }
    sendJoin(timeout) {
      this.state = constants_1.CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.sendJoin(timeout);
    }
    trigger(event, payload, ref) {
      let {close, error: error2, leave, join} = constants_1.CHANNEL_EVENTS;
      let events = [close, error2, leave, join];
      if (ref && events.indexOf(event) >= 0 && ref !== this.joinRef()) {
        return;
      }
      let handledPayload = this.onMessage(event, payload, ref);
      if (payload && !handledPayload) {
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      }
      this.bindings.filter((bind) => {
        if (bind.event === "*") {
          return event === (payload === null || payload === void 0 ? void 0 : payload.type);
        } else {
          return bind.event === event;
        }
      }).map((bind) => bind.callback(handledPayload, ref));
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === constants_1.CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === constants_1.CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === constants_1.CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === constants_1.CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === constants_1.CHANNEL_STATES.leaving;
    }
  };
  exports.default = RealtimeSubscription;
});

// node_modules/websocket/node_modules/ms/index.js
var require_ms = __commonJS((exports, module2) => {
  var s2 = 1e3;
  var m = s2 * 60;
  var h = m * 60;
  var d2 = h * 24;
  var y = d2 * 365.25;
  module2.exports = function(val, options2) {
    options2 = options2 || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options2.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d2;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s2;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms) {
    if (ms >= d2) {
      return Math.round(ms / d2) + "d";
    }
    if (ms >= h) {
      return Math.round(ms / h) + "h";
    }
    if (ms >= m) {
      return Math.round(ms / m) + "m";
    }
    if (ms >= s2) {
      return Math.round(ms / s2) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    return plural(ms, d2, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s2, "second") || ms + " ms";
  }
  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + " " + name;
    }
    return Math.ceil(ms / n) + " " + name + "s";
  }
});

// node_modules/websocket/node_modules/debug/src/debug.js
var require_debug = __commonJS((exports, module2) => {
  exports = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = require_ms();
  exports.names = [];
  exports.skips = [];
  exports.formatters = {};
  var prevTime;
  function selectColor(namespace) {
    var hash2 = 0, i;
    for (i in namespace) {
      hash2 = (hash2 << 5) - hash2 + namespace.charCodeAt(i);
      hash2 |= 0;
    }
    return exports.colors[Math.abs(hash2) % exports.colors.length];
  }
  function createDebug(namespace) {
    function debug() {
      if (!debug.enabled)
        return;
      var self = debug;
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      args[0] = exports.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      var index2 = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format2) {
        if (match === "%%")
          return match;
        index2++;
        var formatter = exports.formatters[format2];
        if (typeof formatter === "function") {
          var val = args[index2];
          match = formatter.call(self, val);
          args.splice(index2, 1);
          index2--;
        }
        return match;
      });
      exports.formatArgs.call(self, args);
      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    if (typeof exports.init === "function") {
      exports.init(debug);
    }
    return debug;
  }
  function enable(namespaces) {
    exports.save(namespaces);
    exports.names = [];
    exports.skips = [];
    var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    var len = split.length;
    for (var i = 0; i < len; i++) {
      if (!split[i])
        continue;
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        exports.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    exports.enable("");
  }
  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  function coerce(val) {
    if (val instanceof Error)
      return val.stack || val.message;
    return val;
  }
});

// node_modules/websocket/node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module2) => {
  exports = module2.exports = require_debug();
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load2;
  exports.useColors = useColors;
  exports.storage = typeof chrome != "undefined" && typeof chrome.storage != "undefined" ? chrome.storage.local : localstorage();
  exports.colors = [
    "lightseagreen",
    "forestgreen",
    "goldenrod",
    "dodgerblue",
    "darkorchid",
    "crimson"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return "[UnexpectedJSONParseError]: " + err.message;
    }
  };
  function formatArgs(args) {
    var useColors2 = this.useColors;
    args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
    if (!useColors2)
      return;
    var c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    var index2 = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if (match === "%%")
        return;
      index2++;
      if (match === "%c") {
        lastC = index2;
      }
    });
    args.splice(lastC, 0, c);
  }
  function log() {
    return typeof console === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function save(namespaces) {
    try {
      if (namespaces == null) {
        exports.storage.removeItem("debug");
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {
    }
  }
  function load2() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  exports.enable(load2());
  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {
    }
  }
});

// node_modules/websocket/node_modules/debug/src/node.js
var require_node = __commonJS((exports, module2) => {
  var tty = require("tty");
  var util = require("util");
  exports = module2.exports = require_debug();
  exports.init = init2;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load2;
  exports.useColors = useColors;
  exports.colors = [6, 2, 3, 4, 5, 1];
  exports.inspectOpts = Object.keys(process.env).filter(function(key) {
    return /^debug_/i.test(key);
  }).reduce(function(obj, key) {
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
      return k.toUpperCase();
    });
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val))
      val = true;
    else if (/^(no|off|false|disabled)$/i.test(val))
      val = false;
    else if (val === "null")
      val = null;
    else
      val = Number(val);
    obj[prop] = val;
    return obj;
  }, {});
  var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
  if (fd !== 1 && fd !== 2) {
    util.deprecate(function() {
    }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
  }
  var stream = fd === 1 ? process.stdout : fd === 2 ? process.stderr : createWritableStdioStream(fd);
  function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
  }
  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
      return str.trim();
    }).join(" ");
  };
  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
  function formatArgs(args) {
    var name = this.namespace;
    var useColors2 = this.useColors;
    if (useColors2) {
      var c = this.color;
      var prefix = "  [3" + c + ";1m" + name + " [0m";
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push("[3" + c + "m+" + exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = new Date().toUTCString() + " " + name + " " + args[0];
    }
  }
  function log() {
    return stream.write(util.format.apply(util, arguments) + "\n");
  }
  function save(namespaces) {
    if (namespaces == null) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }
  function load2() {
    return process.env.DEBUG;
  }
  function createWritableStdioStream(fd2) {
    var stream2;
    var tty_wrap = process.binding("tty_wrap");
    switch (tty_wrap.guessHandleType(fd2)) {
      case "TTY":
        stream2 = new tty.WriteStream(fd2);
        stream2._type = "tty";
        if (stream2._handle && stream2._handle.unref) {
          stream2._handle.unref();
        }
        break;
      case "FILE":
        var fs = require("fs");
        stream2 = new fs.SyncWriteStream(fd2, {autoClose: false});
        stream2._type = "fs";
        break;
      case "PIPE":
      case "TCP":
        var net = require("net");
        stream2 = new net.Socket({
          fd: fd2,
          readable: false,
          writable: true
        });
        stream2.readable = false;
        stream2.read = null;
        stream2._type = "pipe";
        if (stream2._handle && stream2._handle.unref) {
          stream2._handle.unref();
        }
        break;
      default:
        throw new Error("Implement me. Unknown stream file type!");
    }
    stream2.fd = fd2;
    stream2._isStdio = true;
    return stream2;
  }
  function init2(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }
  exports.enable(load2());
});

// node_modules/websocket/node_modules/debug/src/index.js
var require_src = __commonJS((exports, module2) => {
  if (typeof process !== "undefined" && process.type === "renderer") {
    module2.exports = require_browser();
  } else {
    module2.exports = require_node();
  }
});

// node_modules/websocket/lib/utils.js
var require_utils = __commonJS((exports) => {
  var noop3 = exports.noop = function() {
  };
  exports.extend = function extend(dest, source) {
    for (var prop in source) {
      dest[prop] = source[prop];
    }
  };
  exports.eventEmitterListenerCount = require("events").EventEmitter.listenerCount || function(emitter, type) {
    return emitter.listeners(type).length;
  };
  exports.bufferAllocUnsafe = Buffer.allocUnsafe ? Buffer.allocUnsafe : function oldBufferAllocUnsafe(size) {
    return new Buffer(size);
  };
  exports.bufferFromString = Buffer.from ? Buffer.from : function oldBufferFromString(string, encoding) {
    return new Buffer(string, encoding);
  };
  exports.BufferingLogger = function createBufferingLogger(identifier, uniqueID) {
    var logFunction = require_src()(identifier);
    if (logFunction.enabled) {
      var logger = new BufferingLogger(identifier, uniqueID, logFunction);
      var debug = logger.log.bind(logger);
      debug.printOutput = logger.printOutput.bind(logger);
      debug.enabled = logFunction.enabled;
      return debug;
    }
    logFunction.printOutput = noop3;
    return logFunction;
  };
  function BufferingLogger(identifier, uniqueID, logFunction) {
    this.logFunction = logFunction;
    this.identifier = identifier;
    this.uniqueID = uniqueID;
    this.buffer = [];
  }
  BufferingLogger.prototype.log = function() {
    this.buffer.push([new Date(), Array.prototype.slice.call(arguments)]);
    return this;
  };
  BufferingLogger.prototype.clear = function() {
    this.buffer = [];
    return this;
  };
  BufferingLogger.prototype.printOutput = function(logFunction) {
    if (!logFunction) {
      logFunction = this.logFunction;
    }
    var uniqueID = this.uniqueID;
    this.buffer.forEach(function(entry) {
      var date = entry[0].toLocaleString();
      var args = entry[1].slice();
      var formatString = args[0];
      if (formatString !== void 0 && formatString !== null) {
        formatString = "%s - %s - " + formatString.toString();
        args.splice(0, 1, formatString, date, uniqueID);
        logFunction.apply(global, args);
      }
    });
  };
});

// node_modules/node-gyp-build/index.js
var require_node_gyp_build = __commonJS((exports, module2) => {
  var fs = require("fs");
  var path = require("path");
  var os = require("os");
  var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
  var vars = process.config && process.config.variables || {};
  var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
  var abi = process.versions.modules;
  var runtime = isElectron() ? "electron" : "node";
  var arch = os.arch();
  var platform = os.platform();
  var libc = process.env.LIBC || (isAlpine(platform) ? "musl" : "glibc");
  var armv = process.env.ARM_VERSION || (arch === "arm64" ? "8" : vars.arm_version) || "";
  var uv = (process.versions.uv || "").split(".")[0];
  module2.exports = load2;
  function load2(dir) {
    return runtimeRequire(load2.path(dir));
  }
  load2.path = function(dir) {
    dir = path.resolve(dir || ".");
    try {
      var name = runtimeRequire(path.join(dir, "package.json")).name.toUpperCase().replace(/-/g, "_");
      if (process.env[name + "_PREBUILD"])
        dir = process.env[name + "_PREBUILD"];
    } catch (err) {
    }
    if (!prebuildsOnly) {
      var release = getFirst(path.join(dir, "build/Release"), matchBuild);
      if (release)
        return release;
      var debug = getFirst(path.join(dir, "build/Debug"), matchBuild);
      if (debug)
        return debug;
    }
    var prebuild = resolve2(dir);
    if (prebuild)
      return prebuild;
    var nearby = resolve2(path.dirname(process.execPath));
    if (nearby)
      return nearby;
    var target = [
      "platform=" + platform,
      "arch=" + arch,
      "runtime=" + runtime,
      "abi=" + abi,
      "uv=" + uv,
      armv ? "armv=" + armv : "",
      "libc=" + libc,
      "node=" + process.versions.node,
      process.versions && process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ === "function" ? "webpack=true" : ""
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + target + "\n    loaded from: " + dir + "\n");
    function resolve2(dir2) {
      var prebuilds = path.join(dir2, "prebuilds", platform + "-" + arch);
      var parsed = readdirSync(prebuilds).map(parseTags);
      var candidates = parsed.filter(matchTags(runtime, abi));
      var winner = candidates.sort(compareTags(runtime))[0];
      if (winner)
        return path.join(prebuilds, winner.file);
    }
  };
  function readdirSync(dir) {
    try {
      return fs.readdirSync(dir);
    } catch (err) {
      return [];
    }
  }
  function getFirst(dir, filter) {
    var files = readdirSync(dir).filter(filter);
    return files[0] && path.join(dir, files[0]);
  }
  function matchBuild(name) {
    return /\.node$/.test(name);
  }
  function parseTags(file) {
    var arr = file.split(".");
    var extension = arr.pop();
    var tags = {file, specificity: 0};
    if (extension !== "node")
      return;
    for (var i = 0; i < arr.length; i++) {
      var tag = arr[i];
      if (tag === "node" || tag === "electron" || tag === "node-webkit") {
        tags.runtime = tag;
      } else if (tag === "napi") {
        tags.napi = true;
      } else if (tag.slice(0, 3) === "abi") {
        tags.abi = tag.slice(3);
      } else if (tag.slice(0, 2) === "uv") {
        tags.uv = tag.slice(2);
      } else if (tag.slice(0, 4) === "armv") {
        tags.armv = tag.slice(4);
      } else if (tag === "glibc" || tag === "musl") {
        tags.libc = tag;
      } else {
        continue;
      }
      tags.specificity++;
    }
    return tags;
  }
  function matchTags(runtime2, abi2) {
    return function(tags) {
      if (tags == null)
        return false;
      if (tags.runtime !== runtime2 && !runtimeAgnostic(tags))
        return false;
      if (tags.abi !== abi2 && !tags.napi)
        return false;
      if (tags.uv && tags.uv !== uv)
        return false;
      if (tags.armv && tags.armv !== armv)
        return false;
      if (tags.libc && tags.libc !== libc)
        return false;
      return true;
    };
  }
  function runtimeAgnostic(tags) {
    return tags.runtime === "node" && tags.napi;
  }
  function compareTags(runtime2) {
    return function(a, b) {
      if (a.runtime !== b.runtime) {
        return a.runtime === runtime2 ? -1 : 1;
      } else if (a.abi !== b.abi) {
        return a.abi ? -1 : 1;
      } else if (a.specificity !== b.specificity) {
        return a.specificity > b.specificity ? -1 : 1;
      } else {
        return 0;
      }
    };
  }
  function isElectron() {
    if (process.versions && process.versions.electron)
      return true;
    if (process.env.ELECTRON_RUN_AS_NODE)
      return true;
    return typeof window !== "undefined" && window.process && window.process.type === "renderer";
  }
  function isAlpine(platform2) {
    return platform2 === "linux" && fs.existsSync("/etc/alpine-release");
  }
  load2.parseTags = parseTags;
  load2.matchTags = matchTags;
  load2.compareTags = compareTags;
});

// node_modules/bufferutil/fallback.js
var require_fallback = __commonJS((exports, module2) => {
  "use strict";
  var mask = (source, mask2, output, offset, length) => {
    for (var i = 0; i < length; i++) {
      output[offset + i] = source[i] ^ mask2[i & 3];
    }
  };
  var unmask = (buffer, mask2) => {
    const length = buffer.length;
    for (var i = 0; i < length; i++) {
      buffer[i] ^= mask2[i & 3];
    }
  };
  module2.exports = {mask, unmask};
});

// node_modules/bufferutil/index.js
var require_bufferutil = __commonJS((exports, module2) => {
  "use strict";
  try {
    module2.exports = require_node_gyp_build()(__dirname);
  } catch (e) {
    module2.exports = require_fallback();
  }
});

// node_modules/websocket/lib/WebSocketFrame.js
var require_WebSocketFrame = __commonJS((exports, module2) => {
  var bufferUtil = require_bufferutil();
  var bufferAllocUnsafe = require_utils().bufferAllocUnsafe;
  var DECODE_HEADER = 1;
  var WAITING_FOR_16_BIT_LENGTH = 2;
  var WAITING_FOR_64_BIT_LENGTH = 3;
  var WAITING_FOR_MASK_KEY = 4;
  var WAITING_FOR_PAYLOAD = 5;
  var COMPLETE = 6;
  function WebSocketFrame(maskBytes, frameHeader, config) {
    this.maskBytes = maskBytes;
    this.frameHeader = frameHeader;
    this.config = config;
    this.maxReceivedFrameSize = config.maxReceivedFrameSize;
    this.protocolError = false;
    this.frameTooLarge = false;
    this.invalidCloseFrameLength = false;
    this.parseState = DECODE_HEADER;
    this.closeStatus = -1;
  }
  WebSocketFrame.prototype.addData = function(bufferList) {
    if (this.parseState === DECODE_HEADER) {
      if (bufferList.length >= 2) {
        bufferList.joinInto(this.frameHeader, 0, 0, 2);
        bufferList.advance(2);
        var firstByte = this.frameHeader[0];
        var secondByte = this.frameHeader[1];
        this.fin = Boolean(firstByte & 128);
        this.rsv1 = Boolean(firstByte & 64);
        this.rsv2 = Boolean(firstByte & 32);
        this.rsv3 = Boolean(firstByte & 16);
        this.mask = Boolean(secondByte & 128);
        this.opcode = firstByte & 15;
        this.length = secondByte & 127;
        if (this.opcode >= 8) {
          if (this.length > 125) {
            this.protocolError = true;
            this.dropReason = "Illegal control frame longer than 125 bytes.";
            return true;
          }
          if (!this.fin) {
            this.protocolError = true;
            this.dropReason = "Control frames must not be fragmented.";
            return true;
          }
        }
        if (this.length === 126) {
          this.parseState = WAITING_FOR_16_BIT_LENGTH;
        } else if (this.length === 127) {
          this.parseState = WAITING_FOR_64_BIT_LENGTH;
        } else {
          this.parseState = WAITING_FOR_MASK_KEY;
        }
      }
    }
    if (this.parseState === WAITING_FOR_16_BIT_LENGTH) {
      if (bufferList.length >= 2) {
        bufferList.joinInto(this.frameHeader, 2, 0, 2);
        bufferList.advance(2);
        this.length = this.frameHeader.readUInt16BE(2);
        this.parseState = WAITING_FOR_MASK_KEY;
      }
    } else if (this.parseState === WAITING_FOR_64_BIT_LENGTH) {
      if (bufferList.length >= 8) {
        bufferList.joinInto(this.frameHeader, 2, 0, 8);
        bufferList.advance(8);
        var lengthPair = [
          this.frameHeader.readUInt32BE(2),
          this.frameHeader.readUInt32BE(2 + 4)
        ];
        if (lengthPair[0] !== 0) {
          this.protocolError = true;
          this.dropReason = "Unsupported 64-bit length frame received";
          return true;
        }
        this.length = lengthPair[1];
        this.parseState = WAITING_FOR_MASK_KEY;
      }
    }
    if (this.parseState === WAITING_FOR_MASK_KEY) {
      if (this.mask) {
        if (bufferList.length >= 4) {
          bufferList.joinInto(this.maskBytes, 0, 0, 4);
          bufferList.advance(4);
          this.parseState = WAITING_FOR_PAYLOAD;
        }
      } else {
        this.parseState = WAITING_FOR_PAYLOAD;
      }
    }
    if (this.parseState === WAITING_FOR_PAYLOAD) {
      if (this.length > this.maxReceivedFrameSize) {
        this.frameTooLarge = true;
        this.dropReason = "Frame size of " + this.length.toString(10) + " bytes exceeds maximum accepted frame size";
        return true;
      }
      if (this.length === 0) {
        this.binaryPayload = bufferAllocUnsafe(0);
        this.parseState = COMPLETE;
        return true;
      }
      if (bufferList.length >= this.length) {
        this.binaryPayload = bufferList.take(this.length);
        bufferList.advance(this.length);
        if (this.mask) {
          bufferUtil.unmask(this.binaryPayload, this.maskBytes);
        }
        if (this.opcode === 8) {
          if (this.length === 1) {
            this.binaryPayload = bufferAllocUnsafe(0);
            this.invalidCloseFrameLength = true;
          }
          if (this.length >= 2) {
            this.closeStatus = this.binaryPayload.readUInt16BE(0);
            this.binaryPayload = this.binaryPayload.slice(2);
          }
        }
        this.parseState = COMPLETE;
        return true;
      }
    }
    return false;
  };
  WebSocketFrame.prototype.throwAwayPayload = function(bufferList) {
    if (bufferList.length >= this.length) {
      bufferList.advance(this.length);
      this.parseState = COMPLETE;
      return true;
    }
    return false;
  };
  WebSocketFrame.prototype.toBuffer = function(nullMask) {
    var maskKey;
    var headerLength = 2;
    var data;
    var outputPos;
    var firstByte = 0;
    var secondByte = 0;
    if (this.fin) {
      firstByte |= 128;
    }
    if (this.rsv1) {
      firstByte |= 64;
    }
    if (this.rsv2) {
      firstByte |= 32;
    }
    if (this.rsv3) {
      firstByte |= 16;
    }
    if (this.mask) {
      secondByte |= 128;
    }
    firstByte |= this.opcode & 15;
    if (this.opcode === 8) {
      this.length = 2;
      if (this.binaryPayload) {
        this.length += this.binaryPayload.length;
      }
      data = bufferAllocUnsafe(this.length);
      data.writeUInt16BE(this.closeStatus, 0);
      if (this.length > 2) {
        this.binaryPayload.copy(data, 2);
      }
    } else if (this.binaryPayload) {
      data = this.binaryPayload;
      this.length = data.length;
    } else {
      this.length = 0;
    }
    if (this.length <= 125) {
      secondByte |= this.length & 127;
    } else if (this.length > 125 && this.length <= 65535) {
      secondByte |= 126;
      headerLength += 2;
    } else if (this.length > 65535) {
      secondByte |= 127;
      headerLength += 8;
    }
    var output = bufferAllocUnsafe(this.length + headerLength + (this.mask ? 4 : 0));
    output[0] = firstByte;
    output[1] = secondByte;
    outputPos = 2;
    if (this.length > 125 && this.length <= 65535) {
      output.writeUInt16BE(this.length, outputPos);
      outputPos += 2;
    } else if (this.length > 65535) {
      output.writeUInt32BE(0, outputPos);
      output.writeUInt32BE(this.length, outputPos + 4);
      outputPos += 8;
    }
    if (this.mask) {
      maskKey = nullMask ? 0 : Math.random() * 4294967295 >>> 0;
      this.maskBytes.writeUInt32BE(maskKey, 0);
      this.maskBytes.copy(output, outputPos);
      outputPos += 4;
      if (data) {
        bufferUtil.mask(data, this.maskBytes, output, outputPos, this.length);
      }
    } else if (data) {
      data.copy(output, outputPos);
    }
    return output;
  };
  WebSocketFrame.prototype.toString = function() {
    return "Opcode: " + this.opcode + ", fin: " + this.fin + ", length: " + this.length + ", hasPayload: " + Boolean(this.binaryPayload) + ", masked: " + this.mask;
  };
  module2.exports = WebSocketFrame;
});

// node_modules/websocket/vendor/FastBufferList.js
var require_FastBufferList = __commonJS((exports, module2) => {
  var Buffer2 = require("buffer").Buffer;
  var EventEmitter = require("events").EventEmitter;
  var bufferAllocUnsafe = require_utils().bufferAllocUnsafe;
  module2.exports = BufferList;
  module2.exports.BufferList = BufferList;
  function BufferList(opts) {
    if (!(this instanceof BufferList))
      return new BufferList(opts);
    EventEmitter.call(this);
    var self = this;
    if (typeof opts == "undefined")
      opts = {};
    self.encoding = opts.encoding;
    var head = {next: null, buffer: null};
    var last = {next: null, buffer: null};
    var length = 0;
    self.__defineGetter__("length", function() {
      return length;
    });
    var offset = 0;
    self.write = function(buf) {
      if (!head.buffer) {
        head.buffer = buf;
        last = head;
      } else {
        last.next = {next: null, buffer: buf};
        last = last.next;
      }
      length += buf.length;
      self.emit("write", buf);
      return true;
    };
    self.end = function(buf) {
      if (Buffer2.isBuffer(buf))
        self.write(buf);
    };
    self.push = function() {
      var args = [].concat.apply([], arguments);
      args.forEach(self.write);
      return self;
    };
    self.forEach = function(fn) {
      if (!head.buffer)
        return bufferAllocUnsafe(0);
      if (head.buffer.length - offset <= 0)
        return self;
      var firstBuf = head.buffer.slice(offset);
      var b = {buffer: firstBuf, next: head.next};
      while (b && b.buffer) {
        var r = fn(b.buffer);
        if (r)
          break;
        b = b.next;
      }
      return self;
    };
    self.join = function(start, end) {
      if (!head.buffer)
        return bufferAllocUnsafe(0);
      if (start == void 0)
        start = 0;
      if (end == void 0)
        end = self.length;
      var big = bufferAllocUnsafe(end - start);
      var ix = 0;
      self.forEach(function(buffer) {
        if (start < ix + buffer.length && ix < end) {
          buffer.copy(big, Math.max(0, ix - start), Math.max(0, start - ix), Math.min(buffer.length, end - ix));
        }
        ix += buffer.length;
        if (ix > end)
          return true;
      });
      return big;
    };
    self.joinInto = function(targetBuffer, targetStart, sourceStart, sourceEnd) {
      if (!head.buffer)
        return new bufferAllocUnsafe(0);
      if (sourceStart == void 0)
        sourceStart = 0;
      if (sourceEnd == void 0)
        sourceEnd = self.length;
      var big = targetBuffer;
      if (big.length - targetStart < sourceEnd - sourceStart) {
        throw new Error("Insufficient space available in target Buffer.");
      }
      var ix = 0;
      self.forEach(function(buffer) {
        if (sourceStart < ix + buffer.length && ix < sourceEnd) {
          buffer.copy(big, Math.max(targetStart, targetStart + ix - sourceStart), Math.max(0, sourceStart - ix), Math.min(buffer.length, sourceEnd - ix));
        }
        ix += buffer.length;
        if (ix > sourceEnd)
          return true;
      });
      return big;
    };
    self.advance = function(n) {
      offset += n;
      length -= n;
      while (head.buffer && offset >= head.buffer.length) {
        offset -= head.buffer.length;
        head = head.next ? head.next : {buffer: null, next: null};
      }
      if (head.buffer === null)
        last = {next: null, buffer: null};
      self.emit("advance", n);
      return self;
    };
    self.take = function(n, encoding) {
      if (n == void 0)
        n = self.length;
      else if (typeof n !== "number") {
        encoding = n;
        n = self.length;
      }
      var b = head;
      if (!encoding)
        encoding = self.encoding;
      if (encoding) {
        var acc = "";
        self.forEach(function(buffer) {
          if (n <= 0)
            return true;
          acc += buffer.toString(encoding, 0, Math.min(n, buffer.length));
          n -= buffer.length;
        });
        return acc;
      } else {
        return self.join(0, n);
      }
    };
    self.toString = function() {
      return self.take("binary");
    };
  }
  require("util").inherits(BufferList, EventEmitter);
});

// node_modules/utf-8-validate/fallback.js
var require_fallback2 = __commonJS((exports, module2) => {
  "use strict";
  var isValidUTF8 = (buf) => {
    var len = buf.length;
    var i = 0;
    while (i < len) {
      if (buf[i] < 128) {
        i++;
      } else if ((buf[i] & 224) === 192) {
        if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
          return false;
        } else {
          i += 2;
        }
      } else if ((buf[i] & 240) === 224) {
        if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || buf[i] === 237 && (buf[i + 1] & 224) === 160) {
          return false;
        } else {
          i += 3;
        }
      } else if ((buf[i] & 248) === 240) {
        if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
          return false;
        } else {
          i += 4;
        }
      } else {
        return false;
      }
    }
    return true;
  };
  module2.exports = isValidUTF8;
});

// node_modules/utf-8-validate/index.js
var require_utf_8_validate = __commonJS((exports, module2) => {
  "use strict";
  try {
    module2.exports = require_node_gyp_build()(__dirname);
  } catch (e) {
    module2.exports = require_fallback2();
  }
});

// node_modules/websocket/lib/WebSocketConnection.js
var require_WebSocketConnection = __commonJS((exports, module2) => {
  var util = require("util");
  var utils = require_utils();
  var EventEmitter = require("events").EventEmitter;
  var WebSocketFrame = require_WebSocketFrame();
  var BufferList = require_FastBufferList();
  var isValidUTF8 = require_utf_8_validate();
  var bufferAllocUnsafe = utils.bufferAllocUnsafe;
  var bufferFromString = utils.bufferFromString;
  var STATE_OPEN = "open";
  var STATE_PEER_REQUESTED_CLOSE = "peer_requested_close";
  var STATE_ENDING = "ending";
  var STATE_CLOSED = "closed";
  var setImmediateImpl = "setImmediate" in global ? global.setImmediate.bind(global) : process.nextTick.bind(process);
  var idCounter = 0;
  function WebSocketConnection(socket, extensions, protocol, maskOutgoingPackets, config) {
    this._debug = utils.BufferingLogger("websocket:connection", ++idCounter);
    this._debug("constructor");
    if (this._debug.enabled) {
      instrumentSocketForDebugging(this, socket);
    }
    EventEmitter.call(this);
    this._pingListenerCount = 0;
    this.on("newListener", function(ev) {
      if (ev === "ping") {
        this._pingListenerCount++;
      }
    }).on("removeListener", function(ev) {
      if (ev === "ping") {
        this._pingListenerCount--;
      }
    });
    this.config = config;
    this.socket = socket;
    this.protocol = protocol;
    this.extensions = extensions;
    this.remoteAddress = socket.remoteAddress;
    this.closeReasonCode = -1;
    this.closeDescription = null;
    this.closeEventEmitted = false;
    this.maskOutgoingPackets = maskOutgoingPackets;
    this.maskBytes = bufferAllocUnsafe(4);
    this.frameHeader = bufferAllocUnsafe(10);
    this.bufferList = new BufferList();
    this.currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    this.fragmentationSize = 0;
    this.frameQueue = [];
    this.connected = true;
    this.state = STATE_OPEN;
    this.waitingForCloseResponse = false;
    this.receivedEnd = false;
    this.closeTimeout = this.config.closeTimeout;
    this.assembleFragments = this.config.assembleFragments;
    this.maxReceivedMessageSize = this.config.maxReceivedMessageSize;
    this.outputBufferFull = false;
    this.inputPaused = false;
    this.receivedDataHandler = this.processReceivedData.bind(this);
    this._closeTimerHandler = this.handleCloseTimer.bind(this);
    this.socket.setNoDelay(this.config.disableNagleAlgorithm);
    this.socket.setTimeout(0);
    if (this.config.keepalive && !this.config.useNativeKeepalive) {
      if (typeof this.config.keepaliveInterval !== "number") {
        throw new Error("keepaliveInterval must be specified and numeric if keepalive is true.");
      }
      this._keepaliveTimerHandler = this.handleKeepaliveTimer.bind(this);
      this.setKeepaliveTimer();
      if (this.config.dropConnectionOnKeepaliveTimeout) {
        if (typeof this.config.keepaliveGracePeriod !== "number") {
          throw new Error("keepaliveGracePeriod  must be specified and numeric if dropConnectionOnKeepaliveTimeout is true.");
        }
        this._gracePeriodTimerHandler = this.handleGracePeriodTimer.bind(this);
      }
    } else if (this.config.keepalive && this.config.useNativeKeepalive) {
      if (!("setKeepAlive" in this.socket)) {
        throw new Error("Unable to use native keepalive: unsupported by this version of Node.");
      }
      this.socket.setKeepAlive(true, this.config.keepaliveInterval);
    }
    this.socket.removeAllListeners("error");
  }
  WebSocketConnection.CLOSE_REASON_NORMAL = 1e3;
  WebSocketConnection.CLOSE_REASON_GOING_AWAY = 1001;
  WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR = 1002;
  WebSocketConnection.CLOSE_REASON_UNPROCESSABLE_INPUT = 1003;
  WebSocketConnection.CLOSE_REASON_RESERVED = 1004;
  WebSocketConnection.CLOSE_REASON_NOT_PROVIDED = 1005;
  WebSocketConnection.CLOSE_REASON_ABNORMAL = 1006;
  WebSocketConnection.CLOSE_REASON_INVALID_DATA = 1007;
  WebSocketConnection.CLOSE_REASON_POLICY_VIOLATION = 1008;
  WebSocketConnection.CLOSE_REASON_MESSAGE_TOO_BIG = 1009;
  WebSocketConnection.CLOSE_REASON_EXTENSION_REQUIRED = 1010;
  WebSocketConnection.CLOSE_REASON_INTERNAL_SERVER_ERROR = 1011;
  WebSocketConnection.CLOSE_REASON_TLS_HANDSHAKE_FAILED = 1015;
  WebSocketConnection.CLOSE_DESCRIPTIONS = {
    1e3: "Normal connection closure",
    1001: "Remote peer is going away",
    1002: "Protocol error",
    1003: "Unprocessable input",
    1004: "Reserved",
    1005: "Reason not provided",
    1006: "Abnormal closure, no further detail available",
    1007: "Invalid data received",
    1008: "Policy violation",
    1009: "Message too big",
    1010: "Extension requested by client is required",
    1011: "Internal Server Error",
    1015: "TLS Handshake Failed"
  };
  function validateCloseReason(code) {
    if (code < 1e3) {
      return false;
    }
    if (code >= 1e3 && code <= 2999) {
      return [1e3, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015].indexOf(code) !== -1;
    }
    if (code >= 3e3 && code <= 3999) {
      return true;
    }
    if (code >= 4e3 && code <= 4999) {
      return true;
    }
    if (code >= 5e3) {
      return false;
    }
  }
  util.inherits(WebSocketConnection, EventEmitter);
  WebSocketConnection.prototype._addSocketEventListeners = function() {
    this.socket.on("error", this.handleSocketError.bind(this));
    this.socket.on("end", this.handleSocketEnd.bind(this));
    this.socket.on("close", this.handleSocketClose.bind(this));
    this.socket.on("drain", this.handleSocketDrain.bind(this));
    this.socket.on("pause", this.handleSocketPause.bind(this));
    this.socket.on("resume", this.handleSocketResume.bind(this));
    this.socket.on("data", this.handleSocketData.bind(this));
  };
  WebSocketConnection.prototype.setKeepaliveTimer = function() {
    this._debug("setKeepaliveTimer");
    if (!this.config.keepalive || this.config.useNativeKeepalive) {
      return;
    }
    this.clearKeepaliveTimer();
    this.clearGracePeriodTimer();
    this._keepaliveTimeoutID = setTimeout(this._keepaliveTimerHandler, this.config.keepaliveInterval);
  };
  WebSocketConnection.prototype.clearKeepaliveTimer = function() {
    if (this._keepaliveTimeoutID) {
      clearTimeout(this._keepaliveTimeoutID);
    }
  };
  WebSocketConnection.prototype.handleKeepaliveTimer = function() {
    this._debug("handleKeepaliveTimer");
    this._keepaliveTimeoutID = null;
    this.ping();
    if (this.config.dropConnectionOnKeepaliveTimeout) {
      this.setGracePeriodTimer();
    } else {
      this.setKeepaliveTimer();
    }
  };
  WebSocketConnection.prototype.setGracePeriodTimer = function() {
    this._debug("setGracePeriodTimer");
    this.clearGracePeriodTimer();
    this._gracePeriodTimeoutID = setTimeout(this._gracePeriodTimerHandler, this.config.keepaliveGracePeriod);
  };
  WebSocketConnection.prototype.clearGracePeriodTimer = function() {
    if (this._gracePeriodTimeoutID) {
      clearTimeout(this._gracePeriodTimeoutID);
    }
  };
  WebSocketConnection.prototype.handleGracePeriodTimer = function() {
    this._debug("handleGracePeriodTimer");
    this._gracePeriodTimeoutID = null;
    this.drop(WebSocketConnection.CLOSE_REASON_ABNORMAL, "Peer not responding.", true);
  };
  WebSocketConnection.prototype.handleSocketData = function(data) {
    this._debug("handleSocketData");
    this.setKeepaliveTimer();
    this.bufferList.write(data);
    this.processReceivedData();
  };
  WebSocketConnection.prototype.processReceivedData = function() {
    this._debug("processReceivedData");
    if (!this.connected) {
      return;
    }
    if (this.inputPaused) {
      return;
    }
    var frame = this.currentFrame;
    if (!frame.addData(this.bufferList)) {
      this._debug("-- insufficient data for frame");
      return;
    }
    var self = this;
    if (frame.protocolError) {
      this._debug("-- protocol error");
      process.nextTick(function() {
        self.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, frame.dropReason);
      });
      return;
    } else if (frame.frameTooLarge) {
      this._debug("-- frame too large");
      process.nextTick(function() {
        self.drop(WebSocketConnection.CLOSE_REASON_MESSAGE_TOO_BIG, frame.dropReason);
      });
      return;
    }
    if (frame.rsv1 || frame.rsv2 || frame.rsv3) {
      this._debug("-- illegal rsv flag");
      process.nextTick(function() {
        self.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, "Unsupported usage of rsv bits without negotiated extension.");
      });
      return;
    }
    if (!this.assembleFragments) {
      this._debug("-- emitting frame");
      process.nextTick(function() {
        self.emit("frame", frame);
      });
    }
    process.nextTick(function() {
      self.processFrame(frame);
    });
    this.currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    if (this.bufferList.length > 0) {
      setImmediateImpl(this.receivedDataHandler);
    }
  };
  WebSocketConnection.prototype.handleSocketError = function(error2) {
    this._debug("handleSocketError: %j", error2);
    if (this.state === STATE_CLOSED) {
      this._debug("  --- Socket 'error' after 'close'");
      return;
    }
    this.closeReasonCode = WebSocketConnection.CLOSE_REASON_ABNORMAL;
    this.closeDescription = "Socket Error: " + error2.syscall + " " + error2.code;
    this.connected = false;
    this.state = STATE_CLOSED;
    this.fragmentationSize = 0;
    if (utils.eventEmitterListenerCount(this, "error") > 0) {
      this.emit("error", error2);
    }
    this.socket.destroy();
    this._debug.printOutput();
  };
  WebSocketConnection.prototype.handleSocketEnd = function() {
    this._debug("handleSocketEnd: received socket end.  state = %s", this.state);
    this.receivedEnd = true;
    if (this.state === STATE_CLOSED) {
      this._debug("  --- Socket 'end' after 'close'");
      return;
    }
    if (this.state !== STATE_PEER_REQUESTED_CLOSE && this.state !== STATE_ENDING) {
      this._debug("  --- UNEXPECTED socket end.");
      this.socket.end();
    }
  };
  WebSocketConnection.prototype.handleSocketClose = function(hadError) {
    this._debug("handleSocketClose: received socket close");
    this.socketHadError = hadError;
    this.connected = false;
    this.state = STATE_CLOSED;
    if (this.closeReasonCode === -1) {
      this.closeReasonCode = WebSocketConnection.CLOSE_REASON_ABNORMAL;
      this.closeDescription = "Connection dropped by remote peer.";
    }
    this.clearCloseTimer();
    this.clearKeepaliveTimer();
    this.clearGracePeriodTimer();
    if (!this.closeEventEmitted) {
      this.closeEventEmitted = true;
      this._debug("-- Emitting WebSocketConnection close event");
      this.emit("close", this.closeReasonCode, this.closeDescription);
    }
  };
  WebSocketConnection.prototype.handleSocketDrain = function() {
    this._debug("handleSocketDrain: socket drain event");
    this.outputBufferFull = false;
    this.emit("drain");
  };
  WebSocketConnection.prototype.handleSocketPause = function() {
    this._debug("handleSocketPause: socket pause event");
    this.inputPaused = true;
    this.emit("pause");
  };
  WebSocketConnection.prototype.handleSocketResume = function() {
    this._debug("handleSocketResume: socket resume event");
    this.inputPaused = false;
    this.emit("resume");
    this.processReceivedData();
  };
  WebSocketConnection.prototype.pause = function() {
    this._debug("pause: pause requested");
    this.socket.pause();
  };
  WebSocketConnection.prototype.resume = function() {
    this._debug("resume: resume requested");
    this.socket.resume();
  };
  WebSocketConnection.prototype.close = function(reasonCode, description) {
    if (this.connected) {
      this._debug("close: Initating clean WebSocket close sequence.");
      if (typeof reasonCode !== "number") {
        reasonCode = WebSocketConnection.CLOSE_REASON_NORMAL;
      }
      if (!validateCloseReason(reasonCode)) {
        throw new Error("Close code " + reasonCode + " is not valid.");
      }
      if (typeof description !== "string") {
        description = WebSocketConnection.CLOSE_DESCRIPTIONS[reasonCode];
      }
      this.closeReasonCode = reasonCode;
      this.closeDescription = description;
      this.setCloseTimer();
      this.sendCloseFrame(this.closeReasonCode, this.closeDescription);
      this.state = STATE_ENDING;
      this.connected = false;
    }
  };
  WebSocketConnection.prototype.drop = function(reasonCode, description, skipCloseFrame) {
    this._debug("drop");
    if (typeof reasonCode !== "number") {
      reasonCode = WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR;
    }
    if (typeof description !== "string") {
      description = WebSocketConnection.CLOSE_DESCRIPTIONS[reasonCode];
    }
    this._debug("Forcefully dropping connection. skipCloseFrame: %s, code: %d, description: %s", skipCloseFrame, reasonCode, description);
    this.closeReasonCode = reasonCode;
    this.closeDescription = description;
    this.frameQueue = [];
    this.fragmentationSize = 0;
    if (!skipCloseFrame) {
      this.sendCloseFrame(reasonCode, description);
    }
    this.connected = false;
    this.state = STATE_CLOSED;
    this.clearCloseTimer();
    this.clearKeepaliveTimer();
    this.clearGracePeriodTimer();
    if (!this.closeEventEmitted) {
      this.closeEventEmitted = true;
      this._debug("Emitting WebSocketConnection close event");
      this.emit("close", this.closeReasonCode, this.closeDescription);
    }
    this._debug("Drop: destroying socket");
    this.socket.destroy();
  };
  WebSocketConnection.prototype.setCloseTimer = function() {
    this._debug("setCloseTimer");
    this.clearCloseTimer();
    this._debug("Setting close timer");
    this.waitingForCloseResponse = true;
    this.closeTimer = setTimeout(this._closeTimerHandler, this.closeTimeout);
  };
  WebSocketConnection.prototype.clearCloseTimer = function() {
    this._debug("clearCloseTimer");
    if (this.closeTimer) {
      this._debug("Clearing close timer");
      clearTimeout(this.closeTimer);
      this.waitingForCloseResponse = false;
      this.closeTimer = null;
    }
  };
  WebSocketConnection.prototype.handleCloseTimer = function() {
    this._debug("handleCloseTimer");
    this.closeTimer = null;
    if (this.waitingForCloseResponse) {
      this._debug("Close response not received from client.  Forcing socket end.");
      this.waitingForCloseResponse = false;
      this.state = STATE_CLOSED;
      this.socket.end();
    }
  };
  WebSocketConnection.prototype.processFrame = function(frame) {
    this._debug("processFrame");
    this._debug(" -- frame: %s", frame);
    if (this.frameQueue.length !== 0 && (frame.opcode > 0 && frame.opcode < 8)) {
      this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, "Illegal frame opcode 0x" + frame.opcode.toString(16) + " received in middle of fragmented message.");
      return;
    }
    switch (frame.opcode) {
      case 2:
        this._debug("-- Binary Frame");
        if (this.assembleFragments) {
          if (frame.fin) {
            this._debug("---- Emitting 'message' event");
            this.emit("message", {
              type: "binary",
              binaryData: frame.binaryPayload
            });
          } else {
            this.frameQueue.push(frame);
            this.fragmentationSize = frame.length;
          }
        }
        break;
      case 1:
        this._debug("-- Text Frame");
        if (this.assembleFragments) {
          if (frame.fin) {
            if (!isValidUTF8(frame.binaryPayload)) {
              this.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA, "Invalid UTF-8 Data Received");
              return;
            }
            this._debug("---- Emitting 'message' event");
            this.emit("message", {
              type: "utf8",
              utf8Data: frame.binaryPayload.toString("utf8")
            });
          } else {
            this.frameQueue.push(frame);
            this.fragmentationSize = frame.length;
          }
        }
        break;
      case 0:
        this._debug("-- Continuation Frame");
        if (this.assembleFragments) {
          if (this.frameQueue.length === 0) {
            this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, "Unexpected Continuation Frame");
            return;
          }
          this.fragmentationSize += frame.length;
          if (this.fragmentationSize > this.maxReceivedMessageSize) {
            this.drop(WebSocketConnection.CLOSE_REASON_MESSAGE_TOO_BIG, "Maximum message size exceeded.");
            return;
          }
          this.frameQueue.push(frame);
          if (frame.fin) {
            var bytesCopied = 0;
            var binaryPayload = bufferAllocUnsafe(this.fragmentationSize);
            var opcode = this.frameQueue[0].opcode;
            this.frameQueue.forEach(function(currentFrame) {
              currentFrame.binaryPayload.copy(binaryPayload, bytesCopied);
              bytesCopied += currentFrame.binaryPayload.length;
            });
            this.frameQueue = [];
            this.fragmentationSize = 0;
            switch (opcode) {
              case 2:
                this.emit("message", {
                  type: "binary",
                  binaryData: binaryPayload
                });
                break;
              case 1:
                if (!isValidUTF8(binaryPayload)) {
                  this.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA, "Invalid UTF-8 Data Received");
                  return;
                }
                this.emit("message", {
                  type: "utf8",
                  utf8Data: binaryPayload.toString("utf8")
                });
                break;
              default:
                this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, "Unexpected first opcode in fragmentation sequence: 0x" + opcode.toString(16));
                return;
            }
          }
        }
        break;
      case 9:
        this._debug("-- Ping Frame");
        if (this._pingListenerCount > 0) {
          var cancelled = false;
          var cancel = function() {
            cancelled = true;
          };
          this.emit("ping", cancel, frame.binaryPayload);
          if (!cancelled) {
            this.pong(frame.binaryPayload);
          }
        } else {
          this.pong(frame.binaryPayload);
        }
        break;
      case 10:
        this._debug("-- Pong Frame");
        this.emit("pong", frame.binaryPayload);
        break;
      case 8:
        this._debug("-- Close Frame");
        if (this.waitingForCloseResponse) {
          this._debug("---- Got close response from peer.  Completing closing handshake.");
          this.clearCloseTimer();
          this.waitingForCloseResponse = false;
          this.state = STATE_CLOSED;
          this.socket.end();
          return;
        }
        this._debug("---- Closing handshake initiated by peer.");
        this.state = STATE_PEER_REQUESTED_CLOSE;
        var respondCloseReasonCode;
        if (frame.invalidCloseFrameLength) {
          this.closeReasonCode = 1005;
          respondCloseReasonCode = WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR;
        } else if (frame.closeStatus === -1 || validateCloseReason(frame.closeStatus)) {
          this.closeReasonCode = frame.closeStatus;
          respondCloseReasonCode = WebSocketConnection.CLOSE_REASON_NORMAL;
        } else {
          this.closeReasonCode = frame.closeStatus;
          respondCloseReasonCode = WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR;
        }
        if (frame.binaryPayload.length > 1) {
          if (!isValidUTF8(frame.binaryPayload)) {
            this.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA, "Invalid UTF-8 Data Received");
            return;
          }
          this.closeDescription = frame.binaryPayload.toString("utf8");
        } else {
          this.closeDescription = WebSocketConnection.CLOSE_DESCRIPTIONS[this.closeReasonCode];
        }
        this._debug("------ Remote peer %s - code: %d - %s - close frame payload length: %d", this.remoteAddress, this.closeReasonCode, this.closeDescription, frame.length);
        this._debug("------ responding to remote peer's close request.");
        this.sendCloseFrame(respondCloseReasonCode, null);
        this.connected = false;
        break;
      default:
        this._debug("-- Unrecognized Opcode %d", frame.opcode);
        this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, "Unrecognized Opcode: 0x" + frame.opcode.toString(16));
        break;
    }
  };
  WebSocketConnection.prototype.send = function(data, cb) {
    this._debug("send");
    if (Buffer.isBuffer(data)) {
      this.sendBytes(data, cb);
    } else if (typeof data["toString"] === "function") {
      this.sendUTF(data, cb);
    } else {
      throw new Error("Data provided must either be a Node Buffer or implement toString()");
    }
  };
  WebSocketConnection.prototype.sendUTF = function(data, cb) {
    data = bufferFromString(data.toString(), "utf8");
    this._debug("sendUTF: %d bytes", data.length);
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 1;
    frame.binaryPayload = data;
    this.fragmentAndSend(frame, cb);
  };
  WebSocketConnection.prototype.sendBytes = function(data, cb) {
    this._debug("sendBytes");
    if (!Buffer.isBuffer(data)) {
      throw new Error("You must pass a Node Buffer object to WebSocketConnection.prototype.sendBytes()");
    }
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 2;
    frame.binaryPayload = data;
    this.fragmentAndSend(frame, cb);
  };
  WebSocketConnection.prototype.ping = function(data) {
    this._debug("ping");
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 9;
    frame.fin = true;
    if (data) {
      if (!Buffer.isBuffer(data)) {
        data = bufferFromString(data.toString(), "utf8");
      }
      if (data.length > 125) {
        this._debug("WebSocket: Data for ping is longer than 125 bytes.  Truncating.");
        data = data.slice(0, 124);
      }
      frame.binaryPayload = data;
    }
    this.sendFrame(frame);
  };
  WebSocketConnection.prototype.pong = function(binaryPayload) {
    this._debug("pong");
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 10;
    if (Buffer.isBuffer(binaryPayload) && binaryPayload.length > 125) {
      this._debug("WebSocket: Data for pong is longer than 125 bytes.  Truncating.");
      binaryPayload = binaryPayload.slice(0, 124);
    }
    frame.binaryPayload = binaryPayload;
    frame.fin = true;
    this.sendFrame(frame);
  };
  WebSocketConnection.prototype.fragmentAndSend = function(frame, cb) {
    this._debug("fragmentAndSend");
    if (frame.opcode > 7) {
      throw new Error("You cannot fragment control frames.");
    }
    var threshold = this.config.fragmentationThreshold;
    var length = frame.binaryPayload.length;
    if (!this.config.fragmentOutgoingMessages || frame.binaryPayload && length <= threshold) {
      frame.fin = true;
      this.sendFrame(frame, cb);
      return;
    }
    var numFragments = Math.ceil(length / threshold);
    var sentFragments = 0;
    var sentCallback = function fragmentSentCallback(err) {
      if (err) {
        if (typeof cb === "function") {
          cb(err);
          cb = null;
        }
        return;
      }
      ++sentFragments;
      if (sentFragments === numFragments && typeof cb === "function") {
        cb();
      }
    };
    for (var i = 1; i <= numFragments; i++) {
      var currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
      currentFrame.opcode = i === 1 ? frame.opcode : 0;
      currentFrame.fin = i === numFragments;
      var currentLength = i === numFragments ? length - threshold * (i - 1) : threshold;
      var sliceStart = threshold * (i - 1);
      currentFrame.binaryPayload = frame.binaryPayload.slice(sliceStart, sliceStart + currentLength);
      this.sendFrame(currentFrame, sentCallback);
    }
  };
  WebSocketConnection.prototype.sendCloseFrame = function(reasonCode, description, cb) {
    if (typeof reasonCode !== "number") {
      reasonCode = WebSocketConnection.CLOSE_REASON_NORMAL;
    }
    this._debug("sendCloseFrame state: %s, reasonCode: %d, description: %s", this.state, reasonCode, description);
    if (this.state !== STATE_OPEN && this.state !== STATE_PEER_REQUESTED_CLOSE) {
      return;
    }
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.fin = true;
    frame.opcode = 8;
    frame.closeStatus = reasonCode;
    if (typeof description === "string") {
      frame.binaryPayload = bufferFromString(description, "utf8");
    }
    this.sendFrame(frame, cb);
    this.socket.end();
  };
  WebSocketConnection.prototype.sendFrame = function(frame, cb) {
    this._debug("sendFrame");
    frame.mask = this.maskOutgoingPackets;
    var flushed = this.socket.write(frame.toBuffer(), cb);
    this.outputBufferFull = !flushed;
    return flushed;
  };
  module2.exports = WebSocketConnection;
  function instrumentSocketForDebugging(connection, socket) {
    if (!connection._debug.enabled) {
      return;
    }
    var originalSocketEmit = socket.emit;
    socket.emit = function(event) {
      connection._debug("||| Socket Event  '%s'", event);
      originalSocketEmit.apply(this, arguments);
    };
    for (var key in socket) {
      if (typeof socket[key] !== "function") {
        continue;
      }
      if (["emit"].indexOf(key) !== -1) {
        continue;
      }
      (function(key2) {
        var original = socket[key2];
        if (key2 === "on") {
          socket[key2] = function proxyMethod__EventEmitter__On() {
            connection._debug("||| Socket method called:  %s (%s)", key2, arguments[0]);
            return original.apply(this, arguments);
          };
          return;
        }
        socket[key2] = function proxyMethod() {
          connection._debug("||| Socket method called:  %s", key2);
          return original.apply(this, arguments);
        };
      })(key);
    }
  }
});

// node_modules/websocket/lib/WebSocketRequest.js
var require_WebSocketRequest = __commonJS((exports, module2) => {
  var crypto = require("crypto");
  var util = require("util");
  var url = require("url");
  var EventEmitter = require("events").EventEmitter;
  var WebSocketConnection = require_WebSocketConnection();
  var headerValueSplitRegExp = /,\s*/;
  var headerParamSplitRegExp = /;\s*/;
  var headerSanitizeRegExp = /[\r\n]/g;
  var xForwardedForSeparatorRegExp = /,\s*/;
  var separators = [
    "(",
    ")",
    "<",
    ">",
    "@",
    ",",
    ";",
    ":",
    "\\",
    '"',
    "/",
    "[",
    "]",
    "?",
    "=",
    "{",
    "}",
    " ",
    String.fromCharCode(9)
  ];
  var controlChars = [String.fromCharCode(127)];
  for (var i = 0; i < 31; i++) {
    controlChars.push(String.fromCharCode(i));
  }
  var cookieNameValidateRegEx = /([\x00-\x20\x22\x28\x29\x2c\x2f\x3a-\x3f\x40\x5b-\x5e\x7b\x7d\x7f])/;
  var cookieValueValidateRegEx = /[^\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]/;
  var cookieValueDQuoteValidateRegEx = /^"[^"]*"$/;
  var controlCharsAndSemicolonRegEx = /[\x00-\x20\x3b]/g;
  var cookieSeparatorRegEx = /[;,] */;
  var httpStatusDescriptions = {
    100: "Continue",
    101: "Switching Protocols",
    200: "OK",
    201: "Created",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    406: "Not Acceptable",
    407: "Proxy Authorization Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Long",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    426: "Upgrade Required",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported"
  };
  function WebSocketRequest(socket, httpRequest, serverConfig) {
    EventEmitter.call(this);
    this.socket = socket;
    this.httpRequest = httpRequest;
    this.resource = httpRequest.url;
    this.remoteAddress = socket.remoteAddress;
    this.remoteAddresses = [this.remoteAddress];
    this.serverConfig = serverConfig;
    this._socketIsClosing = false;
    this._socketCloseHandler = this._handleSocketCloseBeforeAccept.bind(this);
    this.socket.on("end", this._socketCloseHandler);
    this.socket.on("close", this._socketCloseHandler);
    this._resolved = false;
  }
  util.inherits(WebSocketRequest, EventEmitter);
  WebSocketRequest.prototype.readHandshake = function() {
    var self = this;
    var request = this.httpRequest;
    this.resourceURL = url.parse(this.resource, true);
    this.host = request.headers["host"];
    if (!this.host) {
      throw new Error("Client must provide a Host header.");
    }
    this.key = request.headers["sec-websocket-key"];
    if (!this.key) {
      throw new Error("Client must provide a value for Sec-WebSocket-Key.");
    }
    this.webSocketVersion = parseInt(request.headers["sec-websocket-version"], 10);
    if (!this.webSocketVersion || isNaN(this.webSocketVersion)) {
      throw new Error("Client must provide a value for Sec-WebSocket-Version.");
    }
    switch (this.webSocketVersion) {
      case 8:
      case 13:
        break;
      default:
        var e = new Error("Unsupported websocket client version: " + this.webSocketVersion + "Only versions 8 and 13 are supported.");
        e.httpCode = 426;
        e.headers = {
          "Sec-WebSocket-Version": "13"
        };
        throw e;
    }
    if (this.webSocketVersion === 13) {
      this.origin = request.headers["origin"];
    } else if (this.webSocketVersion === 8) {
      this.origin = request.headers["sec-websocket-origin"];
    }
    var protocolString = request.headers["sec-websocket-protocol"];
    this.protocolFullCaseMap = {};
    this.requestedProtocols = [];
    if (protocolString) {
      var requestedProtocolsFullCase = protocolString.split(headerValueSplitRegExp);
      requestedProtocolsFullCase.forEach(function(protocol) {
        var lcProtocol = protocol.toLocaleLowerCase();
        self.requestedProtocols.push(lcProtocol);
        self.protocolFullCaseMap[lcProtocol] = protocol;
      });
    }
    if (!this.serverConfig.ignoreXForwardedFor && request.headers["x-forwarded-for"]) {
      var immediatePeerIP = this.remoteAddress;
      this.remoteAddresses = request.headers["x-forwarded-for"].split(xForwardedForSeparatorRegExp);
      this.remoteAddresses.push(immediatePeerIP);
      this.remoteAddress = this.remoteAddresses[0];
    }
    if (this.serverConfig.parseExtensions) {
      var extensionsString = request.headers["sec-websocket-extensions"];
      this.requestedExtensions = this.parseExtensions(extensionsString);
    } else {
      this.requestedExtensions = [];
    }
    if (this.serverConfig.parseCookies) {
      var cookieString = request.headers["cookie"];
      this.cookies = this.parseCookies(cookieString);
    } else {
      this.cookies = [];
    }
  };
  WebSocketRequest.prototype.parseExtensions = function(extensionsString) {
    if (!extensionsString || extensionsString.length === 0) {
      return [];
    }
    var extensions = extensionsString.toLocaleLowerCase().split(headerValueSplitRegExp);
    extensions.forEach(function(extension, index2, array) {
      var params = extension.split(headerParamSplitRegExp);
      var extensionName = params[0];
      var extensionParams = params.slice(1);
      extensionParams.forEach(function(rawParam, index3, array2) {
        var arr = rawParam.split("=");
        var obj2 = {
          name: arr[0],
          value: arr[1]
        };
        array2.splice(index3, 1, obj2);
      });
      var obj = {
        name: extensionName,
        params: extensionParams
      };
      array.splice(index2, 1, obj);
    });
    return extensions;
  };
  WebSocketRequest.prototype.parseCookies = function(str) {
    if (!str || typeof str !== "string") {
      return [];
    }
    var cookies = [];
    var pairs = str.split(cookieSeparatorRegEx);
    pairs.forEach(function(pair) {
      var eq_idx = pair.indexOf("=");
      if (eq_idx === -1) {
        cookies.push({
          name: pair,
          value: null
        });
        return;
      }
      var key = pair.substr(0, eq_idx).trim();
      var val = pair.substr(++eq_idx, pair.length).trim();
      if (val[0] === '"') {
        val = val.slice(1, -1);
      }
      cookies.push({
        name: key,
        value: decodeURIComponent(val)
      });
    });
    return cookies;
  };
  WebSocketRequest.prototype.accept = function(acceptedProtocol, allowedOrigin, cookies) {
    this._verifyResolution();
    var protocolFullCase;
    if (acceptedProtocol) {
      protocolFullCase = this.protocolFullCaseMap[acceptedProtocol.toLocaleLowerCase()];
      if (typeof protocolFullCase === "undefined") {
        protocolFullCase = acceptedProtocol;
      }
    } else {
      protocolFullCase = acceptedProtocol;
    }
    this.protocolFullCaseMap = null;
    var sha1 = crypto.createHash("sha1");
    sha1.update(this.key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    var acceptKey = sha1.digest("base64");
    var response = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + acceptKey + "\r\n";
    if (protocolFullCase) {
      for (var i2 = 0; i2 < protocolFullCase.length; i2++) {
        var charCode = protocolFullCase.charCodeAt(i2);
        var character = protocolFullCase.charAt(i2);
        if (charCode < 33 || charCode > 126 || separators.indexOf(character) !== -1) {
          this.reject(500);
          throw new Error('Illegal character "' + String.fromCharCode(character) + '" in subprotocol.');
        }
      }
      if (this.requestedProtocols.indexOf(acceptedProtocol) === -1) {
        this.reject(500);
        throw new Error("Specified protocol was not requested by the client.");
      }
      protocolFullCase = protocolFullCase.replace(headerSanitizeRegExp, "");
      response += "Sec-WebSocket-Protocol: " + protocolFullCase + "\r\n";
    }
    this.requestedProtocols = null;
    if (allowedOrigin) {
      allowedOrigin = allowedOrigin.replace(headerSanitizeRegExp, "");
      if (this.webSocketVersion === 13) {
        response += "Origin: " + allowedOrigin + "\r\n";
      } else if (this.webSocketVersion === 8) {
        response += "Sec-WebSocket-Origin: " + allowedOrigin + "\r\n";
      }
    }
    if (cookies) {
      if (!Array.isArray(cookies)) {
        this.reject(500);
        throw new Error('Value supplied for "cookies" argument must be an array.');
      }
      var seenCookies = {};
      cookies.forEach(function(cookie) {
        if (!cookie.name || !cookie.value) {
          this.reject(500);
          throw new Error('Each cookie to set must at least provide a "name" and "value"');
        }
        cookie.name = cookie.name.replace(controlCharsAndSemicolonRegEx, "");
        cookie.value = cookie.value.replace(controlCharsAndSemicolonRegEx, "");
        if (seenCookies[cookie.name]) {
          this.reject(500);
          throw new Error("You may not specify the same cookie name twice.");
        }
        seenCookies[cookie.name] = true;
        var invalidChar = cookie.name.match(cookieNameValidateRegEx);
        if (invalidChar) {
          this.reject(500);
          throw new Error("Illegal character " + invalidChar[0] + " in cookie name");
        }
        if (cookie.value.match(cookieValueDQuoteValidateRegEx)) {
          invalidChar = cookie.value.slice(1, -1).match(cookieValueValidateRegEx);
        } else {
          invalidChar = cookie.value.match(cookieValueValidateRegEx);
        }
        if (invalidChar) {
          this.reject(500);
          throw new Error("Illegal character " + invalidChar[0] + " in cookie value");
        }
        var cookieParts = [cookie.name + "=" + cookie.value];
        if (cookie.path) {
          invalidChar = cookie.path.match(controlCharsAndSemicolonRegEx);
          if (invalidChar) {
            this.reject(500);
            throw new Error("Illegal character " + invalidChar[0] + " in cookie path");
          }
          cookieParts.push("Path=" + cookie.path);
        }
        if (cookie.domain) {
          if (typeof cookie.domain !== "string") {
            this.reject(500);
            throw new Error("Domain must be specified and must be a string.");
          }
          invalidChar = cookie.domain.match(controlCharsAndSemicolonRegEx);
          if (invalidChar) {
            this.reject(500);
            throw new Error("Illegal character " + invalidChar[0] + " in cookie domain");
          }
          cookieParts.push("Domain=" + cookie.domain.toLowerCase());
        }
        if (cookie.expires) {
          if (!(cookie.expires instanceof Date)) {
            this.reject(500);
            throw new Error('Value supplied for cookie "expires" must be a vaild date object');
          }
          cookieParts.push("Expires=" + cookie.expires.toGMTString());
        }
        if (cookie.maxage) {
          var maxage = cookie.maxage;
          if (typeof maxage === "string") {
            maxage = parseInt(maxage, 10);
          }
          if (isNaN(maxage) || maxage <= 0) {
            this.reject(500);
            throw new Error('Value supplied for cookie "maxage" must be a non-zero number');
          }
          maxage = Math.round(maxage);
          cookieParts.push("Max-Age=" + maxage.toString(10));
        }
        if (cookie.secure) {
          if (typeof cookie.secure !== "boolean") {
            this.reject(500);
            throw new Error('Value supplied for cookie "secure" must be of type boolean');
          }
          cookieParts.push("Secure");
        }
        if (cookie.httponly) {
          if (typeof cookie.httponly !== "boolean") {
            this.reject(500);
            throw new Error('Value supplied for cookie "httponly" must be of type boolean');
          }
          cookieParts.push("HttpOnly");
        }
        response += "Set-Cookie: " + cookieParts.join(";") + "\r\n";
      }.bind(this));
    }
    this._resolved = true;
    this.emit("requestResolved", this);
    response += "\r\n";
    var connection = new WebSocketConnection(this.socket, [], acceptedProtocol, false, this.serverConfig);
    connection.webSocketVersion = this.webSocketVersion;
    connection.remoteAddress = this.remoteAddress;
    connection.remoteAddresses = this.remoteAddresses;
    var self = this;
    if (this._socketIsClosing) {
      cleanupFailedConnection(connection);
    } else {
      this.socket.write(response, "ascii", function(error2) {
        if (error2) {
          cleanupFailedConnection(connection);
          return;
        }
        self._removeSocketCloseListeners();
        connection._addSocketEventListeners();
      });
    }
    this.emit("requestAccepted", connection);
    return connection;
  };
  WebSocketRequest.prototype.reject = function(status, reason, extraHeaders) {
    this._verifyResolution();
    this._resolved = true;
    this.emit("requestResolved", this);
    if (typeof status !== "number") {
      status = 403;
    }
    var response = "HTTP/1.1 " + status + " " + httpStatusDescriptions[status] + "\r\nConnection: close\r\n";
    if (reason) {
      reason = reason.replace(headerSanitizeRegExp, "");
      response += "X-WebSocket-Reject-Reason: " + reason + "\r\n";
    }
    if (extraHeaders) {
      for (var key in extraHeaders) {
        var sanitizedValue = extraHeaders[key].toString().replace(headerSanitizeRegExp, "");
        var sanitizedKey = key.replace(headerSanitizeRegExp, "");
        response += sanitizedKey + ": " + sanitizedValue + "\r\n";
      }
    }
    response += "\r\n";
    this.socket.end(response, "ascii");
    this.emit("requestRejected", this);
  };
  WebSocketRequest.prototype._handleSocketCloseBeforeAccept = function() {
    this._socketIsClosing = true;
    this._removeSocketCloseListeners();
  };
  WebSocketRequest.prototype._removeSocketCloseListeners = function() {
    this.socket.removeListener("end", this._socketCloseHandler);
    this.socket.removeListener("close", this._socketCloseHandler);
  };
  WebSocketRequest.prototype._verifyResolution = function() {
    if (this._resolved) {
      throw new Error("WebSocketRequest may only be accepted or rejected one time.");
    }
  };
  function cleanupFailedConnection(connection) {
    process.nextTick(function() {
      connection.drop(1006, "TCP connection lost before handshake completed.", true);
    });
  }
  module2.exports = WebSocketRequest;
});

// node_modules/websocket/lib/WebSocketServer.js
var require_WebSocketServer = __commonJS((exports, module2) => {
  var extend = require_utils().extend;
  var utils = require_utils();
  var util = require("util");
  var debug = require_src()("websocket:server");
  var EventEmitter = require("events").EventEmitter;
  var WebSocketRequest = require_WebSocketRequest();
  var WebSocketServer = function WebSocketServer2(config) {
    EventEmitter.call(this);
    this._handlers = {
      upgrade: this.handleUpgrade.bind(this),
      requestAccepted: this.handleRequestAccepted.bind(this),
      requestResolved: this.handleRequestResolved.bind(this)
    };
    this.connections = [];
    this.pendingRequests = [];
    if (config) {
      this.mount(config);
    }
  };
  util.inherits(WebSocketServer, EventEmitter);
  WebSocketServer.prototype.mount = function(config) {
    this.config = {
      httpServer: null,
      maxReceivedFrameSize: 65536,
      maxReceivedMessageSize: 1048576,
      fragmentOutgoingMessages: true,
      fragmentationThreshold: 16384,
      keepalive: true,
      keepaliveInterval: 2e4,
      dropConnectionOnKeepaliveTimeout: true,
      keepaliveGracePeriod: 1e4,
      useNativeKeepalive: false,
      assembleFragments: true,
      autoAcceptConnections: false,
      ignoreXForwardedFor: false,
      parseCookies: true,
      parseExtensions: true,
      disableNagleAlgorithm: true,
      closeTimeout: 5e3
    };
    extend(this.config, config);
    if (this.config.httpServer) {
      if (!Array.isArray(this.config.httpServer)) {
        this.config.httpServer = [this.config.httpServer];
      }
      var upgradeHandler = this._handlers.upgrade;
      this.config.httpServer.forEach(function(httpServer) {
        httpServer.on("upgrade", upgradeHandler);
      });
    } else {
      throw new Error("You must specify an httpServer on which to mount the WebSocket server.");
    }
  };
  WebSocketServer.prototype.unmount = function() {
    var upgradeHandler = this._handlers.upgrade;
    this.config.httpServer.forEach(function(httpServer) {
      httpServer.removeListener("upgrade", upgradeHandler);
    });
  };
  WebSocketServer.prototype.closeAllConnections = function() {
    this.connections.forEach(function(connection) {
      connection.close();
    });
    this.pendingRequests.forEach(function(request) {
      process.nextTick(function() {
        request.reject(503);
      });
    });
  };
  WebSocketServer.prototype.broadcast = function(data) {
    if (Buffer.isBuffer(data)) {
      this.broadcastBytes(data);
    } else if (typeof data.toString === "function") {
      this.broadcastUTF(data);
    }
  };
  WebSocketServer.prototype.broadcastUTF = function(utfData) {
    this.connections.forEach(function(connection) {
      connection.sendUTF(utfData);
    });
  };
  WebSocketServer.prototype.broadcastBytes = function(binaryData) {
    this.connections.forEach(function(connection) {
      connection.sendBytes(binaryData);
    });
  };
  WebSocketServer.prototype.shutDown = function() {
    this.unmount();
    this.closeAllConnections();
  };
  WebSocketServer.prototype.handleUpgrade = function(request, socket) {
    var self = this;
    var wsRequest = new WebSocketRequest(socket, request, this.config);
    try {
      wsRequest.readHandshake();
    } catch (e) {
      wsRequest.reject(e.httpCode ? e.httpCode : 400, e.message, e.headers);
      debug("Invalid handshake: %s", e.message);
      this.emit("upgradeError", e);
      return;
    }
    this.pendingRequests.push(wsRequest);
    wsRequest.once("requestAccepted", this._handlers.requestAccepted);
    wsRequest.once("requestResolved", this._handlers.requestResolved);
    socket.once("close", function() {
      self._handlers.requestResolved(wsRequest);
    });
    if (!this.config.autoAcceptConnections && utils.eventEmitterListenerCount(this, "request") > 0) {
      this.emit("request", wsRequest);
    } else if (this.config.autoAcceptConnections) {
      wsRequest.accept(wsRequest.requestedProtocols[0], wsRequest.origin);
    } else {
      wsRequest.reject(404, "No handler is configured to accept the connection.");
    }
  };
  WebSocketServer.prototype.handleRequestAccepted = function(connection) {
    var self = this;
    connection.once("close", function(closeReason, description) {
      self.handleConnectionClose(connection, closeReason, description);
    });
    this.connections.push(connection);
    this.emit("connect", connection);
  };
  WebSocketServer.prototype.handleConnectionClose = function(connection, closeReason, description) {
    var index2 = this.connections.indexOf(connection);
    if (index2 !== -1) {
      this.connections.splice(index2, 1);
    }
    this.emit("close", connection, closeReason, description);
  };
  WebSocketServer.prototype.handleRequestResolved = function(request) {
    var index2 = this.pendingRequests.indexOf(request);
    if (index2 !== -1) {
      this.pendingRequests.splice(index2, 1);
    }
  };
  module2.exports = WebSocketServer;
});

// node_modules/websocket/lib/WebSocketClient.js
var require_WebSocketClient = __commonJS((exports, module2) => {
  var utils = require_utils();
  var extend = utils.extend;
  var util = require("util");
  var EventEmitter = require("events").EventEmitter;
  var http2 = require("http");
  var https2 = require("https");
  var url = require("url");
  var crypto = require("crypto");
  var WebSocketConnection = require_WebSocketConnection();
  var bufferAllocUnsafe = utils.bufferAllocUnsafe;
  var protocolSeparators = [
    "(",
    ")",
    "<",
    ">",
    "@",
    ",",
    ";",
    ":",
    "\\",
    '"',
    "/",
    "[",
    "]",
    "?",
    "=",
    "{",
    "}",
    " ",
    String.fromCharCode(9)
  ];
  var excludedTlsOptions = ["hostname", "port", "method", "path", "headers"];
  function WebSocketClient(config) {
    EventEmitter.call(this);
    this.config = {
      maxReceivedFrameSize: 1048576,
      maxReceivedMessageSize: 8388608,
      fragmentOutgoingMessages: true,
      fragmentationThreshold: 16384,
      webSocketVersion: 13,
      assembleFragments: true,
      disableNagleAlgorithm: true,
      closeTimeout: 5e3,
      tlsOptions: {}
    };
    if (config) {
      var tlsOptions;
      if (config.tlsOptions) {
        tlsOptions = config.tlsOptions;
        delete config.tlsOptions;
      } else {
        tlsOptions = {};
      }
      extend(this.config, config);
      extend(this.config.tlsOptions, tlsOptions);
    }
    this._req = null;
    switch (this.config.webSocketVersion) {
      case 8:
      case 13:
        break;
      default:
        throw new Error("Requested webSocketVersion is not supported. Allowed values are 8 and 13.");
    }
  }
  util.inherits(WebSocketClient, EventEmitter);
  WebSocketClient.prototype.connect = function(requestUrl, protocols, origin, headers, extraRequestOptions) {
    var self = this;
    if (typeof protocols === "string") {
      if (protocols.length > 0) {
        protocols = [protocols];
      } else {
        protocols = [];
      }
    }
    if (!(protocols instanceof Array)) {
      protocols = [];
    }
    this.protocols = protocols;
    this.origin = origin;
    if (typeof requestUrl === "string") {
      this.url = url.parse(requestUrl);
    } else {
      this.url = requestUrl;
    }
    if (!this.url.protocol) {
      throw new Error("You must specify a full WebSocket URL, including protocol.");
    }
    if (!this.url.host) {
      throw new Error("You must specify a full WebSocket URL, including hostname. Relative URLs are not supported.");
    }
    this.secure = this.url.protocol === "wss:";
    this.protocols.forEach(function(protocol) {
      for (var i2 = 0; i2 < protocol.length; i2++) {
        var charCode = protocol.charCodeAt(i2);
        var character = protocol.charAt(i2);
        if (charCode < 33 || charCode > 126 || protocolSeparators.indexOf(character) !== -1) {
          throw new Error('Protocol list contains invalid character "' + String.fromCharCode(charCode) + '"');
        }
      }
    });
    var defaultPorts = {
      "ws:": "80",
      "wss:": "443"
    };
    if (!this.url.port) {
      this.url.port = defaultPorts[this.url.protocol];
    }
    var nonce = bufferAllocUnsafe(16);
    for (var i = 0; i < 16; i++) {
      nonce[i] = Math.round(Math.random() * 255);
    }
    this.base64nonce = nonce.toString("base64");
    var hostHeaderValue = this.url.hostname;
    if (this.url.protocol === "ws:" && this.url.port !== "80" || this.url.protocol === "wss:" && this.url.port !== "443") {
      hostHeaderValue += ":" + this.url.port;
    }
    var reqHeaders = {};
    if (this.secure && this.config.tlsOptions.hasOwnProperty("headers")) {
      extend(reqHeaders, this.config.tlsOptions.headers);
    }
    if (headers) {
      extend(reqHeaders, headers);
    }
    extend(reqHeaders, {
      Upgrade: "websocket",
      Connection: "Upgrade",
      "Sec-WebSocket-Version": this.config.webSocketVersion.toString(10),
      "Sec-WebSocket-Key": this.base64nonce,
      Host: reqHeaders.Host || hostHeaderValue
    });
    if (this.protocols.length > 0) {
      reqHeaders["Sec-WebSocket-Protocol"] = this.protocols.join(", ");
    }
    if (this.origin) {
      if (this.config.webSocketVersion === 13) {
        reqHeaders["Origin"] = this.origin;
      } else if (this.config.webSocketVersion === 8) {
        reqHeaders["Sec-WebSocket-Origin"] = this.origin;
      }
    }
    var pathAndQuery;
    if (this.url.pathname) {
      pathAndQuery = this.url.path;
    } else if (this.url.path) {
      pathAndQuery = "/" + this.url.path;
    } else {
      pathAndQuery = "/";
    }
    function handleRequestError(error2) {
      self._req = null;
      self.emit("connectFailed", error2);
    }
    var requestOptions = {
      agent: false
    };
    if (extraRequestOptions) {
      extend(requestOptions, extraRequestOptions);
    }
    extend(requestOptions, {
      hostname: this.url.hostname,
      port: this.url.port,
      method: "GET",
      path: pathAndQuery,
      headers: reqHeaders
    });
    if (this.secure) {
      var tlsOptions = this.config.tlsOptions;
      for (var key in tlsOptions) {
        if (tlsOptions.hasOwnProperty(key) && excludedTlsOptions.indexOf(key) === -1) {
          requestOptions[key] = tlsOptions[key];
        }
      }
    }
    var req = this._req = (this.secure ? https2 : http2).request(requestOptions);
    req.on("upgrade", function handleRequestUpgrade(response, socket, head) {
      self._req = null;
      req.removeListener("error", handleRequestError);
      self.socket = socket;
      self.response = response;
      self.firstDataChunk = head;
      self.validateHandshake();
    });
    req.on("error", handleRequestError);
    req.on("response", function(response) {
      self._req = null;
      if (utils.eventEmitterListenerCount(self, "httpResponse") > 0) {
        self.emit("httpResponse", response, self);
        if (response.socket) {
          response.socket.end();
        }
      } else {
        var headerDumpParts = [];
        for (var headerName in response.headers) {
          headerDumpParts.push(headerName + ": " + response.headers[headerName]);
        }
        self.failHandshake("Server responded with a non-101 status: " + response.statusCode + " " + response.statusMessage + "\nResponse Headers Follow:\n" + headerDumpParts.join("\n") + "\n");
      }
    });
    req.end();
  };
  WebSocketClient.prototype.validateHandshake = function() {
    var headers = this.response.headers;
    if (this.protocols.length > 0) {
      this.protocol = headers["sec-websocket-protocol"];
      if (this.protocol) {
        if (this.protocols.indexOf(this.protocol) === -1) {
          this.failHandshake("Server did not respond with a requested protocol.");
          return;
        }
      } else {
        this.failHandshake("Expected a Sec-WebSocket-Protocol header.");
        return;
      }
    }
    if (!(headers["connection"] && headers["connection"].toLocaleLowerCase() === "upgrade")) {
      this.failHandshake("Expected a Connection: Upgrade header from the server");
      return;
    }
    if (!(headers["upgrade"] && headers["upgrade"].toLocaleLowerCase() === "websocket")) {
      this.failHandshake("Expected an Upgrade: websocket header from the server");
      return;
    }
    var sha1 = crypto.createHash("sha1");
    sha1.update(this.base64nonce + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    var expectedKey = sha1.digest("base64");
    if (!headers["sec-websocket-accept"]) {
      this.failHandshake("Expected Sec-WebSocket-Accept header from server");
      return;
    }
    if (headers["sec-websocket-accept"] !== expectedKey) {
      this.failHandshake("Sec-WebSocket-Accept header from server didn't match expected value of " + expectedKey);
      return;
    }
    this.succeedHandshake();
  };
  WebSocketClient.prototype.failHandshake = function(errorDescription) {
    if (this.socket && this.socket.writable) {
      this.socket.end();
    }
    this.emit("connectFailed", new Error(errorDescription));
  };
  WebSocketClient.prototype.succeedHandshake = function() {
    var connection = new WebSocketConnection(this.socket, [], this.protocol, true, this.config);
    connection.webSocketVersion = this.config.webSocketVersion;
    connection._addSocketEventListeners();
    this.emit("connect", connection);
    if (this.firstDataChunk.length > 0) {
      connection.handleSocketData(this.firstDataChunk);
    }
    this.firstDataChunk = null;
  };
  WebSocketClient.prototype.abort = function() {
    if (this._req) {
      this._req.abort();
    }
  };
  module2.exports = WebSocketClient;
});

// node_modules/websocket/lib/WebSocketRouterRequest.js
var require_WebSocketRouterRequest = __commonJS((exports, module2) => {
  var util = require("util");
  var EventEmitter = require("events").EventEmitter;
  function WebSocketRouterRequest(webSocketRequest, resolvedProtocol) {
    EventEmitter.call(this);
    this.webSocketRequest = webSocketRequest;
    if (resolvedProtocol === "____no_protocol____") {
      this.protocol = null;
    } else {
      this.protocol = resolvedProtocol;
    }
    this.origin = webSocketRequest.origin;
    this.resource = webSocketRequest.resource;
    this.resourceURL = webSocketRequest.resourceURL;
    this.httpRequest = webSocketRequest.httpRequest;
    this.remoteAddress = webSocketRequest.remoteAddress;
    this.webSocketVersion = webSocketRequest.webSocketVersion;
    this.requestedExtensions = webSocketRequest.requestedExtensions;
    this.cookies = webSocketRequest.cookies;
  }
  util.inherits(WebSocketRouterRequest, EventEmitter);
  WebSocketRouterRequest.prototype.accept = function(origin, cookies) {
    var connection = this.webSocketRequest.accept(this.protocol, origin, cookies);
    this.emit("requestAccepted", connection);
    return connection;
  };
  WebSocketRouterRequest.prototype.reject = function(status, reason, extraHeaders) {
    this.webSocketRequest.reject(status, reason, extraHeaders);
    this.emit("requestRejected", this);
  };
  module2.exports = WebSocketRouterRequest;
});

// node_modules/websocket/lib/WebSocketRouter.js
var require_WebSocketRouter = __commonJS((exports, module2) => {
  var extend = require_utils().extend;
  var util = require("util");
  var EventEmitter = require("events").EventEmitter;
  var WebSocketRouterRequest = require_WebSocketRouterRequest();
  function WebSocketRouter(config) {
    EventEmitter.call(this);
    this.config = {
      server: null
    };
    if (config) {
      extend(this.config, config);
    }
    this.handlers = [];
    this._requestHandler = this.handleRequest.bind(this);
    if (this.config.server) {
      this.attachServer(this.config.server);
    }
  }
  util.inherits(WebSocketRouter, EventEmitter);
  WebSocketRouter.prototype.attachServer = function(server) {
    if (server) {
      this.server = server;
      this.server.on("request", this._requestHandler);
    } else {
      throw new Error("You must specify a WebSocketServer instance to attach to.");
    }
  };
  WebSocketRouter.prototype.detachServer = function() {
    if (this.server) {
      this.server.removeListener("request", this._requestHandler);
      this.server = null;
    } else {
      throw new Error("Cannot detach from server: not attached.");
    }
  };
  WebSocketRouter.prototype.mount = function(path, protocol, callback) {
    if (!path) {
      throw new Error("You must specify a path for this handler.");
    }
    if (!protocol) {
      protocol = "____no_protocol____";
    }
    if (!callback) {
      throw new Error("You must specify a callback for this handler.");
    }
    path = this.pathToRegExp(path);
    if (!(path instanceof RegExp)) {
      throw new Error("Path must be specified as either a string or a RegExp.");
    }
    var pathString = path.toString();
    protocol = protocol.toLocaleLowerCase();
    if (this.findHandlerIndex(pathString, protocol) !== -1) {
      throw new Error("You may only mount one handler per path/protocol combination.");
    }
    this.handlers.push({
      path,
      pathString,
      protocol,
      callback
    });
  };
  WebSocketRouter.prototype.unmount = function(path, protocol) {
    var index2 = this.findHandlerIndex(this.pathToRegExp(path).toString(), protocol);
    if (index2 !== -1) {
      this.handlers.splice(index2, 1);
    } else {
      throw new Error("Unable to find a route matching the specified path and protocol.");
    }
  };
  WebSocketRouter.prototype.findHandlerIndex = function(pathString, protocol) {
    protocol = protocol.toLocaleLowerCase();
    for (var i = 0, len = this.handlers.length; i < len; i++) {
      var handler2 = this.handlers[i];
      if (handler2.pathString === pathString && handler2.protocol === protocol) {
        return i;
      }
    }
    return -1;
  };
  WebSocketRouter.prototype.pathToRegExp = function(path) {
    if (typeof path === "string") {
      if (path === "*") {
        path = /^.*$/;
      } else {
        path = path.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        path = new RegExp("^" + path + "$");
      }
    }
    return path;
  };
  WebSocketRouter.prototype.handleRequest = function(request) {
    var requestedProtocols = request.requestedProtocols;
    if (requestedProtocols.length === 0) {
      requestedProtocols = ["____no_protocol____"];
    }
    for (var i = 0; i < requestedProtocols.length; i++) {
      var requestedProtocol = requestedProtocols[i].toLocaleLowerCase();
      for (var j = 0, len = this.handlers.length; j < len; j++) {
        var handler2 = this.handlers[j];
        if (handler2.path.test(request.resourceURL.pathname)) {
          if (requestedProtocol === handler2.protocol || handler2.protocol === "*") {
            var routerRequest = new WebSocketRouterRequest(request, requestedProtocol);
            handler2.callback(routerRequest);
            return;
          }
        }
      }
    }
    request.reject(404, "No handler is available for the given request.");
  };
  module2.exports = WebSocketRouter;
});

// node_modules/is-typedarray/index.js
var require_is_typedarray = __commonJS((exports, module2) => {
  module2.exports = isTypedArray;
  isTypedArray.strict = isStrictTypedArray;
  isTypedArray.loose = isLooseTypedArray;
  var toString = Object.prototype.toString;
  var names = {
    "[object Int8Array]": true,
    "[object Int16Array]": true,
    "[object Int32Array]": true,
    "[object Uint8Array]": true,
    "[object Uint8ClampedArray]": true,
    "[object Uint16Array]": true,
    "[object Uint32Array]": true,
    "[object Float32Array]": true,
    "[object Float64Array]": true
  };
  function isTypedArray(arr) {
    return isStrictTypedArray(arr) || isLooseTypedArray(arr);
  }
  function isStrictTypedArray(arr) {
    return arr instanceof Int8Array || arr instanceof Int16Array || arr instanceof Int32Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Uint16Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array;
  }
  function isLooseTypedArray(arr) {
    return names[toString.call(arr)];
  }
});

// node_modules/typedarray-to-buffer/index.js
var require_typedarray_to_buffer = __commonJS((exports, module2) => {
  var isTypedArray = require_is_typedarray().strict;
  module2.exports = function typedarrayToBuffer(arr) {
    if (isTypedArray(arr)) {
      var buf = Buffer.from(arr.buffer);
      if (arr.byteLength !== arr.buffer.byteLength) {
        buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
      }
      return buf;
    } else {
      return Buffer.from(arr);
    }
  };
});

// node_modules/yaeti/lib/EventTarget.js
var require_EventTarget = __commonJS((exports, module2) => {
  module2.exports = _EventTarget;
  function _EventTarget() {
    if (typeof this.addEventListener === "function") {
      return;
    }
    this._listeners = {};
    this.addEventListener = _addEventListener;
    this.removeEventListener = _removeEventListener;
    this.dispatchEvent = _dispatchEvent;
  }
  Object.defineProperties(_EventTarget.prototype, {
    listeners: {
      get: function() {
        return this._listeners;
      }
    }
  });
  function _addEventListener(type, newListener) {
    var listenersType, i, listener;
    if (!type || !newListener) {
      return;
    }
    listenersType = this._listeners[type];
    if (listenersType === void 0) {
      this._listeners[type] = listenersType = [];
    }
    for (i = 0; !!(listener = listenersType[i]); i++) {
      if (listener === newListener) {
        return;
      }
    }
    listenersType.push(newListener);
  }
  function _removeEventListener(type, oldListener) {
    var listenersType, i, listener;
    if (!type || !oldListener) {
      return;
    }
    listenersType = this._listeners[type];
    if (listenersType === void 0) {
      return;
    }
    for (i = 0; !!(listener = listenersType[i]); i++) {
      if (listener === oldListener) {
        listenersType.splice(i, 1);
        break;
      }
    }
    if (listenersType.length === 0) {
      delete this._listeners[type];
    }
  }
  function _dispatchEvent(event) {
    var type, listenersType, dummyListener, stopImmediatePropagation = false, i, listener;
    if (!event || typeof event.type !== "string") {
      throw new Error("`event` must have a valid `type` property");
    }
    if (event._yaeti) {
      event.target = this;
      event.cancelable = true;
    }
    try {
      event.stopImmediatePropagation = function() {
        stopImmediatePropagation = true;
      };
    } catch (error2) {
    }
    type = event.type;
    listenersType = this._listeners[type] || [];
    dummyListener = this["on" + type];
    if (typeof dummyListener === "function") {
      dummyListener.call(this, event);
    }
    for (i = 0; !!(listener = listenersType[i]); i++) {
      if (stopImmediatePropagation) {
        break;
      }
      listener.call(this, event);
    }
    return !event.defaultPrevented;
  }
});

// node_modules/yaeti/lib/Event.js
var require_Event = __commonJS((exports, module2) => {
  module2.exports = _Event;
  function _Event(type) {
    this.type = type;
    this.isTrusted = false;
    this._yaeti = true;
  }
});

// node_modules/yaeti/index.js
var require_yaeti = __commonJS((exports, module2) => {
  module2.exports = {
    EventTarget: require_EventTarget(),
    Event: require_Event()
  };
});

// node_modules/websocket/lib/W3CWebSocket.js
var require_W3CWebSocket = __commonJS((exports, module2) => {
  var WebSocketClient = require_WebSocketClient();
  var toBuffer = require_typedarray_to_buffer();
  var yaeti = require_yaeti();
  var CONNECTING = 0;
  var OPEN = 1;
  var CLOSING = 2;
  var CLOSED = 3;
  module2.exports = W3CWebSocket;
  function W3CWebSocket(url, protocols, origin, headers, requestOptions, clientConfig) {
    yaeti.EventTarget.call(this);
    clientConfig = clientConfig || {};
    clientConfig.assembleFragments = true;
    var self = this;
    this._url = url;
    this._readyState = CONNECTING;
    this._protocol = void 0;
    this._extensions = "";
    this._bufferedAmount = 0;
    this._binaryType = "arraybuffer";
    this._connection = void 0;
    this._client = new WebSocketClient(clientConfig);
    this._client.on("connect", function(connection) {
      onConnect.call(self, connection);
    });
    this._client.on("connectFailed", function() {
      onConnectFailed.call(self);
    });
    this._client.connect(url, protocols, origin, headers, requestOptions);
  }
  Object.defineProperties(W3CWebSocket.prototype, {
    url: {get: function() {
      return this._url;
    }},
    readyState: {get: function() {
      return this._readyState;
    }},
    protocol: {get: function() {
      return this._protocol;
    }},
    extensions: {get: function() {
      return this._extensions;
    }},
    bufferedAmount: {get: function() {
      return this._bufferedAmount;
    }}
  });
  Object.defineProperties(W3CWebSocket.prototype, {
    binaryType: {
      get: function() {
        return this._binaryType;
      },
      set: function(type) {
        if (type !== "arraybuffer") {
          throw new SyntaxError('just "arraybuffer" type allowed for "binaryType" attribute');
        }
        this._binaryType = type;
      }
    }
  });
  [["CONNECTING", CONNECTING], ["OPEN", OPEN], ["CLOSING", CLOSING], ["CLOSED", CLOSED]].forEach(function(property) {
    Object.defineProperty(W3CWebSocket.prototype, property[0], {
      get: function() {
        return property[1];
      }
    });
  });
  [["CONNECTING", CONNECTING], ["OPEN", OPEN], ["CLOSING", CLOSING], ["CLOSED", CLOSED]].forEach(function(property) {
    Object.defineProperty(W3CWebSocket, property[0], {
      get: function() {
        return property[1];
      }
    });
  });
  W3CWebSocket.prototype.send = function(data) {
    if (this._readyState !== OPEN) {
      throw new Error("cannot call send() while not connected");
    }
    if (typeof data === "string" || data instanceof String) {
      this._connection.sendUTF(data);
    } else {
      if (data instanceof Buffer) {
        this._connection.sendBytes(data);
      } else if (data.byteLength || data.byteLength === 0) {
        data = toBuffer(data);
        this._connection.sendBytes(data);
      } else {
        throw new Error("unknown binary data:", data);
      }
    }
  };
  W3CWebSocket.prototype.close = function(code, reason) {
    switch (this._readyState) {
      case CONNECTING:
        onConnectFailed.call(this);
        this._client.on("connect", function(connection) {
          if (code) {
            connection.close(code, reason);
          } else {
            connection.close();
          }
        });
        break;
      case OPEN:
        this._readyState = CLOSING;
        if (code) {
          this._connection.close(code, reason);
        } else {
          this._connection.close();
        }
        break;
      case CLOSING:
      case CLOSED:
        break;
    }
  };
  function createCloseEvent(code, reason) {
    var event = new yaeti.Event("close");
    event.code = code;
    event.reason = reason;
    event.wasClean = typeof code === "undefined" || code === 1e3;
    return event;
  }
  function createMessageEvent(data) {
    var event = new yaeti.Event("message");
    event.data = data;
    return event;
  }
  function onConnect(connection) {
    var self = this;
    this._readyState = OPEN;
    this._connection = connection;
    this._protocol = connection.protocol;
    this._extensions = connection.extensions;
    this._connection.on("close", function(code, reason) {
      onClose.call(self, code, reason);
    });
    this._connection.on("message", function(msg) {
      onMessage.call(self, msg);
    });
    this.dispatchEvent(new yaeti.Event("open"));
  }
  function onConnectFailed() {
    destroy.call(this);
    this._readyState = CLOSED;
    try {
      this.dispatchEvent(new yaeti.Event("error"));
    } finally {
      this.dispatchEvent(createCloseEvent(1006, "connection failed"));
    }
  }
  function onClose(code, reason) {
    destroy.call(this);
    this._readyState = CLOSED;
    this.dispatchEvent(createCloseEvent(code, reason || ""));
  }
  function onMessage(message) {
    if (message.utf8Data) {
      this.dispatchEvent(createMessageEvent(message.utf8Data));
    } else if (message.binaryData) {
      if (this.binaryType === "arraybuffer") {
        var buffer = message.binaryData;
        var arraybuffer = new ArrayBuffer(buffer.length);
        var view = new Uint8Array(arraybuffer);
        for (var i = 0, len = buffer.length; i < len; ++i) {
          view[i] = buffer[i];
        }
        this.dispatchEvent(createMessageEvent(arraybuffer));
      }
    }
  }
  function destroy() {
    this._client.removeAllListeners();
    if (this._connection) {
      this._connection.removeAllListeners();
    }
  }
});

// node_modules/websocket/lib/Deprecation.js
var require_Deprecation = __commonJS((exports, module2) => {
  var Deprecation = {
    disableWarnings: false,
    deprecationWarningMap: {},
    warn: function(deprecationName) {
      if (!this.disableWarnings && this.deprecationWarningMap[deprecationName]) {
        console.warn("DEPRECATION WARNING: " + this.deprecationWarningMap[deprecationName]);
        this.deprecationWarningMap[deprecationName] = false;
      }
    }
  };
  module2.exports = Deprecation;
});

// node_modules/websocket/package.json
var require_package = __commonJS((exports, module2) => {
  module2.exports = {
    name: "websocket",
    description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
    keywords: [
      "websocket",
      "websockets",
      "socket",
      "networking",
      "comet",
      "push",
      "RFC-6455",
      "realtime",
      "server",
      "client"
    ],
    author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
    contributors: [
      "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
    ],
    version: "1.0.34",
    repository: {
      type: "git",
      url: "https://github.com/theturtle32/WebSocket-Node.git"
    },
    homepage: "https://github.com/theturtle32/WebSocket-Node",
    engines: {
      node: ">=4.0.0"
    },
    dependencies: {
      bufferutil: "^4.0.1",
      debug: "^2.2.0",
      "es5-ext": "^0.10.50",
      "typedarray-to-buffer": "^3.1.5",
      "utf-8-validate": "^5.0.2",
      yaeti: "^0.0.6"
    },
    devDependencies: {
      "buffer-equal": "^1.0.0",
      gulp: "^4.0.2",
      "gulp-jshint": "^2.0.4",
      "jshint-stylish": "^2.2.1",
      jshint: "^2.0.0",
      tape: "^4.9.1"
    },
    config: {
      verbose: false
    },
    scripts: {
      test: "tape test/unit/*.js",
      gulp: "gulp"
    },
    main: "index",
    directories: {
      lib: "./lib"
    },
    browser: "lib/browser.js",
    license: "Apache-2.0"
  };
});

// node_modules/websocket/lib/version.js
var require_version = __commonJS((exports, module2) => {
  module2.exports = require_package().version;
});

// node_modules/websocket/lib/websocket.js
var require_websocket = __commonJS((exports, module2) => {
  module2.exports = {
    server: require_WebSocketServer(),
    client: require_WebSocketClient(),
    router: require_WebSocketRouter(),
    frame: require_WebSocketFrame(),
    request: require_WebSocketRequest(),
    connection: require_WebSocketConnection(),
    w3cwebsocket: require_W3CWebSocket(),
    deprecation: require_Deprecation(),
    version: require_version()
  };
});

// node_modules/websocket/index.js
var require_websocket2 = __commonJS((exports, module2) => {
  module2.exports = require_websocket();
});

// node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js
var require_RealtimeClient = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var constants_1 = require_constants3();
  var timer_1 = __importDefault(require_timer());
  var RealtimeSubscription_1 = __importDefault(require_RealtimeSubscription());
  var websocket_1 = require_websocket2();
  var noop3 = () => {
  };
  var RealtimeClient = class {
    constructor(endPoint, options2) {
      this.channels = [];
      this.endPoint = "";
      this.headers = {};
      this.params = {};
      this.timeout = constants_1.DEFAULT_TIMEOUT;
      this.transport = websocket_1.w3cwebsocket;
      this.heartbeatIntervalMs = 3e4;
      this.longpollerTimeout = 2e4;
      this.heartbeatTimer = void 0;
      this.pendingHeartbeatRef = null;
      this.ref = 0;
      this.logger = noop3;
      this.conn = null;
      this.sendBuffer = [];
      this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: []
      };
      this.endPoint = `${endPoint}/${constants_1.TRANSPORTS.websocket}`;
      if (options2 === null || options2 === void 0 ? void 0 : options2.params)
        this.params = options2.params;
      if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
        this.headers = options2.headers;
      if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
        this.timeout = options2.timeout;
      if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
        this.logger = options2.logger;
      if (options2 === null || options2 === void 0 ? void 0 : options2.transport)
        this.transport = options2.transport;
      if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
        this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
      if (options2 === null || options2 === void 0 ? void 0 : options2.longpollerTimeout)
        this.longpollerTimeout = options2.longpollerTimeout;
      this.reconnectAfterMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAfterMs) ? options2.reconnectAfterMs : (tries) => {
        return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
      };
      this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode) ? options2.encode : (payload, callback) => {
        return callback(JSON.stringify(payload));
      };
      this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode) ? options2.decode : (payload, callback) => {
        return callback(JSON.parse(payload));
      };
      this.reconnectTimer = new timer_1.default(() => __awaiter(this, void 0, void 0, function* () {
        yield this.disconnect();
        this.connect();
      }), this.reconnectAfterMs);
    }
    connect() {
      if (this.conn) {
        return;
      }
      this.conn = new this.transport(this.endPointURL(), [], null, this.headers);
      if (this.conn) {
        this.conn.onopen = () => this._onConnOpen();
        this.conn.onerror = (error2) => this._onConnError(error2);
        this.conn.onmessage = (event) => this.onConnMessage(event);
        this.conn.onclose = (event) => this._onConnClose(event);
      }
    }
    disconnect(code, reason) {
      return new Promise((resolve2, _reject) => {
        try {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            if (code) {
              this.conn.close(code, reason || "");
            } else {
              this.conn.close();
            }
            this.conn = null;
          }
          resolve2({error: null, data: true});
        } catch (error2) {
          resolve2({error: error2, data: false});
        }
      });
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    onOpen(callback) {
      this.stateChangeCallbacks.open.push(callback);
    }
    onClose(callback) {
      this.stateChangeCallbacks.close.push(callback);
    }
    onError(callback) {
      this.stateChangeCallbacks.error.push(callback);
    }
    onMessage(callback) {
      this.stateChangeCallbacks.message.push(callback);
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case constants_1.SOCKET_STATES.connecting:
          return "connecting";
        case constants_1.SOCKET_STATES.open:
          return "open";
        case constants_1.SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    channel(topic, chanParams = {}) {
      let chan = new RealtimeSubscription_1.default(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      let {topic, event, payload, ref} = data;
      let callback = () => {
        this.encode(data, (result) => {
          var _a;
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
        });
      };
      this.log("push", `${topic} ${event} (${ref})`, payload);
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let {topic, event, payload, ref} = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
        }
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        this.channels.filter((channel) => channel.isMember(topic)).forEach((channel) => channel.trigger(event, payload, ref));
        this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
      });
    }
    endPointURL() {
      return this._appendParams(this.endPoint, Object.assign({}, this.params, {vsn: constants_1.VSN}));
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    _onConnOpen() {
      this.log("transport", `connected to ${this.endPointURL()}`);
      this._flushSendBuffer();
      this.reconnectTimer.reset();
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
      this.stateChangeCallbacks.open.forEach((callback) => callback());
    }
    _onConnClose(event) {
      this.log("transport", "close", event);
      this._triggerChanError();
      clearInterval(this.heartbeatTimer);
      this.reconnectTimer.scheduleTimeout();
      this.stateChangeCallbacks.close.forEach((callback) => callback(event));
    }
    _onConnError(error2) {
      this.log("transport", error2.message);
      this._triggerChanError();
      this.stateChangeCallbacks.error.forEach((callback) => callback(error2));
    }
    _triggerChanError() {
      this.channels.forEach((channel) => channel.trigger(constants_1.CHANNEL_EVENTS.error));
    }
    _appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      const prefix = url.match(/\?/) ? "&" : "?";
      const query = new URLSearchParams(params);
      return `${url}${prefix}${query}`;
    }
    _flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    _sendHeartbeat() {
      var _a;
      if (!this.isConnected()) {
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(constants_1.WS_CLOSE_NORMAL, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef
      });
    }
  };
  exports.default = RealtimeClient;
});

// node_modules/@supabase/realtime-js/dist/main/index.js
var require_main3 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {enumerable: true, value: v});
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Transformers = exports.RealtimeSubscription = exports.RealtimeClient = void 0;
  var Transformers = __importStar(require_transformers());
  exports.Transformers = Transformers;
  var RealtimeClient_1 = __importDefault(require_RealtimeClient());
  exports.RealtimeClient = RealtimeClient_1.default;
  var RealtimeSubscription_1 = __importDefault(require_RealtimeSubscription());
  exports.RealtimeSubscription = RealtimeSubscription_1.default;
});

// node_modules/@supabase/supabase-js/dist/main/lib/SupabaseRealtimeClient.js
var require_SupabaseRealtimeClient = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SupabaseRealtimeClient = void 0;
  var realtime_js_1 = require_main3();
  var SupabaseRealtimeClient = class {
    constructor(socket, schema, tableName) {
      const topic = tableName === "*" ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
      this.subscription = socket.channel(topic);
    }
    getPayloadRecords(payload) {
      const records = {
        new: {},
        old: {}
      };
      if (payload.type === "INSERT" || payload.type === "UPDATE") {
        records.new = realtime_js_1.Transformers.convertChangeData(payload.columns, payload.record);
      }
      if (payload.type === "UPDATE" || payload.type === "DELETE") {
        records.old = realtime_js_1.Transformers.convertChangeData(payload.columns, payload.old_record);
      }
      return records;
    }
    on(event, callback) {
      this.subscription.on(event, (payload) => {
        let enrichedPayload = {
          schema: payload.schema,
          table: payload.table,
          commit_timestamp: payload.commit_timestamp,
          eventType: payload.type,
          new: {},
          old: {}
        };
        enrichedPayload = Object.assign(Object.assign({}, enrichedPayload), this.getPayloadRecords(payload));
        callback(enrichedPayload);
      });
      return this;
    }
    subscribe(callback = () => {
    }) {
      this.subscription.onError((e) => callback("SUBSCRIPTION_ERROR", e));
      this.subscription.onClose(() => callback("CLOSED"));
      this.subscription.subscribe().receive("ok", () => callback("SUBSCRIBED")).receive("error", (e) => callback("SUBSCRIPTION_ERROR", e)).receive("timeout", () => callback("RETRYING_AFTER_TIMEOUT"));
      return this.subscription;
    }
  };
  exports.SupabaseRealtimeClient = SupabaseRealtimeClient;
});

// node_modules/@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder.js
var require_SupabaseQueryBuilder = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SupabaseQueryBuilder = void 0;
  var postgrest_js_1 = require_main2();
  var SupabaseRealtimeClient_1 = require_SupabaseRealtimeClient();
  var SupabaseQueryBuilder = class extends postgrest_js_1.PostgrestQueryBuilder {
    constructor(url, {headers = {}, schema, realtime, table}) {
      super(url, {headers, schema});
      this._subscription = new SupabaseRealtimeClient_1.SupabaseRealtimeClient(realtime, schema, table);
      this._realtime = realtime;
    }
    on(event, callback) {
      if (!this._realtime.isConnected()) {
        this._realtime.connect();
      }
      return this._subscription.on(event, callback);
    }
  };
  exports.SupabaseQueryBuilder = SupabaseQueryBuilder;
});

// node_modules/@supabase/storage-js/dist/main/lib/fetch.js
var require_fetch2 = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.remove = exports.put = exports.post = exports.get = void 0;
  var cross_fetch_1 = __importDefault(require_node_ponyfill());
  var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var handleError = (error2, reject) => {
    if (typeof error2.json !== "function") {
      return reject(error2);
    }
    error2.json().then((err) => {
      return reject({
        message: _getErrorMessage(err),
        status: (error2 === null || error2 === void 0 ? void 0 : error2.status) || 500
      });
    });
  };
  var _getRequestParams = (method, options2, parameters, body) => {
    const params = {method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {}};
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({"Content-Type": "application/json"}, options2 === null || options2 === void 0 ? void 0 : options2.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
  };
  function _handleRequest(method, url, options2, parameters, body) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve2, reject) => {
        cross_fetch_1.default(url, _getRequestParams(method, options2, parameters, body)).then((result) => {
          if (!result.ok)
            throw result;
          if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
            return resolve2(result);
          return result.json();
        }).then((data) => resolve2(data)).catch((error2) => handleError(error2, reject));
      });
    });
  }
  function get(url, options2, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("GET", url, options2, parameters);
    });
  }
  exports.get = get;
  function post(url, body, options2, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("POST", url, options2, parameters, body);
    });
  }
  exports.post = post;
  function put(url, body, options2, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("PUT", url, options2, parameters, body);
    });
  }
  exports.put = put;
  function remove(url, body, options2, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("DELETE", url, options2, parameters, body);
    });
  }
  exports.remove = remove;
});

// node_modules/@supabase/storage-js/dist/main/lib/StorageBucketApi.js
var require_StorageBucketApi = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.StorageBucketApi = void 0;
  var fetch_1 = require_fetch2();
  var StorageBucketApi = class {
    constructor(url, headers = {}) {
      this.url = url;
      this.headers = headers;
    }
    listBuckets() {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.get(`${this.url}/bucket`, {headers: this.headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    getBucket(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.get(`${this.url}/bucket/${id}`, {headers: this.headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    createBucket(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.post(`${this.url}/bucket`, {id, name: id}, {headers: this.headers});
          return {data: data.name, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    emptyBucket(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.post(`${this.url}/bucket/${id}/empty`, {}, {headers: this.headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    deleteBucket(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.remove(`${this.url}/bucket/${id}`, {}, {headers: this.headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
  };
  exports.StorageBucketApi = StorageBucketApi;
});

// node_modules/@supabase/storage-js/dist/main/lib/helpers.js
var require_helpers2 = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.isBrowser = void 0;
  exports.isBrowser = () => typeof window !== "undefined";
});

// node_modules/@supabase/storage-js/dist/main/lib/StorageFileApi.js
var require_StorageFileApi = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.StorageFileApi = void 0;
  var fetch_1 = require_fetch2();
  var helpers_1 = require_helpers2();
  var DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
      column: "name",
      order: "asc"
    }
  };
  var DEFAULT_FILE_OPTIONS = {
    cacheControl: "3600"
  };
  var StorageFileApi = class {
    constructor(url, headers = {}, bucketId) {
      this.url = url;
      this.headers = headers;
      this.bucketId = bucketId;
    }
    upload(path, file, fileOptions) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!helpers_1.isBrowser())
            throw new Error("No browser detected.");
          const formData = new FormData();
          formData.append("", file, file.name);
          const options2 = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
          formData.append("cacheControl", options2.cacheControl);
          const _path = this._getFinalPath(path);
          const res = yield fetch(`${this.url}/object/${_path}`, {
            method: "POST",
            body: formData,
            headers: Object.assign({}, this.headers)
          });
          if (res.ok) {
            return {data: {Key: _path}, error: null};
          } else {
            const error2 = yield res.json();
            return {data: null, error: error2};
          }
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    update(path, file, fileOptions) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!helpers_1.isBrowser())
            throw new Error("No browser detected.");
          const formData = new FormData();
          formData.append("", file, file.name);
          const options2 = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
          formData.append("cacheControl", options2.cacheControl);
          const _path = this._getFinalPath(path);
          const res = yield fetch(`${this.url}/object/${_path}`, {
            method: "PUT",
            body: formData,
            headers: Object.assign({}, this.headers)
          });
          if (res.ok) {
            return {data: {Key: _path}, error: null};
          } else {
            const error2 = yield res.json();
            return {data: null, error: error2};
          }
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    move(fromPath, toPath) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.post(`${this.url}/object/move`, {bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath}, {headers: this.headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    createSignedUrl(path, expiresIn) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const _path = this._getFinalPath(path);
          let data = yield fetch_1.post(`${this.url}/object/sign/${_path}`, {expiresIn}, {headers: this.headers});
          const signedURL = `${this.url}${data.signedURL}`;
          data = {signedURL};
          return {data, error: null, signedURL};
        } catch (error2) {
          return {data: null, error: error2, signedURL: null};
        }
      });
    }
    download(path) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const _path = this._getFinalPath(path);
          const res = yield fetch_1.get(`${this.url}/object/${_path}`, {
            headers: this.headers,
            noResolveJson: true
          });
          const data = yield res.blob();
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    remove(paths) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const data = yield fetch_1.remove(`${this.url}/object/${this.bucketId}`, {prefixes: paths}, {headers: this.headers});
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    list(path, options2, parameters) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options2), {prefix: path || ""});
          const data = yield fetch_1.post(`${this.url}/object/list/${this.bucketId}`, body, {headers: this.headers}, parameters);
          return {data, error: null};
        } catch (error2) {
          return {data: null, error: error2};
        }
      });
    }
    _getFinalPath(path) {
      return `${this.bucketId}/${path}`;
    }
  };
  exports.StorageFileApi = StorageFileApi;
});

// node_modules/@supabase/storage-js/dist/main/lib/types.js
var require_types3 = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
});

// node_modules/@supabase/storage-js/dist/main/lib/index.js
var require_lib2 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  __exportStar(require_StorageBucketApi(), exports);
  __exportStar(require_StorageFileApi(), exports);
  __exportStar(require_types3(), exports);
});

// node_modules/@supabase/storage-js/dist/main/SupabaseStorageClient.js
var require_SupabaseStorageClient = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SupabaseStorageClient = void 0;
  var lib_1 = require_lib2();
  var SupabaseStorageClient = class extends lib_1.StorageBucketApi {
    constructor(url, headers = {}) {
      super(url, headers);
    }
    from(id) {
      return new lib_1.StorageFileApi(this.url, this.headers, id);
    }
  };
  exports.SupabaseStorageClient = SupabaseStorageClient;
});

// node_modules/@supabase/storage-js/dist/main/index.js
var require_main4 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SupabaseStorageClient = void 0;
  var SupabaseStorageClient_1 = require_SupabaseStorageClient();
  Object.defineProperty(exports, "SupabaseStorageClient", {enumerable: true, get: function() {
    return SupabaseStorageClient_1.SupabaseStorageClient;
  }});
  __exportStar(require_types3(), exports);
});

// node_modules/@supabase/supabase-js/dist/main/SupabaseClient.js
var require_SupabaseClient = __commonJS((exports) => {
  "use strict";
  var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var constants_1 = require_constants();
  var SupabaseAuthClient_1 = require_SupabaseAuthClient();
  var SupabaseQueryBuilder_1 = require_SupabaseQueryBuilder();
  var storage_js_1 = require_main4();
  var postgrest_js_1 = require_main2();
  var realtime_js_1 = require_main3();
  var DEFAULT_OPTIONS = {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    localStorage: globalThis.localStorage,
    headers: constants_1.DEFAULT_HEADERS
  };
  var SupabaseClient = class {
    constructor(supabaseUrl, supabaseKey, options2) {
      this.supabaseUrl = supabaseUrl;
      this.supabaseKey = supabaseKey;
      if (!supabaseUrl)
        throw new Error("supabaseUrl is required.");
      if (!supabaseKey)
        throw new Error("supabaseKey is required.");
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
      this.restUrl = `${supabaseUrl}/rest/v1`;
      this.realtimeUrl = `${supabaseUrl}/realtime/v1`.replace("http", "ws");
      this.authUrl = `${supabaseUrl}/auth/v1`;
      this.storageUrl = `${supabaseUrl}/storage/v1`;
      this.schema = settings.schema;
      this.auth = this._initSupabaseAuthClient(settings);
      this.realtime = this._initRealtimeClient();
    }
    get storage() {
      return new storage_js_1.SupabaseStorageClient(this.storageUrl, this._getAuthHeaders());
    }
    from(table) {
      const url = `${this.restUrl}/${table}`;
      return new SupabaseQueryBuilder_1.SupabaseQueryBuilder(url, {
        headers: this._getAuthHeaders(),
        schema: this.schema,
        realtime: this.realtime,
        table
      });
    }
    rpc(fn, params) {
      const rest = this._initPostgRESTClient();
      return rest.rpc(fn, params);
    }
    removeSubscription(subscription) {
      return new Promise((resolve2) => __awaiter(this, void 0, void 0, function* () {
        try {
          yield this._closeSubscription(subscription);
          const openSubscriptions = this.getSubscriptions().length;
          if (!openSubscriptions) {
            const {error: error2} = yield this.realtime.disconnect();
            if (error2)
              return resolve2({error: error2});
          }
          return resolve2({error: null, data: {openSubscriptions}});
        } catch (error2) {
          return resolve2({error: error2});
        }
      }));
    }
    _closeSubscription(subscription) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!subscription.isClosed()) {
          yield this._closeChannel(subscription);
        }
      });
    }
    getSubscriptions() {
      return this.realtime.channels;
    }
    _initSupabaseAuthClient({autoRefreshToken, persistSession, detectSessionInUrl, localStorage}) {
      return new SupabaseAuthClient_1.SupabaseAuthClient({
        url: this.authUrl,
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        },
        autoRefreshToken,
        persistSession,
        detectSessionInUrl,
        localStorage
      });
    }
    _initRealtimeClient() {
      return new realtime_js_1.RealtimeClient(this.realtimeUrl, {
        params: {apikey: this.supabaseKey}
      });
    }
    _initPostgRESTClient() {
      return new postgrest_js_1.PostgrestClient(this.restUrl, {
        headers: this._getAuthHeaders(),
        schema: this.schema
      });
    }
    _getAuthHeaders() {
      var _a, _b;
      const headers = {};
      const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
      headers["apikey"] = this.supabaseKey;
      headers["Authorization"] = `Bearer ${authBearer}`;
      return headers;
    }
    _closeChannel(subscription) {
      return new Promise((resolve2, reject) => {
        subscription.unsubscribe().receive("ok", () => {
          this.realtime.remove(subscription);
          return resolve2(true);
        }).receive("error", (e) => reject(e));
      });
    }
  };
  exports.default = SupabaseClient;
});

// node_modules/@supabase/supabase-js/dist/main/index.js
var require_main5 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SupabaseClient = exports.createClient = void 0;
  var SupabaseClient_1 = __importDefault(require_SupabaseClient());
  exports.SupabaseClient = SupabaseClient_1.default;
  __exportStar(require_main(), exports);
  __exportStar(require_main3(), exports);
  var createClient2 = (supabaseUrl, supabaseKey, options2) => {
    return new SupabaseClient_1.default(supabaseUrl, supabaseKey, options2);
  };
  exports.createClient = createClient2;
});

// .svelte/netlify/entry.js
__markAsModule(exports);
__export(exports, {
  handler: () => handler
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var {Readable} = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {type: ""}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({highWaterMark});
    p2 = new import_stream.PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
var getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe};
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: ""};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 ? `<style amp-custom>${Array.from(styles).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url, json}) => `<script type="svelte-data" url="${url}">${json}</script>`).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const {name, message, stack} = error2;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error2};
    }
    return {status, error: error2};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const {module: module2} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                fetched.push({
                  url,
                  json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                });
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error: error2}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (error3) {
    options2.handle_error(error3);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error: error2} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error2 = e;
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession({context: request.context});
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler2) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler2({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return {
          status: 500,
          body: `Invalid response from route ${request.path}; 
						 expected an object, got ${typeof response}`,
          headers: {}
        };
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      if (typeof body === "object" && !("content-type" in headers) || headers["content-type"] === "application/json") {
        headers = {...headers, "content-type": "application/json"};
        body = JSON.stringify(body);
      }
      return {status, body, headers};
    }
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path.endsWith("/") && incoming.path !== "/") {
    const q = incoming.query.toString();
    return {
      status: 301,
      headers: {
        location: incoming.path.slice(0, -1) + (q ? `?${q}` : "")
      }
    };
  }
  const incoming_with_body = {
    ...incoming,
    body: parse_body(incoming)
  };
  const context = await options2.hooks.getContext(incoming_with_body) || {};
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming_with_body,
        params: null,
        context
      },
      render: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession({context}),
            page_config: {ssr: false, router: true, hydrate: true},
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function hash(str) {
  let hash2 = 5381, i = str.length;
  while (i)
    hash2 = hash2 * 33 ^ str.charCodeAt(--i);
  return (hash2 >>> 0).toString(36);
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      const {on_mount} = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte/output/server/app.js
var import_supabase_js = __toModule(require_main5());
var css = {
  code: "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\tNavigated to {title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}</style>"],"names":[],"mappings":"AAqDO,gCAAiB,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,CAAC,SAAS,MAAM,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1pdgbjn"}">${navigated ? `Navigated to ${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({head, body}) => `<!DOCTYPE html>\r
<html lang="en">\r
	<head>\r
		<meta charset="utf-8" />\r
		<link rel="icon" href="/favicon.ico" />\r
		<meta name="viewport" content="width=device-width, initial-scale=1" />\r
		<style>\r
			@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200&display=swap');\r
		</style>\r
		` + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-743836b7.js",
      css: ["/./_app/assets/start-0826e215.css"],
      js: ["/./_app/start-743836b7.js", "/./_app/chunks/vendor-f45f9d29.js"]
    },
    fetched: void 0,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [],
  layout: "src/routes/$layout.svelte",
  error: ".svelte/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/index.svelte"],
      b: [".svelte/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/Blogs\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/Blogs/index.svelte"],
      b: [".svelte/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/Blogs\/([^/]+?)\/?$/,
      params: (m) => ({slug: d(m[1])}),
      a: ["src/routes/$layout.svelte", "src/routes/Blogs/[slug].svelte"],
      b: [".svelte/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/Self\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/Self/index.svelte"],
      b: [".svelte/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/How\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/How/index.svelte"],
      b: [".svelte/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getContext: hooks.getContext || (() => ({})),
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, render: render2}) => render2(request))
});
var module_lookup = {
  "src/routes/$layout.svelte": () => Promise.resolve().then(function() {
    return $layout$1;
  }),
  ".svelte/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/Blogs/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/Blogs/[slug].svelte": () => Promise.resolve().then(function() {
    return _slug_;
  }),
  "src/routes/Self/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/How/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = {"src/routes/$layout.svelte": {entry: "/./_app/pages/$layout.svelte-604349c3.js", css: ["/./_app/assets/pages/$layout.svelte-3be0ad00.css"], js: ["/./_app/pages/$layout.svelte-604349c3.js", "/./_app/chunks/vendor-f45f9d29.js"], styles: null}, ".svelte/build/components/error.svelte": {entry: "/./_app/error.svelte-1418e1b0.js", css: [], js: ["/./_app/error.svelte-1418e1b0.js", "/./_app/chunks/vendor-f45f9d29.js"], styles: null}, "src/routes/index.svelte": {entry: "/./_app/pages/index.svelte-1474e8d4.js", css: [], js: ["/./_app/pages/index.svelte-1474e8d4.js", "/./_app/chunks/vendor-f45f9d29.js", "/./_app/chunks/db-73e04827.js"], styles: null}, "src/routes/Blogs/index.svelte": {entry: "/./_app/pages/Blogs/index.svelte-a50d2f28.js", css: [], js: ["/./_app/pages/Blogs/index.svelte-a50d2f28.js", "/./_app/chunks/vendor-f45f9d29.js", "/./_app/chunks/db-73e04827.js"], styles: null}, "src/routes/Blogs/[slug].svelte": {entry: "/./_app/pages/Blogs/[slug].svelte-64a476e5.js", css: [], js: ["/./_app/pages/Blogs/[slug].svelte-64a476e5.js", "/./_app/chunks/vendor-f45f9d29.js", "/./_app/chunks/db-73e04827.js"], styles: null}, "src/routes/Self/index.svelte": {entry: "/./_app/pages/Self/index.svelte-78541baf.js", css: [], js: ["/./_app/pages/Self/index.svelte-78541baf.js", "/./_app/chunks/vendor-f45f9d29.js"], styles: null}, "src/routes/How/index.svelte": {entry: "/./_app/pages/How/index.svelte-602d56a4.js", css: [], js: ["/./_app/pages/How/index.svelte-602d56a4.js", "/./_app/chunks/vendor-f45f9d29.js"], styles: null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {base: "", assets: "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({...request, host}, options, {prerender});
}
var logo = "$lib/assets/logo";
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let menuitems = [
    {id: 1, name: "Home", route: "/"},
    {id: 2, name: "Blog", route: "/Blogs"},
    {id: 3, name: "Self", route: "/Self"},
    {id: 4, name: "How?", route: "/How?"}
  ];
  return `<nav class="${"relative z-20 flex items-center justify-between px-4 py-3 group"}" style="${"\r\n      background-image: url('https://images.pexels.com/photos/5338522/pexels-photo-5338522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');\r\n      background-repeat: no-repeat;\r\n      background-size: cover;\r\n    "}"><div class="${"flex items-center transition-opacity opacity-90 group-hover:opacity-100"}">
		<img${add_attribute("logo", logo, 0)} class="${"object-contain w-auto h-14 p-1 sm:p-0.5 bg-white rounded-full"}" alt="${""}">
		<div>
			<svg class="${"w-auto h-12 pt-2 pl-2 sm:pt-3 sm:h-14"}" width="${"281"}" height="${"68"}" viewBox="${"0 0 281 68"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><g filter="${"url(#filter0_dii)"}"><path d="${"M4.25 48.5V2.875L7.5625 1.3125H19.4062C24.1562 1.3125 28.0104 2.82292 30.9688 5.84375C33.7812 8.69792 35.1875 12.3958 35.1875 16.9375V32.875C35.1875 37.3958 33.7812 41.0938 30.9688 43.9688C28.0104 46.9896 24.1562 48.5 19.4062 48.5H4.25ZM10.5 42.875H19.4062C22.4062 42.875 24.8333 41.8021 26.6875 39.6562C28.1875 37.9271 28.9375 35.6667 28.9375 32.875V16.9375C28.9375 14.1458 28.1875 11.8854 26.6875 10.1562C24.8333 8.01042 22.4062 6.9375 19.4062 6.9375H10.5V42.875ZM48.1562 7.21875C47.4271 6.46875 47.0625 5.57292 47.0625 4.53125C47.0625 3.46875 47.4271 2.5625 48.1562 1.8125C48.8854 1.0625 49.7708 0.6875 50.8125 0.6875C51.8542 0.6875 52.7396 1.0625 53.4688 1.8125C54.1979 2.5625 54.5625 3.46875 54.5625 4.53125C54.5625 5.57292 54.1979 6.46875 53.4688 7.21875C52.7396 7.96875 51.8542 8.34375 50.8125 8.34375C49.7708 8.34375 48.8854 7.96875 48.1562 7.21875ZM47.6875 49.75V15.6875L53.625 12.875H53.9375V46.9375L48 49.75H47.6875ZM73.8125 49.75L61.75 15.4375L67.1562 12.875H67.4688L76.3125 38.9375L84.9688 12.875H85.2812L90.6875 15.4375L79.5312 47.1875L74.125 49.75H73.8125ZM95.375 36.625V15.6875L101.312 12.875H101.625V36.625C101.625 39.0208 102.271 40.7812 103.562 41.9062C104.875 43.0104 106.469 43.5625 108.344 43.5625C110.219 43.5625 111.802 43.0104 113.094 41.9062C114.406 40.7812 115.062 39.0208 115.062 36.625V15.6875L121 12.875H121.312V49.4375C121.312 52.875 120.021 55.8646 117.438 58.4062C115.021 60.7604 111.99 61.9375 108.344 61.9375H98.7188V61.625L101.219 56.375H108.344C110.219 56.375 111.812 55.8125 113.125 54.6875C114.417 53.5625 115.062 51.8125 115.062 49.4375V46.4688C113.521 48.2396 111.281 49.125 108.344 49.125C104.781 49.125 101.75 47.9479 99.25 45.5938C96.6667 43.1354 95.375 40.1458 95.375 36.625ZM156 46.9375L150.062 49.75H149.75V46.4688C148.083 48.2396 145.844 49.125 143.031 49.125C139.135 49.125 136.104 47.9479 133.938 45.5938C131.771 43.2396 130.688 40.4583 130.688 37.25C130.688 33.9167 131.865 31.0833 134.219 28.75C136.49 26.5 139.427 25.375 143.031 25.375C145.594 25.375 147.833 26.2604 149.75 28.0312C149.75 24.3438 149.104 21.9167 147.812 20.75C146.562 19.625 144.969 19.0625 143.031 19.0625H135.438V18.75L137.938 13.5H143.031C146.677 13.5 149.708 14.6771 152.125 17.0312C154.708 19.5521 156 22.5417 156 26V46.9375ZM136.812 37.25C136.812 39.1042 137.375 40.6354 138.5 41.8438C139.583 43.0104 141.104 43.5938 143.062 43.5938C145.104 43.5938 146.688 43 147.812 41.8125C149.062 40.4792 149.688 38.9792 149.688 37.3125C149.688 35.4375 149.042 33.9167 147.75 32.75C146.458 31.5833 144.906 31 143.094 31C141.198 31 139.677 31.6146 138.531 32.8438C137.385 34.0729 136.812 35.5417 136.812 37.25ZM165.375 49.75V26C165.375 22.5625 166.667 19.5729 169.25 17.0312C171.667 14.6771 174.698 13.5 178.344 13.5C181.656 13.5 184.521 14.7083 186.938 17.125C187.396 17.5833 187.812 18.125 188.188 18.75C188.562 18.1458 188.979 17.6146 189.438 17.1562C192.042 14.7188 194.906 13.5 198.031 13.5C201.635 13.5 204.667 14.6771 207.125 17.0312C209.708 19.5312 211 22.5208 211 26V46.9375L205.062 49.75H204.75V26C204.75 23.6042 204.094 21.8542 202.781 20.75C201.49 19.625 199.906 19.0625 198.031 19.0625C196.156 19.0625 194.562 19.625 193.25 20.75C191.958 21.8542 191.312 23.6042 191.312 26V46.9375L185.375 49.75H185.062V26C185.062 23.6042 184.406 21.8542 183.094 20.75C181.802 19.625 180.219 19.0625 178.344 19.0625C176.469 19.0625 174.875 19.625 173.562 20.75C172.271 21.8542 171.625 23.6042 171.625 26V46.9375L165.688 49.75H165.375ZM220.375 49.75V26C220.375 22.5625 221.667 19.5729 224.25 17.0312C226.667 14.6771 229.698 13.5 233.344 13.5H237.562V13.8125L235.062 19.0625H233.344C231.469 19.0625 229.875 19.625 228.562 20.75C227.271 21.8542 226.625 23.6042 226.625 26C226.625 26 226.625 32.9792 226.625 46.9375L220.688 49.75H220.375ZM244.906 7.21875C244.177 6.46875 243.812 5.57292 243.812 4.53125C243.812 3.46875 244.177 2.5625 244.906 1.8125C245.635 1.0625 246.521 0.6875 247.562 0.6875C248.604 0.6875 249.49 1.0625 250.219 1.8125C250.948 2.5625 251.312 3.46875 251.312 4.53125C251.312 5.57292 250.948 6.46875 250.219 7.21875C249.49 7.96875 248.604 8.34375 247.562 8.34375C246.521 8.34375 245.635 7.96875 244.906 7.21875ZM244.438 49.75V15.6875L250.375 12.875H250.688V46.9375L244.75 49.75H244.438ZM265.75 49.75V19.8125H257.719V19.5L260.25 14.125H265.75V2.875L271.688 0.0625H272V14.125H280.031V14.4375L277.5 19.8125H272V46.9375L266.062 49.75H265.75Z"}" fill="${"#00FFE0"}"></path></g><defs><filter id="${"filter0_dii"}" x="${"0.25"}" y="${"0.0625"}" width="${"283.781"}" height="${"69.875"}" filterUnits="${"userSpaceOnUse"}" color-interpolation-filters="${"sRGB"}"><feFlood flood-opacity="${"0"}" result="${"BackgroundImageFix"}"></feFlood><feColorMatrix in="${"SourceAlpha"}" type="${"matrix"}" values="${"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}"></feColorMatrix><feOffset dy="${"4"}"></feOffset><feGaussianBlur stdDeviation="${"2"}"></feGaussianBlur><feColorMatrix type="${"matrix"}" values="${"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"}"></feColorMatrix><feBlend mode="${"normal"}" in2="${"BackgroundImageFix"}" result="${"effect1_dropShadow"}"></feBlend><feBlend mode="${"normal"}" in="${"SourceGraphic"}" in2="${"effect1_dropShadow"}" result="${"shape"}"></feBlend><feColorMatrix in="${"SourceAlpha"}" type="${"matrix"}" values="${"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}" result="${"hardAlpha"}"></feColorMatrix><feOffset dx="${"2"}" dy="${"2"}"></feOffset><feGaussianBlur stdDeviation="${"2"}"></feGaussianBlur><feComposite in2="${"hardAlpha"}" operator="${"arithmetic"}" k2="${"-1"}" k3="${"1"}"></feComposite><feColorMatrix type="${"matrix"}" values="${"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"}"></feColorMatrix><feBlend mode="${"normal"}" in2="${"shape"}" result="${"effect2_innerShadow"}"></feBlend><feColorMatrix in="${"SourceAlpha"}" type="${"matrix"}" values="${"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}" result="${"hardAlpha"}"></feColorMatrix><feOffset dx="${"4"}"></feOffset><feGaussianBlur stdDeviation="${"2"}"></feGaussianBlur><feComposite in2="${"hardAlpha"}" operator="${"arithmetic"}" k2="${"-1"}" k3="${"1"}"></feComposite><feColorMatrix type="${"matrix"}" values="${"0 0 0 0 0 0 0 0 0 0.46 0 0 0 0 1 0 0 0 0.28 0"}"></feColorMatrix><feBlend mode="${"normal"}" in2="${"effect2_innerShadow"}" result="${"effect3_innerShadow"}"></feBlend></filter></defs></svg></div></div>
		<div><button type="${"button"}" class="${"text-gray-700 rounded-full sm:hidden hover:text-white focus:text-white"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"w-10 h-10 fill-current"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}">${`<path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path>`}</svg></button></div>
      <div class="${"flex-row hidden w-auto sm:flex h-14 place-items-center justify-items-center"}"><div class="${"flex flex-row mx-8 ml-auto place-content-between"}">${each(menuitems, (menuitem) => `<a${add_attribute("href", menuitem.route, 0)} class="${"px-3 shadow-inner sm:mx-1 py-0.5 group flex flex-row place-items-center justify-items-center hover:bg-gray-100 hover:bg-opacity-5 rounded-md"}"><p class="${"text-xl font-semibold text-transparent cursor-pointer select-none md:text-2xl bg-clip-text bg-gradient-to-br from-cyan-400 to-white opacity-70 group-hover:opacity-100"}">${escape2(menuitem.name)}</p>
		</a>`)}</div></div></nav>
<div class="${"absolute z-10 flex justify-end w-full sm:hidden"}"><div class="${" " + escape2("opacity-0") + " -mt-1 max-w-[200px] transition-opacity ease-out delay-150 absolute grid w-[93%] h-[80vh] grid-cols-1 pt-5 text-2xl place-content-around bg-gradient-to-l from-cyan-500 to-teal-400 dark:from-blueGray-700 dark:via-blueGray-800 dark:to-[#111879DD] rounded-bl-xl shadow-lg justify-items-center pb-7"}">${each(menuitems, (menuitem) => `<div><a${add_attribute("href", menuitem.route, 0)} class="${"block px-2 py-1 mt-1 text-white rounded-xl font-jetMono"}"><h1 class="${"flex items-center text-2xl group"}">${escape2(menuitem.name)}
 	       <svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"inline-block w-6 h-auto text-transparent transition-colors ease-in-out delay-100 fill-current text-[#FFFFFF50] group-hover:text-teal-900"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M17 8l4 4m0 0l-4 4m4-4H3"}"></path></svg>
 	     </h1></a>
	</div>`)}</div></div>`;
});
var $layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}`;
});
var $layout$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $layout
});
function load$1({error: error2, status}) {
  return {props: {error: error2, status}};
}
var Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error2} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error2.message)}</p>


${error2.stack ? `<pre>${escape2(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Error2,
  load: load$1
});
var supabase = (0, import_supabase_js.createClient)("https://bmbxkooyhyirkigtrgan.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTk1NzY0MSwiZXhwIjoxOTM1NTMzNjQxfQ.AxESPyR_HVeMuB0_eKfhRSLFPH9IJVxlDLlB3AUBMC0");
var Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  function getD2() {
    return supabase.from("Blogs").select("*");
  }
  return `${function(__value) {
    if (is_promise(__value))
      return `
	<section class="${"grid grid-cols-2 gap-3 py-3 mx-6 bg-green-100 shadow sm:mx-10 font-jetMono sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 dark:bg-cyan-200 sm:py-5 md:py-8 lg:py-10 xl:py-14 rounded-3xl justify-items-center"}">${each(Array(6), (_, i) => `<div class="${"flex flex-col items-center w-11/12 cursor-pointer"}"><div class="${"flex items-center w-11/12 p-3 shadow sm:p-5 hover:bg-opacity-100 bg-gradient-to-r bg-opacity-70 bg-emerald-300 dark:from-cyan-400 dark:to-light-blue-400 rounded-xl"}"><div class="${"flex flex-col w-full group"}"><h1 class="${"px-1 ml-auto -mt-1 -mr-1 text-xs bg-white rounded-sm sm:mb-1 opacity-80 w-max -sm:mt-2 sm:text-xs md:text-sm lg:text-lg"}">date
						</h1>
						<h1 class="${"text-xl sm:text-[1.8rem] md:text-4xl text-emerald-900 dark:text-white"}">
							topic
						</h1>
						<p class="${"sm:mt-2 sm:ml-0.5 text-blueGray-800 sm:text-lg md:text-lg text-xs group-hover:line-clamp-4 line-clamp-2 md:line-clamp-4"}">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus similique repellendus saepe, nisi quaerat sint porro. Porro non neque aspernatur!
						</p>
					</div></div>
			</div>`)}</section>
`;
    return function(response) {
      return `
	<section class="${"grid grid-cols-2 gap-3 py-3 mx-6 bg-green-100 shadow sm:mx-10 font-jetMono sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 dark:bg-cyan-200 sm:py-5 md:py-8 lg:py-10 xl:py-14 rounded-3xl justify-items-center"}">${each(response.data, (card) => `<a${add_attribute("href", "/Blogs/" + card.id, 0)} class="${"flex flex-col items-center w-11/12 cursor-pointer"}"><div class="${"flex items-center w-11/12 p-3 shadow sm:p-5 hover:bg-opacity-100 bg-gradient-to-r bg-opacity-70 bg-emerald-300 dark:from-cyan-400 dark:to-light-blue-400 rounded-xl"}"><div class="${"flex flex-col w-full group"}"><h1 class="${"px-1 ml-auto -mt-1 -mr-1 text-xs bg-white rounded-sm sm:mb-1 opacity-80 w-max -sm:mt-2 sm:text-xs md:text-sm lg:text-lg"}">${escape2(card.date)}</h1>
						<h1 class="${"text-xl sm:text-[1.8rem] md:text-4xl text-emerald-900 dark:text-white"}">
							${escape2(card.topic)}</h1>
						<p class="${"sm:mt-2 sm:ml-0.5 text-blueGray-800 sm:text-lg md:text-lg text-xs group-hover:line-clamp-4 line-clamp-2 md:line-clamp-4"}">
							${escape2(card.content)}</p>
					</div></div>
			</a>`)}</section>
`;
    }(__value);
  }(getD2())}`;
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Welcome</title>`, ""}`, ""}
<div class="${"pb-40"}"><div class="${"p-8 mx-4 my-20 text-left bg-gradient-to-br from-teal-300 via-cyan-400 to-green-300 rounded-xl"}"><h1 class="${"text-4xl text-gray-100 sm:text-5xl"}">This site named Divyamrit just for fun!</h1>
		<h1 class="${"ml-1 text-xl text-indigo-900 sm:text-2xl"}">Also whatever you see here, is just a action
		</h1></div>
	<div class="${"grid grid-cols-1 sm:grid-cols-1 font-jetMono place-items-center"}"><section class="${"grid w-11/12 grid-cols-1 gap-20 my-10 md:gap-10 lg:gap-20 sm:grid-cols-3"}"><article class="${"grid grid-cols-1 group"}"><div class="${"p-4 bg-black "}"><h1 class="${"w-full text-2xl text-transparent rounded-lg bg-clip-text bg-gradient-to-br from-cyan-500 via-teal-400 to-gray-500"}">You are a miracle,
					</h1></div>
				<div class="${"px-4 py-2 bg-gray-100 shadow-sm "}">
					<h1 class="${"text-lg line-clamp-4 text-cyan-700"}">Believe me! You Gonna win One day, When you really understand What I meant by this.
					</h1></div>
				<a href="${"./space.html"}" class="${"px-2 py-1 bg-black cursor-pointer opacity-90 group-hover:opacity-100 w-max"}"><h1 class="${"text-sm text-yellow-300"}">Click For More!</h1></a></article>

			<article class="${"grid grid-cols-1 group"}"><div class="${"p-4 bg-gray-900 "}"><h1 class="${"text-2xl text-transparent bg-gradient-to-br from-gray-400 to-white bg-clip-text"}">For Me,
					</h1></div>
				<div class="${"p-3 px-4 bg-rose-600"}"><h1 class="${"text-lg text-white line-clamp-4"}">Whole World is like a game where You can Enter play,replay,change or exit. But There is
						a Hack!
					</h1></div>
				<div class="${"px-2 py-1 bg-black cursor-pointer opacity-90 group-hover:opacity-100 w-max"}"><h1 class="${"text-sm text-yellow-300"}">Click For More!</h1></div></article>

			<article class="${"grid grid-cols-1 group"}"><div class="${"p-4 bg-yellow-400 "}"><h1 class="${"w-full text-2xl text-transparent rounded-lg bg-clip-text bg-gradient-to-tr from-yellow-800 via-red-900 to-green-900"}">Advice for you,
					</h1></div>
				<div class="${"px-4 py-2 bg-green-100 shadow-sm "}">
					<h1 class="${"text-lg line-clamp-4 text-cyan-700"}">There are certain rules of this world Also!, So never forget that What you think is What
						you going to become.
					</h1></div>
				<div class="${"px-2 py-1 bg-black cursor-pointer opacity-90 group-hover:opacity-100 w-max"}"><h1 class="${"text-sm text-yellow-300"}">Click For More!</h1></div></article></section>

		<div class="${"grid grid-cols-1 mt-20 mb-10 justify-items-center"}"><h1 class="${"text-base text-blue-500 sm:text-2xl"}">Some of my free time Blogs</h1></div>
		${validate_component(Card, "Card").$$render($$result, {}, {}, {})}</div></div>`;
});
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Routes
});
function getD() {
  return supabase.from("Blogs").select("*");
}
var Blogs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"dark"}">${function(__value) {
    if (is_promise(__value))
      return ` 
        <section class="${"grid items-center w-full grid-cols-1 gap-3 py-5 bg-gray-900 font-jetMono dark:bg-light-blue-500 justify-items-center"}"><article class="${"flex flex-col w-10/12 p-1 shadow-lg opacity-90 from-blueGray-400 via-blueGray-600 to-blueGray-800 bg-gradient-to-tr dark:from-cyan-400 dark:to-white rounded-t-3xl rounded-br-3xl group"}"><div class="${"flex mb-1"}"><p class="${" px-1.5 py-0.5 text-white dark:text-blue-500 relative top-2 -left-2 w-max bg-teal-600 dark:bg-white opacity-70 dark:bg-opacity-100 group-hover:opacity-100 text-xs sm:text-base ml-auto sm:rounded-lg rounded-md"}">DD/MM/YYYY
                        </p></div>
                    <h1 class="${"pl-1 mb-2 ml-2 text-4xl font-thin text-white border-l-2 border-gray-900 opacity-90 group-hover:opacity-100 dark:border-gray-200 dark:text-cyan-900 sm:text-5xl"}">Topic
                    </h1>
                    <p class="${"mb-3 ml-3 text-sm text-green-100 truncate dark:text-gray-900 sm:text-base opacity-60 group-hover:opacity-80"}">content
                    </p></article></section>
		`;
    return function(response) {
      return `
            <section class="${"grid items-center w-full grid-cols-1 gap-3 py-5 bg-gray-900 font-jetMono dark:bg-light-blue-500 justify-items-center"}">${each(response.data, (x) => `<a${add_attribute("href", "/Blogs/" + x.id, 0)} class="${"w-10/12"}"><article class="${"flex flex-col w-full p-1 shadow-lg from-blueGray-400 via-blueGray-600 to-blueGray-800 bg-gradient-to-tr dark:from-cyan-400 dark:to-white rounded-t-3xl rounded-br-3xl group"}"><div class="${"flex mb-1"}"><p class="${"px-1.5 py-0.5 text-white dark:text-blue-500 relative top-2 -left-2 w-max bg-teal-600 dark:bg-white opacity-70 dark:bg-opacity-100 group-hover:opacity-100 text-xs sm:text-base ml-auto sm:rounded-lg rounded-md"}">${escape2(x.date)}
                            </p></div>
                        <h1 class="${"pl-1 mb-2 ml-2 text-4xl font-thin text-white border-l-2 border-gray-900 opacity-90 group-hover:opacity-100 dark:border-gray-200 dark:text-cyan-900 sm:text-5xl"}">${escape2(x.topic)}</h1>
                        <p class="${"mb-3 ml-3 text-sm text-green-100 truncate dark:text-gray-900 sm:text-base opacity-60 group-hover:opacity-80"}">${escape2(x.content)}
                        </p></article>
                </a>`)}</section>
		`;
    }(__value);
  }(getD())}</div>`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Blogs
});
async function load(ctx) {
  let slug = ctx.page.params.slug;
  return {props: {slug}};
}
var U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {slug} = $$props;
  function getD2() {
    return supabase.from("Blogs").select("*").eq("id", slug);
  }
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  if ($$props.getD === void 0 && $$bindings.getD && getD2 !== void 0)
    $$bindings.getD(getD2);
  return `<div class="${"select-none dark"}"><section class="${"flex flex-col items-center w-full py-5 bg-gray-900 font-jetMono dark:bg-white"}"><div class="${"w-11/12"}"><article class="${"flex flex-col w-full p-1 shadow-lg from-green-400 via-emerald-400 to-teal-400 dark:sw bg-gradient-to-tr dark:from-cyan-400 dark:to-teal-200 rounded-3xl"}">${function(__value) {
    if (is_promise(__value))
      return `
          <p class="${"px-1.5 py-0.5 text-white dark:text-gray-800 m-2 w-max opacity-80 text-base sm:text-lg ml-auto sm:rounded-lg rounded-md"}">DD/MM/YYYY</p>
          <h1 class="${"p-3 pl-1 mb-2 ml-1 text-3xl font-thin text-gray-900 border shadow-xl sm:text-5xl md:text-7xl sm:ml-3 rounded-xl max-w-max dark:text-cyan-900"}">topic</h1>
          <p class="${"p-3 mb-3 text-base text-white sm:text-xl"}">content</p>
        `;
    return function(data) {
      return `
          ${each(data.data, (x) => `<p class="${"px-1.5 py-0.5 text-white dark:text-gray-800 m-2 w-max opacity-80 text-base sm:text-lg ml-auto sm:rounded-lg rounded-md"}">${escape2(x.date)}</p>
          <h1 class="${"p-3 pl-1 mb-2 ml-1 text-3xl font-thin text-gray-900 border shadow-xl sm:text-5xl md:text-7xl sm:ml-3 rounded-xl max-w-max dark:text-cyan-900"}">${escape2(x.topic)}</h1>
          <p class="${"p-3 mb-3 text-base text-white sm:text-xl"}">${escape2(x.content)}</p>`)}
        `;
    }(__value);
  }(getD2())}</article></div></section></div>`;
});
var _slug_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: U5Bslugu5D,
  load
});
var Self = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Self my intoduction</h1>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Self
});
var How = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>How</h1>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: How
});

// .svelte/netlify/entry.js
async function handler(event) {
  const {path, httpMethod, headers, queryStringParameters, body, isBase64Encoded} = event;
  const query = new URLSearchParams();
  for (const k in queryStringParameters) {
    const value = queryStringParameters[k];
    value.split(", ").forEach((v) => {
      query.append(k, v);
    });
  }
  const rawBody = headers["content-type"] === "application/octet-stream" ? new TextEncoder("base64").encode(body).buffer : isBase64Encoded ? Buffer.from(body, "base64").toString() : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      headers: rendered.headers,
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});

(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c)
                        return c(i, !0);
                    if (u)
                        return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND",
                    a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
        return o
    }
    return r
}
)()({
    1: [function(require, module, exports) {
        "use strict";
        function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            }
            : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }
            ,
            _typeof(obj)
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value"in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
                writable: false
            });
            return Constructor
        }
        var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            }
        }
        ;
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Base = void 0;
        var buffer_1 = require("buffer");
        var crypto_js_1 = __importDefault(require("crypto-js"));
        var Base = function() {
            function Base() {
                _classCallCheck(this, Base)
            }
            _createClass(Base, [{
                key: "print",
                value: function print() {
                    Base.print(this)
                }
            }, {
                key: "bufferIndexOf",
                value: function bufferIndexOf(array, element) {
                    var isSorted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                    if (isSorted) {
                        return this.binarySearch(array, element, buffer_1.Buffer.compare)
                    }
                    var eqChecker = function eqChecker(buffer1, buffer2) {
                        return buffer1.equals(buffer2)
                    };
                    return this.linearSearch(array, element, eqChecker)
                }
            }, {
                key: "binarySearch",
                value: function binarySearch(array, element, compareFunction) {
                    return Base.binarySearch(array, element, compareFunction)
                }
            }, {
                key: "linearSearch",
                value: function linearSearch(array, element, eqChecker) {
                    return Base.linearSearch(array, element, eqChecker)
                }
            }, {
                key: "bigNumberify",
                value: function bigNumberify(value) {
                    return Base.bigNumberify(value)
                }
            }, {
                key: "bufferToHex",
                value: function bufferToHex(value) {
                    var withPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                    return Base.bufferToHex(value, withPrefix)
                }
            }, {
                key: "bufferify",
                value: function bufferify(value) {
                    return Base.bufferify(value)
                }
            }, {
                key: "bufferifyFn",
                value: function bufferifyFn(f) {
                    var _this = this;
                    return function(value) {
                        var v = f(value);
                        if (buffer_1.Buffer.isBuffer(v)) {
                            return v
                        }
                        if (_this.isHexString(v)) {
                            return buffer_1.Buffer.from(v.replace("0x", ""), "hex")
                        }
                        if (typeof v === "string") {
                            return buffer_1.Buffer.from(v)
                        }
                        if (typeof v === "bigint") {
                            return buffer_1.Buffer.from(value.toString(16), "hex")
                        }
                        if (ArrayBuffer.isView(v)) {
                            return buffer_1.Buffer.from(v.buffer, v.byteOffset, v.byteLength)
                        }
                        return buffer_1.Buffer.from(f(crypto_js_1["default"].enc.Hex.parse(value.toString("hex"))).toString(crypto_js_1["default"].enc.Hex), "hex")
                    }
                }
            }, {
                key: "isHexString",
                value: function isHexString(value) {
                    return Base.isHexString(value)
                }
            }, {
                key: "log2",
                value: function log2(n) {
                    return n === 1 ? 0 : 1 + this.log2(n / 2 | 0)
                }
            }, {
                key: "zip",
                value: function zip(a, b) {
                    return a.map(function(e, i) {
                        return [e, b[i]]
                    })
                }
            }], [{
                key: "binarySearch",
                value: function binarySearch(array, element, compareFunction) {
                    var start = 0;
                    var end = array.length - 1;
                    while (start <= end) {
                        var mid = Math.floor((start + end) / 2);
                        var ordering = compareFunction(array[mid], element);
                        if (ordering === 0) {
                            for (var i = mid - 1; i >= 0; i--) {
                                if (compareFunction(array[i], element) === 0)
                                    continue;
                                return i + 1
                            }
                            return 0
                        } else if (ordering < 0) {
                            start = mid + 1
                        } else {
                            end = mid - 1
                        }
                    }
                    return -1
                }
            }, {
                key: "linearSearch",
                value: function linearSearch(array, element, eqChecker) {
                    for (var i = 0; i < array.length; i++) {
                        if (eqChecker(array[i], element)) {
                            return i
                        }
                    }
                    return -1
                }
            }, {
                key: "bufferify",
                value: function bufferify(value) {
                    if (!buffer_1.Buffer.isBuffer(value)) {
                        if (_typeof(value) === "object" && value.words) {
                            return buffer_1.Buffer.from(value.toString(crypto_js_1["default"].enc.Hex), "hex")
                        } else if (Base.isHexString(value)) {
                            return buffer_1.Buffer.from(value.replace(/^0x/, ""), "hex")
                        } else if (typeof value === "string") {
                            return buffer_1.Buffer.from(value)
                        } else if (typeof value === "bigint") {
                            return buffer_1.Buffer.from(value.toString(16), "hex")
                        } else if (value instanceof Uint8Array) {
                            return buffer_1.Buffer.from(value.buffer)
                        } else if (typeof value === "number") {
                            var s = value.toString();
                            if (s.length % 2) {
                                s = "0".concat(s)
                            }
                            return buffer_1.Buffer.from(s, "hex")
                        } else if (ArrayBuffer.isView(value)) {
                            return buffer_1.Buffer.from(value.buffer, value.byteOffset, value.byteLength)
                        }
                    }
                    return value
                }
            }, {
                key: "bigNumberify",
                value: function bigNumberify(value) {
                    if (typeof value === "bigint") {
                        return value
                    }
                    if (typeof value === "string") {
                        if (value.startsWith("0x") && Base.isHexString(value)) {
                            return BigInt("0x" + value.replace("0x", "").toString())
                        }
                        return BigInt(value)
                    }
                    if (buffer_1.Buffer.isBuffer(value)) {
                        return BigInt("0x" + value.toString("hex"))
                    }
                    if (value instanceof Uint8Array) {
                        return BigInt(value)
                    }
                    if (typeof value === "number") {
                        return BigInt(value)
                    }
                    throw new Error("cannot bigNumberify")
                }
            }, {
                key: "isHexString",
                value: function isHexString(v) {
                    return typeof v === "string" && /^(0x)?[0-9A-Fa-f]*$/.test(v)
                }
            }, {
                key: "print",
                value: function print(tree) {
                    console.log(tree.toString())
                }
            }, {
                key: "bufferToHex",
                value: function bufferToHex(value) {
                    var withPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                    return "".concat(withPrefix ? "0x" : "").concat((value || buffer_1.Buffer.alloc(0)).toString("hex"))
                }
            }, {
                key: "hexZeroPad",
                value: function hexZeroPad(hexStr, length) {
                    return "0x" + hexStr.replace("0x", "").padStart(length, "0")
                }
            }]);
            return Base
        }();
        exports.Base = Base;
        exports["default"] = Base
    }
    , {
        buffer: 9,
        "crypto-js": 18
    }],
    2: [function(require, module, exports) {
        "use strict";
        function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            }
            : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }
            ,
            _typeof(obj)
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                })
            } else {
                obj[key] = value
            }
            return obj
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
            if (!it) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it)
                        o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length)
                                return {
                                    done: true
                                };
                            return {
                                done: false,
                                value: o[i++]
                            }
                        },
                        e: function e(_e) {
                            throw _e
                        },
                        f: F
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = it.call(o)
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step
                },
                e: function e(_e2) {
                    didErr = true;
                    err = _e2
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null)
                            it["return"]()
                    } finally {
                        if (didErr)
                            throw err
                    }
                }
            }
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o)
                return;
            if (typeof o === "string")
                return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
                n = o.constructor.name;
            if (n === "Map" || n === "Set")
                return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return _arrayLikeToArray(o, minLen)
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
                len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i]
            }
            return arr2
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value"in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
                writable: false
            });
            return Constructor
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function")
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: true,
                    configurable: true
                }
            });
            Object.defineProperty(subClass, "prototype", {
                writable: false
            });
            if (superClass)
                _setPrototypeOf(subClass, superClass)
        }
        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o
            }
            ;
            return _setPrototypeOf(o, p)
        }
        function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
                var Super = _getPrototypeOf(Derived), result;
                if (hasNativeReflectConstruct) {
                    var NewTarget = _getPrototypeOf(this).constructor;
                    result = Reflect.construct(Super, arguments, NewTarget)
                } else {
                    result = Super.apply(this, arguments)
                }
                return _possibleConstructorReturn(this, result)
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
                return call
            } else if (call !== void 0) {
                throw new TypeError("Derived constructors may only return object or undefined")
            }
            return _assertThisInitialized(self)
        }
        function _assertThisInitialized(self) {
            if (self === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
            return self
        }
        function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
                return false;
            if (Reflect.construct.sham)
                return false;
            if (typeof Proxy === "function")
                return true;
            try {
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
                return true
            } catch (e) {
                return false
            }
        }
        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o)
            }
            ;
            return _getPrototypeOf(o)
        }
        var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            }
        }
        ;
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.IncrementalMerkleTree = void 0;
        var Base_1 = __importDefault(require("./Base"));
        var treeify_1 = __importDefault(require("treeify"));
        var IncrementalMerkleTree = function(_Base_1$default) {
            _inherits(IncrementalMerkleTree, _Base_1$default);
            var _super = _createSuper(IncrementalMerkleTree);
            function IncrementalMerkleTree(hashFn, options) {
                var _this;
                _classCallCheck(this, IncrementalMerkleTree);
                _this = _super.call(this);
                _this.hashFn = hashFn;
                if (options.depth) {
                    _this.depth = options.depth
                }
                if (options.arity) {
                    _this.arity = options.arity
                }
                if (_this.depth < 1) {
                    throw new Error("depth must be greater than 0")
                }
                if (_this.arity < 1) {
                    throw new Error("arity must be greater than 0")
                }
                var nodes = [];
                var zeroValue = options.zeroValue;
                _this.zeroValue = zeroValue;
                _this.zeroes = [];
                if (_this.depth) {
                    for (var i = 0; i < _this.depth; i++) {
                        _this.zeroes.push(zeroValue);
                        nodes[i] = [];
                        zeroValue = _this.hashFn(Array(_this.arity).fill(zeroValue))
                    }
                }
                _this.nodes = nodes;
                _this.root = zeroValue;
                return _this
            }
            _createClass(IncrementalMerkleTree, [{
                key: "getRoot",
                value: function getRoot() {
                    return this.root
                }
            }, {
                key: "getHexRoot",
                value: function getHexRoot() {
                    return this.bufferToHex(this.bufferify(this.getRoot()))
                }
            }, {
                key: "insert",
                value: function insert(leaf) {
                    if (this.depth && this.arity) {
                        if (this.nodes[0].length >= this.getMaxLeaves()) {
                            throw new Error("tree is full")
                        }
                    }
                    var node = leaf;
                    var index = this.nodes[0].length;
                    for (var level = 0; level < this.depth; level += 1) {
                        var position = index % this.arity;
                        var levelStartIndex = index - position;
                        var levelEndIndex = levelStartIndex + this.arity;
                        var children = [];
                        this.nodes[level][index] = node;
                        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
                            if (i < this.nodes[level].length) {
                                children.push(this.nodes[level][i])
                            } else {
                                children.push(this.zeroes[level])
                            }
                        }
                        node = this.hashFn(children);
                        index = Math.floor(index / this.arity)
                    }
                    this.root = node
                }
            }, {
                key: "delete",
                value: function _delete(index) {
                    this.update(index, this.zeroValue)
                }
            }, {
                key: "update",
                value: function update(index, newLeaf) {
                    if (index < 0 || index >= this.nodes[0].length) {
                        throw new Error("out of bounds")
                    }
                    var node = newLeaf;
                    for (var level = 0; level < this.depth; level += 1) {
                        var position = index % this.arity;
                        var levelStartIndex = index - position;
                        var levelEndIndex = levelStartIndex + this.arity;
                        var children = [];
                        this.nodes[level][index] = node;
                        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
                            if (i < this.nodes[level].length) {
                                children.push(this.nodes[level][i])
                            } else {
                                children.push(this.zeroes[level])
                            }
                        }
                        node = this.hashFn(children);
                        index = Math.floor(index / this.arity)
                    }
                    this.root = node
                }
            }, {
                key: "getDepth",
                value: function getDepth() {
                    return this.depth
                }
            }, {
                key: "getArity",
                value: function getArity() {
                    return this.arity
                }
            }, {
                key: "getMaxLeaves",
                value: function getMaxLeaves() {
                    return Math.pow(this.depth, this.arity)
                }
            }, {
                key: "indexOf",
                value: function indexOf(leaf) {
                    return this.nodes[0].indexOf(leaf)
                }
            }, {
                key: "getLeaves",
                value: function getLeaves() {
                    var leaves = this.copyList(this.nodes[0]);
                    var index = this.nodes[0].length;
                    for (var i = index; i < this.getMaxLeaves(); i++) {
                        leaves[i] = this.zeroValue
                    }
                    return leaves
                }
            }, {
                key: "copyList",
                value: function copyList(list) {
                    return list.map(function(x) {
                        return BigInt(x)
                    })
                }
            }, {
                key: "getLayers",
                value: function getLayers() {
                    var layers = [];
                    var _iterator = _createForOfIteratorHelper(this.nodes), _step;
                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                            var list = _step.value;
                            layers.push(this.copyList(list))
                        }
                    } catch (err) {
                        _iterator.e(err)
                    } finally {
                        _iterator.f()
                    }
                    if (layers[0].length < this.getMaxLeaves()) {
                        var index = layers[0].length;
                        for (var i = index; i < this.getMaxLeaves(); i++) {
                            layers[0][i] = this.zeroValue
                        }
                        for (var level = 0; level < this.depth; level++) {
                            var position = index % this.arity;
                            var levelStartIndex = index - position;
                            var levelEndIndex = levelStartIndex + this.arity;
                            for (var _i = levelStartIndex; _i < levelEndIndex; _i++) {
                                if (_i >= layers[level].length) {
                                    layers[level][_i] = this.zeroes[level]
                                }
                            }
                            index = Math.floor(index / this.arity)
                        }
                    }
                    layers.push([this.root]);
                    return layers
                }
            }, {
                key: "getHexLayers",
                value: function getHexLayers() {
                    var _this2 = this;
                    return this.getLayers().reduce(function(acc, item) {
                        if (Array.isArray(item)) {
                            acc.push(item.map(function(layer) {
                                return _this2.bufferToHex(_this2.bufferify(layer))
                            }))
                        } else {
                            acc.push(item)
                        }
                        return acc
                    }, [])
                }
            }, {
                key: "getLayersAsObject",
                value: function getLayersAsObject() {
                    var _this3 = this;
                    var layers = this.getLayers().map(function(layer) {
                        return layer.map(function(value) {
                            return _this3.bufferToHex(_this3.bufferify(value), false)
                        })
                    });
                    var objs = [];
                    for (var i = 0; i < layers.length; i++) {
                        var arr = [];
                        for (var j = 0; j < layers[i].length; j++) {
                            var obj = _defineProperty({}, layers[i][j], null);
                            if (objs.length) {
                                obj[layers[i][j]] = {};
                                var a = objs.shift();
                                var akey = Object.keys(a)[0];
                                obj[layers[i][j]][akey] = a[akey];
                                if (objs.length) {
                                    var b = objs.shift();
                                    var bkey = Object.keys(b)[0];
                                    obj[layers[i][j]][bkey] = b[bkey]
                                }
                            }
                            arr.push(obj)
                        }
                        objs.push.apply(objs, arr)
                    }
                    return objs[0]
                }
            }, {
                key: "computeRoot",
                value: function computeRoot() {
                    var node;
                    var index = this.nodes[0].length;
                    for (var level = 0; level < this.depth; level += 1) {
                        var position = index % this.arity;
                        var levelStartIndex = index - position;
                        var levelEndIndex = levelStartIndex + this.arity;
                        var children = [];
                        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
                            if (i < this.nodes[level].length) {
                                children.push(this.nodes[level][i])
                            } else {
                                children.push(this.zeroes[level])
                            }
                        }
                        node = this.hashFn(children);
                        index = Math.floor(index / this.arity)
                    }
                    return node
                }
            }, {
                key: "getProof",
                value: function getProof(index) {
                    if (index < 0 || index >= this.nodes[0].length) {
                        throw new Error("The leaf does not exist in this tree")
                    }
                    var siblings = [];
                    var pathIndices = [];
                    var leafIndex = index;
                    for (var level = 0; level < this.depth; level += 1) {
                        var position = index % this.arity;
                        var levelStartIndex = index - position;
                        var levelEndIndex = levelStartIndex + this.arity;
                        pathIndices[level] = position;
                        siblings[level] = [];
                        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
                            if (i !== index) {
                                if (i < this.nodes[level].length) {
                                    siblings[level].push(this.nodes[level][i])
                                } else {
                                    siblings[level].push(this.zeroes[level])
                                }
                            }
                        }
                        index = Math.floor(index / this.arity)
                    }
                    return {
                        root: this.root,
                        leaf: this.nodes[0][leafIndex],
                        pathIndices: pathIndices,
                        siblings: siblings
                    }
                }
            }, {
                key: "verify",
                value: function verify(proof) {
                    var node = proof.leaf;
                    for (var i = 0; i < proof.siblings.length; i += 1) {
                        var children = proof.siblings[i].slice();
                        children.splice(proof.pathIndices[i], 0, node);
                        node = this.hashFn(children)
                    }
                    return proof.root === node
                }
            }, {
                key: "toString",
                value: function toString() {
                    return this.toTreeString()
                }
            }, {
                key: "toTreeString",
                value: function toTreeString() {
                    var obj = this.getLayersAsObject();
                    return treeify_1["default"].asTree(obj, true)
                }
            }]);
            return IncrementalMerkleTree
        }(Base_1["default"]);
        exports.IncrementalMerkleTree = IncrementalMerkleTree;
        if (typeof window !== "undefined") {
            window.IncrementalMerkleTree = IncrementalMerkleTree
        }
        exports["default"] = IncrementalMerkleTree
    }
    , {
        "./Base": 1,
        treeify: 45
    }],
    3: [function(require, module, exports) {
        "use strict";
        function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            }
            : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }
            ,
            _typeof(obj)
        }
        function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _iterableToArrayLimit(arr, i) {
            var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
            if (_i == null)
                return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _s, _e;
            try {
                for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i)
                        break
                }
            } catch (err) {
                _d = true;
                _e = err
            } finally {
                try {
                    if (!_n && _i["return"] != null)
                        _i["return"]()
                } finally {
                    if (_d)
                        throw _e
                }
            }
            return _arr
        }
        function _arrayWithHoles(arr) {
            if (Array.isArray(arr))
                return arr
        }
        function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
                return Array.from(iter)
        }
        function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr))
                return _arrayLikeToArray(arr)
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
            if (!it) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it)
                        o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length)
                                return {
                                    done: true
                                };
                            return {
                                done: false,
                                value: o[i++]
                            }
                        },
                        e: function e(_e2) {
                            throw _e2
                        },
                        f: F
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = it.call(o)
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step
                },
                e: function e(_e3) {
                    didErr = true;
                    err = _e3
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null)
                            it["return"]()
                    } finally {
                        if (didErr)
                            throw err
                    }
                }
            }
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o)
                return;
            if (typeof o === "string")
                return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
                n = o.constructor.name;
            if (n === "Map" || n === "Set")
                return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return _arrayLikeToArray(o, minLen)
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
                len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i]
            }
            return arr2
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value"in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
                writable: false
            });
            return Constructor
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function")
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: true,
                    configurable: true
                }
            });
            Object.defineProperty(subClass, "prototype", {
                writable: false
            });
            if (superClass)
                _setPrototypeOf(subClass, superClass)
        }
        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o
            }
            ;
            return _setPrototypeOf(o, p)
        }
        function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
                var Super = _getPrototypeOf(Derived), result;
                if (hasNativeReflectConstruct) {
                    var NewTarget = _getPrototypeOf(this).constructor;
                    result = Reflect.construct(Super, arguments, NewTarget)
                } else {
                    result = Super.apply(this, arguments)
                }
                return _possibleConstructorReturn(this, result)
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
                return call
            } else if (call !== void 0) {
                throw new TypeError("Derived constructors may only return object or undefined")
            }
            return _assertThisInitialized(self)
        }
        function _assertThisInitialized(self) {
            if (self === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
            return self
        }
        function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
                return false;
            if (Reflect.construct.sham)
                return false;
            if (typeof Proxy === "function")
                return true;
            try {
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
                return true
            } catch (e) {
                return false
            }
        }
        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o)
            }
            ;
            return _getPrototypeOf(o)
        }
        var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            }
        }
        ;
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.MerkleMountainRange = void 0;
        var buffer_1 = require("buffer");
        var sha256_1 = __importDefault(require("crypto-js/sha256"));
        var Base_1 = __importDefault(require("./Base"));
        var MerkleMountainRange = function(_Base_1$default) {
            _inherits(MerkleMountainRange, _Base_1$default);
            var _super = _createSuper(MerkleMountainRange);
            function MerkleMountainRange() {
                var _this;
                var hashFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sha256_1["default"];
                var leaves = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                var hashLeafFn = arguments.length > 2 ? arguments[2] : undefined;
                var peakBaggingFn = arguments.length > 3 ? arguments[3] : undefined;
                var hashBranchFn = arguments.length > 4 ? arguments[4] : undefined;
                _classCallCheck(this, MerkleMountainRange);
                _this = _super.call(this);
                _this.root = buffer_1.Buffer.alloc(0);
                _this.size = 0;
                _this.width = 0;
                _this.hashes = {};
                _this.data = {};
                leaves = leaves.map(_this.bufferify);
                _this.hashFn = _this.bufferifyFn(hashFn);
                _this.hashLeafFn = hashLeafFn;
                _this.peakBaggingFn = peakBaggingFn;
                _this.hashBranchFn = hashBranchFn;
                var _iterator = _createForOfIteratorHelper(leaves), _step;
                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var leaf = _step.value;
                        _this.append(leaf)
                    }
                } catch (err) {
                    _iterator.e(err)
                } finally {
                    _iterator.f()
                }
                return _this
            }
            _createClass(MerkleMountainRange, [{
                key: "append",
                value: function append(data) {
                    data = this.bufferify(data);
                    var dataHash = this.hashFn(data);
                    var dataHashHex = this.bufferToHex(dataHash);
                    if (!this.data[dataHashHex] || this.bufferToHex(this.hashFn(this.data[dataHashHex])) !== dataHashHex) {
                        this.data[dataHashHex] = data
                    }
                    var leaf = this.hashLeaf(this.size + 1, dataHash);
                    this.hashes[this.size + 1] = leaf;
                    this.width += 1;
                    var peakIndexes = this.getPeakIndexes(this.width);
                    this.size = this.getSize(this.width);
                    var peaks = [];
                    for (var i = 0; i < peakIndexes.length; i++) {
                        peaks[i] = this._getOrCreateNode(peakIndexes[i])
                    }
                    this.root = this.peakBagging(this.width, peaks)
                }
            }, {
                key: "hashLeaf",
                value: function hashLeaf(index, dataHash) {
                    dataHash = this.bufferify(dataHash);
                    if (this.hashLeafFn) {
                        return this.bufferify(this.hashLeafFn(index, dataHash))
                    }
                    return this.hashFn(buffer_1.Buffer.concat([this.bufferify(index), dataHash]))
                }
            }, {
                key: "hashBranch",
                value: function hashBranch(index, left, right) {
                    if (this.hashBranchFn) {
                        return this.bufferify(this.hashBranchFn(index, left, right))
                    }
                    return this.hashFn(buffer_1.Buffer.concat([this.bufferify(index), this.bufferify(left), this.bufferify(right)]))
                }
            }, {
                key: "getPeaks",
                value: function getPeaks() {
                    var peakIndexes = this.getPeakIndexes(this.width);
                    var peaks = [];
                    for (var i = 0; i < peakIndexes.length; i++) {
                        peaks[i] = this.hashes[peakIndexes[i]]
                    }
                    return peaks
                }
            }, {
                key: "getLeafIndex",
                value: function getLeafIndex(width) {
                    if (width % 2 === 1) {
                        return this.getSize(width)
                    }
                    return this.getSize(width - 1) + 1
                }
            }, {
                key: "getPeakIndexes",
                value: function getPeakIndexes(width) {
                    var numPeaks = this.numOfPeaks(width);
                    var peakIndexes = [];
                    var count = 0;
                    var size = 0;
                    for (var i = 255; i > 0; i--) {
                        if ((width & 1 << i - 1) !== 0) {
                            size = size + (1 << i) - 1;
                            peakIndexes[count++] = size;
                            if (peakIndexes.length >= numPeaks) {
                                break
                            }
                        }
                    }
                    if (count !== peakIndexes.length) {
                        throw new Error("invalid bit calculation")
                    }
                    return peakIndexes
                }
            }, {
                key: "numOfPeaks",
                value: function numOfPeaks(width) {
                    var bits = width;
                    var num = 0;
                    while (bits > 0) {
                        if (bits % 2 === 1) {
                            num++
                        }
                        bits = bits >> 1
                    }
                    return num
                }
            }, {
                key: "peakBagging",
                value: function peakBagging(width, peaks) {
                    var size = this.getSize(width);
                    if (this.numOfPeaks(width) !== peaks.length) {
                        throw new Error("received invalid number of peaks")
                    }
                    if (width === 0 && !peaks.length) {
                        return buffer_1.Buffer.alloc(0)
                    }
                    if (this.peakBaggingFn) {
                        return this.bufferify(this.peakBaggingFn(size, peaks))
                    }
                    return this.hashFn(buffer_1.Buffer.concat([this.bufferify(size)].concat(_toConsumableArray(peaks.map(this.bufferify)))))
                }
            }, {
                key: "getSize",
                value: function getSize(width) {
                    return (width << 1) - this.numOfPeaks(width)
                }
            }, {
                key: "getRoot",
                value: function getRoot() {
                    return this.root
                }
            }, {
                key: "getHexRoot",
                value: function getHexRoot() {
                    return this.bufferToHex(this.getRoot())
                }
            }, {
                key: "getNode",
                value: function getNode(index) {
                    return this.hashes[index]
                }
            }, {
                key: "mountainHeight",
                value: function mountainHeight(size) {
                    var height = 1;
                    while (1 << height <= size + height) {
                        height++
                    }
                    return height - 1
                }
            }, {
                key: "heightAt",
                value: function heightAt(index) {
                    var reducedIndex = index;
                    var peakIndex = 0;
                    var height = 0;
                    while (reducedIndex > peakIndex) {
                        reducedIndex -= (1 << height) - 1;
                        height = this.mountainHeight(reducedIndex);
                        peakIndex = (1 << height) - 1
                    }
                    return height - (peakIndex - reducedIndex)
                }
            }, {
                key: "isLeaf",
                value: function isLeaf(index) {
                    return this.heightAt(index) === 1
                }
            }, {
                key: "getChildren",
                value: function getChildren(index) {
                    var left = index - (1 << this.heightAt(index) - 1);
                    var right = index - 1;
                    if (left === right) {
                        throw new Error("not a parent")
                    }
                    return [left, right]
                }
            }, {
                key: "getMerkleProof",
                value: function getMerkleProof(index) {
                    if (index > this.size) {
                        throw new Error("out of range")
                    }
                    if (!this.isLeaf(index)) {
                        throw new Error("not a leaf")
                    }
                    var root = this.root;
                    var width = this.width;
                    var peaks = this.getPeakIndexes(this.width);
                    var peakBagging = [];
                    var cursor = 0;
                    for (var i = 0; i < peaks.length; i++) {
                        peakBagging[i] = this.hashes[peaks[i]];
                        if (peaks[i] >= index && cursor === 0) {
                            cursor = peaks[i]
                        }
                    }
                    var left = 0;
                    var right = 0;
                    var height = this.heightAt(cursor);
                    var siblings = [];
                    while (cursor !== index) {
                        height--;
                        var _this$getChildren = this.getChildren(cursor);
                        var _this$getChildren2 = _slicedToArray(_this$getChildren, 2);
                        left = _this$getChildren2[0];
                        right = _this$getChildren2[1];
                        cursor = index <= left ? left : right;
                        siblings[height - 1] = this.hashes[index <= left ? right : left]
                    }
                    return {
                        root: root,
                        width: width,
                        peakBagging: peakBagging,
                        siblings: siblings
                    }
                }
            }, {
                key: "verify",
                value: function verify(root, width, index, value, peaks, siblings) {
                    value = this.bufferify(value);
                    var size = this.getSize(width);
                    if (size < index) {
                        throw new Error("index is out of range")
                    }
                    if (!root.equals(this.peakBagging(width, peaks))) {
                        throw new Error("invalid root hash from the peaks")
                    }
                    var cursor = 0;
                    var targetPeak;
                    var peakIndexes = this.getPeakIndexes(width);
                    for (var i = 0; i < peakIndexes.length; i++) {
                        if (peakIndexes[i] >= index) {
                            targetPeak = peaks[i];
                            cursor = peakIndexes[i];
                            break
                        }
                    }
                    if (!targetPeak) {
                        throw new Error("target not found")
                    }
                    var height = siblings.length + 1;
                    var path = new Array(height);
                    var left = 0;
                    var right = 0;
                    while (height > 0) {
                        path[--height] = cursor;
                        if (cursor === index) {
                            break
                        } else {
                            var _this$getChildren3 = this.getChildren(cursor);
                            var _this$getChildren4 = _slicedToArray(_this$getChildren3, 2);
                            left = _this$getChildren4[0];
                            right = _this$getChildren4[1];
                            cursor = index > left ? right : left;
                            continue
                        }
                    }
                    var node;
                    while (height < path.length) {
                        cursor = path[height];
                        if (height === 0) {
                            node = this.hashLeaf(cursor, this.hashFn(value))
                        } else if (cursor - 1 === path[height - 1]) {
                            node = this.hashBranch(cursor, siblings[height - 1], node)
                        } else {
                            node = this.hashBranch(cursor, node, siblings[height - 1])
                        }
                        height++
                    }
                    if (!node.equals(targetPeak)) {
                        throw new Error("hashed peak is invalid")
                    }
                    return true
                }
            }, {
                key: "peaksToPeakMap",
                value: function peaksToPeakMap(width, peaks) {
                    var peakMap = {};
                    var bitIndex = 0;
                    var peakRef = 0;
                    var count = peaks.length;
                    for (var height = 1; height <= 32; height++) {
                        bitIndex = 32 - height;
                        peakRef = 1 << height - 1;
                        if ((width & peakRef) !== 0) {
                            peakMap[bitIndex] = peaks[--count]
                        } else {
                            peakMap[bitIndex] = 0
                        }
                    }
                    if (count !== 0) {
                        throw new Error("invalid number of peaks")
                    }
                    return peakMap
                }
            }, {
                key: "peakMapToPeaks",
                value: function peakMapToPeaks(width, peakMap) {
                    var arrLength = this.numOfPeaks(width);
                    var peaks = new Array(arrLength);
                    var count = 0;
                    for (var i = 0; i < 32; i++) {
                        if (peakMap[i] !== 0) {
                            peaks[count++] = peakMap[i]
                        }
                    }
                    if (count !== arrLength) {
                        throw new Error("invalid number of peaks")
                    }
                    return peaks
                }
            }, {
                key: "peakUpdate",
                value: function peakUpdate(width, prevPeakMap, itemHash) {
                    var nextPeakMap = {};
                    var newWidth = width + 1;
                    var cursorIndex = this.getLeafIndex(newWidth);
                    var cursorNode = this.hashLeaf(cursorIndex, itemHash);
                    var bitIndex = 0;
                    var peakRef = 0;
                    var prevPeakExist = false;
                    var nextPeakExist = false;
                    var obtained = false;
                    for (var height = 1; height <= 32; height++) {
                        bitIndex = 32 - height;
                        if (obtained) {
                            nextPeakMap[bitIndex] = prevPeakMap[bitIndex]
                        } else {
                            peakRef = 1 << height - 1;
                            prevPeakExist = (width & peakRef) !== 0;
                            nextPeakExist = (newWidth & peakRef) !== 0;
                            cursorIndex++;
                            if (prevPeakExist) {
                                cursorNode = this.hashBranch(cursorIndex, prevPeakMap[bitIndex], cursorNode)
                            }
                            if (nextPeakExist) {
                                if (prevPeakExist) {
                                    nextPeakMap[bitIndex] = prevPeakMap[bitIndex]
                                } else {
                                    nextPeakMap[bitIndex] = cursorNode
                                }
                                obtained = true
                            } else {
                                nextPeakMap[bitIndex] = 0
                            }
                        }
                    }
                    return nextPeakMap
                }
            }, {
                key: "rollUp",
                value: function rollUp(root, width, peaks, itemHashes) {
                    if (!root.equals(this.peakBagging(width, peaks))) {
                        throw new Error("invalid root hash from the peaks")
                    }
                    var tmpWidth = width;
                    var tmpPeakMap = this.peaksToPeakMap(width, peaks);
                    for (var i = 0; i < itemHashes.length; i++) {
                        tmpPeakMap = this.peakUpdate(tmpWidth, tmpPeakMap, itemHashes[i]);
                        tmpWidth++
                    }
                    return this.peakBagging(tmpWidth, this.peakMapToPeaks(tmpWidth, tmpPeakMap))
                }
            }, {
                key: "_getOrCreateNode",
                value: function _getOrCreateNode(index) {
                    if (index > this.size) {
                        throw new Error("out of range")
                    }
                    if (!this.hashes[index]) {
                        var _this$getChildren5 = this.getChildren(index)
                          , _this$getChildren6 = _slicedToArray(_this$getChildren5, 2)
                          , leftIndex = _this$getChildren6[0]
                          , rightIndex = _this$getChildren6[1];
                        var leftHash = this._getOrCreateNode(leftIndex);
                        var rightHash = this._getOrCreateNode(rightIndex);
                        this.hashes[index] = this.hashBranch(index, leftHash, rightHash)
                    }
                    return this.hashes[index]
                }
            }]);
            return MerkleMountainRange
        }(Base_1["default"]);
        exports.MerkleMountainRange = MerkleMountainRange;
        if (typeof window !== "undefined") {
            window.MerkleMountainRange = MerkleMountainRange
        }
        exports["default"] = MerkleMountainRange
    }
    , {
        "./Base": 1,
        buffer: 9,
        "crypto-js/sha256": 38
    }],
    4: [function(require, module, exports) {
        (function(Buffer) {
            (function() {
                "use strict";
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                        return typeof obj
                    }
                    : function(obj) {
                        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
                    }
                    ,
                    _typeof(obj)
                }
                function _createForOfIteratorHelper(o, allowArrayLike) {
                    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
                    if (!it) {
                        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                            if (it)
                                o = it;
                            var i = 0;
                            var F = function F() {};
                            return {
                                s: F,
                                n: function n() {
                                    if (i >= o.length)
                                        return {
                                            done: true
                                        };
                                    return {
                                        done: false,
                                        value: o[i++]
                                    }
                                },
                                e: function e(_e) {
                                    throw _e
                                },
                                f: F
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    var normalCompletion = true, didErr = false, err;
                    return {
                        s: function s() {
                            it = it.call(o)
                        },
                        n: function n() {
                            var step = it.next();
                            normalCompletion = step.done;
                            return step
                        },
                        e: function e(_e2) {
                            didErr = true;
                            err = _e2
                        },
                        f: function f() {
                            try {
                                if (!normalCompletion && it["return"] != null)
                                    it["return"]()
                            } finally {
                                if (didErr)
                                    throw err
                            }
                        }
                    }
                }
                function _unsupportedIterableToArray(o, minLen) {
                    if (!o)
                        return;
                    if (typeof o === "string")
                        return _arrayLikeToArray(o, minLen);
                    var n = Object.prototype.toString.call(o).slice(8, -1);
                    if (n === "Object" && o.constructor)
                        n = o.constructor.name;
                    if (n === "Map" || n === "Set")
                        return Array.from(o);
                    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return _arrayLikeToArray(o, minLen)
                }
                function _arrayLikeToArray(arr, len) {
                    if (len == null || len > arr.length)
                        len = arr.length;
                    for (var i = 0, arr2 = new Array(len); i < len; i++) {
                        arr2[i] = arr[i]
                    }
                    return arr2
                }
                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function")
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: true,
                            configurable: true
                        }
                    });
                    Object.defineProperty(subClass, "prototype", {
                        writable: false
                    });
                    if (superClass)
                        _setPrototypeOf(subClass, superClass)
                }
                function _setPrototypeOf(o, p) {
                    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
                        o.__proto__ = p;
                        return o
                    }
                    ;
                    return _setPrototypeOf(o, p)
                }
                function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                        var Super = _getPrototypeOf(Derived), result;
                        if (hasNativeReflectConstruct) {
                            var NewTarget = _getPrototypeOf(this).constructor;
                            result = Reflect.construct(Super, arguments, NewTarget)
                        } else {
                            result = Super.apply(this, arguments)
                        }
                        return _possibleConstructorReturn(this, result)
                    }
                }
                function _possibleConstructorReturn(self, call) {
                    if (call && (_typeof(call) === "object" || typeof call === "function")) {
                        return call
                    } else if (call !== void 0) {
                        throw new TypeError("Derived constructors may only return object or undefined")
                    }
                    return _assertThisInitialized(self)
                }
                function _assertThisInitialized(self) {
                    if (self === void 0) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                    }
                    return self
                }
                function _isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct)
                        return false;
                    if (Reflect.construct.sham)
                        return false;
                    if (typeof Proxy === "function")
                        return true;
                    try {
                        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
                        return true
                    } catch (e) {
                        return false
                    }
                }
                function _getPrototypeOf(o) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
                        return o.__proto__ || Object.getPrototypeOf(o)
                    }
                    ;
                    return _getPrototypeOf(o)
                }
                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value"in descriptor)
                            descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps)
                        _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                        _defineProperties(Constructor, staticProps);
                    Object.defineProperty(Constructor, "prototype", {
                        writable: false
                    });
                    return Constructor
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function")
                    }
                }
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.MerkleSumTree = exports.ProofStep = exports.Leaf = exports.Bucket = void 0;
                var Base_1 = require("./Base");
                var Bucket = _createClass(function Bucket(size, hashed) {
                    _classCallCheck(this, Bucket);
                    this.size = BigInt(size);
                    this.hashed = hashed;
                    this.parent = null;
                    this.left = null;
                    this.right = null
                });
                exports.Bucket = Bucket;
                var Leaf = function() {
                    function Leaf(hashFn, rng, data) {
                        _classCallCheck(this, Leaf);
                        this.hashFn = hashFn;
                        this.rng = rng.map(function(x) {
                            return BigInt(x)
                        });
                        this.data = data
                    }
                    _createClass(Leaf, [{
                        key: "getBucket",
                        value: function getBucket() {
                            var hashed;
                            if (this.data) {
                                hashed = this.hashFn(this.data)
                            } else {
                                hashed = Buffer.alloc(32)
                            }
                            return new Bucket(BigInt(this.rng[1]) - BigInt(this.rng[0]),hashed)
                        }
                    }]);
                    return Leaf
                }();
                exports.Leaf = Leaf;
                var ProofStep = _createClass(function ProofStep(bucket, right) {
                    _classCallCheck(this, ProofStep);
                    this.bucket = bucket;
                    this.right = right
                });
                exports.ProofStep = ProofStep;
                var MerkleSumTree = function(_Base_1$Base) {
                    _inherits(MerkleSumTree, _Base_1$Base);
                    var _super = _createSuper(MerkleSumTree);
                    function MerkleSumTree(leaves, hashFn) {
                        var _this;
                        _classCallCheck(this, MerkleSumTree);
                        _this = _super.call(this);
                        _this.leaves = leaves;
                        _this.hashFn = hashFn;
                        MerkleSumTree.checkConsecutive(leaves);
                        _this.buckets = [];
                        var _iterator = _createForOfIteratorHelper(leaves), _step;
                        try {
                            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                                var l = _step.value;
                                _this.buckets.push(l.getBucket())
                            }
                        } catch (err) {
                            _iterator.e(err)
                        } finally {
                            _iterator.f()
                        }
                        var buckets = [];
                        var _iterator2 = _createForOfIteratorHelper(_this.buckets), _step2;
                        try {
                            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                                var bucket = _step2.value;
                                buckets.push(bucket)
                            }
                        } catch (err) {
                            _iterator2.e(err)
                        } finally {
                            _iterator2.f()
                        }
                        while (buckets.length !== 1) {
                            var newBuckets = [];
                            while (buckets.length) {
                                if (buckets.length >= 2) {
                                    var b1 = buckets.shift();
                                    var b2 = buckets.shift();
                                    var size = b1.size + b2.size;
                                    var hashed = _this.hashFn(Buffer.concat([_this.sizeToBuffer(b1.size), _this.bufferify(b1.hashed), _this.sizeToBuffer(b2.size), _this.bufferify(b2.hashed)]));
                                    var b = new Bucket(size,hashed);
                                    b2.parent = b;
                                    b1.parent = b2.parent;
                                    b1.right = b2;
                                    b2.left = b1;
                                    newBuckets.push(b)
                                } else {
                                    newBuckets.push(buckets.shift())
                                }
                            }
                            buckets = newBuckets
                        }
                        _this.root = buckets[0];
                        return _this
                    }
                    _createClass(MerkleSumTree, [{
                        key: "sizeToBuffer",
                        value: function sizeToBuffer(size) {
                            var buf = Buffer.alloc(8);
                            var view = new DataView(buf.buffer);
                            view.setBigInt64(0, BigInt(size), false);
                            return buf
                        }
                    }, {
                        key: "getProof",
                        value: function getProof(index) {
                            var curr = this.buckets[Number(index)];
                            var proof = [];
                            while (curr && curr.parent) {
                                var right = !!curr.right;
                                var bucket = curr.right ? curr.right : curr.left;
                                curr = curr.parent;
                                proof.push(new ProofStep(bucket,right))
                            }
                            return proof
                        }
                    }, {
                        key: "sum",
                        value: function sum(arr) {
                            var total = BigInt(0);
                            var _iterator3 = _createForOfIteratorHelper(arr), _step3;
                            try {
                                for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                                    var value = _step3.value;
                                    total += BigInt(value)
                                }
                            } catch (err) {
                                _iterator3.e(err)
                            } finally {
                                _iterator3.f()
                            }
                            return total
                        }
                    }, {
                        key: "verifyProof",
                        value: function verifyProof(root, leaf, proof) {
                            var rng = [this.sum(proof.filter(function(x) {
                                return !x.right
                            }).map(function(x) {
                                return x.bucket.size
                            })), BigInt(root.size) - this.sum(proof.filter(function(x) {
                                return x.right
                            }).map(function(x) {
                                return x.bucket.size
                            }))];
                            if (!(rng[0] === leaf.rng[0] && rng[1] === leaf.rng[1])) {
                                return false
                            }
                            var curr = leaf.getBucket();
                            var hashed;
                            var _iterator4 = _createForOfIteratorHelper(proof), _step4;
                            try {
                                for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                                    var step = _step4.value;
                                    if (step.right) {
                                        hashed = this.hashFn(Buffer.concat([this.sizeToBuffer(curr.size), this.bufferify(curr.hashed), this.sizeToBuffer(step.bucket.size), this.bufferify(step.bucket.hashed)]))
                                    } else {
                                        hashed = this.hashFn(Buffer.concat([this.sizeToBuffer(step.bucket.size), this.bufferify(step.bucket.hashed), this.sizeToBuffer(curr.size), this.bufferify(curr.hashed)]))
                                    }
                                    curr = new Bucket(BigInt(curr.size) + BigInt(step.bucket.size),hashed)
                                }
                            } catch (err) {
                                _iterator4.e(err)
                            } finally {
                                _iterator4.f()
                            }
                            return curr.size === root.size && curr.hashed.toString("hex") === root.hashed.toString("hex")
                        }
                    }], [{
                        key: "checkConsecutive",
                        value: function checkConsecutive(leaves) {
                            var curr = BigInt(0);
                            var _iterator5 = _createForOfIteratorHelper(leaves), _step5;
                            try {
                                for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                                    var leaf = _step5.value;
                                    if (leaf.rng[0] !== curr) {
                                        throw new Error("leaf ranges are invalid")
                                    }
                                    curr = BigInt(leaf.rng[1])
                                }
                            } catch (err) {
                                _iterator5.e(err)
                            } finally {
                                _iterator5.f()
                            }
                        }
                    }]);
                    return MerkleSumTree
                }(Base_1.Base);
                exports.MerkleSumTree = MerkleSumTree
            }
            ).call(this)
        }
        ).call(this, require("buffer").Buffer)
    }
    , {
        "./Base": 1,
        buffer: 9
    }],
    5: [function(require, module, exports) {
        "use strict";
        function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            }
            : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }
            ,
            _typeof(obj)
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                })
            } else {
                obj[key] = value
            }
            return obj
        }
        function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _iterableToArrayLimit(arr, i) {
            var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
            if (_i == null)
                return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _s, _e;
            try {
                for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i)
                        break
                }
            } catch (err) {
                _d = true;
                _e = err
            } finally {
                try {
                    if (!_n && _i["return"] != null)
                        _i["return"]()
                } finally {
                    if (_d)
                        throw _e
                }
            }
            return _arr
        }
        function _arrayWithHoles(arr) {
            if (Array.isArray(arr))
                return arr
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
            if (!it) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it)
                        o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length)
                                return {
                                    done: true
                                };
                            return {
                                done: false,
                                value: o[i++]
                            }
                        },
                        e: function e(_e2) {
                            throw _e2
                        },
                        f: F
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = it.call(o)
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step
                },
                e: function e(_e3) {
                    didErr = true;
                    err = _e3
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null)
                            it["return"]()
                    } finally {
                        if (didErr)
                            throw err
                    }
                }
            }
        }
        function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o)
                return;
            if (typeof o === "string")
                return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
                n = o.constructor.name;
            if (n === "Map" || n === "Set")
                return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return _arrayLikeToArray(o, minLen)
        }
        function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
                return Array.from(iter)
        }
        function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr))
                return _arrayLikeToArray(arr)
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
                len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i]
            }
            return arr2
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value"in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
                writable: false
            });
            return Constructor
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function")
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: true,
                    configurable: true
                }
            });
            Object.defineProperty(subClass, "prototype", {
                writable: false
            });
            if (superClass)
                _setPrototypeOf(subClass, superClass)
        }
        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o
            }
            ;
            return _setPrototypeOf(o, p)
        }
        function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
                var Super = _getPrototypeOf(Derived), result;
                if (hasNativeReflectConstruct) {
                    var NewTarget = _getPrototypeOf(this).constructor;
                    result = Reflect.construct(Super, arguments, NewTarget)
                } else {
                    result = Super.apply(this, arguments)
                }
                return _possibleConstructorReturn(this, result)
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
                return call
            } else if (call !== void 0) {
                throw new TypeError("Derived constructors may only return object or undefined")
            }
            return _assertThisInitialized(self)
        }
        function _assertThisInitialized(self) {
            if (self === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
            return self
        }
        function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
                return false;
            if (Reflect.construct.sham)
                return false;
            if (typeof Proxy === "function")
                return true;
            try {
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
                return true
            } catch (e) {
                return false
            }
        }
        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o)
            }
            ;
            return _getPrototypeOf(o)
        }
        var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            }
        }
        ;
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.MerkleTree = void 0;
        var buffer_1 = require("buffer");
        var buffer_reverse_1 = __importDefault(require("buffer-reverse"));
        var sha256_1 = __importDefault(require("crypto-js/sha256"));
        var treeify_1 = __importDefault(require("treeify"));
        var Base_1 = __importDefault(require("./Base"));
        var MerkleTree = function(_Base_1$default) {
            _inherits(MerkleTree, _Base_1$default);
            var _super = _createSuper(MerkleTree);
            function MerkleTree(leaves) {
                var _this;
                var hashFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sha256_1["default"];
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                _classCallCheck(this, MerkleTree);
                _this = _super.call(this);
                _this.duplicateOdd = false;
                _this.concatenator = buffer_1.Buffer.concat;
                _this.hashLeaves = false;
                _this.isBitcoinTree = false;
                _this.leaves = [];
                _this.layers = [];
                _this.sortLeaves = false;
                _this.sortPairs = false;
                _this.sort = false;
                _this.fillDefaultHash = null;
                _this.complete = false;
                if (options.complete) {
                    if (options.isBitcoinTree) {
                        throw new Error('option "complete" is incompatible with "isBitcoinTree"')
                    }
                    if (options.duplicateOdd) {
                        throw new Error('option "complete" is incompatible with "duplicateOdd"')
                    }
                }
                _this.isBitcoinTree = !!options.isBitcoinTree;
                _this.hashLeaves = !!options.hashLeaves;
                _this.sortLeaves = !!options.sortLeaves;
                _this.sortPairs = !!options.sortPairs;
                _this.complete = !!options.complete;
                if (options.fillDefaultHash) {
                    if (typeof options.fillDefaultHash === "function") {
                        _this.fillDefaultHash = options.fillDefaultHash
                    } else if (buffer_1.Buffer.isBuffer(options.fillDefaultHash) || typeof options.fillDefaultHash === "string") {
                        _this.fillDefaultHash = function(idx, hashFn) {
                            return options.fillDefaultHash
                        }
                    } else {
                        throw new Error('method "fillDefaultHash" must be a function, Buffer, or string')
                    }
                }
                _this.sort = !!options.sort;
                if (_this.sort) {
                    _this.sortLeaves = true;
                    _this.sortPairs = true
                }
                _this.duplicateOdd = !!options.duplicateOdd;
                if (options.concatenator) {
                    _this.concatenator = options.concatenator
                }
                _this.hashFn = _this.bufferifyFn(hashFn);
                _this.processLeaves(leaves);
                return _this
            }
            _createClass(MerkleTree, [{
                key: "getOptions",
                value: function getOptions() {
                    var _a, _b;
                    return {
                        complete: this.complete,
                        isBitcoinTree: this.isBitcoinTree,
                        hashLeaves: this.hashLeaves,
                        sortLeaves: this.sortLeaves,
                        sortPairs: this.sortPairs,
                        sort: this.sort,
                        fillDefaultHash: (_b = (_a = this.fillDefaultHash) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : null,
                        duplicateOdd: this.duplicateOdd
                    }
                }
            }, {
                key: "processLeaves",
                value: function processLeaves(leaves) {
                    if (this.hashLeaves) {
                        leaves = leaves.map(this.hashFn)
                    }
                    this.leaves = leaves.map(this.bufferify);
                    if (this.sortLeaves) {
                        this.leaves = this.leaves.sort(buffer_1.Buffer.compare)
                    }
                    if (this.fillDefaultHash) {
                        for (var i = 0; i < Math.pow(2, Math.ceil(Math.log2(this.leaves.length))); i++) {
                            if (i >= this.leaves.length) {
                                this.leaves.push(this.bufferify(this.fillDefaultHash(i, this.hashFn)))
                            }
                        }
                    }
                    this.createHashes(this.leaves)
                }
            }, {
                key: "createHashes",
                value: function createHashes(nodes) {
                    this.layers = [nodes];
                    while (nodes.length > 1) {
                        var layerIndex = this.layers.length;
                        this.layers.push([]);
                        var layerLimit = this.complete && layerIndex === 1 && !Number.isInteger(Math.log2(nodes.length)) ? 2 * nodes.length - Math.pow(2, Math.ceil(Math.log2(nodes.length))) : nodes.length;
                        for (var i = 0; i < nodes.length; i += 2) {
                            if (i >= layerLimit) {
                                var _this$layers$layerInd;
                                (_this$layers$layerInd = this.layers[layerIndex]).push.apply(_this$layers$layerInd, _toConsumableArray(nodes.slice(layerLimit)));
                                break
                            } else if (i + 1 === nodes.length) {
                                if (nodes.length % 2 === 1) {
                                    var data = nodes[nodes.length - 1];
                                    var _hash = data;
                                    if (this.isBitcoinTree) {
                                        _hash = this.hashFn(this.concatenator([buffer_reverse_1["default"](data), buffer_reverse_1["default"](data)]));
                                        _hash = buffer_reverse_1["default"](this.hashFn(_hash));
                                        this.layers[layerIndex].push(_hash);
                                        continue
                                    } else {
                                        if (this.duplicateOdd) {} else {
                                            this.layers[layerIndex].push(nodes[i]);
                                            continue
                                        }
                                    }
                                }
                            }
                            var left = nodes[i];
                            var right = i + 1 === nodes.length ? left : nodes[i + 1];
                            var combined = null;
                            if (this.isBitcoinTree) {
                                combined = [buffer_reverse_1["default"](left), buffer_reverse_1["default"](right)]
                            } else {
                                combined = [left, right]
                            }
                            if (this.sortPairs) {
                                combined.sort(buffer_1.Buffer.compare)
                            }
                            var hash = this.hashFn(this.concatenator(combined));
                            if (this.isBitcoinTree) {
                                hash = buffer_reverse_1["default"](this.hashFn(hash))
                            }
                            this.layers[layerIndex].push(hash)
                        }
                        nodes = this.layers[layerIndex]
                    }
                }
            }, {
                key: "addLeaf",
                value: function addLeaf(leaf) {
                    var shouldHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    if (shouldHash) {
                        leaf = this.hashFn(leaf)
                    }
                    this.processLeaves(this.leaves.concat(leaf))
                }
            }, {
                key: "addLeaves",
                value: function addLeaves(leaves) {
                    var shouldHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    if (shouldHash) {
                        leaves = leaves.map(this.hashFn)
                    }
                    this.processLeaves(this.leaves.concat(leaves))
                }
            }, {
                key: "getLeaves",
                value: function getLeaves(values) {
                    var _this2 = this;
                    if (Array.isArray(values)) {
                        if (this.hashLeaves) {
                            values = values.map(this.hashFn);
                            if (this.sortLeaves) {
                                values = values.sort(buffer_1.Buffer.compare)
                            }
                        }
                        return this.leaves.filter(function(leaf) {
                            return _this2.bufferIndexOf(values, leaf, _this2.sortLeaves) !== -1
                        })
                    }
                    return this.leaves
                }
            }, {
                key: "getLeaf",
                value: function getLeaf(index) {
                    if (index < 0 || index > this.leaves.length - 1) {
                        return buffer_1.Buffer.from([])
                    }
                    return this.leaves[index]
                }
            }, {
                key: "getLeafIndex",
                value: function getLeafIndex(target) {
                    target = this.bufferify(target);
                    var leaves = this.getLeaves();
                    for (var i = 0; i < leaves.length; i++) {
                        var leaf = leaves[i];
                        if (leaf.equals(target)) {
                            return i
                        }
                    }
                    return -1
                }
            }, {
                key: "getLeafCount",
                value: function getLeafCount() {
                    return this.leaves.length
                }
            }, {
                key: "getHexLeaves",
                value: function getHexLeaves() {
                    var _this3 = this;
                    return this.leaves.map(function(leaf) {
                        return _this3.bufferToHex(leaf)
                    })
                }
            }, {
                key: "getLayers",
                value: function getLayers() {
                    return this.layers
                }
            }, {
                key: "getHexLayers",
                value: function getHexLayers() {
                    var _this4 = this;
                    return this.layers.reduce(function(acc, item) {
                        if (Array.isArray(item)) {
                            acc.push(item.map(function(layer) {
                                return _this4.bufferToHex(layer)
                            }))
                        } else {
                            acc.push(item)
                        }
                        return acc
                    }, [])
                }
            }, {
                key: "getLayersFlat",
                value: function getLayersFlat() {
                    var layers = this.layers.reduce(function(acc, item) {
                        if (Array.isArray(item)) {
                            acc.unshift.apply(acc, _toConsumableArray(item))
                        } else {
                            acc.unshift(item)
                        }
                        return acc
                    }, []);
                    layers.unshift(buffer_1.Buffer.from([0]));
                    return layers
                }
            }, {
                key: "getHexLayersFlat",
                value: function getHexLayersFlat() {
                    var _this5 = this;
                    return this.getLayersFlat().map(function(layer) {
                        return _this5.bufferToHex(layer)
                    })
                }
            }, {
                key: "getLayerCount",
                value: function getLayerCount() {
                    return this.getLayers().length
                }
            }, {
                key: "getRoot",
                value: function getRoot() {
                    if (this.layers.length === 0) {
                        return buffer_1.Buffer.from([])
                    }
                    return this.layers[this.layers.length - 1][0] || buffer_1.Buffer.from([])
                }
            }, {
                key: "getHexRoot",
                value: function getHexRoot() {
                    return this.bufferToHex(this.getRoot())
                }
            }, {
                key: "getProof",
                value: function getProof(leaf, index) {
                    if (typeof leaf === "undefined") {
                        throw new Error("leaf is required")
                    }
                    leaf = this.bufferify(leaf);
                    var proof = [];
                    if (!Number.isInteger(index)) {
                        index = -1;
                        for (var i = 0; i < this.leaves.length; i++) {
                            if (buffer_1.Buffer.compare(leaf, this.leaves[i]) === 0) {
                                index = i
                            }
                        }
                    }
                    if (index <= -1) {
                        return []
                    }
                    for (var _i = 0; _i < this.layers.length; _i++) {
                        var layer = this.layers[_i];
                        var isRightNode = index % 2;
                        var pairIndex = isRightNode ? index - 1 : this.isBitcoinTree && index === layer.length - 1 && _i < this.layers.length - 1 ? index : index + 1;
                        if (pairIndex < layer.length) {
                            proof.push({
                                position: isRightNode ? "left" : "right",
                                data: layer[pairIndex]
                            })
                        }
                        index = index / 2 | 0
                    }
                    return proof
                }
            }, {
                key: "getHexProof",
                value: function getHexProof(leaf, index) {
                    var _this6 = this;
                    return this.getProof(leaf, index).map(function(item) {
                        return _this6.bufferToHex(item.data)
                    })
                }
            }, {
                key: "getProofs",
                value: function getProofs() {
                    var proof = [];
                    var proofs = [];
                    this.getProofsDFS(this.layers.length - 1, 0, proof, proofs);
                    return proofs
                }
            }, {
                key: "getProofsDFS",
                value: function getProofsDFS(currentLayer, index, proof, proofs) {
                    var isRightNode = index % 2;
                    if (currentLayer === -1) {
                        if (!isRightNode)
                            proofs.push(_toConsumableArray(proof).reverse());
                        return
                    }
                    if (index >= this.layers[currentLayer].length)
                        return;
                    var layer = this.layers[currentLayer];
                    var pairIndex = isRightNode ? index - 1 : index + 1;
                    var pushed = false;
                    if (pairIndex < layer.length) {
                        pushed = true;
                        proof.push({
                            position: isRightNode ? "left" : "right",
                            data: layer[pairIndex]
                        })
                    }
                    var leftchildIndex = index * 2;
                    var rightchildIndex = index * 2 + 1;
                    this.getProofsDFS(currentLayer - 1, leftchildIndex, proof, proofs);
                    this.getProofsDFS(currentLayer - 1, rightchildIndex, proof, proofs);
                    if (pushed)
                        proof.splice(proof.length - 1, 1)
                }
            }, {
                key: "getHexProofs",
                value: function getHexProofs() {
                    var _this7 = this;
                    return this.getProofs().map(function(item) {
                        return _this7.bufferToHex(item.data)
                    })
                }
            }, {
                key: "getPositionalHexProof",
                value: function getPositionalHexProof(leaf, index) {
                    var _this8 = this;
                    return this.getProof(leaf, index).map(function(item) {
                        return [item.position === "left" ? 0 : 1, _this8.bufferToHex(item.data)]
                    })
                }
            }, {
                key: "getProofIndices",
                value: function getProofIndices(treeIndices, depth) {
                    var leafCount = Math.pow(2, depth);
                    var maximalIndices = new Set;
                    var _iterator = _createForOfIteratorHelper(treeIndices), _step;
                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                            var index = _step.value;
                            var x = leafCount + index;
                            while (x > 1) {
                                maximalIndices.add(x ^ 1);
                                x = x / 2 | 0
                            }
                        }
                    } catch (err) {
                        _iterator.e(err)
                    } finally {
                        _iterator.f()
                    }
                    var a = treeIndices.map(function(index) {
                        return leafCount + index
                    });
                    var b = Array.from(maximalIndices).sort(function(a, b) {
                        return a - b
                    }).reverse();
                    maximalIndices = a.concat(b);
                    var redundantIndices = new Set;
                    var proof = [];
                    var _iterator2 = _createForOfIteratorHelper(maximalIndices), _step2;
                    try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                            var _index = _step2.value;
                            if (!redundantIndices.has(_index)) {
                                proof.push(_index);
                                while (_index > 1) {
                                    redundantIndices.add(_index);
                                    if (!redundantIndices.has(_index ^ 1))
                                        break;
                                    _index = _index / 2 | 0
                                }
                            }
                        }
                    } catch (err) {
                        _iterator2.e(err)
                    } finally {
                        _iterator2.f()
                    }
                    return proof.filter(function(index) {
                        return !treeIndices.includes(index - leafCount)
                    })
                }
            }, {
                key: "getProofIndicesForUnevenTree",
                value: function getProofIndicesForUnevenTree(sortedLeafIndices, leavesCount) {
                    var depth = Math.ceil(Math.log2(leavesCount));
                    var unevenLayers = [];
                    for (var index = 0; index < depth; index++) {
                        var unevenLayer = leavesCount % 2 !== 0;
                        if (unevenLayer) {
                            unevenLayers.push({
                                index: index,
                                leavesCount: leavesCount
                            })
                        }
                        leavesCount = Math.ceil(leavesCount / 2)
                    }
                    var proofIndices = [];
                    var layerNodes = sortedLeafIndices;
                    var _loop = function _loop(layerIndex) {
                        var siblingIndices = layerNodes.map(function(index) {
                            if (index % 2 === 0) {
                                return index + 1
                            }
                            return index - 1
                        });
                        var proofNodeIndices = siblingIndices.filter(function(index) {
                            return !layerNodes.includes(index)
                        });
                        var unevenLayer = unevenLayers.find(function(_ref) {
                            var index = _ref.index;
                            return index === layerIndex
                        });
                        if (unevenLayer && layerNodes.includes(unevenLayer.leavesCount - 1)) {
                            proofNodeIndices = proofNodeIndices.slice(0, -1)
                        }
                        proofIndices.push(proofNodeIndices);
                        layerNodes = _toConsumableArray(new Set(layerNodes.map(function(index) {
                            if (index % 2 === 0) {
                                return index / 2
                            }
                            if (index % 2 === 0) {
                                return (index + 1) / 2
                            }
                            return (index - 1) / 2
                        })))
                    };
                    for (var layerIndex = 0; layerIndex < depth; layerIndex++) {
                        _loop(layerIndex)
                    }
                    return proofIndices
                }
            }, {
                key: "getMultiProof",
                value: function getMultiProof(tree, indices) {
                    var _this9 = this;
                    if (!this.complete) {
                        console.warn("Warning: For correct multiProofs it's strongly recommended to set complete: true")
                    }
                    if (!indices) {
                        indices = tree;
                        tree = this.getLayersFlat()
                    }
                    var isUneven = this.isUnevenTree();
                    if (isUneven) {
                        if (indices.every(Number.isInteger)) {
                            return this.getMultiProofForUnevenTree(indices)
                        }
                    }
                    if (!indices.every(Number.isInteger)) {
                        var els = indices;
                        if (this.sortPairs) {
                            els = els.sort(buffer_1.Buffer.compare)
                        }
                        var ids = els.map(function(el) {
                            return _this9.bufferIndexOf(_this9.leaves, el, _this9.sortLeaves)
                        }).sort(function(a, b) {
                            return a === b ? 0 : a > b ? 1 : -1
                        });
                        if (!ids.every(function(idx) {
                            return idx !== -1
                        })) {
                            throw new Error("Element does not exist in Merkle tree")
                        }
                        var hashes = [];
                        var proof = [];
                        var nextIds = [];
                        for (var i = 0; i < this.layers.length; i++) {
                            var layer = this.layers[i];
                            for (var j = 0; j < ids.length; j++) {
                                var idx = ids[j];
                                var pairElement = this.getPairNode(layer, idx);
                                hashes.push(layer[idx]);
                                if (pairElement) {
                                    proof.push(pairElement)
                                }
                                nextIds.push(idx / 2 | 0)
                            }
                            ids = nextIds.filter(function(value, i, self) {
                                return self.indexOf(value) === i
                            });
                            nextIds = []
                        }
                        return proof.filter(function(value) {
                            return !hashes.includes(value)
                        })
                    }
                    return this.getProofIndices(indices, Math.log2(tree.length / 2 | 0)).map(function(index) {
                        return tree[index]
                    })
                }
            }, {
                key: "getMultiProofForUnevenTree",
                value: function getMultiProofForUnevenTree(tree, indices) {
                    if (!indices) {
                        indices = tree;
                        tree = this.getLayers()
                    }
                    var proofHashes = [];
                    var currentLayerIndices = indices;
                    var _iterator3 = _createForOfIteratorHelper(tree), _step3;
                    try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                            var treeLayer = _step3.value;
                            var siblings = [];
                            var _iterator4 = _createForOfIteratorHelper(currentLayerIndices), _step4;
                            try {
                                for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                                    var index = _step4.value;
                                    if (index % 2 === 0) {
                                        var _idx = index + 1;
                                        if (!currentLayerIndices.includes(_idx)) {
                                            if (treeLayer[_idx]) {
                                                siblings.push(treeLayer[_idx]);
                                                continue
                                            }
                                        }
                                    }
                                    var idx = index - 1;
                                    if (!currentLayerIndices.includes(idx)) {
                                        if (treeLayer[idx]) {
                                            siblings.push(treeLayer[idx]);
                                            continue
                                        }
                                    }
                                }
                            } catch (err) {
                                _iterator4.e(err)
                            } finally {
                                _iterator4.f()
                            }
                            proofHashes = proofHashes.concat(siblings);
                            var uniqueIndices = new Set;
                            var _iterator5 = _createForOfIteratorHelper(currentLayerIndices), _step5;
                            try {
                                for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                                    var _index2 = _step5.value;
                                    if (_index2 % 2 === 0) {
                                        uniqueIndices.add(_index2 / 2);
                                        continue
                                    }
                                    if (_index2 % 2 === 0) {
                                        uniqueIndices.add((_index2 + 1) / 2);
                                        continue
                                    }
                                    uniqueIndices.add((_index2 - 1) / 2)
                                }
                            } catch (err) {
                                _iterator5.e(err)
                            } finally {
                                _iterator5.f()
                            }
                            currentLayerIndices = Array.from(uniqueIndices)
                        }
                    } catch (err) {
                        _iterator3.e(err)
                    } finally {
                        _iterator3.f()
                    }
                    return proofHashes
                }
            }, {
                key: "getHexMultiProof",
                value: function getHexMultiProof(tree, indices) {
                    var _this10 = this;
                    return this.getMultiProof(tree, indices).map(function(x) {
                        return _this10.bufferToHex(x)
                    })
                }
            }, {
                key: "getProofFlags",
                value: function getProofFlags(leaves, proofs) {
                    var _this11 = this;
                    if (!Array.isArray(leaves) || leaves.length <= 0) {
                        throw new Error("Invalid Inputs!")
                    }
                    var ids;
                    if (leaves.every(Number.isInteger)) {
                        ids = _toConsumableArray(leaves).sort(function(a, b) {
                            return a === b ? 0 : a > b ? 1 : -1
                        })
                    } else {
                        ids = leaves.map(function(el) {
                            return _this11.bufferIndexOf(_this11.leaves, el, _this11.sortLeaves)
                        }).sort(function(a, b) {
                            return a === b ? 0 : a > b ? 1 : -1
                        })
                    }
                    if (!ids.every(function(idx) {
                        return idx !== -1
                    })) {
                        throw new Error("Element does not exist in Merkle tree")
                    }
                    var _proofs = proofs.map(function(item) {
                        return _this11.bufferify(item)
                    });
                    var tested = [];
                    var flags = [];
                    var _loop2 = function _loop2(index) {
                        var layer = _this11.layers[index];
                        ids = ids.reduce(function(ids, idx) {
                            var skipped = tested.includes(layer[idx]);
                            if (!skipped) {
                                var pairElement = _this11.getPairNode(layer, idx);
                                var proofUsed = _proofs.includes(layer[idx]) || _proofs.includes(pairElement);
                                pairElement && flags.push(!proofUsed);
                                tested.push(layer[idx]);
                                tested.push(pairElement)
                            }
                            ids.push(idx / 2 | 0);
                            return ids
                        }, [])
                    };
                    for (var index = 0; index < this.layers.length; index++) {
                        _loop2(index)
                    }
                    return flags
                }
            }, {
                key: "verify",
                value: function verify(proof, targetNode, root) {
                    var hash = this.bufferify(targetNode);
                    root = this.bufferify(root);
                    if (!Array.isArray(proof) || !targetNode || !root) {
                        return false
                    }
                    for (var i = 0; i < proof.length; i++) {
                        var node = proof[i];
                        var data = null;
                        var isLeftNode = null;
                        if (typeof node === "string") {
                            data = this.bufferify(node);
                            isLeftNode = true
                        } else if (Array.isArray(node)) {
                            isLeftNode = node[0] === 0;
                            data = this.bufferify(node[1])
                        } else if (buffer_1.Buffer.isBuffer(node)) {
                            data = node;
                            isLeftNode = true
                        } else if (node instanceof Object) {
                            data = this.bufferify(node.data);
                            isLeftNode = node.position === "left"
                        } else {
                            throw new Error("Expected node to be of type string or object")
                        }
                        var buffers = [];
                        if (this.isBitcoinTree) {
                            buffers.push(buffer_reverse_1["default"](hash));
                            buffers[isLeftNode ? "unshift" : "push"](buffer_reverse_1["default"](data));
                            hash = this.hashFn(this.concatenator(buffers));
                            hash = buffer_reverse_1["default"](this.hashFn(hash))
                        } else {
                            if (this.sortPairs) {
                                if (buffer_1.Buffer.compare(hash, data) === -1) {
                                    buffers.push(hash, data);
                                    hash = this.hashFn(this.concatenator(buffers))
                                } else {
                                    buffers.push(data, hash);
                                    hash = this.hashFn(this.concatenator(buffers))
                                }
                            } else {
                                buffers.push(hash);
                                buffers[isLeftNode ? "unshift" : "push"](data);
                                hash = this.hashFn(this.concatenator(buffers))
                            }
                        }
                    }
                    return buffer_1.Buffer.compare(hash, root) === 0
                }
            }, {
                key: "verifyMultiProof",
                value: function verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof) {
                    var _this12 = this;
                    var isUneven = this.isUnevenTree();
                    if (isUneven) {
                        return this.verifyMultiProofForUnevenTree(root, proofIndices, proofLeaves, leavesCount, proof)
                    }
                    var depth = Math.ceil(Math.log2(leavesCount));
                    root = this.bufferify(root);
                    proofLeaves = proofLeaves.map(function(leaf) {
                        return _this12.bufferify(leaf)
                    });
                    proof = proof.map(function(leaf) {
                        return _this12.bufferify(leaf)
                    });
                    var tree = {};
                    var _iterator6 = _createForOfIteratorHelper(this.zip(proofIndices, proofLeaves)), _step6;
                    try {
                        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
                            var _step6$value = _slicedToArray(_step6.value, 2)
                              , _index3 = _step6$value[0]
                              , leaf = _step6$value[1];
                            tree[Math.pow(2, depth) + _index3] = leaf
                        }
                    } catch (err) {
                        _iterator6.e(err)
                    } finally {
                        _iterator6.f()
                    }
                    var _iterator7 = _createForOfIteratorHelper(this.zip(this.getProofIndices(proofIndices, depth), proof)), _step7;
                    try {
                        for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
                            var _step7$value = _slicedToArray(_step7.value, 2)
                              , _index4 = _step7$value[0]
                              , proofitem = _step7$value[1];
                            tree[_index4] = proofitem
                        }
                    } catch (err) {
                        _iterator7.e(err)
                    } finally {
                        _iterator7.f()
                    }
                    var indexqueue = Object.keys(tree).map(function(value) {
                        return +value
                    }).sort(function(a, b) {
                        return a - b
                    });
                    indexqueue = indexqueue.slice(0, indexqueue.length - 1);
                    var i = 0;
                    while (i < indexqueue.length) {
                        var index = indexqueue[i];
                        if (index >= 2 && {}.hasOwnProperty.call(tree, index ^ 1)) {
                            var pair = [tree[index - index % 2], tree[index - index % 2 + 1]];
                            if (this.sortPairs) {
                                pair = pair.sort(buffer_1.Buffer.compare)
                            }
                            var hash = pair[1] ? this.hashFn(this.concatenator(pair)) : pair[0];
                            tree[index / 2 | 0] = hash;
                            indexqueue.push(index / 2 | 0)
                        }
                        i += 1
                    }
                    return !proofIndices.length || {}.hasOwnProperty.call(tree, 1) && tree[1].equals(root)
                }
            }, {
                key: "verifyMultiProofWithFlags",
                value: function verifyMultiProofWithFlags(root, leaves, proofs, proofFlag) {
                    root = this.bufferify(root);
                    leaves = leaves.map(this.bufferify);
                    proofs = proofs.map(this.bufferify);
                    var leavesLen = leaves.length;
                    var totalHashes = proofFlag.length;
                    var hashes = [];
                    var leafPos = 0;
                    var hashPos = 0;
                    var proofPos = 0;
                    for (var i = 0; i < totalHashes; i++) {
                        var bufA = proofFlag[i] ? leafPos < leavesLen ? leaves[leafPos++] : hashes[hashPos++] : proofs[proofPos++];
                        var bufB = leafPos < leavesLen ? leaves[leafPos++] : hashes[hashPos++];
                        var buffers = [bufA, bufB].sort(buffer_1.Buffer.compare);
                        hashes[i] = this.hashFn(this.concatenator(buffers))
                    }
                    return buffer_1.Buffer.compare(hashes[totalHashes - 1], root) === 0
                }
            }, {
                key: "verifyMultiProofForUnevenTree",
                value: function verifyMultiProofForUnevenTree(root, indices, leaves, leavesCount, proof) {
                    var _this13 = this;
                    root = this.bufferify(root);
                    leaves = leaves.map(function(leaf) {
                        return _this13.bufferify(leaf)
                    });
                    proof = proof.map(function(leaf) {
                        return _this13.bufferify(leaf)
                    });
                    var computedRoot = this.calculateRootForUnevenTree(indices, leaves, leavesCount, proof);
                    return root.equals(computedRoot)
                }
            }, {
                key: "getDepth",
                value: function getDepth() {
                    return this.getLayers().length - 1
                }
            }, {
                key: "getLayersAsObject",
                value: function getLayersAsObject() {
                    var _this14 = this;
                    var layers = this.getLayers().map(function(layer) {
                        return layer.map(function(value) {
                            return _this14.bufferToHex(value, false)
                        })
                    });
                    var objs = [];
                    for (var i = 0; i < layers.length; i++) {
                        var arr = [];
                        for (var j = 0; j < layers[i].length; j++) {
                            var obj = _defineProperty({}, layers[i][j], null);
                            if (objs.length) {
                                obj[layers[i][j]] = {};
                                var a = objs.shift();
                                var akey = Object.keys(a)[0];
                                obj[layers[i][j]][akey] = a[akey];
                                if (objs.length) {
                                    var b = objs.shift();
                                    var bkey = Object.keys(b)[0];
                                    obj[layers[i][j]][bkey] = b[bkey]
                                }
                            }
                            arr.push(obj)
                        }
                        objs.push.apply(objs, arr)
                    }
                    return objs[0]
                }
            }, {
                key: "resetTree",
                value: function resetTree() {
                    this.leaves = [];
                    this.layers = []
                }
            }, {
                key: "getPairNode",
                value: function getPairNode(layer, idx) {
                    var pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
                    if (pairIdx < layer.length) {
                        return layer[pairIdx]
                    } else {
                        return null
                    }
                }
            }, {
                key: "toTreeString",
                value: function toTreeString() {
                    var obj = this.getLayersAsObject();
                    return treeify_1["default"].asTree(obj, true)
                }
            }, {
                key: "toString",
                value: function toString() {
                    return this.toTreeString()
                }
            }, {
                key: "isUnevenTree",
                value: function isUnevenTree(treeLayers) {
                    var depth = (treeLayers === null || treeLayers === void 0 ? void 0 : treeLayers.length) || this.getDepth();
                    return !this.isPowOf2(depth)
                }
            }, {
                key: "isPowOf2",
                value: function isPowOf2(v) {
                    return v && !(v & v - 1)
                }
            }, {
                key: "calculateRootForUnevenTree",
                value: function calculateRootForUnevenTree(leafIndices, leafHashes, totalLeavesCount, proofHashes) {
                    var leafTuples = this.zip(leafIndices, leafHashes).sort(function(_ref2, _ref3) {
                        var _ref4 = _slicedToArray(_ref2, 1)
                          , indexA = _ref4[0];
                        var _ref5 = _slicedToArray(_ref3, 1)
                          , indexB = _ref5[0];
                        return indexA - indexB
                    });
                    var leafTupleIndices = leafTuples.map(function(_ref6) {
                        var _ref7 = _slicedToArray(_ref6, 1)
                          , index = _ref7[0];
                        return index
                    });
                    var proofIndices = this.getProofIndicesForUnevenTree(leafTupleIndices, totalLeavesCount);
                    var nextSliceStart = 0;
                    var proofTuplesByLayers = [];
                    for (var i = 0; i < proofIndices.length; i++) {
                        var indices = proofIndices[i];
                        var sliceStart = nextSliceStart;
                        nextSliceStart += indices.length;
                        proofTuplesByLayers[i] = this.zip(indices, proofHashes.slice(sliceStart, nextSliceStart))
                    }
                    var tree = [leafTuples];
                    for (var layerIndex = 0; layerIndex < proofTuplesByLayers.length; layerIndex++) {
                        var currentLayer = proofTuplesByLayers[layerIndex].concat(tree[layerIndex]).sort(function(_ref8, _ref9) {
                            var _ref10 = _slicedToArray(_ref8, 1)
                              , indexA = _ref10[0];
                            var _ref11 = _slicedToArray(_ref9, 1)
                              , indexB = _ref11[0];
                            return indexA - indexB
                        }).map(function(_ref12) {
                            var _ref13 = _slicedToArray(_ref12, 2)
                              , hash = _ref13[1];
                            return hash
                        });
                        var s = tree[layerIndex].map(function(_ref14) {
                            var _ref15 = _slicedToArray(_ref14, 1)
                              , layerIndex = _ref15[0];
                            return layerIndex
                        });
                        var parentIndices = _toConsumableArray(new Set(s.map(function(index) {
                            if (index % 2 === 0) {
                                return index / 2
                            }
                            if (index % 2 === 0) {
                                return (index + 1) / 2
                            }
                            return (index - 1) / 2
                        })));
                        var parentLayer = [];
                        for (var _i2 = 0; _i2 < parentIndices.length; _i2++) {
                            var parentNodeTreeIndex = parentIndices[_i2];
                            var bufA = currentLayer[_i2 * 2];
                            var bufB = currentLayer[_i2 * 2 + 1];
                            var hash = bufB ? this.hashFn(this.concatenator([bufA, bufB])) : bufA;
                            parentLayer.push([parentNodeTreeIndex, hash])
                        }
                        tree.push(parentLayer)
                    }
                    return tree[tree.length - 1][0][1]
                }
            }], [{
                key: "marshalLeaves",
                value: function marshalLeaves(leaves) {
                    return JSON.stringify(leaves.map(function(leaf) {
                        return MerkleTree.bufferToHex(leaf)
                    }), null, 2)
                }
            }, {
                key: "unmarshalLeaves",
                value: function unmarshalLeaves(jsonStr) {
                    var parsed = null;
                    if (typeof jsonStr === "string") {
                        parsed = JSON.parse(jsonStr)
                    } else if (jsonStr instanceof Object) {
                        parsed = jsonStr
                    } else {
                        throw new Error("Expected type of string or object")
                    }
                    if (!parsed) {
                        return []
                    }
                    if (!Array.isArray(parsed)) {
                        throw new Error("Expected JSON string to be array")
                    }
                    return parsed.map(MerkleTree.bufferify)
                }
            }, {
                key: "marshalProof",
                value: function marshalProof(proof) {
                    var json = proof.map(function(item) {
                        if (typeof item === "string") {
                            return item
                        }
                        if (buffer_1.Buffer.isBuffer(item)) {
                            return MerkleTree.bufferToHex(item)
                        }
                        return {
                            position: item.position,
                            data: MerkleTree.bufferToHex(item.data)
                        }
                    });
                    return JSON.stringify(json, null, 2)
                }
            }, {
                key: "unmarshalProof",
                value: function unmarshalProof(jsonStr) {
                    var parsed = null;
                    if (typeof jsonStr === "string") {
                        parsed = JSON.parse(jsonStr)
                    } else if (jsonStr instanceof Object) {
                        parsed = jsonStr
                    } else {
                        throw new Error("Expected type of string or object")
                    }
                    if (!parsed) {
                        return []
                    }
                    if (!Array.isArray(parsed)) {
                        throw new Error("Expected JSON string to be array")
                    }
                    return parsed.map(function(item) {
                        if (typeof item === "string") {
                            return MerkleTree.bufferify(item)
                        } else if (item instanceof Object) {
                            return {
                                position: item.position,
                                data: MerkleTree.bufferify(item.data)
                            }
                        } else {
                            throw new Error("Expected item to be of type string or object")
                        }
                    })
                }
            }, {
                key: "marshalTree",
                value: function marshalTree(tree) {
                    var root = tree.getHexRoot();
                    var leaves = tree.leaves.map(function(leaf) {
                        return MerkleTree.bufferToHex(leaf)
                    });
                    var layers = tree.getHexLayers();
                    var options = tree.getOptions();
                    return JSON.stringify({
                        options: options,
                        root: root,
                        layers: layers,
                        leaves: leaves
                    }, null, 2)
                }
            }, {
                key: "unmarshalTree",
                value: function unmarshalTree(jsonStr) {
                    var hashFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sha256_1["default"];
                    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    var parsed = null;
                    if (typeof jsonStr === "string") {
                        parsed = JSON.parse(jsonStr)
                    } else if (jsonStr instanceof Object) {
                        parsed = jsonStr
                    } else {
                        throw new Error("Expected type of string or object")
                    }
                    if (!parsed) {
                        throw new Error("could not parse json")
                    }
                    options = Object.assign({}, parsed.options || {}, options);
                    return new MerkleTree(parsed.leaves,hashFn,options)
                }
            }, {
                key: "verify",
                value: function verify(proof, targetNode, root) {
                    var hashFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sha256_1["default"];
                    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
                    var tree = new MerkleTree([],hashFn,options);
                    return tree.verify(proof, targetNode, root)
                }
            }, {
                key: "getMultiProof",
                value: function getMultiProof(tree, indices) {
                    var t = new MerkleTree([]);
                    return t.getMultiProof(tree, indices)
                }
            }]);
            return MerkleTree
        }(Base_1["default"]);
        exports.MerkleTree = MerkleTree;
        if (typeof window !== "undefined") {
            window.MerkleTree = MerkleTree
        }
        exports["default"] = MerkleTree
    }
    , {
        "./Base": 1,
        buffer: 9,
        "buffer-reverse": 8,
        "crypto-js/sha256": 38,
        treeify: 45
    }],
    6: [function(require, module, exports) {
        "use strict";
        var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            }
        }
        ;
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.MerkleTree = void 0;
        var MerkleTree_1 = __importDefault(require("./MerkleTree"));
        exports.MerkleTree = MerkleTree_1["default"];
        var MerkleMountainRange_1 = require("./MerkleMountainRange");
        Object.defineProperty(exports, "MerkleMountainRange", {
            enumerable: true,
            get: function get() {
                return MerkleMountainRange_1.MerkleMountainRange
            }
        });
        var IncrementalMerkleTree_1 = require("./IncrementalMerkleTree");
        Object.defineProperty(exports, "IncrementalMerkleTree", {
            enumerable: true,
            get: function get() {
                return IncrementalMerkleTree_1.IncrementalMerkleTree
            }
        });
        var MerkleSumTree_1 = require("./MerkleSumTree");
        Object.defineProperty(exports, "MerkleSumTree", {
            enumerable: true,
            get: function get() {
                return MerkleSumTree_1.MerkleSumTree
            }
        });
        exports["default"] = MerkleTree_1["default"]
    }
    , {
        "./IncrementalMerkleTree": 2,
        "./MerkleMountainRange": 3,
        "./MerkleSumTree": 4,
        "./MerkleTree": 5
    }],
    7: [function(require, module, exports) {
        "use strict";
        exports.byteLength = byteLength;
        exports.toByteArray = toByteArray;
        exports.fromByteArray = fromByteArray;
        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
            lookup[i] = code[i];
            revLookup[code.charCodeAt(i)] = i
        }
        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;
        function getLens(b64) {
            var len = b64.length;
            if (len % 4 > 0) {
                throw new Error("Invalid string. Length must be a multiple of 4")
            }
            var validLen = b64.indexOf("=");
            if (validLen === -1)
                validLen = len;
            var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
            return [validLen, placeHoldersLen]
        }
        function byteLength(b64) {
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen
        }
        function _byteLength(b64, validLen, placeHoldersLen) {
            return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen
        }
        function toByteArray(b64) {
            var tmp;
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
            var curByte = 0;
            var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
            var i;
            for (i = 0; i < len; i += 4) {
                tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
                arr[curByte++] = tmp >> 16 & 255;
                arr[curByte++] = tmp >> 8 & 255;
                arr[curByte++] = tmp & 255
            }
            if (placeHoldersLen === 2) {
                tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
                arr[curByte++] = tmp & 255
            }
            if (placeHoldersLen === 1) {
                tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
                arr[curByte++] = tmp >> 8 & 255;
                arr[curByte++] = tmp & 255
            }
            return arr
        }
        function tripletToBase64(num) {
            return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63]
        }
        function encodeChunk(uint8, start, end) {
            var tmp;
            var output = [];
            for (var i = start; i < end; i += 3) {
                tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
                output.push(tripletToBase64(tmp))
            }
            return output.join("")
        }
        function fromByteArray(uint8) {
            var tmp;
            var len = uint8.length;
            var extraBytes = len % 3;
            var parts = [];
            var maxChunkLength = 16383;
            for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength))
            }
            if (extraBytes === 1) {
                tmp = uint8[len - 1];
                parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==")
            } else if (extraBytes === 2) {
                tmp = (uint8[len - 2] << 8) + uint8[len - 1];
                parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=")
            }
            return parts.join("")
        }
    }
    , {}],
    8: [function(require, module, exports) {
        (function(Buffer) {
            (function() {
                module.exports = function reverse(src) {
                    var buffer = new Buffer(src.length);
                    for (var i = 0, j = src.length - 1; i <= j; ++i,
                    --j) {
                        buffer[i] = src[j];
                        buffer[j] = src[i]
                    }
                    return buffer
                }
            }
            ).call(this)
        }
        ).call(this, require("buffer").Buffer)
    }
    , {
        buffer: 9
    }],
    9: [function(require, module, exports) {
        (function(Buffer) {
            (function() {
                "use strict";
                var base64 = require("base64-js");
                var ieee754 = require("ieee754");
                exports.Buffer = Buffer;
                exports.SlowBuffer = SlowBuffer;
                exports.INSPECT_MAX_BYTES = 50;
                var K_MAX_LENGTH = 2147483647;
                exports.kMaxLength = K_MAX_LENGTH;
                Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
                if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
                    console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.")
                }
                function typedArraySupport() {
                    try {
                        var arr = new Uint8Array(1);
                        arr.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        };
                        return arr.foo() === 42
                    } catch (e) {
                        return false
                    }
                }
                Object.defineProperty(Buffer.prototype, "parent", {
                    enumerable: true,
                    get: function() {
                        if (!Buffer.isBuffer(this))
                            return undefined;
                        return this.buffer
                    }
                });
                Object.defineProperty(Buffer.prototype, "offset", {
                    enumerable: true,
                    get: function() {
                        if (!Buffer.isBuffer(this))
                            return undefined;
                        return this.byteOffset
                    }
                });
                function createBuffer(length) {
                    if (length > K_MAX_LENGTH) {
                        throw new RangeError('The value "' + length + '" is invalid for option "size"')
                    }
                    var buf = new Uint8Array(length);
                    buf.__proto__ = Buffer.prototype;
                    return buf
                }
                function Buffer(arg, encodingOrOffset, length) {
                    if (typeof arg === "number") {
                        if (typeof encodingOrOffset === "string") {
                            throw new TypeError('The "string" argument must be of type string. Received type number')
                        }
                        return allocUnsafe(arg)
                    }
                    return from(arg, encodingOrOffset, length)
                }
                if (typeof Symbol !== "undefined" && Symbol.species != null && Buffer[Symbol.species] === Buffer) {
                    Object.defineProperty(Buffer, Symbol.species, {
                        value: null,
                        configurable: true,
                        enumerable: false,
                        writable: false
                    })
                }
                Buffer.poolSize = 8192;
                function from(value, encodingOrOffset, length) {
                    if (typeof value === "string") {
                        return fromString(value, encodingOrOffset)
                    }
                    if (ArrayBuffer.isView(value)) {
                        return fromArrayLike(value)
                    }
                    if (value == null) {
                        throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof value)
                    }
                    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
                        return fromArrayBuffer(value, encodingOrOffset, length)
                    }
                    if (typeof value === "number") {
                        throw new TypeError('The "value" argument must not be of type number. Received type number')
                    }
                    var valueOf = value.valueOf && value.valueOf();
                    if (valueOf != null && valueOf !== value) {
                        return Buffer.from(valueOf, encodingOrOffset, length)
                    }
                    var b = fromObject(value);
                    if (b)
                        return b;
                    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
                        return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length)
                    }
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof value)
                }
                Buffer.from = function(value, encodingOrOffset, length) {
                    return from(value, encodingOrOffset, length)
                }
                ;
                Buffer.prototype.__proto__ = Uint8Array.prototype;
                Buffer.__proto__ = Uint8Array;
                function assertSize(size) {
                    if (typeof size !== "number") {
                        throw new TypeError('"size" argument must be of type number')
                    } else if (size < 0) {
                        throw new RangeError('The value "' + size + '" is invalid for option "size"')
                    }
                }
                function alloc(size, fill, encoding) {
                    assertSize(size);
                    if (size <= 0) {
                        return createBuffer(size)
                    }
                    if (fill !== undefined) {
                        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill)
                    }
                    return createBuffer(size)
                }
                Buffer.alloc = function(size, fill, encoding) {
                    return alloc(size, fill, encoding)
                }
                ;
                function allocUnsafe(size) {
                    assertSize(size);
                    return createBuffer(size < 0 ? 0 : checked(size) | 0)
                }
                Buffer.allocUnsafe = function(size) {
                    return allocUnsafe(size)
                }
                ;
                Buffer.allocUnsafeSlow = function(size) {
                    return allocUnsafe(size)
                }
                ;
                function fromString(string, encoding) {
                    if (typeof encoding !== "string" || encoding === "") {
                        encoding = "utf8"
                    }
                    if (!Buffer.isEncoding(encoding)) {
                        throw new TypeError("Unknown encoding: " + encoding)
                    }
                    var length = byteLength(string, encoding) | 0;
                    var buf = createBuffer(length);
                    var actual = buf.write(string, encoding);
                    if (actual !== length) {
                        buf = buf.slice(0, actual)
                    }
                    return buf
                }
                function fromArrayLike(array) {
                    var length = array.length < 0 ? 0 : checked(array.length) | 0;
                    var buf = createBuffer(length);
                    for (var i = 0; i < length; i += 1) {
                        buf[i] = array[i] & 255
                    }
                    return buf
                }
                function fromArrayBuffer(array, byteOffset, length) {
                    if (byteOffset < 0 || array.byteLength < byteOffset) {
                        throw new RangeError('"offset" is outside of buffer bounds')
                    }
                    if (array.byteLength < byteOffset + (length || 0)) {
                        throw new RangeError('"length" is outside of buffer bounds')
                    }
                    var buf;
                    if (byteOffset === undefined && length === undefined) {
                        buf = new Uint8Array(array)
                    } else if (length === undefined) {
                        buf = new Uint8Array(array,byteOffset)
                    } else {
                        buf = new Uint8Array(array,byteOffset,length)
                    }
                    buf.__proto__ = Buffer.prototype;
                    return buf
                }
                function fromObject(obj) {
                    if (Buffer.isBuffer(obj)) {
                        var len = checked(obj.length) | 0;
                        var buf = createBuffer(len);
                        if (buf.length === 0) {
                            return buf
                        }
                        obj.copy(buf, 0, 0, len);
                        return buf
                    }
                    if (obj.length !== undefined) {
                        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
                            return createBuffer(0)
                        }
                        return fromArrayLike(obj)
                    }
                    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
                        return fromArrayLike(obj.data)
                    }
                }
                function checked(length) {
                    if (length >= K_MAX_LENGTH) {
                        throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + K_MAX_LENGTH.toString(16) + " bytes")
                    }
                    return length | 0
                }
                function SlowBuffer(length) {
                    if (+length != length) {
                        length = 0
                    }
                    return Buffer.alloc(+length)
                }
                Buffer.isBuffer = function isBuffer(b) {
                    return b != null && b._isBuffer === true && b !== Buffer.prototype
                }
                ;
                Buffer.compare = function compare(a, b) {
                    if (isInstance(a, Uint8Array))
                        a = Buffer.from(a, a.offset, a.byteLength);
                    if (isInstance(b, Uint8Array))
                        b = Buffer.from(b, b.offset, b.byteLength);
                    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
                        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')
                    }
                    if (a === b)
                        return 0;
                    var x = a.length;
                    var y = b.length;
                    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                        if (a[i] !== b[i]) {
                            x = a[i];
                            y = b[i];
                            break
                        }
                    }
                    if (x < y)
                        return -1;
                    if (y < x)
                        return 1;
                    return 0
                }
                ;
                Buffer.isEncoding = function isEncoding(encoding) {
                    switch (String(encoding).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return true;
                    default:
                        return false
                    }
                }
                ;
                Buffer.concat = function concat(list, length) {
                    if (!Array.isArray(list)) {
                        throw new TypeError('"list" argument must be an Array of Buffers')
                    }
                    if (list.length === 0) {
                        return Buffer.alloc(0)
                    }
                    var i;
                    if (length === undefined) {
                        length = 0;
                        for (i = 0; i < list.length; ++i) {
                            length += list[i].length
                        }
                    }
                    var buffer = Buffer.allocUnsafe(length);
                    var pos = 0;
                    for (i = 0; i < list.length; ++i) {
                        var buf = list[i];
                        if (isInstance(buf, Uint8Array)) {
                            buf = Buffer.from(buf)
                        }
                        if (!Buffer.isBuffer(buf)) {
                            throw new TypeError('"list" argument must be an Array of Buffers')
                        }
                        buf.copy(buffer, pos);
                        pos += buf.length
                    }
                    return buffer
                }
                ;
                function byteLength(string, encoding) {
                    if (Buffer.isBuffer(string)) {
                        return string.length
                    }
                    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
                        return string.byteLength
                    }
                    if (typeof string !== "string") {
                        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + "Received type " + typeof string)
                    }
                    var len = string.length;
                    var mustMatch = arguments.length > 2 && arguments[2] === true;
                    if (!mustMatch && len === 0)
                        return 0;
                    var loweredCase = false;
                    for (; ; ) {
                        switch (encoding) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return len;
                        case "utf8":
                        case "utf-8":
                            return utf8ToBytes(string).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return len * 2;
                        case "hex":
                            return len >>> 1;
                        case "base64":
                            return base64ToBytes(string).length;
                        default:
                            if (loweredCase) {
                                return mustMatch ? -1 : utf8ToBytes(string).length
                            }
                            encoding = ("" + encoding).toLowerCase();
                            loweredCase = true
                        }
                    }
                }
                Buffer.byteLength = byteLength;
                function slowToString(encoding, start, end) {
                    var loweredCase = false;
                    if (start === undefined || start < 0) {
                        start = 0
                    }
                    if (start > this.length) {
                        return ""
                    }
                    if (end === undefined || end > this.length) {
                        end = this.length
                    }
                    if (end <= 0) {
                        return ""
                    }
                    end >>>= 0;
                    start >>>= 0;
                    if (end <= start) {
                        return ""
                    }
                    if (!encoding)
                        encoding = "utf8";
                    while (true) {
                        switch (encoding) {
                        case "hex":
                            return hexSlice(this, start, end);
                        case "utf8":
                        case "utf-8":
                            return utf8Slice(this, start, end);
                        case "ascii":
                            return asciiSlice(this, start, end);
                        case "latin1":
                        case "binary":
                            return latin1Slice(this, start, end);
                        case "base64":
                            return base64Slice(this, start, end);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return utf16leSlice(this, start, end);
                        default:
                            if (loweredCase)
                                throw new TypeError("Unknown encoding: " + encoding);
                            encoding = (encoding + "").toLowerCase();
                            loweredCase = true
                        }
                    }
                }
                Buffer.prototype._isBuffer = true;
                function swap(b, n, m) {
                    var i = b[n];
                    b[n] = b[m];
                    b[m] = i
                }
                Buffer.prototype.swap16 = function swap16() {
                    var len = this.length;
                    if (len % 2 !== 0) {
                        throw new RangeError("Buffer size must be a multiple of 16-bits")
                    }
                    for (var i = 0; i < len; i += 2) {
                        swap(this, i, i + 1)
                    }
                    return this
                }
                ;
                Buffer.prototype.swap32 = function swap32() {
                    var len = this.length;
                    if (len % 4 !== 0) {
                        throw new RangeError("Buffer size must be a multiple of 32-bits")
                    }
                    for (var i = 0; i < len; i += 4) {
                        swap(this, i, i + 3);
                        swap(this, i + 1, i + 2)
                    }
                    return this
                }
                ;
                Buffer.prototype.swap64 = function swap64() {
                    var len = this.length;
                    if (len % 8 !== 0) {
                        throw new RangeError("Buffer size must be a multiple of 64-bits")
                    }
                    for (var i = 0; i < len; i += 8) {
                        swap(this, i, i + 7);
                        swap(this, i + 1, i + 6);
                        swap(this, i + 2, i + 5);
                        swap(this, i + 3, i + 4)
                    }
                    return this
                }
                ;
                Buffer.prototype.toString = function toString() {
                    var length = this.length;
                    if (length === 0)
                        return "";
                    if (arguments.length === 0)
                        return utf8Slice(this, 0, length);
                    return slowToString.apply(this, arguments)
                }
                ;
                Buffer.prototype.toLocaleString = Buffer.prototype.toString;
                Buffer.prototype.equals = function equals(b) {
                    if (!Buffer.isBuffer(b))
                        throw new TypeError("Argument must be a Buffer");
                    if (this === b)
                        return true;
                    return Buffer.compare(this, b) === 0
                }
                ;
                Buffer.prototype.inspect = function inspect() {
                    var str = "";
                    var max = exports.INSPECT_MAX_BYTES;
                    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
                    if (this.length > max)
                        str += " ... ";
                    return "<Buffer " + str + ">"
                }
                ;
                Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
                    if (isInstance(target, Uint8Array)) {
                        target = Buffer.from(target, target.offset, target.byteLength)
                    }
                    if (!Buffer.isBuffer(target)) {
                        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + "Received type " + typeof target)
                    }
                    if (start === undefined) {
                        start = 0
                    }
                    if (end === undefined) {
                        end = target ? target.length : 0
                    }
                    if (thisStart === undefined) {
                        thisStart = 0
                    }
                    if (thisEnd === undefined) {
                        thisEnd = this.length
                    }
                    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                        throw new RangeError("out of range index")
                    }
                    if (thisStart >= thisEnd && start >= end) {
                        return 0
                    }
                    if (thisStart >= thisEnd) {
                        return -1
                    }
                    if (start >= end) {
                        return 1
                    }
                    start >>>= 0;
                    end >>>= 0;
                    thisStart >>>= 0;
                    thisEnd >>>= 0;
                    if (this === target)
                        return 0;
                    var x = thisEnd - thisStart;
                    var y = end - start;
                    var len = Math.min(x, y);
                    var thisCopy = this.slice(thisStart, thisEnd);
                    var targetCopy = target.slice(start, end);
                    for (var i = 0; i < len; ++i) {
                        if (thisCopy[i] !== targetCopy[i]) {
                            x = thisCopy[i];
                            y = targetCopy[i];
                            break
                        }
                    }
                    if (x < y)
                        return -1;
                    if (y < x)
                        return 1;
                    return 0
                }
                ;
                function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                    if (buffer.length === 0)
                        return -1;
                    if (typeof byteOffset === "string") {
                        encoding = byteOffset;
                        byteOffset = 0
                    } else if (byteOffset > 2147483647) {
                        byteOffset = 2147483647
                    } else if (byteOffset < -2147483648) {
                        byteOffset = -2147483648
                    }
                    byteOffset = +byteOffset;
                    if (numberIsNaN(byteOffset)) {
                        byteOffset = dir ? 0 : buffer.length - 1
                    }
                    if (byteOffset < 0)
                        byteOffset = buffer.length + byteOffset;
                    if (byteOffset >= buffer.length) {
                        if (dir)
                            return -1;
                        else
                            byteOffset = buffer.length - 1
                    } else if (byteOffset < 0) {
                        if (dir)
                            byteOffset = 0;
                        else
                            return -1
                    }
                    if (typeof val === "string") {
                        val = Buffer.from(val, encoding)
                    }
                    if (Buffer.isBuffer(val)) {
                        if (val.length === 0) {
                            return -1
                        }
                        return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
                    } else if (typeof val === "number") {
                        val = val & 255;
                        if (typeof Uint8Array.prototype.indexOf === "function") {
                            if (dir) {
                                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
                            } else {
                                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
                            }
                        }
                        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
                    }
                    throw new TypeError("val must be string, number or Buffer")
                }
                function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                    var indexSize = 1;
                    var arrLength = arr.length;
                    var valLength = val.length;
                    if (encoding !== undefined) {
                        encoding = String(encoding).toLowerCase();
                        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
                            if (arr.length < 2 || val.length < 2) {
                                return -1
                            }
                            indexSize = 2;
                            arrLength /= 2;
                            valLength /= 2;
                            byteOffset /= 2
                        }
                    }
                    function read(buf, i) {
                        if (indexSize === 1) {
                            return buf[i]
                        } else {
                            return buf.readUInt16BE(i * indexSize)
                        }
                    }
                    var i;
                    if (dir) {
                        var foundIndex = -1;
                        for (i = byteOffset; i < arrLength; i++) {
                            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                                if (foundIndex === -1)
                                    foundIndex = i;
                                if (i - foundIndex + 1 === valLength)
                                    return foundIndex * indexSize
                            } else {
                                if (foundIndex !== -1)
                                    i -= i - foundIndex;
                                foundIndex = -1
                            }
                        }
                    } else {
                        if (byteOffset + valLength > arrLength)
                            byteOffset = arrLength - valLength;
                        for (i = byteOffset; i >= 0; i--) {
                            var found = true;
                            for (var j = 0; j < valLength; j++) {
                                if (read(arr, i + j) !== read(val, j)) {
                                    found = false;
                                    break
                                }
                            }
                            if (found)
                                return i
                        }
                    }
                    return -1
                }
                Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
                    return this.indexOf(val, byteOffset, encoding) !== -1
                }
                ;
                Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
                    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
                }
                ;
                Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
                    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
                }
                ;
                function hexWrite(buf, string, offset, length) {
                    offset = Number(offset) || 0;
                    var remaining = buf.length - offset;
                    if (!length) {
                        length = remaining
                    } else {
                        length = Number(length);
                        if (length > remaining) {
                            length = remaining
                        }
                    }
                    var strLen = string.length;
                    if (length > strLen / 2) {
                        length = strLen / 2
                    }
                    for (var i = 0; i < length; ++i) {
                        var parsed = parseInt(string.substr(i * 2, 2), 16);
                        if (numberIsNaN(parsed))
                            return i;
                        buf[offset + i] = parsed
                    }
                    return i
                }
                function utf8Write(buf, string, offset, length) {
                    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
                }
                function asciiWrite(buf, string, offset, length) {
                    return blitBuffer(asciiToBytes(string), buf, offset, length)
                }
                function latin1Write(buf, string, offset, length) {
                    return asciiWrite(buf, string, offset, length)
                }
                function base64Write(buf, string, offset, length) {
                    return blitBuffer(base64ToBytes(string), buf, offset, length)
                }
                function ucs2Write(buf, string, offset, length) {
                    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
                }
                Buffer.prototype.write = function write(string, offset, length, encoding) {
                    if (offset === undefined) {
                        encoding = "utf8";
                        length = this.length;
                        offset = 0
                    } else if (length === undefined && typeof offset === "string") {
                        encoding = offset;
                        length = this.length;
                        offset = 0
                    } else if (isFinite(offset)) {
                        offset = offset >>> 0;
                        if (isFinite(length)) {
                            length = length >>> 0;
                            if (encoding === undefined)
                                encoding = "utf8"
                        } else {
                            encoding = length;
                            length = undefined
                        }
                    } else {
                        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
                    }
                    var remaining = this.length - offset;
                    if (length === undefined || length > remaining)
                        length = remaining;
                    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
                        throw new RangeError("Attempt to write outside buffer bounds")
                    }
                    if (!encoding)
                        encoding = "utf8";
                    var loweredCase = false;
                    for (; ; ) {
                        switch (encoding) {
                        case "hex":
                            return hexWrite(this, string, offset, length);
                        case "utf8":
                        case "utf-8":
                            return utf8Write(this, string, offset, length);
                        case "ascii":
                            return asciiWrite(this, string, offset, length);
                        case "latin1":
                        case "binary":
                            return latin1Write(this, string, offset, length);
                        case "base64":
                            return base64Write(this, string, offset, length);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return ucs2Write(this, string, offset, length);
                        default:
                            if (loweredCase)
                                throw new TypeError("Unknown encoding: " + encoding);
                            encoding = ("" + encoding).toLowerCase();
                            loweredCase = true
                        }
                    }
                }
                ;
                Buffer.prototype.toJSON = function toJSON() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                }
                ;
                function base64Slice(buf, start, end) {
                    if (start === 0 && end === buf.length) {
                        return base64.fromByteArray(buf)
                    } else {
                        return base64.fromByteArray(buf.slice(start, end))
                    }
                }
                function utf8Slice(buf, start, end) {
                    end = Math.min(buf.length, end);
                    var res = [];
                    var i = start;
                    while (i < end) {
                        var firstByte = buf[i];
                        var codePoint = null;
                        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                        if (i + bytesPerSequence <= end) {
                            var secondByte, thirdByte, fourthByte, tempCodePoint;
                            switch (bytesPerSequence) {
                            case 1:
                                if (firstByte < 128) {
                                    codePoint = firstByte
                                }
                                break;
                            case 2:
                                secondByte = buf[i + 1];
                                if ((secondByte & 192) === 128) {
                                    tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                                    if (tempCodePoint > 127) {
                                        codePoint = tempCodePoint
                                    }
                                }
                                break;
                            case 3:
                                secondByte = buf[i + 1];
                                thirdByte = buf[i + 2];
                                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                                    tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                                    if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                                        codePoint = tempCodePoint
                                    }
                                }
                                break;
                            case 4:
                                secondByte = buf[i + 1];
                                thirdByte = buf[i + 2];
                                fourthByte = buf[i + 3];
                                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                                    tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                                    if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                                        codePoint = tempCodePoint
                                    }
                                }
                            }
                        }
                        if (codePoint === null) {
                            codePoint = 65533;
                            bytesPerSequence = 1
                        } else if (codePoint > 65535) {
                            codePoint -= 65536;
                            res.push(codePoint >>> 10 & 1023 | 55296);
                            codePoint = 56320 | codePoint & 1023
                        }
                        res.push(codePoint);
                        i += bytesPerSequence
                    }
                    return decodeCodePointsArray(res)
                }
                var MAX_ARGUMENTS_LENGTH = 4096;
                function decodeCodePointsArray(codePoints) {
                    var len = codePoints.length;
                    if (len <= MAX_ARGUMENTS_LENGTH) {
                        return String.fromCharCode.apply(String, codePoints)
                    }
                    var res = "";
                    var i = 0;
                    while (i < len) {
                        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH))
                    }
                    return res
                }
                function asciiSlice(buf, start, end) {
                    var ret = "";
                    end = Math.min(buf.length, end);
                    for (var i = start; i < end; ++i) {
                        ret += String.fromCharCode(buf[i] & 127)
                    }
                    return ret
                }
                function latin1Slice(buf, start, end) {
                    var ret = "";
                    end = Math.min(buf.length, end);
                    for (var i = start; i < end; ++i) {
                        ret += String.fromCharCode(buf[i])
                    }
                    return ret
                }
                function hexSlice(buf, start, end) {
                    var len = buf.length;
                    if (!start || start < 0)
                        start = 0;
                    if (!end || end < 0 || end > len)
                        end = len;
                    var out = "";
                    for (var i = start; i < end; ++i) {
                        out += toHex(buf[i])
                    }
                    return out
                }
                function utf16leSlice(buf, start, end) {
                    var bytes = buf.slice(start, end);
                    var res = "";
                    for (var i = 0; i < bytes.length; i += 2) {
                        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
                    }
                    return res
                }
                Buffer.prototype.slice = function slice(start, end) {
                    var len = this.length;
                    start = ~~start;
                    end = end === undefined ? len : ~~end;
                    if (start < 0) {
                        start += len;
                        if (start < 0)
                            start = 0
                    } else if (start > len) {
                        start = len
                    }
                    if (end < 0) {
                        end += len;
                        if (end < 0)
                            end = 0
                    } else if (end > len) {
                        end = len
                    }
                    if (end < start)
                        end = start;
                    var newBuf = this.subarray(start, end);
                    newBuf.__proto__ = Buffer.prototype;
                    return newBuf
                }
                ;
                function checkOffset(offset, ext, length) {
                    if (offset % 1 !== 0 || offset < 0)
                        throw new RangeError("offset is not uint");
                    if (offset + ext > length)
                        throw new RangeError("Trying to access beyond buffer length")
                }
                Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert)
                        checkOffset(offset, byteLength, this.length);
                    var val = this[offset];
                    var mul = 1;
                    var i = 0;
                    while (++i < byteLength && (mul *= 256)) {
                        val += this[offset + i] * mul
                    }
                    return val
                }
                ;
                Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert) {
                        checkOffset(offset, byteLength, this.length)
                    }
                    var val = this[offset + --byteLength];
                    var mul = 1;
                    while (byteLength > 0 && (mul *= 256)) {
                        val += this[offset + --byteLength] * mul
                    }
                    return val
                }
                ;
                Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 1, this.length);
                    return this[offset]
                }
                ;
                Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this.length);
                    return this[offset] | this[offset + 1] << 8
                }
                ;
                Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this.length);
                    return this[offset] << 8 | this[offset + 1]
                }
                ;
                Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this.length);
                    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216
                }
                ;
                Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this.length);
                    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3])
                }
                ;
                Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert)
                        checkOffset(offset, byteLength, this.length);
                    var val = this[offset];
                    var mul = 1;
                    var i = 0;
                    while (++i < byteLength && (mul *= 256)) {
                        val += this[offset + i] * mul
                    }
                    mul *= 128;
                    if (val >= mul)
                        val -= Math.pow(2, 8 * byteLength);
                    return val
                }
                ;
                Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert)
                        checkOffset(offset, byteLength, this.length);
                    var i = byteLength;
                    var mul = 1;
                    var val = this[offset + --i];
                    while (i > 0 && (mul *= 256)) {
                        val += this[offset + --i] * mul
                    }
                    mul *= 128;
                    if (val >= mul)
                        val -= Math.pow(2, 8 * byteLength);
                    return val
                }
                ;
                Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 1, this.length);
                    if (!(this[offset] & 128))
                        return this[offset];
                    return (255 - this[offset] + 1) * -1
                }
                ;
                Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this.length);
                    var val = this[offset] | this[offset + 1] << 8;
                    return val & 32768 ? val | 4294901760 : val
                }
                ;
                Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this.length);
                    var val = this[offset + 1] | this[offset] << 8;
                    return val & 32768 ? val | 4294901760 : val
                }
                ;
                Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this.length);
                    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24
                }
                ;
                Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this.length);
                    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]
                }
                ;
                Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this.length);
                    return ieee754.read(this, offset, true, 23, 4)
                }
                ;
                Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this.length);
                    return ieee754.read(this, offset, false, 23, 4)
                }
                ;
                Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 8, this.length);
                    return ieee754.read(this, offset, true, 52, 8)
                }
                ;
                Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 8, this.length);
                    return ieee754.read(this, offset, false, 52, 8)
                }
                ;
                function checkInt(buf, value, offset, ext, max, min) {
                    if (!Buffer.isBuffer(buf))
                        throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (value > max || value < min)
                        throw new RangeError('"value" argument is out of bounds');
                    if (offset + ext > buf.length)
                        throw new RangeError("Index out of range")
                }
                Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert) {
                        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                        checkInt(this, value, offset, byteLength, maxBytes, 0)
                    }
                    var mul = 1;
                    var i = 0;
                    this[offset] = value & 255;
                    while (++i < byteLength && (mul *= 256)) {
                        this[offset + i] = value / mul & 255
                    }
                    return offset + byteLength
                }
                ;
                Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert) {
                        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                        checkInt(this, value, offset, byteLength, maxBytes, 0)
                    }
                    var i = byteLength - 1;
                    var mul = 1;
                    this[offset + i] = value & 255;
                    while (--i >= 0 && (mul *= 256)) {
                        this[offset + i] = value / mul & 255
                    }
                    return offset + byteLength
                }
                ;
                Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 1, 255, 0);
                    this[offset] = value & 255;
                    return offset + 1
                }
                ;
                Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 65535, 0);
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    return offset + 2
                }
                ;
                Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 65535, 0);
                    this[offset] = value >>> 8;
                    this[offset + 1] = value & 255;
                    return offset + 2
                }
                ;
                Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 4294967295, 0);
                    this[offset + 3] = value >>> 24;
                    this[offset + 2] = value >>> 16;
                    this[offset + 1] = value >>> 8;
                    this[offset] = value & 255;
                    return offset + 4
                }
                ;
                Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 4294967295, 0);
                    this[offset] = value >>> 24;
                    this[offset + 1] = value >>> 16;
                    this[offset + 2] = value >>> 8;
                    this[offset + 3] = value & 255;
                    return offset + 4
                }
                ;
                Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        var limit = Math.pow(2, 8 * byteLength - 1);
                        checkInt(this, value, offset, byteLength, limit - 1, -limit)
                    }
                    var i = 0;
                    var mul = 1;
                    var sub = 0;
                    this[offset] = value & 255;
                    while (++i < byteLength && (mul *= 256)) {
                        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                            sub = 1
                        }
                        this[offset + i] = (value / mul >> 0) - sub & 255
                    }
                    return offset + byteLength
                }
                ;
                Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        var limit = Math.pow(2, 8 * byteLength - 1);
                        checkInt(this, value, offset, byteLength, limit - 1, -limit)
                    }
                    var i = byteLength - 1;
                    var mul = 1;
                    var sub = 0;
                    this[offset + i] = value & 255;
                    while (--i >= 0 && (mul *= 256)) {
                        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                            sub = 1
                        }
                        this[offset + i] = (value / mul >> 0) - sub & 255
                    }
                    return offset + byteLength
                }
                ;
                Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 1, 127, -128);
                    if (value < 0)
                        value = 255 + value + 1;
                    this[offset] = value & 255;
                    return offset + 1
                }
                ;
                Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 32767, -32768);
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    return offset + 2
                }
                ;
                Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 32767, -32768);
                    this[offset] = value >>> 8;
                    this[offset + 1] = value & 255;
                    return offset + 2
                }
                ;
                Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 2147483647, -2147483648);
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    this[offset + 2] = value >>> 16;
                    this[offset + 3] = value >>> 24;
                    return offset + 4
                }
                ;
                Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 2147483647, -2147483648);
                    if (value < 0)
                        value = 4294967295 + value + 1;
                    this[offset] = value >>> 24;
                    this[offset + 1] = value >>> 16;
                    this[offset + 2] = value >>> 8;
                    this[offset + 3] = value & 255;
                    return offset + 4
                }
                ;
                function checkIEEE754(buf, value, offset, ext, max, min) {
                    if (offset + ext > buf.length)
                        throw new RangeError("Index out of range");
                    if (offset < 0)
                        throw new RangeError("Index out of range")
                }
                function writeFloat(buf, value, offset, littleEndian, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22)
                    }
                    ieee754.write(buf, value, offset, littleEndian, 23, 4);
                    return offset + 4
                }
                Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
                    return writeFloat(this, value, offset, true, noAssert)
                }
                ;
                Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
                    return writeFloat(this, value, offset, false, noAssert)
                }
                ;
                function writeDouble(buf, value, offset, littleEndian, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292)
                    }
                    ieee754.write(buf, value, offset, littleEndian, 52, 8);
                    return offset + 8
                }
                Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
                    return writeDouble(this, value, offset, true, noAssert)
                }
                ;
                Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
                    return writeDouble(this, value, offset, false, noAssert)
                }
                ;
                Buffer.prototype.copy = function copy(target, targetStart, start, end) {
                    if (!Buffer.isBuffer(target))
                        throw new TypeError("argument should be a Buffer");
                    if (!start)
                        start = 0;
                    if (!end && end !== 0)
                        end = this.length;
                    if (targetStart >= target.length)
                        targetStart = target.length;
                    if (!targetStart)
                        targetStart = 0;
                    if (end > 0 && end < start)
                        end = start;
                    if (end === start)
                        return 0;
                    if (target.length === 0 || this.length === 0)
                        return 0;
                    if (targetStart < 0) {
                        throw new RangeError("targetStart out of bounds")
                    }
                    if (start < 0 || start >= this.length)
                        throw new RangeError("Index out of range");
                    if (end < 0)
                        throw new RangeError("sourceEnd out of bounds");
                    if (end > this.length)
                        end = this.length;
                    if (target.length - targetStart < end - start) {
                        end = target.length - targetStart + start
                    }
                    var len = end - start;
                    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
                        this.copyWithin(targetStart, start, end)
                    } else if (this === target && start < targetStart && targetStart < end) {
                        for (var i = len - 1; i >= 0; --i) {
                            target[i + targetStart] = this[i + start]
                        }
                    } else {
                        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart)
                    }
                    return len
                }
                ;
                Buffer.prototype.fill = function fill(val, start, end, encoding) {
                    if (typeof val === "string") {
                        if (typeof start === "string") {
                            encoding = start;
                            start = 0;
                            end = this.length
                        } else if (typeof end === "string") {
                            encoding = end;
                            end = this.length
                        }
                        if (encoding !== undefined && typeof encoding !== "string") {
                            throw new TypeError("encoding must be a string")
                        }
                        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
                            throw new TypeError("Unknown encoding: " + encoding)
                        }
                        if (val.length === 1) {
                            var code = val.charCodeAt(0);
                            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
                                val = code
                            }
                        }
                    } else if (typeof val === "number") {
                        val = val & 255
                    }
                    if (start < 0 || this.length < start || this.length < end) {
                        throw new RangeError("Out of range index")
                    }
                    if (end <= start) {
                        return this
                    }
                    start = start >>> 0;
                    end = end === undefined ? this.length : end >>> 0;
                    if (!val)
                        val = 0;
                    var i;
                    if (typeof val === "number") {
                        for (i = start; i < end; ++i) {
                            this[i] = val
                        }
                    } else {
                        var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
                        var len = bytes.length;
                        if (len === 0) {
                            throw new TypeError('The value "' + val + '" is invalid for argument "value"')
                        }
                        for (i = 0; i < end - start; ++i) {
                            this[i + start] = bytes[i % len]
                        }
                    }
                    return this
                }
                ;
                var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
                function base64clean(str) {
                    str = str.split("=")[0];
                    str = str.trim().replace(INVALID_BASE64_RE, "");
                    if (str.length < 2)
                        return "";
                    while (str.length % 4 !== 0) {
                        str = str + "="
                    }
                    return str
                }
                function toHex(n) {
                    if (n < 16)
                        return "0" + n.toString(16);
                    return n.toString(16)
                }
                function utf8ToBytes(string, units) {
                    units = units || Infinity;
                    var codePoint;
                    var length = string.length;
                    var leadSurrogate = null;
                    var bytes = [];
                    for (var i = 0; i < length; ++i) {
                        codePoint = string.charCodeAt(i);
                        if (codePoint > 55295 && codePoint < 57344) {
                            if (!leadSurrogate) {
                                if (codePoint > 56319) {
                                    if ((units -= 3) > -1)
                                        bytes.push(239, 191, 189);
                                    continue
                                } else if (i + 1 === length) {
                                    if ((units -= 3) > -1)
                                        bytes.push(239, 191, 189);
                                    continue
                                }
                                leadSurrogate = codePoint;
                                continue
                            }
                            if (codePoint < 56320) {
                                if ((units -= 3) > -1)
                                    bytes.push(239, 191, 189);
                                leadSurrogate = codePoint;
                                continue
                            }
                            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536
                        } else if (leadSurrogate) {
                            if ((units -= 3) > -1)
                                bytes.push(239, 191, 189)
                        }
                        leadSurrogate = null;
                        if (codePoint < 128) {
                            if ((units -= 1) < 0)
                                break;
                            bytes.push(codePoint)
                        } else if (codePoint < 2048) {
                            if ((units -= 2) < 0)
                                break;
                            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128)
                        } else if (codePoint < 65536) {
                            if ((units -= 3) < 0)
                                break;
                            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128)
                        } else if (codePoint < 1114112) {
                            if ((units -= 4) < 0)
                                break;
                            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128)
                        } else {
                            throw new Error("Invalid code point")
                        }
                    }
                    return bytes
                }
                function asciiToBytes(str) {
                    var byteArray = [];
                    for (var i = 0; i < str.length; ++i) {
                        byteArray.push(str.charCodeAt(i) & 255)
                    }
                    return byteArray
                }
                function utf16leToBytes(str, units) {
                    var c, hi, lo;
                    var byteArray = [];
                    for (var i = 0; i < str.length; ++i) {
                        if ((units -= 2) < 0)
                            break;
                        c = str.charCodeAt(i);
                        hi = c >> 8;
                        lo = c % 256;
                        byteArray.push(lo);
                        byteArray.push(hi)
                    }
                    return byteArray
                }
                function base64ToBytes(str) {
                    return base64.toByteArray(base64clean(str))
                }
                function blitBuffer(src, dst, offset, length) {
                    for (var i = 0; i < length; ++i) {
                        if (i + offset >= dst.length || i >= src.length)
                            break;
                        dst[i + offset] = src[i]
                    }
                    return i
                }
                function isInstance(obj, type) {
                    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name
                }
                function numberIsNaN(obj) {
                    return obj !== obj
                }
            }
            ).call(this)
        }
        ).call(this, require("buffer").Buffer)
    }
    , {
        "base64-js": 7,
        buffer: 9,
        ieee754: 44
    }],
    10: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var BlockCipher = C_lib.BlockCipher;
                var C_algo = C.algo;
                var SBOX = [];
                var INV_SBOX = [];
                var SUB_MIX_0 = [];
                var SUB_MIX_1 = [];
                var SUB_MIX_2 = [];
                var SUB_MIX_3 = [];
                var INV_SUB_MIX_0 = [];
                var INV_SUB_MIX_1 = [];
                var INV_SUB_MIX_2 = [];
                var INV_SUB_MIX_3 = [];
                (function() {
                    var d = [];
                    for (var i = 0; i < 256; i++) {
                        if (i < 128) {
                            d[i] = i << 1
                        } else {
                            d[i] = i << 1 ^ 283
                        }
                    }
                    var x = 0;
                    var xi = 0;
                    for (var i = 0; i < 256; i++) {
                        var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
                        sx = sx >>> 8 ^ sx & 255 ^ 99;
                        SBOX[x] = sx;
                        INV_SBOX[sx] = x;
                        var x2 = d[x];
                        var x4 = d[x2];
                        var x8 = d[x4];
                        var t = d[sx] * 257 ^ sx * 16843008;
                        SUB_MIX_0[x] = t << 24 | t >>> 8;
                        SUB_MIX_1[x] = t << 16 | t >>> 16;
                        SUB_MIX_2[x] = t << 8 | t >>> 24;
                        SUB_MIX_3[x] = t;
                        var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
                        INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
                        INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
                        INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
                        INV_SUB_MIX_3[sx] = t;
                        if (!x) {
                            x = xi = 1
                        } else {
                            x = x2 ^ d[d[d[x8 ^ x2]]];
                            xi ^= d[d[xi]]
                        }
                    }
                }
                )();
                var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
                var AES = C_algo.AES = BlockCipher.extend({
                    _doReset: function() {
                        if (this._nRounds && this._keyPriorReset === this._key) {
                            return
                        }
                        var key = this._keyPriorReset = this._key;
                        var keyWords = key.words;
                        var keySize = key.sigBytes / 4;
                        var nRounds = this._nRounds = keySize + 6;
                        var ksRows = (nRounds + 1) * 4;
                        var keySchedule = this._keySchedule = [];
                        for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                            if (ksRow < keySize) {
                                keySchedule[ksRow] = keyWords[ksRow]
                            } else {
                                var t = keySchedule[ksRow - 1];
                                if (!(ksRow % keySize)) {
                                    t = t << 8 | t >>> 24;
                                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                                    t ^= RCON[ksRow / keySize | 0] << 24
                                } else if (keySize > 6 && ksRow % keySize == 4) {
                                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255]
                                }
                                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t
                            }
                        }
                        var invKeySchedule = this._invKeySchedule = [];
                        for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                            var ksRow = ksRows - invKsRow;
                            if (invKsRow % 4) {
                                var t = keySchedule[ksRow]
                            } else {
                                var t = keySchedule[ksRow - 4]
                            }
                            if (invKsRow < 4 || ksRow <= 4) {
                                invKeySchedule[invKsRow] = t
                            } else {
                                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]]
                            }
                        }
                    },
                    encryptBlock: function(M, offset) {
                        this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX)
                    },
                    decryptBlock: function(M, offset) {
                        var t = M[offset + 1];
                        M[offset + 1] = M[offset + 3];
                        M[offset + 3] = t;
                        this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
                        var t = M[offset + 1];
                        M[offset + 1] = M[offset + 3];
                        M[offset + 3] = t
                    },
                    _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
                        var nRounds = this._nRounds;
                        var s0 = M[offset] ^ keySchedule[0];
                        var s1 = M[offset + 1] ^ keySchedule[1];
                        var s2 = M[offset + 2] ^ keySchedule[2];
                        var s3 = M[offset + 3] ^ keySchedule[3];
                        var ksRow = 4;
                        for (var round = 1; round < nRounds; round++) {
                            var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[s3 & 255] ^ keySchedule[ksRow++];
                            var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[s0 & 255] ^ keySchedule[ksRow++];
                            var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[s1 & 255] ^ keySchedule[ksRow++];
                            var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[s2 & 255] ^ keySchedule[ksRow++];
                            s0 = t0;
                            s1 = t1;
                            s2 = t2;
                            s3 = t3
                        }
                        var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[s3 & 255]) ^ keySchedule[ksRow++];
                        var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[s0 & 255]) ^ keySchedule[ksRow++];
                        var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[s1 & 255]) ^ keySchedule[ksRow++];
                        var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[s2 & 255]) ^ keySchedule[ksRow++];
                        M[offset] = t0;
                        M[offset + 1] = t1;
                        M[offset + 2] = t2;
                        M[offset + 3] = t3
                    },
                    keySize: 256 / 32
                });
                C.AES = BlockCipher._createHelper(AES)
            }
            )();
            return CryptoJS.AES
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12,
        "./enc-base64": 13,
        "./evpkdf": 15,
        "./md5": 20
    }],
    11: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./evpkdf"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./evpkdf"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.lib.Cipher || function(undefined) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var Base = C_lib.Base;
                var WordArray = C_lib.WordArray;
                var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
                var C_enc = C.enc;
                var Utf8 = C_enc.Utf8;
                var Base64 = C_enc.Base64;
                var C_algo = C.algo;
                var EvpKDF = C_algo.EvpKDF;
                var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
                    cfg: Base.extend(),
                    createEncryptor: function(key, cfg) {
                        return this.create(this._ENC_XFORM_MODE, key, cfg)
                    },
                    createDecryptor: function(key, cfg) {
                        return this.create(this._DEC_XFORM_MODE, key, cfg)
                    },
                    init: function(xformMode, key, cfg) {
                        this.cfg = this.cfg.extend(cfg);
                        this._xformMode = xformMode;
                        this._key = key;
                        this.reset()
                    },
                    reset: function() {
                        BufferedBlockAlgorithm.reset.call(this);
                        this._doReset()
                    },
                    process: function(dataUpdate) {
                        this._append(dataUpdate);
                        return this._process()
                    },
                    finalize: function(dataUpdate) {
                        if (dataUpdate) {
                            this._append(dataUpdate)
                        }
                        var finalProcessedData = this._doFinalize();
                        return finalProcessedData
                    },
                    keySize: 128 / 32,
                    ivSize: 128 / 32,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function selectCipherStrategy(key) {
                            if (typeof key == "string") {
                                return PasswordBasedCipher
                            } else {
                                return SerializableCipher
                            }
                        }
                        return function(cipher) {
                            return {
                                encrypt: function(message, key, cfg) {
                                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg)
                                },
                                decrypt: function(ciphertext, key, cfg) {
                                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg)
                                }
                            }
                        }
                    }()
                });
                var StreamCipher = C_lib.StreamCipher = Cipher.extend({
                    _doFinalize: function() {
                        var finalProcessedBlocks = this._process(!!"flush");
                        return finalProcessedBlocks
                    },
                    blockSize: 1
                });
                var C_mode = C.mode = {};
                var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
                    createEncryptor: function(cipher, iv) {
                        return this.Encryptor.create(cipher, iv)
                    },
                    createDecryptor: function(cipher, iv) {
                        return this.Decryptor.create(cipher, iv)
                    },
                    init: function(cipher, iv) {
                        this._cipher = cipher;
                        this._iv = iv
                    }
                });
                var CBC = C_mode.CBC = function() {
                    var CBC = BlockCipherMode.extend();
                    CBC.Encryptor = CBC.extend({
                        processBlock: function(words, offset) {
                            var cipher = this._cipher;
                            var blockSize = cipher.blockSize;
                            xorBlock.call(this, words, offset, blockSize);
                            cipher.encryptBlock(words, offset);
                            this._prevBlock = words.slice(offset, offset + blockSize)
                        }
                    });
                    CBC.Decryptor = CBC.extend({
                        processBlock: function(words, offset) {
                            var cipher = this._cipher;
                            var blockSize = cipher.blockSize;
                            var thisBlock = words.slice(offset, offset + blockSize);
                            cipher.decryptBlock(words, offset);
                            xorBlock.call(this, words, offset, blockSize);
                            this._prevBlock = thisBlock
                        }
                    });
                    function xorBlock(words, offset, blockSize) {
                        var iv = this._iv;
                        if (iv) {
                            var block = iv;
                            this._iv = undefined
                        } else {
                            var block = this._prevBlock
                        }
                        for (var i = 0; i < blockSize; i++) {
                            words[offset + i] ^= block[i]
                        }
                    }
                    return CBC
                }();
                var C_pad = C.pad = {};
                var Pkcs7 = C_pad.Pkcs7 = {
                    pad: function(data, blockSize) {
                        var blockSizeBytes = blockSize * 4;
                        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
                        var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
                        var paddingWords = [];
                        for (var i = 0; i < nPaddingBytes; i += 4) {
                            paddingWords.push(paddingWord)
                        }
                        var padding = WordArray.create(paddingWords, nPaddingBytes);
                        data.concat(padding)
                    },
                    unpad: function(data) {
                        var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
                        data.sigBytes -= nPaddingBytes
                    }
                };
                var BlockCipher = C_lib.BlockCipher = Cipher.extend({
                    cfg: Cipher.cfg.extend({
                        mode: CBC,
                        padding: Pkcs7
                    }),
                    reset: function() {
                        Cipher.reset.call(this);
                        var cfg = this.cfg;
                        var iv = cfg.iv;
                        var mode = cfg.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            var modeCreator = mode.createEncryptor
                        } else {
                            var modeCreator = mode.createDecryptor;
                            this._minBufferSize = 1
                        }
                        if (this._mode && this._mode.__creator == modeCreator) {
                            this._mode.init(this, iv && iv.words)
                        } else {
                            this._mode = modeCreator.call(mode, this, iv && iv.words);
                            this._mode.__creator = modeCreator
                        }
                    },
                    _doProcessBlock: function(words, offset) {
                        this._mode.processBlock(words, offset)
                    },
                    _doFinalize: function() {
                        var padding = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            padding.pad(this._data, this.blockSize);
                            var finalProcessedBlocks = this._process(!!"flush")
                        } else {
                            var finalProcessedBlocks = this._process(!!"flush");
                            padding.unpad(finalProcessedBlocks)
                        }
                        return finalProcessedBlocks
                    },
                    blockSize: 128 / 32
                });
                var CipherParams = C_lib.CipherParams = Base.extend({
                    init: function(cipherParams) {
                        this.mixIn(cipherParams)
                    },
                    toString: function(formatter) {
                        return (formatter || this.formatter).stringify(this)
                    }
                });
                var C_format = C.format = {};
                var OpenSSLFormatter = C_format.OpenSSL = {
                    stringify: function(cipherParams) {
                        var ciphertext = cipherParams.ciphertext;
                        var salt = cipherParams.salt;
                        if (salt) {
                            var wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext)
                        } else {
                            var wordArray = ciphertext
                        }
                        return wordArray.toString(Base64)
                    },
                    parse: function(openSSLStr) {
                        var ciphertext = Base64.parse(openSSLStr);
                        var ciphertextWords = ciphertext.words;
                        if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                            var salt = WordArray.create(ciphertextWords.slice(2, 4));
                            ciphertextWords.splice(0, 4);
                            ciphertext.sigBytes -= 16
                        }
                        return CipherParams.create({
                            ciphertext: ciphertext,
                            salt: salt
                        })
                    }
                };
                var SerializableCipher = C_lib.SerializableCipher = Base.extend({
                    cfg: Base.extend({
                        format: OpenSSLFormatter
                    }),
                    encrypt: function(cipher, message, key, cfg) {
                        cfg = this.cfg.extend(cfg);
                        var encryptor = cipher.createEncryptor(key, cfg);
                        var ciphertext = encryptor.finalize(message);
                        var cipherCfg = encryptor.cfg;
                        return CipherParams.create({
                            ciphertext: ciphertext,
                            key: key,
                            iv: cipherCfg.iv,
                            algorithm: cipher,
                            mode: cipherCfg.mode,
                            padding: cipherCfg.padding,
                            blockSize: cipher.blockSize,
                            formatter: cfg.format
                        })
                    },
                    decrypt: function(cipher, ciphertext, key, cfg) {
                        cfg = this.cfg.extend(cfg);
                        ciphertext = this._parse(ciphertext, cfg.format);
                        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
                        return plaintext
                    },
                    _parse: function(ciphertext, format) {
                        if (typeof ciphertext == "string") {
                            return format.parse(ciphertext, this)
                        } else {
                            return ciphertext
                        }
                    }
                });
                var C_kdf = C.kdf = {};
                var OpenSSLKdf = C_kdf.OpenSSL = {
                    execute: function(password, keySize, ivSize, salt) {
                        if (!salt) {
                            salt = WordArray.random(64 / 8)
                        }
                        var key = EvpKDF.create({
                            keySize: keySize + ivSize
                        }).compute(password, salt);
                        var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
                        key.sigBytes = keySize * 4;
                        return CipherParams.create({
                            key: key,
                            iv: iv,
                            salt: salt
                        })
                    }
                };
                var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
                    cfg: SerializableCipher.cfg.extend({
                        kdf: OpenSSLKdf
                    }),
                    encrypt: function(cipher, message, password, cfg) {
                        cfg = this.cfg.extend(cfg);
                        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
                        cfg.iv = derivedParams.iv;
                        var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
                        ciphertext.mixIn(derivedParams);
                        return ciphertext
                    },
                    decrypt: function(cipher, ciphertext, password, cfg) {
                        cfg = this.cfg.extend(cfg);
                        ciphertext = this._parse(ciphertext, cfg.format);
                        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
                        cfg.iv = derivedParams.iv;
                        var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
                        return plaintext
                    }
                })
            }()
        })
    }
    , {
        "./core": 12,
        "./evpkdf": 15
    }],
    12: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory()
            } else if (typeof define === "function" && define.amd) {
                define([], factory)
            } else {
                root.CryptoJS = factory()
            }
        }
        )(this, function() {
            var CryptoJS = CryptoJS || function(Math, undefined) {
                var create = Object.create || function() {
                    function F() {}
                    return function(obj) {
                        var subtype;
                        F.prototype = obj;
                        subtype = new F;
                        F.prototype = null;
                        return subtype
                    }
                }();
                var C = {};
                var C_lib = C.lib = {};
                var Base = C_lib.Base = function() {
                    return {
                        extend: function(overrides) {
                            var subtype = create(this);
                            if (overrides) {
                                subtype.mixIn(overrides)
                            }
                            if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                                subtype.init = function() {
                                    subtype.$super.init.apply(this, arguments)
                                }
                            }
                            subtype.init.prototype = subtype;
                            subtype.$super = this;
                            return subtype
                        },
                        create: function() {
                            var instance = this.extend();
                            instance.init.apply(instance, arguments);
                            return instance
                        },
                        init: function() {},
                        mixIn: function(properties) {
                            for (var propertyName in properties) {
                                if (properties.hasOwnProperty(propertyName)) {
                                    this[propertyName] = properties[propertyName]
                                }
                            }
                            if (properties.hasOwnProperty("toString")) {
                                this.toString = properties.toString
                            }
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    }
                }();
                var WordArray = C_lib.WordArray = Base.extend({
                    init: function(words, sigBytes) {
                        words = this.words = words || [];
                        if (sigBytes != undefined) {
                            this.sigBytes = sigBytes
                        } else {
                            this.sigBytes = words.length * 4
                        }
                    },
                    toString: function(encoder) {
                        return (encoder || Hex).stringify(this)
                    },
                    concat: function(wordArray) {
                        var thisWords = this.words;
                        var thatWords = wordArray.words;
                        var thisSigBytes = this.sigBytes;
                        var thatSigBytes = wordArray.sigBytes;
                        this.clamp();
                        if (thisSigBytes % 4) {
                            for (var i = 0; i < thatSigBytes; i++) {
                                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8
                            }
                        } else {
                            for (var i = 0; i < thatSigBytes; i += 4) {
                                thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2]
                            }
                        }
                        this.sigBytes += thatSigBytes;
                        return this
                    },
                    clamp: function() {
                        var words = this.words;
                        var sigBytes = this.sigBytes;
                        words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
                        words.length = Math.ceil(sigBytes / 4)
                    },
                    clone: function() {
                        var clone = Base.clone.call(this);
                        clone.words = this.words.slice(0);
                        return clone
                    },
                    random: function(nBytes) {
                        var words = [];
                        var r = function(m_w) {
                            var m_w = m_w;
                            var m_z = 987654321;
                            var mask = 4294967295;
                            return function() {
                                m_z = 36969 * (m_z & 65535) + (m_z >> 16) & mask;
                                m_w = 18e3 * (m_w & 65535) + (m_w >> 16) & mask;
                                var result = (m_z << 16) + m_w & mask;
                                result /= 4294967296;
                                result += .5;
                                return result * (Math.random() > .5 ? 1 : -1)
                            }
                        };
                        for (var i = 0, rcache; i < nBytes; i += 4) {
                            var _r = r((rcache || Math.random()) * 4294967296);
                            rcache = _r() * 987654071;
                            words.push(_r() * 4294967296 | 0)
                        }
                        return new WordArray.init(words,nBytes)
                    }
                });
                var C_enc = C.enc = {};
                var Hex = C_enc.Hex = {
                    stringify: function(wordArray) {
                        var words = wordArray.words;
                        var sigBytes = wordArray.sigBytes;
                        var hexChars = [];
                        for (var i = 0; i < sigBytes; i++) {
                            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            hexChars.push((bite >>> 4).toString(16));
                            hexChars.push((bite & 15).toString(16))
                        }
                        return hexChars.join("")
                    },
                    parse: function(hexStr) {
                        var hexStrLength = hexStr.length;
                        var words = [];
                        for (var i = 0; i < hexStrLength; i += 2) {
                            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4
                        }
                        return new WordArray.init(words,hexStrLength / 2)
                    }
                };
                var Latin1 = C_enc.Latin1 = {
                    stringify: function(wordArray) {
                        var words = wordArray.words;
                        var sigBytes = wordArray.sigBytes;
                        var latin1Chars = [];
                        for (var i = 0; i < sigBytes; i++) {
                            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            latin1Chars.push(String.fromCharCode(bite))
                        }
                        return latin1Chars.join("")
                    },
                    parse: function(latin1Str) {
                        var latin1StrLength = latin1Str.length;
                        var words = [];
                        for (var i = 0; i < latin1StrLength; i++) {
                            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8
                        }
                        return new WordArray.init(words,latin1StrLength)
                    }
                };
                var Utf8 = C_enc.Utf8 = {
                    stringify: function(wordArray) {
                        try {
                            return decodeURIComponent(escape(Latin1.stringify(wordArray)))
                        } catch (e) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(utf8Str) {
                        return Latin1.parse(unescape(encodeURIComponent(utf8Str)))
                    }
                };
                var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
                    reset: function() {
                        this._data = new WordArray.init;
                        this._nDataBytes = 0
                    },
                    _append: function(data) {
                        if (typeof data == "string") {
                            data = Utf8.parse(data)
                        }
                        this._data.concat(data);
                        this._nDataBytes += data.sigBytes
                    },
                    _process: function(doFlush) {
                        var data = this._data;
                        var dataWords = data.words;
                        var dataSigBytes = data.sigBytes;
                        var blockSize = this.blockSize;
                        var blockSizeBytes = blockSize * 4;
                        var nBlocksReady = dataSigBytes / blockSizeBytes;
                        if (doFlush) {
                            nBlocksReady = Math.ceil(nBlocksReady)
                        } else {
                            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0)
                        }
                        var nWordsReady = nBlocksReady * blockSize;
                        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
                        if (nWordsReady) {
                            for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                                this._doProcessBlock(dataWords, offset)
                            }
                            var processedWords = dataWords.splice(0, nWordsReady);
                            data.sigBytes -= nBytesReady
                        }
                        return new WordArray.init(processedWords,nBytesReady)
                    },
                    clone: function() {
                        var clone = Base.clone.call(this);
                        clone._data = this._data.clone();
                        return clone
                    },
                    _minBufferSize: 0
                });
                var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
                    cfg: Base.extend(),
                    init: function(cfg) {
                        this.cfg = this.cfg.extend(cfg);
                        this.reset()
                    },
                    reset: function() {
                        BufferedBlockAlgorithm.reset.call(this);
                        this._doReset()
                    },
                    update: function(messageUpdate) {
                        this._append(messageUpdate);
                        this._process();
                        return this
                    },
                    finalize: function(messageUpdate) {
                        if (messageUpdate) {
                            this._append(messageUpdate)
                        }
                        var hash = this._doFinalize();
                        return hash
                    },
                    blockSize: 512 / 32,
                    _createHelper: function(hasher) {
                        return function(message, cfg) {
                            return new hasher.init(cfg).finalize(message)
                        }
                    },
                    _createHmacHelper: function(hasher) {
                        return function(message, key) {
                            return new C_algo.HMAC.init(hasher,key).finalize(message)
                        }
                    }
                });
                var C_algo = C.algo = {};
                return C
            }(Math);
            return CryptoJS
        })
    }
    , {}],
    13: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var C_enc = C.enc;
                var Base64 = C_enc.Base64 = {
                    stringify: function(wordArray) {
                        var words = wordArray.words;
                        var sigBytes = wordArray.sigBytes;
                        var map = this._map;
                        wordArray.clamp();
                        var base64Chars = [];
                        for (var i = 0; i < sigBytes; i += 3) {
                            var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                            var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                            var triplet = byte1 << 16 | byte2 << 8 | byte3;
                            for (var j = 0; j < 4 && i + j * .75 < sigBytes; j++) {
                                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63))
                            }
                        }
                        var paddingChar = map.charAt(64);
                        if (paddingChar) {
                            while (base64Chars.length % 4) {
                                base64Chars.push(paddingChar)
                            }
                        }
                        return base64Chars.join("")
                    },
                    parse: function(base64Str) {
                        var base64StrLength = base64Str.length;
                        var map = this._map;
                        var reverseMap = this._reverseMap;
                        if (!reverseMap) {
                            reverseMap = this._reverseMap = [];
                            for (var j = 0; j < map.length; j++) {
                                reverseMap[map.charCodeAt(j)] = j
                            }
                        }
                        var paddingChar = map.charAt(64);
                        if (paddingChar) {
                            var paddingIndex = base64Str.indexOf(paddingChar);
                            if (paddingIndex !== -1) {
                                base64StrLength = paddingIndex
                            }
                        }
                        return parseLoop(base64Str, base64StrLength, reverseMap)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                };
                function parseLoop(base64Str, base64StrLength, reverseMap) {
                    var words = [];
                    var nBytes = 0;
                    for (var i = 0; i < base64StrLength; i++) {
                        if (i % 4) {
                            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                            words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
                            nBytes++
                        }
                    }
                    return WordArray.create(words, nBytes)
                }
            }
            )();
            return CryptoJS.enc.Base64
        })
    }
    , {
        "./core": 12
    }],
    14: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var C_enc = C.enc;
                var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
                    stringify: function(wordArray) {
                        var words = wordArray.words;
                        var sigBytes = wordArray.sigBytes;
                        var utf16Chars = [];
                        for (var i = 0; i < sigBytes; i += 2) {
                            var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                            utf16Chars.push(String.fromCharCode(codePoint))
                        }
                        return utf16Chars.join("")
                    },
                    parse: function(utf16Str) {
                        var utf16StrLength = utf16Str.length;
                        var words = [];
                        for (var i = 0; i < utf16StrLength; i++) {
                            words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16
                        }
                        return WordArray.create(words, utf16StrLength * 2)
                    }
                };
                C_enc.Utf16LE = {
                    stringify: function(wordArray) {
                        var words = wordArray.words;
                        var sigBytes = wordArray.sigBytes;
                        var utf16Chars = [];
                        for (var i = 0; i < sigBytes; i += 2) {
                            var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                            utf16Chars.push(String.fromCharCode(codePoint))
                        }
                        return utf16Chars.join("")
                    },
                    parse: function(utf16Str) {
                        var utf16StrLength = utf16Str.length;
                        var words = [];
                        for (var i = 0; i < utf16StrLength; i++) {
                            words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16)
                        }
                        return WordArray.create(words, utf16StrLength * 2)
                    }
                };
                function swapEndian(word) {
                    return word << 8 & 4278255360 | word >>> 8 & 16711935
                }
            }
            )();
            return CryptoJS.enc.Utf16
        })
    }
    , {
        "./core": 12
    }],
    15: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./sha1", "./hmac"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var Base = C_lib.Base;
                var WordArray = C_lib.WordArray;
                var C_algo = C.algo;
                var MD5 = C_algo.MD5;
                var EvpKDF = C_algo.EvpKDF = Base.extend({
                    cfg: Base.extend({
                        keySize: 128 / 32,
                        hasher: MD5,
                        iterations: 1
                    }),
                    init: function(cfg) {
                        this.cfg = this.cfg.extend(cfg)
                    },
                    compute: function(password, salt) {
                        var cfg = this.cfg;
                        var hasher = cfg.hasher.create();
                        var derivedKey = WordArray.create();
                        var derivedKeyWords = derivedKey.words;
                        var keySize = cfg.keySize;
                        var iterations = cfg.iterations;
                        while (derivedKeyWords.length < keySize) {
                            if (block) {
                                hasher.update(block)
                            }
                            var block = hasher.update(password).finalize(salt);
                            hasher.reset();
                            for (var i = 1; i < iterations; i++) {
                                block = hasher.finalize(block);
                                hasher.reset()
                            }
                            derivedKey.concat(block)
                        }
                        derivedKey.sigBytes = keySize * 4;
                        return derivedKey
                    }
                });
                C.EvpKDF = function(password, salt, cfg) {
                    return EvpKDF.create(cfg).compute(password, salt)
                }
            }
            )();
            return CryptoJS.EvpKDF
        })
    }
    , {
        "./core": 12,
        "./hmac": 17,
        "./sha1": 36
    }],
    16: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function(undefined) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var CipherParams = C_lib.CipherParams;
                var C_enc = C.enc;
                var Hex = C_enc.Hex;
                var C_format = C.format;
                var HexFormatter = C_format.Hex = {
                    stringify: function(cipherParams) {
                        return cipherParams.ciphertext.toString(Hex)
                    },
                    parse: function(input) {
                        var ciphertext = Hex.parse(input);
                        return CipherParams.create({
                            ciphertext: ciphertext
                        })
                    }
                }
            }
            )();
            return CryptoJS.format.Hex
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    17: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var Base = C_lib.Base;
                var C_enc = C.enc;
                var Utf8 = C_enc.Utf8;
                var C_algo = C.algo;
                var HMAC = C_algo.HMAC = Base.extend({
                    init: function(hasher, key) {
                        hasher = this._hasher = new hasher.init;
                        if (typeof key == "string") {
                            key = Utf8.parse(key)
                        }
                        var hasherBlockSize = hasher.blockSize;
                        var hasherBlockSizeBytes = hasherBlockSize * 4;
                        if (key.sigBytes > hasherBlockSizeBytes) {
                            key = hasher.finalize(key)
                        }
                        key.clamp();
                        var oKey = this._oKey = key.clone();
                        var iKey = this._iKey = key.clone();
                        var oKeyWords = oKey.words;
                        var iKeyWords = iKey.words;
                        for (var i = 0; i < hasherBlockSize; i++) {
                            oKeyWords[i] ^= 1549556828;
                            iKeyWords[i] ^= 909522486
                        }
                        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
                        this.reset()
                    },
                    reset: function() {
                        var hasher = this._hasher;
                        hasher.reset();
                        hasher.update(this._iKey)
                    },
                    update: function(messageUpdate) {
                        this._hasher.update(messageUpdate);
                        return this
                    },
                    finalize: function(messageUpdate) {
                        var hasher = this._hasher;
                        var innerHash = hasher.finalize(messageUpdate);
                        hasher.reset();
                        var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
                        return hmac
                    }
                })
            }
            )()
        })
    }
    , {
        "./core": 12
    }],
    18: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./x64-core"), require("./lib-typedarrays"), require("./enc-utf16"), require("./enc-base64"), require("./md5"), require("./sha1"), require("./sha256"), require("./sha224"), require("./sha512"), require("./sha384"), require("./sha3"), require("./ripemd160"), require("./hmac"), require("./pbkdf2"), require("./evpkdf"), require("./cipher-core"), require("./mode-cfb"), require("./mode-ctr"), require("./mode-ctr-gladman"), require("./mode-ofb"), require("./mode-ecb"), require("./pad-ansix923"), require("./pad-iso10126"), require("./pad-iso97971"), require("./pad-zeropadding"), require("./pad-nopadding"), require("./format-hex"), require("./aes"), require("./tripledes"), require("./rc4"), require("./rabbit"), require("./rabbit-legacy"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], factory)
            } else {
                root.CryptoJS = factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            return CryptoJS
        })
    }
    , {
        "./aes": 10,
        "./cipher-core": 11,
        "./core": 12,
        "./enc-base64": 13,
        "./enc-utf16": 14,
        "./evpkdf": 15,
        "./format-hex": 16,
        "./hmac": 17,
        "./lib-typedarrays": 19,
        "./md5": 20,
        "./mode-cfb": 21,
        "./mode-ctr": 23,
        "./mode-ctr-gladman": 22,
        "./mode-ecb": 24,
        "./mode-ofb": 25,
        "./pad-ansix923": 26,
        "./pad-iso10126": 27,
        "./pad-iso97971": 28,
        "./pad-nopadding": 29,
        "./pad-zeropadding": 30,
        "./pbkdf2": 31,
        "./rabbit": 33,
        "./rabbit-legacy": 32,
        "./rc4": 34,
        "./ripemd160": 35,
        "./sha1": 36,
        "./sha224": 37,
        "./sha256": 38,
        "./sha3": 39,
        "./sha384": 40,
        "./sha512": 41,
        "./tripledes": 42,
        "./x64-core": 43
    }],
    19: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                if (typeof ArrayBuffer != "function") {
                    return
                }
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var superInit = WordArray.init;
                var subInit = WordArray.init = function(typedArray) {
                    if (typedArray instanceof ArrayBuffer) {
                        typedArray = new Uint8Array(typedArray)
                    }
                    if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
                        typedArray = new Uint8Array(typedArray.buffer,typedArray.byteOffset,typedArray.byteLength)
                    }
                    if (typedArray instanceof Uint8Array) {
                        var typedArrayByteLength = typedArray.byteLength;
                        var words = [];
                        for (var i = 0; i < typedArrayByteLength; i++) {
                            words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8
                        }
                        superInit.call(this, words, typedArrayByteLength)
                    } else {
                        superInit.apply(this, arguments)
                    }
                }
                ;
                subInit.prototype = WordArray
            }
            )();
            return CryptoJS.lib.WordArray
        })
    }
    , {
        "./core": 12
    }],
    20: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function(Math) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var Hasher = C_lib.Hasher;
                var C_algo = C.algo;
                var T = [];
                (function() {
                    for (var i = 0; i < 64; i++) {
                        T[i] = Math.abs(Math.sin(i + 1)) * 4294967296 | 0
                    }
                }
                )();
                var MD5 = C_algo.MD5 = Hasher.extend({
                    _doReset: function() {
                        this._hash = new WordArray.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(M, offset) {
                        for (var i = 0; i < 16; i++) {
                            var offset_i = offset + i;
                            var M_offset_i = M[offset_i];
                            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360
                        }
                        var H = this._hash.words;
                        var M_offset_0 = M[offset + 0];
                        var M_offset_1 = M[offset + 1];
                        var M_offset_2 = M[offset + 2];
                        var M_offset_3 = M[offset + 3];
                        var M_offset_4 = M[offset + 4];
                        var M_offset_5 = M[offset + 5];
                        var M_offset_6 = M[offset + 6];
                        var M_offset_7 = M[offset + 7];
                        var M_offset_8 = M[offset + 8];
                        var M_offset_9 = M[offset + 9];
                        var M_offset_10 = M[offset + 10];
                        var M_offset_11 = M[offset + 11];
                        var M_offset_12 = M[offset + 12];
                        var M_offset_13 = M[offset + 13];
                        var M_offset_14 = M[offset + 14];
                        var M_offset_15 = M[offset + 15];
                        var a = H[0];
                        var b = H[1];
                        var c = H[2];
                        var d = H[3];
                        a = FF(a, b, c, d, M_offset_0, 7, T[0]);
                        d = FF(d, a, b, c, M_offset_1, 12, T[1]);
                        c = FF(c, d, a, b, M_offset_2, 17, T[2]);
                        b = FF(b, c, d, a, M_offset_3, 22, T[3]);
                        a = FF(a, b, c, d, M_offset_4, 7, T[4]);
                        d = FF(d, a, b, c, M_offset_5, 12, T[5]);
                        c = FF(c, d, a, b, M_offset_6, 17, T[6]);
                        b = FF(b, c, d, a, M_offset_7, 22, T[7]);
                        a = FF(a, b, c, d, M_offset_8, 7, T[8]);
                        d = FF(d, a, b, c, M_offset_9, 12, T[9]);
                        c = FF(c, d, a, b, M_offset_10, 17, T[10]);
                        b = FF(b, c, d, a, M_offset_11, 22, T[11]);
                        a = FF(a, b, c, d, M_offset_12, 7, T[12]);
                        d = FF(d, a, b, c, M_offset_13, 12, T[13]);
                        c = FF(c, d, a, b, M_offset_14, 17, T[14]);
                        b = FF(b, c, d, a, M_offset_15, 22, T[15]);
                        a = GG(a, b, c, d, M_offset_1, 5, T[16]);
                        d = GG(d, a, b, c, M_offset_6, 9, T[17]);
                        c = GG(c, d, a, b, M_offset_11, 14, T[18]);
                        b = GG(b, c, d, a, M_offset_0, 20, T[19]);
                        a = GG(a, b, c, d, M_offset_5, 5, T[20]);
                        d = GG(d, a, b, c, M_offset_10, 9, T[21]);
                        c = GG(c, d, a, b, M_offset_15, 14, T[22]);
                        b = GG(b, c, d, a, M_offset_4, 20, T[23]);
                        a = GG(a, b, c, d, M_offset_9, 5, T[24]);
                        d = GG(d, a, b, c, M_offset_14, 9, T[25]);
                        c = GG(c, d, a, b, M_offset_3, 14, T[26]);
                        b = GG(b, c, d, a, M_offset_8, 20, T[27]);
                        a = GG(a, b, c, d, M_offset_13, 5, T[28]);
                        d = GG(d, a, b, c, M_offset_2, 9, T[29]);
                        c = GG(c, d, a, b, M_offset_7, 14, T[30]);
                        b = GG(b, c, d, a, M_offset_12, 20, T[31]);
                        a = HH(a, b, c, d, M_offset_5, 4, T[32]);
                        d = HH(d, a, b, c, M_offset_8, 11, T[33]);
                        c = HH(c, d, a, b, M_offset_11, 16, T[34]);
                        b = HH(b, c, d, a, M_offset_14, 23, T[35]);
                        a = HH(a, b, c, d, M_offset_1, 4, T[36]);
                        d = HH(d, a, b, c, M_offset_4, 11, T[37]);
                        c = HH(c, d, a, b, M_offset_7, 16, T[38]);
                        b = HH(b, c, d, a, M_offset_10, 23, T[39]);
                        a = HH(a, b, c, d, M_offset_13, 4, T[40]);
                        d = HH(d, a, b, c, M_offset_0, 11, T[41]);
                        c = HH(c, d, a, b, M_offset_3, 16, T[42]);
                        b = HH(b, c, d, a, M_offset_6, 23, T[43]);
                        a = HH(a, b, c, d, M_offset_9, 4, T[44]);
                        d = HH(d, a, b, c, M_offset_12, 11, T[45]);
                        c = HH(c, d, a, b, M_offset_15, 16, T[46]);
                        b = HH(b, c, d, a, M_offset_2, 23, T[47]);
                        a = II(a, b, c, d, M_offset_0, 6, T[48]);
                        d = II(d, a, b, c, M_offset_7, 10, T[49]);
                        c = II(c, d, a, b, M_offset_14, 15, T[50]);
                        b = II(b, c, d, a, M_offset_5, 21, T[51]);
                        a = II(a, b, c, d, M_offset_12, 6, T[52]);
                        d = II(d, a, b, c, M_offset_3, 10, T[53]);
                        c = II(c, d, a, b, M_offset_10, 15, T[54]);
                        b = II(b, c, d, a, M_offset_1, 21, T[55]);
                        a = II(a, b, c, d, M_offset_8, 6, T[56]);
                        d = II(d, a, b, c, M_offset_15, 10, T[57]);
                        c = II(c, d, a, b, M_offset_6, 15, T[58]);
                        b = II(b, c, d, a, M_offset_13, 21, T[59]);
                        a = II(a, b, c, d, M_offset_4, 6, T[60]);
                        d = II(d, a, b, c, M_offset_11, 10, T[61]);
                        c = II(c, d, a, b, M_offset_2, 15, T[62]);
                        b = II(b, c, d, a, M_offset_9, 21, T[63]);
                        H[0] = H[0] + a | 0;
                        H[1] = H[1] + b | 0;
                        H[2] = H[2] + c | 0;
                        H[3] = H[3] + d | 0
                    },
                    _doFinalize: function() {
                        var data = this._data;
                        var dataWords = data.words;
                        var nBitsTotal = this._nDataBytes * 8;
                        var nBitsLeft = data.sigBytes * 8;
                        dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                        var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
                        var nBitsTotalL = nBitsTotal;
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
                        data.sigBytes = (dataWords.length + 1) * 4;
                        this._process();
                        var hash = this._hash;
                        var H = hash.words;
                        for (var i = 0; i < 4; i++) {
                            var H_i = H[i];
                            H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360
                        }
                        return hash
                    },
                    clone: function() {
                        var clone = Hasher.clone.call(this);
                        clone._hash = this._hash.clone();
                        return clone
                    }
                });
                function FF(a, b, c, d, x, s, t) {
                    var n = a + (b & c | ~b & d) + x + t;
                    return (n << s | n >>> 32 - s) + b
                }
                function GG(a, b, c, d, x, s, t) {
                    var n = a + (b & d | c & ~d) + x + t;
                    return (n << s | n >>> 32 - s) + b
                }
                function HH(a, b, c, d, x, s, t) {
                    var n = a + (b ^ c ^ d) + x + t;
                    return (n << s | n >>> 32 - s) + b
                }
                function II(a, b, c, d, x, s, t) {
                    var n = a + (c ^ (b | ~d)) + x + t;
                    return (n << s | n >>> 32 - s) + b
                }
                C.MD5 = Hasher._createHelper(MD5);
                C.HmacMD5 = Hasher._createHmacHelper(MD5)
            }
            )(Math);
            return CryptoJS.MD5
        })
    }
    , {
        "./core": 12
    }],
    21: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.mode.CFB = function() {
                var CFB = CryptoJS.lib.BlockCipherMode.extend();
                CFB.Encryptor = CFB.extend({
                    processBlock: function(words, offset) {
                        var cipher = this._cipher;
                        var blockSize = cipher.blockSize;
                        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
                        this._prevBlock = words.slice(offset, offset + blockSize)
                    }
                });
                CFB.Decryptor = CFB.extend({
                    processBlock: function(words, offset) {
                        var cipher = this._cipher;
                        var blockSize = cipher.blockSize;
                        var thisBlock = words.slice(offset, offset + blockSize);
                        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
                        this._prevBlock = thisBlock
                    }
                });
                function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
                    var iv = this._iv;
                    if (iv) {
                        var keystream = iv.slice(0);
                        this._iv = undefined
                    } else {
                        var keystream = this._prevBlock
                    }
                    cipher.encryptBlock(keystream, 0);
                    for (var i = 0; i < blockSize; i++) {
                        words[offset + i] ^= keystream[i]
                    }
                }
                return CFB
            }();
            return CryptoJS.mode.CFB
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    22: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.mode.CTRGladman = function() {
                var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
                function incWord(word) {
                    if ((word >> 24 & 255) === 255) {
                        var b1 = word >> 16 & 255;
                        var b2 = word >> 8 & 255;
                        var b3 = word & 255;
                        if (b1 === 255) {
                            b1 = 0;
                            if (b2 === 255) {
                                b2 = 0;
                                if (b3 === 255) {
                                    b3 = 0
                                } else {
                                    ++b3
                                }
                            } else {
                                ++b2
                            }
                        } else {
                            ++b1
                        }
                        word = 0;
                        word += b1 << 16;
                        word += b2 << 8;
                        word += b3
                    } else {
                        word += 1 << 24
                    }
                    return word
                }
                function incCounter(counter) {
                    if ((counter[0] = incWord(counter[0])) === 0) {
                        counter[1] = incWord(counter[1])
                    }
                    return counter
                }
                var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
                    processBlock: function(words, offset) {
                        var cipher = this._cipher;
                        var blockSize = cipher.blockSize;
                        var iv = this._iv;
                        var counter = this._counter;
                        if (iv) {
                            counter = this._counter = iv.slice(0);
                            this._iv = undefined
                        }
                        incCounter(counter);
                        var keystream = counter.slice(0);
                        cipher.encryptBlock(keystream, 0);
                        for (var i = 0; i < blockSize; i++) {
                            words[offset + i] ^= keystream[i]
                        }
                    }
                });
                CTRGladman.Decryptor = Encryptor;
                return CTRGladman
            }();
            return CryptoJS.mode.CTRGladman
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    23: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.mode.CTR = function() {
                var CTR = CryptoJS.lib.BlockCipherMode.extend();
                var Encryptor = CTR.Encryptor = CTR.extend({
                    processBlock: function(words, offset) {
                        var cipher = this._cipher;
                        var blockSize = cipher.blockSize;
                        var iv = this._iv;
                        var counter = this._counter;
                        if (iv) {
                            counter = this._counter = iv.slice(0);
                            this._iv = undefined
                        }
                        var keystream = counter.slice(0);
                        cipher.encryptBlock(keystream, 0);
                        counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
                        for (var i = 0; i < blockSize; i++) {
                            words[offset + i] ^= keystream[i]
                        }
                    }
                });
                CTR.Decryptor = Encryptor;
                return CTR
            }();
            return CryptoJS.mode.CTR
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    24: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.mode.ECB = function() {
                var ECB = CryptoJS.lib.BlockCipherMode.extend();
                ECB.Encryptor = ECB.extend({
                    processBlock: function(words, offset) {
                        this._cipher.encryptBlock(words, offset)
                    }
                });
                ECB.Decryptor = ECB.extend({
                    processBlock: function(words, offset) {
                        this._cipher.decryptBlock(words, offset)
                    }
                });
                return ECB
            }();
            return CryptoJS.mode.ECB
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    25: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.mode.OFB = function() {
                var OFB = CryptoJS.lib.BlockCipherMode.extend();
                var Encryptor = OFB.Encryptor = OFB.extend({
                    processBlock: function(words, offset) {
                        var cipher = this._cipher;
                        var blockSize = cipher.blockSize;
                        var iv = this._iv;
                        var keystream = this._keystream;
                        if (iv) {
                            keystream = this._keystream = iv.slice(0);
                            this._iv = undefined
                        }
                        cipher.encryptBlock(keystream, 0);
                        for (var i = 0; i < blockSize; i++) {
                            words[offset + i] ^= keystream[i]
                        }
                    }
                });
                OFB.Decryptor = Encryptor;
                return OFB
            }();
            return CryptoJS.mode.OFB
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    26: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.pad.AnsiX923 = {
                pad: function(data, blockSize) {
                    var dataSigBytes = data.sigBytes;
                    var blockSizeBytes = blockSize * 4;
                    var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
                    var lastBytePos = dataSigBytes + nPaddingBytes - 1;
                    data.clamp();
                    data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
                    data.sigBytes += nPaddingBytes
                },
                unpad: function(data) {
                    var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
                    data.sigBytes -= nPaddingBytes
                }
            };
            return CryptoJS.pad.Ansix923
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    27: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.pad.Iso10126 = {
                pad: function(data, blockSize) {
                    var blockSizeBytes = blockSize * 4;
                    var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
                    data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1))
                },
                unpad: function(data) {
                    var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
                    data.sigBytes -= nPaddingBytes
                }
            };
            return CryptoJS.pad.Iso10126
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    28: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.pad.Iso97971 = {
                pad: function(data, blockSize) {
                    data.concat(CryptoJS.lib.WordArray.create([2147483648], 1));
                    CryptoJS.pad.ZeroPadding.pad(data, blockSize)
                },
                unpad: function(data) {
                    CryptoJS.pad.ZeroPadding.unpad(data);
                    data.sigBytes--
                }
            };
            return CryptoJS.pad.Iso97971
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    29: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.pad.NoPadding = {
                pad: function() {},
                unpad: function() {}
            };
            return CryptoJS.pad.NoPadding
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    30: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            CryptoJS.pad.ZeroPadding = {
                pad: function(data, blockSize) {
                    var blockSizeBytes = blockSize * 4;
                    data.clamp();
                    data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes)
                },
                unpad: function(data) {
                    var dataWords = data.words;
                    var i = data.sigBytes - 1;
                    while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255)) {
                        i--
                    }
                    data.sigBytes = i + 1
                }
            };
            return CryptoJS.pad.ZeroPadding
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12
    }],
    31: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./sha1", "./hmac"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var Base = C_lib.Base;
                var WordArray = C_lib.WordArray;
                var C_algo = C.algo;
                var SHA1 = C_algo.SHA1;
                var HMAC = C_algo.HMAC;
                var PBKDF2 = C_algo.PBKDF2 = Base.extend({
                    cfg: Base.extend({
                        keySize: 128 / 32,
                        hasher: SHA1,
                        iterations: 1
                    }),
                    init: function(cfg) {
                        this.cfg = this.cfg.extend(cfg)
                    },
                    compute: function(password, salt) {
                        var cfg = this.cfg;
                        var hmac = HMAC.create(cfg.hasher, password);
                        var derivedKey = WordArray.create();
                        var blockIndex = WordArray.create([1]);
                        var derivedKeyWords = derivedKey.words;
                        var blockIndexWords = blockIndex.words;
                        var keySize = cfg.keySize;
                        var iterations = cfg.iterations;
                        while (derivedKeyWords.length < keySize) {
                            var block = hmac.update(salt).finalize(blockIndex);
                            hmac.reset();
                            var blockWords = block.words;
                            var blockWordsLength = blockWords.length;
                            var intermediate = block;
                            for (var i = 1; i < iterations; i++) {
                                intermediate = hmac.finalize(intermediate);
                                hmac.reset();
                                var intermediateWords = intermediate.words;
                                for (var j = 0; j < blockWordsLength; j++) {
                                    blockWords[j] ^= intermediateWords[j]
                                }
                            }
                            derivedKey.concat(block);
                            blockIndexWords[0]++
                        }
                        derivedKey.sigBytes = keySize * 4;
                        return derivedKey
                    }
                });
                C.PBKDF2 = function(password, salt, cfg) {
                    return PBKDF2.create(cfg).compute(password, salt)
                }
            }
            )();
            return CryptoJS.PBKDF2
        })
    }
    , {
        "./core": 12,
        "./hmac": 17,
        "./sha1": 36
    }],
    32: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var StreamCipher = C_lib.StreamCipher;
                var C_algo = C.algo;
                var S = [];
                var C_ = [];
                var G = [];
                var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
                    _doReset: function() {
                        var K = this._key.words;
                        var iv = this.cfg.iv;
                        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];
                        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 4294901760 | K[1] & 65535, K[3] << 16 | K[3] >>> 16, K[1] & 4294901760 | K[2] & 65535, K[0] << 16 | K[0] >>> 16, K[2] & 4294901760 | K[3] & 65535, K[1] << 16 | K[1] >>> 16, K[3] & 4294901760 | K[0] & 65535];
                        this._b = 0;
                        for (var i = 0; i < 4; i++) {
                            nextState.call(this)
                        }
                        for (var i = 0; i < 8; i++) {
                            C[i] ^= X[i + 4 & 7]
                        }
                        if (iv) {
                            var IV = iv.words;
                            var IV_0 = IV[0];
                            var IV_1 = IV[1];
                            var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                            var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                            var i1 = i0 >>> 16 | i2 & 4294901760;
                            var i3 = i2 << 16 | i0 & 65535;
                            C[0] ^= i0;
                            C[1] ^= i1;
                            C[2] ^= i2;
                            C[3] ^= i3;
                            C[4] ^= i0;
                            C[5] ^= i1;
                            C[6] ^= i2;
                            C[7] ^= i3;
                            for (var i = 0; i < 4; i++) {
                                nextState.call(this)
                            }
                        }
                    },
                    _doProcessBlock: function(M, offset) {
                        var X = this._X;
                        nextState.call(this);
                        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
                        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
                        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
                        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
                        for (var i = 0; i < 4; i++) {
                            S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                            M[offset + i] ^= S[i]
                        }
                    },
                    blockSize: 128 / 32,
                    ivSize: 64 / 32
                });
                function nextState() {
                    var X = this._X;
                    var C = this._C;
                    for (var i = 0; i < 8; i++) {
                        C_[i] = C[i]
                    }
                    C[0] = C[0] + 1295307597 + this._b | 0;
                    C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
                    C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
                    C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
                    C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
                    C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
                    C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
                    C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
                    this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
                    for (var i = 0; i < 8; i++) {
                        var gx = X[i] + C[i];
                        var ga = gx & 65535;
                        var gb = gx >>> 16;
                        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
                        var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
                        G[i] = gh ^ gl
                    }
                    X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
                    X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
                    X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
                    X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
                    X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
                    X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
                    X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
                    X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0
                }
                C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy)
            }
            )();
            return CryptoJS.RabbitLegacy
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12,
        "./enc-base64": 13,
        "./evpkdf": 15,
        "./md5": 20
    }],
    33: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var StreamCipher = C_lib.StreamCipher;
                var C_algo = C.algo;
                var S = [];
                var C_ = [];
                var G = [];
                var Rabbit = C_algo.Rabbit = StreamCipher.extend({
                    _doReset: function() {
                        var K = this._key.words;
                        var iv = this.cfg.iv;
                        for (var i = 0; i < 4; i++) {
                            K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360
                        }
                        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];
                        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 4294901760 | K[1] & 65535, K[3] << 16 | K[3] >>> 16, K[1] & 4294901760 | K[2] & 65535, K[0] << 16 | K[0] >>> 16, K[2] & 4294901760 | K[3] & 65535, K[1] << 16 | K[1] >>> 16, K[3] & 4294901760 | K[0] & 65535];
                        this._b = 0;
                        for (var i = 0; i < 4; i++) {
                            nextState.call(this)
                        }
                        for (var i = 0; i < 8; i++) {
                            C[i] ^= X[i + 4 & 7]
                        }
                        if (iv) {
                            var IV = iv.words;
                            var IV_0 = IV[0];
                            var IV_1 = IV[1];
                            var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                            var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                            var i1 = i0 >>> 16 | i2 & 4294901760;
                            var i3 = i2 << 16 | i0 & 65535;
                            C[0] ^= i0;
                            C[1] ^= i1;
                            C[2] ^= i2;
                            C[3] ^= i3;
                            C[4] ^= i0;
                            C[5] ^= i1;
                            C[6] ^= i2;
                            C[7] ^= i3;
                            for (var i = 0; i < 4; i++) {
                                nextState.call(this)
                            }
                        }
                    },
                    _doProcessBlock: function(M, offset) {
                        var X = this._X;
                        nextState.call(this);
                        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
                        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
                        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
                        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
                        for (var i = 0; i < 4; i++) {
                            S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                            M[offset + i] ^= S[i]
                        }
                    },
                    blockSize: 128 / 32,
                    ivSize: 64 / 32
                });
                function nextState() {
                    var X = this._X;
                    var C = this._C;
                    for (var i = 0; i < 8; i++) {
                        C_[i] = C[i]
                    }
                    C[0] = C[0] + 1295307597 + this._b | 0;
                    C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
                    C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
                    C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
                    C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
                    C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
                    C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
                    C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
                    this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
                    for (var i = 0; i < 8; i++) {
                        var gx = X[i] + C[i];
                        var ga = gx & 65535;
                        var gb = gx >>> 16;
                        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
                        var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
                        G[i] = gh ^ gl
                    }
                    X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
                    X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
                    X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
                    X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
                    X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
                    X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
                    X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
                    X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0
                }
                C.Rabbit = StreamCipher._createHelper(Rabbit)
            }
            )();
            return CryptoJS.Rabbit
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12,
        "./enc-base64": 13,
        "./evpkdf": 15,
        "./md5": 20
    }],
    34: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var StreamCipher = C_lib.StreamCipher;
                var C_algo = C.algo;
                var RC4 = C_algo.RC4 = StreamCipher.extend({
                    _doReset: function() {
                        var key = this._key;
                        var keyWords = key.words;
                        var keySigBytes = key.sigBytes;
                        var S = this._S = [];
                        for (var i = 0; i < 256; i++) {
                            S[i] = i
                        }
                        for (var i = 0, j = 0; i < 256; i++) {
                            var keyByteIndex = i % keySigBytes;
                            var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                            j = (j + S[i] + keyByte) % 256;
                            var t = S[i];
                            S[i] = S[j];
                            S[j] = t
                        }
                        this._i = this._j = 0
                    },
                    _doProcessBlock: function(M, offset) {
                        M[offset] ^= generateKeystreamWord.call(this)
                    },
                    keySize: 256 / 32,
                    ivSize: 0
                });
                function generateKeystreamWord() {
                    var S = this._S;
                    var i = this._i;
                    var j = this._j;
                    var keystreamWord = 0;
                    for (var n = 0; n < 4; n++) {
                        i = (i + 1) % 256;
                        j = (j + S[i]) % 256;
                        var t = S[i];
                        S[i] = S[j];
                        S[j] = t;
                        keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8
                    }
                    this._i = i;
                    this._j = j;
                    return keystreamWord
                }
                C.RC4 = StreamCipher._createHelper(RC4);
                var RC4Drop = C_algo.RC4Drop = RC4.extend({
                    cfg: RC4.cfg.extend({
                        drop: 192
                    }),
                    _doReset: function() {
                        RC4._doReset.call(this);
                        for (var i = this.cfg.drop; i > 0; i--) {
                            generateKeystreamWord.call(this)
                        }
                    }
                });
                C.RC4Drop = StreamCipher._createHelper(RC4Drop)
            }
            )();
            return CryptoJS.RC4
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12,
        "./enc-base64": 13,
        "./evpkdf": 15,
        "./md5": 20
    }],
    35: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function(Math) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var Hasher = C_lib.Hasher;
                var C_algo = C.algo;
                var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
                var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
                var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
                var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
                var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
                var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
                var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
                    _doReset: function() {
                        this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(M, offset) {
                        for (var i = 0; i < 16; i++) {
                            var offset_i = offset + i;
                            var M_offset_i = M[offset_i];
                            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360
                        }
                        var H = this._hash.words;
                        var hl = _hl.words;
                        var hr = _hr.words;
                        var zl = _zl.words;
                        var zr = _zr.words;
                        var sl = _sl.words;
                        var sr = _sr.words;
                        var al, bl, cl, dl, el;
                        var ar, br, cr, dr, er;
                        ar = al = H[0];
                        br = bl = H[1];
                        cr = cl = H[2];
                        dr = dl = H[3];
                        er = el = H[4];
                        var t;
                        for (var i = 0; i < 80; i += 1) {
                            t = al + M[offset + zl[i]] | 0;
                            if (i < 16) {
                                t += f1(bl, cl, dl) + hl[0]
                            } else if (i < 32) {
                                t += f2(bl, cl, dl) + hl[1]
                            } else if (i < 48) {
                                t += f3(bl, cl, dl) + hl[2]
                            } else if (i < 64) {
                                t += f4(bl, cl, dl) + hl[3]
                            } else {
                                t += f5(bl, cl, dl) + hl[4]
                            }
                            t = t | 0;
                            t = rotl(t, sl[i]);
                            t = t + el | 0;
                            al = el;
                            el = dl;
                            dl = rotl(cl, 10);
                            cl = bl;
                            bl = t;
                            t = ar + M[offset + zr[i]] | 0;
                            if (i < 16) {
                                t += f5(br, cr, dr) + hr[0]
                            } else if (i < 32) {
                                t += f4(br, cr, dr) + hr[1]
                            } else if (i < 48) {
                                t += f3(br, cr, dr) + hr[2]
                            } else if (i < 64) {
                                t += f2(br, cr, dr) + hr[3]
                            } else {
                                t += f1(br, cr, dr) + hr[4]
                            }
                            t = t | 0;
                            t = rotl(t, sr[i]);
                            t = t + er | 0;
                            ar = er;
                            er = dr;
                            dr = rotl(cr, 10);
                            cr = br;
                            br = t
                        }
                        t = H[1] + cl + dr | 0;
                        H[1] = H[2] + dl + er | 0;
                        H[2] = H[3] + el + ar | 0;
                        H[3] = H[4] + al + br | 0;
                        H[4] = H[0] + bl + cr | 0;
                        H[0] = t
                    },
                    _doFinalize: function() {
                        var data = this._data;
                        var dataWords = data.words;
                        var nBitsTotal = this._nDataBytes * 8;
                        var nBitsLeft = data.sigBytes * 8;
                        dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
                        data.sigBytes = (dataWords.length + 1) * 4;
                        this._process();
                        var hash = this._hash;
                        var H = hash.words;
                        for (var i = 0; i < 5; i++) {
                            var H_i = H[i];
                            H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360
                        }
                        return hash
                    },
                    clone: function() {
                        var clone = Hasher.clone.call(this);
                        clone._hash = this._hash.clone();
                        return clone
                    }
                });
                function f1(x, y, z) {
                    return x ^ y ^ z
                }
                function f2(x, y, z) {
                    return x & y | ~x & z
                }
                function f3(x, y, z) {
                    return (x | ~y) ^ z
                }
                function f4(x, y, z) {
                    return x & z | y & ~z
                }
                function f5(x, y, z) {
                    return x ^ (y | ~z)
                }
                function rotl(x, n) {
                    return x << n | x >>> 32 - n
                }
                C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
                C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160)
            }
            )(Math);
            return CryptoJS.RIPEMD160
        })
    }
    , {
        "./core": 12
    }],
    36: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var Hasher = C_lib.Hasher;
                var C_algo = C.algo;
                var W = [];
                var SHA1 = C_algo.SHA1 = Hasher.extend({
                    _doReset: function() {
                        this._hash = new WordArray.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(M, offset) {
                        var H = this._hash.words;
                        var a = H[0];
                        var b = H[1];
                        var c = H[2];
                        var d = H[3];
                        var e = H[4];
                        for (var i = 0; i < 80; i++) {
                            if (i < 16) {
                                W[i] = M[offset + i] | 0
                            } else {
                                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                                W[i] = n << 1 | n >>> 31
                            }
                            var t = (a << 5 | a >>> 27) + e + W[i];
                            if (i < 20) {
                                t += (b & c | ~b & d) + 1518500249
                            } else if (i < 40) {
                                t += (b ^ c ^ d) + 1859775393
                            } else if (i < 60) {
                                t += (b & c | b & d | c & d) - 1894007588
                            } else {
                                t += (b ^ c ^ d) - 899497514
                            }
                            e = d;
                            d = c;
                            c = b << 30 | b >>> 2;
                            b = a;
                            a = t
                        }
                        H[0] = H[0] + a | 0;
                        H[1] = H[1] + b | 0;
                        H[2] = H[2] + c | 0;
                        H[3] = H[3] + d | 0;
                        H[4] = H[4] + e | 0
                    },
                    _doFinalize: function() {
                        var data = this._data;
                        var dataWords = data.words;
                        var nBitsTotal = this._nDataBytes * 8;
                        var nBitsLeft = data.sigBytes * 8;
                        dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                        data.sigBytes = dataWords.length * 4;
                        this._process();
                        return this._hash
                    },
                    clone: function() {
                        var clone = Hasher.clone.call(this);
                        clone._hash = this._hash.clone();
                        return clone
                    }
                });
                C.SHA1 = Hasher._createHelper(SHA1);
                C.HmacSHA1 = Hasher._createHmacHelper(SHA1)
            }
            )();
            return CryptoJS.SHA1
        })
    }
    , {
        "./core": 12
    }],
    37: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./sha256"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./sha256"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var C_algo = C.algo;
                var SHA256 = C_algo.SHA256;
                var SHA224 = C_algo.SHA224 = SHA256.extend({
                    _doReset: function() {
                        this._hash = new WordArray.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                    },
                    _doFinalize: function() {
                        var hash = SHA256._doFinalize.call(this);
                        hash.sigBytes -= 4;
                        return hash
                    }
                });
                C.SHA224 = SHA256._createHelper(SHA224);
                C.HmacSHA224 = SHA256._createHmacHelper(SHA224)
            }
            )();
            return CryptoJS.SHA224
        })
    }
    , {
        "./core": 12,
        "./sha256": 38
    }],
    38: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function(Math) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var Hasher = C_lib.Hasher;
                var C_algo = C.algo;
                var H = [];
                var K = [];
                (function() {
                    function isPrime(n) {
                        var sqrtN = Math.sqrt(n);
                        for (var factor = 2; factor <= sqrtN; factor++) {
                            if (!(n % factor)) {
                                return false
                            }
                        }
                        return true
                    }
                    function getFractionalBits(n) {
                        return (n - (n | 0)) * 4294967296 | 0
                    }
                    var n = 2;
                    var nPrime = 0;
                    while (nPrime < 64) {
                        if (isPrime(n)) {
                            if (nPrime < 8) {
                                H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2))
                            }
                            K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
                            nPrime++
                        }
                        n++
                    }
                }
                )();
                var W = [];
                var SHA256 = C_algo.SHA256 = Hasher.extend({
                    _doReset: function() {
                        this._hash = new WordArray.init(H.slice(0))
                    },
                    _doProcessBlock: function(M, offset) {
                        var H = this._hash.words;
                        var a = H[0];
                        var b = H[1];
                        var c = H[2];
                        var d = H[3];
                        var e = H[4];
                        var f = H[5];
                        var g = H[6];
                        var h = H[7];
                        for (var i = 0; i < 64; i++) {
                            if (i < 16) {
                                W[i] = M[offset + i] | 0
                            } else {
                                var gamma0x = W[i - 15];
                                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                                var gamma1x = W[i - 2];
                                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                            }
                            var ch = e & f ^ ~e & g;
                            var maj = a & b ^ a & c ^ b & c;
                            var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                            var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                            var t1 = h + sigma1 + ch + K[i] + W[i];
                            var t2 = sigma0 + maj;
                            h = g;
                            g = f;
                            f = e;
                            e = d + t1 | 0;
                            d = c;
                            c = b;
                            b = a;
                            a = t1 + t2 | 0
                        }
                        H[0] = H[0] + a | 0;
                        H[1] = H[1] + b | 0;
                        H[2] = H[2] + c | 0;
                        H[3] = H[3] + d | 0;
                        H[4] = H[4] + e | 0;
                        H[5] = H[5] + f | 0;
                        H[6] = H[6] + g | 0;
                        H[7] = H[7] + h | 0
                    },
                    _doFinalize: function() {
                        var data = this._data;
                        var dataWords = data.words;
                        var nBitsTotal = this._nDataBytes * 8;
                        var nBitsLeft = data.sigBytes * 8;
                        dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
                        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                        data.sigBytes = dataWords.length * 4;
                        this._process();
                        return this._hash
                    },
                    clone: function() {
                        var clone = Hasher.clone.call(this);
                        clone._hash = this._hash.clone();
                        return clone
                    }
                });
                C.SHA256 = Hasher._createHelper(SHA256);
                C.HmacSHA256 = Hasher._createHmacHelper(SHA256)
            }
            )(Math);
            return CryptoJS.SHA256
        })
    }
    , {
        "./core": 12
    }],
    39: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./x64-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./x64-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function(Math) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var Hasher = C_lib.Hasher;
                var C_x64 = C.x64;
                var X64Word = C_x64.Word;
                var C_algo = C.algo;
                var RHO_OFFSETS = [];
                var PI_INDEXES = [];
                var ROUND_CONSTANTS = [];
                (function() {
                    var x = 1
                      , y = 0;
                    for (var t = 0; t < 24; t++) {
                        RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
                        var newX = y % 5;
                        var newY = (2 * x + 3 * y) % 5;
                        x = newX;
                        y = newY
                    }
                    for (var x = 0; x < 5; x++) {
                        for (var y = 0; y < 5; y++) {
                            PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5
                        }
                    }
                    var LFSR = 1;
                    for (var i = 0; i < 24; i++) {
                        var roundConstantMsw = 0;
                        var roundConstantLsw = 0;
                        for (var j = 0; j < 7; j++) {
                            if (LFSR & 1) {
                                var bitPosition = (1 << j) - 1;
                                if (bitPosition < 32) {
                                    roundConstantLsw ^= 1 << bitPosition
                                } else {
                                    roundConstantMsw ^= 1 << bitPosition - 32
                                }
                            }
                            if (LFSR & 128) {
                                LFSR = LFSR << 1 ^ 113
                            } else {
                                LFSR <<= 1
                            }
                        }
                        ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw)
                    }
                }
                )();
                var T = [];
                (function() {
                    for (var i = 0; i < 25; i++) {
                        T[i] = X64Word.create()
                    }
                }
                )();
                var SHA3 = C_algo.SHA3 = Hasher.extend({
                    cfg: Hasher.cfg.extend({
                        outputLength: 512
                    }),
                    _doReset: function() {
                        var state = this._state = [];
                        for (var i = 0; i < 25; i++) {
                            state[i] = new X64Word.init
                        }
                        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                    },
                    _doProcessBlock: function(M, offset) {
                        var state = this._state;
                        var nBlockSizeLanes = this.blockSize / 2;
                        for (var i = 0; i < nBlockSizeLanes; i++) {
                            var M2i = M[offset + 2 * i];
                            var M2i1 = M[offset + 2 * i + 1];
                            M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                            M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                            var lane = state[i];
                            lane.high ^= M2i1;
                            lane.low ^= M2i
                        }
                        for (var round = 0; round < 24; round++) {
                            for (var x = 0; x < 5; x++) {
                                var tMsw = 0
                                  , tLsw = 0;
                                for (var y = 0; y < 5; y++) {
                                    var lane = state[x + 5 * y];
                                    tMsw ^= lane.high;
                                    tLsw ^= lane.low
                                }
                                var Tx = T[x];
                                Tx.high = tMsw;
                                Tx.low = tLsw
                            }
                            for (var x = 0; x < 5; x++) {
                                var Tx4 = T[(x + 4) % 5];
                                var Tx1 = T[(x + 1) % 5];
                                var Tx1Msw = Tx1.high;
                                var Tx1Lsw = Tx1.low;
                                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                                for (var y = 0; y < 5; y++) {
                                    var lane = state[x + 5 * y];
                                    lane.high ^= tMsw;
                                    lane.low ^= tLsw
                                }
                            }
                            for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                                var lane = state[laneIndex];
                                var laneMsw = lane.high;
                                var laneLsw = lane.low;
                                var rhoOffset = RHO_OFFSETS[laneIndex];
                                if (rhoOffset < 32) {
                                    var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                                    var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset
                                } else {
                                    var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                                    var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset
                                }
                                var TPiLane = T[PI_INDEXES[laneIndex]];
                                TPiLane.high = tMsw;
                                TPiLane.low = tLsw
                            }
                            var T0 = T[0];
                            var state0 = state[0];
                            T0.high = state0.high;
                            T0.low = state0.low;
                            for (var x = 0; x < 5; x++) {
                                for (var y = 0; y < 5; y++) {
                                    var laneIndex = x + 5 * y;
                                    var lane = state[laneIndex];
                                    var TLane = T[laneIndex];
                                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low
                                }
                            }
                            var lane = state[0];
                            var roundConstant = ROUND_CONSTANTS[round];
                            lane.high ^= roundConstant.high;
                            lane.low ^= roundConstant.low
                        }
                    },
                    _doFinalize: function() {
                        var data = this._data;
                        var dataWords = data.words;
                        var nBitsTotal = this._nDataBytes * 8;
                        var nBitsLeft = data.sigBytes * 8;
                        var blockSizeBits = this.blockSize * 32;
                        dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
                        dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
                        data.sigBytes = dataWords.length * 4;
                        this._process();
                        var state = this._state;
                        var outputLengthBytes = this.cfg.outputLength / 8;
                        var outputLengthLanes = outputLengthBytes / 8;
                        var hashWords = [];
                        for (var i = 0; i < outputLengthLanes; i++) {
                            var lane = state[i];
                            var laneMsw = lane.high;
                            var laneLsw = lane.low;
                            laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                            laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                            hashWords.push(laneLsw);
                            hashWords.push(laneMsw)
                        }
                        return new WordArray.init(hashWords,outputLengthBytes)
                    },
                    clone: function() {
                        var clone = Hasher.clone.call(this);
                        var state = clone._state = this._state.slice(0);
                        for (var i = 0; i < 25; i++) {
                            state[i] = state[i].clone()
                        }
                        return clone
                    }
                });
                C.SHA3 = Hasher._createHelper(SHA3);
                C.HmacSHA3 = Hasher._createHmacHelper(SHA3)
            }
            )(Math);
            return CryptoJS.SHA3
        })
    }
    , {
        "./core": 12,
        "./x64-core": 43
    }],
    40: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./x64-core", "./sha512"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_x64 = C.x64;
                var X64Word = C_x64.Word;
                var X64WordArray = C_x64.WordArray;
                var C_algo = C.algo;
                var SHA512 = C_algo.SHA512;
                var SHA384 = C_algo.SHA384 = SHA512.extend({
                    _doReset: function() {
                        this._hash = new X64WordArray.init([new X64Word.init(3418070365,3238371032), new X64Word.init(1654270250,914150663), new X64Word.init(2438529370,812702999), new X64Word.init(355462360,4144912697), new X64Word.init(1731405415,4290775857), new X64Word.init(2394180231,1750603025), new X64Word.init(3675008525,1694076839), new X64Word.init(1203062813,3204075428)])
                    },
                    _doFinalize: function() {
                        var hash = SHA512._doFinalize.call(this);
                        hash.sigBytes -= 16;
                        return hash
                    }
                });
                C.SHA384 = SHA512._createHelper(SHA384);
                C.HmacSHA384 = SHA512._createHmacHelper(SHA384)
            }
            )();
            return CryptoJS.SHA384
        })
    }
    , {
        "./core": 12,
        "./sha512": 41,
        "./x64-core": 43
    }],
    41: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./x64-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./x64-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var Hasher = C_lib.Hasher;
                var C_x64 = C.x64;
                var X64Word = C_x64.Word;
                var X64WordArray = C_x64.WordArray;
                var C_algo = C.algo;
                function X64Word_create() {
                    return X64Word.create.apply(X64Word, arguments)
                }
                var K = [X64Word_create(1116352408, 3609767458), X64Word_create(1899447441, 602891725), X64Word_create(3049323471, 3964484399), X64Word_create(3921009573, 2173295548), X64Word_create(961987163, 4081628472), X64Word_create(1508970993, 3053834265), X64Word_create(2453635748, 2937671579), X64Word_create(2870763221, 3664609560), X64Word_create(3624381080, 2734883394), X64Word_create(310598401, 1164996542), X64Word_create(607225278, 1323610764), X64Word_create(1426881987, 3590304994), X64Word_create(1925078388, 4068182383), X64Word_create(2162078206, 991336113), X64Word_create(2614888103, 633803317), X64Word_create(3248222580, 3479774868), X64Word_create(3835390401, 2666613458), X64Word_create(4022224774, 944711139), X64Word_create(264347078, 2341262773), X64Word_create(604807628, 2007800933), X64Word_create(770255983, 1495990901), X64Word_create(1249150122, 1856431235), X64Word_create(1555081692, 3175218132), X64Word_create(1996064986, 2198950837), X64Word_create(2554220882, 3999719339), X64Word_create(2821834349, 766784016), X64Word_create(2952996808, 2566594879), X64Word_create(3210313671, 3203337956), X64Word_create(3336571891, 1034457026), X64Word_create(3584528711, 2466948901), X64Word_create(113926993, 3758326383), X64Word_create(338241895, 168717936), X64Word_create(666307205, 1188179964), X64Word_create(773529912, 1546045734), X64Word_create(1294757372, 1522805485), X64Word_create(1396182291, 2643833823), X64Word_create(1695183700, 2343527390), X64Word_create(1986661051, 1014477480), X64Word_create(2177026350, 1206759142), X64Word_create(2456956037, 344077627), X64Word_create(2730485921, 1290863460), X64Word_create(2820302411, 3158454273), X64Word_create(3259730800, 3505952657), X64Word_create(3345764771, 106217008), X64Word_create(3516065817, 3606008344), X64Word_create(3600352804, 1432725776), X64Word_create(4094571909, 1467031594), X64Word_create(275423344, 851169720), X64Word_create(430227734, 3100823752), X64Word_create(506948616, 1363258195), X64Word_create(659060556, 3750685593), X64Word_create(883997877, 3785050280), X64Word_create(958139571, 3318307427), X64Word_create(1322822218, 3812723403), X64Word_create(1537002063, 2003034995), X64Word_create(1747873779, 3602036899), X64Word_create(1955562222, 1575990012), X64Word_create(2024104815, 1125592928), X64Word_create(2227730452, 2716904306), X64Word_create(2361852424, 442776044), X64Word_create(2428436474, 593698344), X64Word_create(2756734187, 3733110249), X64Word_create(3204031479, 2999351573), X64Word_create(3329325298, 3815920427), X64Word_create(3391569614, 3928383900), X64Word_create(3515267271, 566280711), X64Word_create(3940187606, 3454069534), X64Word_create(4118630271, 4000239992), X64Word_create(116418474, 1914138554), X64Word_create(174292421, 2731055270), X64Word_create(289380356, 3203993006), X64Word_create(460393269, 320620315), X64Word_create(685471733, 587496836), X64Word_create(852142971, 1086792851), X64Word_create(1017036298, 365543100), X64Word_create(1126000580, 2618297676), X64Word_create(1288033470, 3409855158), X64Word_create(1501505948, 4234509866), X64Word_create(1607167915, 987167468), X64Word_create(1816402316, 1246189591)];
                var W = [];
                (function() {
                    for (var i = 0; i < 80; i++) {
                        W[i] = X64Word_create()
                    }
                }
                )();
                var SHA512 = C_algo.SHA512 = Hasher.extend({
                    _doReset: function() {
                        this._hash = new X64WordArray.init([new X64Word.init(1779033703,4089235720), new X64Word.init(3144134277,2227873595), new X64Word.init(1013904242,4271175723), new X64Word.init(2773480762,1595750129), new X64Word.init(1359893119,2917565137), new X64Word.init(2600822924,725511199), new X64Word.init(528734635,4215389547), new X64Word.init(1541459225,327033209)])
                    },
                    _doProcessBlock: function(M, offset) {
                        var H = this._hash.words;
                        var H0 = H[0];
                        var H1 = H[1];
                        var H2 = H[2];
                        var H3 = H[3];
                        var H4 = H[4];
                        var H5 = H[5];
                        var H6 = H[6];
                        var H7 = H[7];
                        var H0h = H0.high;
                        var H0l = H0.low;
                        var H1h = H1.high;
                        var H1l = H1.low;
                        var H2h = H2.high;
                        var H2l = H2.low;
                        var H3h = H3.high;
                        var H3l = H3.low;
                        var H4h = H4.high;
                        var H4l = H4.low;
                        var H5h = H5.high;
                        var H5l = H5.low;
                        var H6h = H6.high;
                        var H6l = H6.low;
                        var H7h = H7.high;
                        var H7l = H7.low;
                        var ah = H0h;
                        var al = H0l;
                        var bh = H1h;
                        var bl = H1l;
                        var ch = H2h;
                        var cl = H2l;
                        var dh = H3h;
                        var dl = H3l;
                        var eh = H4h;
                        var el = H4l;
                        var fh = H5h;
                        var fl = H5l;
                        var gh = H6h;
                        var gl = H6l;
                        var hh = H7h;
                        var hl = H7l;
                        for (var i = 0; i < 80; i++) {
                            var Wi = W[i];
                            if (i < 16) {
                                var Wih = Wi.high = M[offset + i * 2] | 0;
                                var Wil = Wi.low = M[offset + i * 2 + 1] | 0
                            } else {
                                var gamma0x = W[i - 15];
                                var gamma0xh = gamma0x.high;
                                var gamma0xl = gamma0x.low;
                                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                                var gamma1x = W[i - 2];
                                var gamma1xh = gamma1x.high;
                                var gamma1xl = gamma1x.low;
                                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                                var Wi7 = W[i - 7];
                                var Wi7h = Wi7.high;
                                var Wi7l = Wi7.low;
                                var Wi16 = W[i - 16];
                                var Wi16h = Wi16.high;
                                var Wi16l = Wi16.low;
                                var Wil = gamma0l + Wi7l;
                                var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                                var Wil = Wil + gamma1l;
                                var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                                var Wil = Wil + Wi16l;
                                var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                                Wi.high = Wih;
                                Wi.low = Wil
                            }
                            var chh = eh & fh ^ ~eh & gh;
                            var chl = el & fl ^ ~el & gl;
                            var majh = ah & bh ^ ah & ch ^ bh & ch;
                            var majl = al & bl ^ al & cl ^ bl & cl;
                            var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                            var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                            var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                            var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                            var Ki = K[i];
                            var Kih = Ki.high;
                            var Kil = Ki.low;
                            var t1l = hl + sigma1l;
                            var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                            var t1l = t1l + chl;
                            var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                            var t1l = t1l + Kil;
                            var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                            var t1l = t1l + Wil;
                            var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                            var t2l = sigma0l + majl;
                            var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                            hh = gh;
                            hl = gl;
                            gh = fh;
                            gl = fl;
                            fh = eh;
                            fl = el;
                            el = dl + t1l | 0;
                            eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                            dh = ch;
                            dl = cl;
                            ch = bh;
                            cl = bl;
                            bh = ah;
                            bl = al;
                            al = t1l + t2l | 0;
                            ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0
                        }
                        H0l = H0.low = H0l + al;
                        H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
                        H1l = H1.low = H1l + bl;
                        H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
                        H2l = H2.low = H2l + cl;
                        H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
                        H3l = H3.low = H3l + dl;
                        H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
                        H4l = H4.low = H4l + el;
                        H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
                        H5l = H5.low = H5l + fl;
                        H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
                        H6l = H6.low = H6l + gl;
                        H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
                        H7l = H7.low = H7l + hl;
                        H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var data = this._data;
                        var dataWords = data.words;
                        var nBitsTotal = this._nDataBytes * 8;
                        var nBitsLeft = data.sigBytes * 8;
                        dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
                        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
                        data.sigBytes = dataWords.length * 4;
                        this._process();
                        var hash = this._hash.toX32();
                        return hash
                    },
                    clone: function() {
                        var clone = Hasher.clone.call(this);
                        clone._hash = this._hash.clone();
                        return clone
                    },
                    blockSize: 1024 / 32
                });
                C.SHA512 = Hasher._createHelper(SHA512);
                C.HmacSHA512 = Hasher._createHmacHelper(SHA512)
            }
            )();
            return CryptoJS.SHA512
        })
    }
    , {
        "./core": 12,
        "./x64-core": 43
    }],
    42: [function(require, module, exports) {
        (function(root, factory, undef) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function() {
                var C = CryptoJS;
                var C_lib = C.lib;
                var WordArray = C_lib.WordArray;
                var BlockCipher = C_lib.BlockCipher;
                var C_algo = C.algo;
                var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
                var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
                var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
                var SBOX_P = [{
                    0: 8421888,
                    268435456: 32768,
                    536870912: 8421378,
                    805306368: 2,
                    1073741824: 512,
                    1342177280: 8421890,
                    1610612736: 8389122,
                    1879048192: 8388608,
                    2147483648: 514,
                    2415919104: 8389120,
                    2684354560: 33280,
                    2952790016: 8421376,
                    3221225472: 32770,
                    3489660928: 8388610,
                    3758096384: 0,
                    4026531840: 33282,
                    134217728: 0,
                    402653184: 8421890,
                    671088640: 33282,
                    939524096: 32768,
                    1207959552: 8421888,
                    1476395008: 512,
                    1744830464: 8421378,
                    2013265920: 2,
                    2281701376: 8389120,
                    2550136832: 33280,
                    2818572288: 8421376,
                    3087007744: 8389122,
                    3355443200: 8388610,
                    3623878656: 32770,
                    3892314112: 514,
                    4160749568: 8388608,
                    1: 32768,
                    268435457: 2,
                    536870913: 8421888,
                    805306369: 8388608,
                    1073741825: 8421378,
                    1342177281: 33280,
                    1610612737: 512,
                    1879048193: 8389122,
                    2147483649: 8421890,
                    2415919105: 8421376,
                    2684354561: 8388610,
                    2952790017: 33282,
                    3221225473: 514,
                    3489660929: 8389120,
                    3758096385: 32770,
                    4026531841: 0,
                    134217729: 8421890,
                    402653185: 8421376,
                    671088641: 8388608,
                    939524097: 512,
                    1207959553: 32768,
                    1476395009: 8388610,
                    1744830465: 2,
                    2013265921: 33282,
                    2281701377: 32770,
                    2550136833: 8389122,
                    2818572289: 514,
                    3087007745: 8421888,
                    3355443201: 8389120,
                    3623878657: 0,
                    3892314113: 33280,
                    4160749569: 8421378
                }, {
                    0: 1074282512,
                    16777216: 16384,
                    33554432: 524288,
                    50331648: 1074266128,
                    67108864: 1073741840,
                    83886080: 1074282496,
                    100663296: 1073758208,
                    117440512: 16,
                    134217728: 540672,
                    150994944: 1073758224,
                    167772160: 1073741824,
                    184549376: 540688,
                    201326592: 524304,
                    218103808: 0,
                    234881024: 16400,
                    251658240: 1074266112,
                    8388608: 1073758208,
                    25165824: 540688,
                    41943040: 16,
                    58720256: 1073758224,
                    75497472: 1074282512,
                    92274688: 1073741824,
                    109051904: 524288,
                    125829120: 1074266128,
                    142606336: 524304,
                    159383552: 0,
                    176160768: 16384,
                    192937984: 1074266112,
                    209715200: 1073741840,
                    226492416: 540672,
                    243269632: 1074282496,
                    260046848: 16400,
                    268435456: 0,
                    285212672: 1074266128,
                    301989888: 1073758224,
                    318767104: 1074282496,
                    335544320: 1074266112,
                    352321536: 16,
                    369098752: 540688,
                    385875968: 16384,
                    402653184: 16400,
                    419430400: 524288,
                    436207616: 524304,
                    452984832: 1073741840,
                    469762048: 540672,
                    486539264: 1073758208,
                    503316480: 1073741824,
                    520093696: 1074282512,
                    276824064: 540688,
                    293601280: 524288,
                    310378496: 1074266112,
                    327155712: 16384,
                    343932928: 1073758208,
                    360710144: 1074282512,
                    377487360: 16,
                    394264576: 1073741824,
                    411041792: 1074282496,
                    427819008: 1073741840,
                    444596224: 1073758224,
                    461373440: 524304,
                    478150656: 0,
                    494927872: 16400,
                    511705088: 1074266128,
                    528482304: 540672
                }, {
                    0: 260,
                    1048576: 0,
                    2097152: 67109120,
                    3145728: 65796,
                    4194304: 65540,
                    5242880: 67108868,
                    6291456: 67174660,
                    7340032: 67174400,
                    8388608: 67108864,
                    9437184: 67174656,
                    10485760: 65792,
                    11534336: 67174404,
                    12582912: 67109124,
                    13631488: 65536,
                    14680064: 4,
                    15728640: 256,
                    524288: 67174656,
                    1572864: 67174404,
                    2621440: 0,
                    3670016: 67109120,
                    4718592: 67108868,
                    5767168: 65536,
                    6815744: 65540,
                    7864320: 260,
                    8912896: 4,
                    9961472: 256,
                    11010048: 67174400,
                    12058624: 65796,
                    13107200: 65792,
                    14155776: 67109124,
                    15204352: 67174660,
                    16252928: 67108864,
                    16777216: 67174656,
                    17825792: 65540,
                    18874368: 65536,
                    19922944: 67109120,
                    20971520: 256,
                    22020096: 67174660,
                    23068672: 67108868,
                    24117248: 0,
                    25165824: 67109124,
                    26214400: 67108864,
                    27262976: 4,
                    28311552: 65792,
                    29360128: 67174400,
                    30408704: 260,
                    31457280: 65796,
                    32505856: 67174404,
                    17301504: 67108864,
                    18350080: 260,
                    19398656: 67174656,
                    20447232: 0,
                    21495808: 65540,
                    22544384: 67109120,
                    23592960: 256,
                    24641536: 67174404,
                    25690112: 65536,
                    26738688: 67174660,
                    27787264: 65796,
                    28835840: 67108868,
                    29884416: 67109124,
                    30932992: 67174400,
                    31981568: 4,
                    33030144: 65792
                }, {
                    0: 2151682048,
                    65536: 2147487808,
                    131072: 4198464,
                    196608: 2151677952,
                    262144: 0,
                    327680: 4198400,
                    393216: 2147483712,
                    458752: 4194368,
                    524288: 2147483648,
                    589824: 4194304,
                    655360: 64,
                    720896: 2147487744,
                    786432: 2151678016,
                    851968: 4160,
                    917504: 4096,
                    983040: 2151682112,
                    32768: 2147487808,
                    98304: 64,
                    163840: 2151678016,
                    229376: 2147487744,
                    294912: 4198400,
                    360448: 2151682112,
                    425984: 0,
                    491520: 2151677952,
                    557056: 4096,
                    622592: 2151682048,
                    688128: 4194304,
                    753664: 4160,
                    819200: 2147483648,
                    884736: 4194368,
                    950272: 4198464,
                    1015808: 2147483712,
                    1048576: 4194368,
                    1114112: 4198400,
                    1179648: 2147483712,
                    1245184: 0,
                    1310720: 4160,
                    1376256: 2151678016,
                    1441792: 2151682048,
                    1507328: 2147487808,
                    1572864: 2151682112,
                    1638400: 2147483648,
                    1703936: 2151677952,
                    1769472: 4198464,
                    1835008: 2147487744,
                    1900544: 4194304,
                    1966080: 64,
                    2031616: 4096,
                    1081344: 2151677952,
                    1146880: 2151682112,
                    1212416: 0,
                    1277952: 4198400,
                    1343488: 4194368,
                    1409024: 2147483648,
                    1474560: 2147487808,
                    1540096: 64,
                    1605632: 2147483712,
                    1671168: 4096,
                    1736704: 2147487744,
                    1802240: 2151678016,
                    1867776: 4160,
                    1933312: 2151682048,
                    1998848: 4194304,
                    2064384: 4198464
                }, {
                    0: 128,
                    4096: 17039360,
                    8192: 262144,
                    12288: 536870912,
                    16384: 537133184,
                    20480: 16777344,
                    24576: 553648256,
                    28672: 262272,
                    32768: 16777216,
                    36864: 537133056,
                    40960: 536871040,
                    45056: 553910400,
                    49152: 553910272,
                    53248: 0,
                    57344: 17039488,
                    61440: 553648128,
                    2048: 17039488,
                    6144: 553648256,
                    10240: 128,
                    14336: 17039360,
                    18432: 262144,
                    22528: 537133184,
                    26624: 553910272,
                    30720: 536870912,
                    34816: 537133056,
                    38912: 0,
                    43008: 553910400,
                    47104: 16777344,
                    51200: 536871040,
                    55296: 553648128,
                    59392: 16777216,
                    63488: 262272,
                    65536: 262144,
                    69632: 128,
                    73728: 536870912,
                    77824: 553648256,
                    81920: 16777344,
                    86016: 553910272,
                    90112: 537133184,
                    94208: 16777216,
                    98304: 553910400,
                    102400: 553648128,
                    106496: 17039360,
                    110592: 537133056,
                    114688: 262272,
                    118784: 536871040,
                    122880: 0,
                    126976: 17039488,
                    67584: 553648256,
                    71680: 16777216,
                    75776: 17039360,
                    79872: 537133184,
                    83968: 536870912,
                    88064: 17039488,
                    92160: 128,
                    96256: 553910272,
                    100352: 262272,
                    104448: 553910400,
                    108544: 0,
                    112640: 553648128,
                    116736: 16777344,
                    120832: 262144,
                    124928: 537133056,
                    129024: 536871040
                }, {
                    0: 268435464,
                    256: 8192,
                    512: 270532608,
                    768: 270540808,
                    1024: 268443648,
                    1280: 2097152,
                    1536: 2097160,
                    1792: 268435456,
                    2048: 0,
                    2304: 268443656,
                    2560: 2105344,
                    2816: 8,
                    3072: 270532616,
                    3328: 2105352,
                    3584: 8200,
                    3840: 270540800,
                    128: 270532608,
                    384: 270540808,
                    640: 8,
                    896: 2097152,
                    1152: 2105352,
                    1408: 268435464,
                    1664: 268443648,
                    1920: 8200,
                    2176: 2097160,
                    2432: 8192,
                    2688: 268443656,
                    2944: 270532616,
                    3200: 0,
                    3456: 270540800,
                    3712: 2105344,
                    3968: 268435456,
                    4096: 268443648,
                    4352: 270532616,
                    4608: 270540808,
                    4864: 8200,
                    5120: 2097152,
                    5376: 268435456,
                    5632: 268435464,
                    5888: 2105344,
                    6144: 2105352,
                    6400: 0,
                    6656: 8,
                    6912: 270532608,
                    7168: 8192,
                    7424: 268443656,
                    7680: 270540800,
                    7936: 2097160,
                    4224: 8,
                    4480: 2105344,
                    4736: 2097152,
                    4992: 268435464,
                    5248: 268443648,
                    5504: 8200,
                    5760: 270540808,
                    6016: 270532608,
                    6272: 270540800,
                    6528: 270532616,
                    6784: 8192,
                    7040: 2105352,
                    7296: 2097160,
                    7552: 0,
                    7808: 268435456,
                    8064: 268443656
                }, {
                    0: 1048576,
                    16: 33555457,
                    32: 1024,
                    48: 1049601,
                    64: 34604033,
                    80: 0,
                    96: 1,
                    112: 34603009,
                    128: 33555456,
                    144: 1048577,
                    160: 33554433,
                    176: 34604032,
                    192: 34603008,
                    208: 1025,
                    224: 1049600,
                    240: 33554432,
                    8: 34603009,
                    24: 0,
                    40: 33555457,
                    56: 34604032,
                    72: 1048576,
                    88: 33554433,
                    104: 33554432,
                    120: 1025,
                    136: 1049601,
                    152: 33555456,
                    168: 34603008,
                    184: 1048577,
                    200: 1024,
                    216: 34604033,
                    232: 1,
                    248: 1049600,
                    256: 33554432,
                    272: 1048576,
                    288: 33555457,
                    304: 34603009,
                    320: 1048577,
                    336: 33555456,
                    352: 34604032,
                    368: 1049601,
                    384: 1025,
                    400: 34604033,
                    416: 1049600,
                    432: 1,
                    448: 0,
                    464: 34603008,
                    480: 33554433,
                    496: 1024,
                    264: 1049600,
                    280: 33555457,
                    296: 34603009,
                    312: 1,
                    328: 33554432,
                    344: 1048576,
                    360: 1025,
                    376: 34604032,
                    392: 33554433,
                    408: 34603008,
                    424: 0,
                    440: 34604033,
                    456: 1049601,
                    472: 1024,
                    488: 33555456,
                    504: 1048577
                }, {
                    0: 134219808,
                    1: 131072,
                    2: 134217728,
                    3: 32,
                    4: 131104,
                    5: 134350880,
                    6: 134350848,
                    7: 2048,
                    8: 134348800,
                    9: 134219776,
                    10: 133120,
                    11: 134348832,
                    12: 2080,
                    13: 0,
                    14: 134217760,
                    15: 133152,
                    2147483648: 2048,
                    2147483649: 134350880,
                    2147483650: 134219808,
                    2147483651: 134217728,
                    2147483652: 134348800,
                    2147483653: 133120,
                    2147483654: 133152,
                    2147483655: 32,
                    2147483656: 134217760,
                    2147483657: 2080,
                    2147483658: 131104,
                    2147483659: 134350848,
                    2147483660: 0,
                    2147483661: 134348832,
                    2147483662: 134219776,
                    2147483663: 131072,
                    16: 133152,
                    17: 134350848,
                    18: 32,
                    19: 2048,
                    20: 134219776,
                    21: 134217760,
                    22: 134348832,
                    23: 131072,
                    24: 0,
                    25: 131104,
                    26: 134348800,
                    27: 134219808,
                    28: 134350880,
                    29: 133120,
                    30: 2080,
                    31: 134217728,
                    2147483664: 131072,
                    2147483665: 2048,
                    2147483666: 134348832,
                    2147483667: 133152,
                    2147483668: 32,
                    2147483669: 134348800,
                    2147483670: 134217728,
                    2147483671: 134219808,
                    2147483672: 134350880,
                    2147483673: 134217760,
                    2147483674: 134219776,
                    2147483675: 0,
                    2147483676: 133120,
                    2147483677: 2080,
                    2147483678: 131104,
                    2147483679: 134350848
                }];
                var SBOX_MASK = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
                var DES = C_algo.DES = BlockCipher.extend({
                    _doReset: function() {
                        var key = this._key;
                        var keyWords = key.words;
                        var keyBits = [];
                        for (var i = 0; i < 56; i++) {
                            var keyBitPos = PC1[i] - 1;
                            keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1
                        }
                        var subKeys = this._subKeys = [];
                        for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                            var subKey = subKeys[nSubKey] = [];
                            var bitShift = BIT_SHIFTS[nSubKey];
                            for (var i = 0; i < 24; i++) {
                                subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                                subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6
                            }
                            subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                            for (var i = 1; i < 7; i++) {
                                subKey[i] = subKey[i] >>> (i - 1) * 4 + 3
                            }
                            subKey[7] = subKey[7] << 5 | subKey[7] >>> 27
                        }
                        var invSubKeys = this._invSubKeys = [];
                        for (var i = 0; i < 16; i++) {
                            invSubKeys[i] = subKeys[15 - i]
                        }
                    },
                    encryptBlock: function(M, offset) {
                        this._doCryptBlock(M, offset, this._subKeys)
                    },
                    decryptBlock: function(M, offset) {
                        this._doCryptBlock(M, offset, this._invSubKeys)
                    },
                    _doCryptBlock: function(M, offset, subKeys) {
                        this._lBlock = M[offset];
                        this._rBlock = M[offset + 1];
                        exchangeLR.call(this, 4, 252645135);
                        exchangeLR.call(this, 16, 65535);
                        exchangeRL.call(this, 2, 858993459);
                        exchangeRL.call(this, 8, 16711935);
                        exchangeLR.call(this, 1, 1431655765);
                        for (var round = 0; round < 16; round++) {
                            var subKey = subKeys[round];
                            var lBlock = this._lBlock;
                            var rBlock = this._rBlock;
                            var f = 0;
                            for (var i = 0; i < 8; i++) {
                                f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0]
                            }
                            this._lBlock = rBlock;
                            this._rBlock = lBlock ^ f
                        }
                        var t = this._lBlock;
                        this._lBlock = this._rBlock;
                        this._rBlock = t;
                        exchangeLR.call(this, 1, 1431655765);
                        exchangeRL.call(this, 8, 16711935);
                        exchangeRL.call(this, 2, 858993459);
                        exchangeLR.call(this, 16, 65535);
                        exchangeLR.call(this, 4, 252645135);
                        M[offset] = this._lBlock;
                        M[offset + 1] = this._rBlock
                    },
                    keySize: 64 / 32,
                    ivSize: 64 / 32,
                    blockSize: 64 / 32
                });
                function exchangeLR(offset, mask) {
                    var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
                    this._rBlock ^= t;
                    this._lBlock ^= t << offset
                }
                function exchangeRL(offset, mask) {
                    var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
                    this._lBlock ^= t;
                    this._rBlock ^= t << offset
                }
                C.DES = BlockCipher._createHelper(DES);
                var TripleDES = C_algo.TripleDES = BlockCipher.extend({
                    _doReset: function() {
                        var key = this._key;
                        var keyWords = key.words;
                        this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
                        this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
                        this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)))
                    },
                    encryptBlock: function(M, offset) {
                        this._des1.encryptBlock(M, offset);
                        this._des2.decryptBlock(M, offset);
                        this._des3.encryptBlock(M, offset)
                    },
                    decryptBlock: function(M, offset) {
                        this._des3.decryptBlock(M, offset);
                        this._des2.encryptBlock(M, offset);
                        this._des1.decryptBlock(M, offset)
                    },
                    keySize: 192 / 32,
                    ivSize: 64 / 32,
                    blockSize: 64 / 32
                });
                C.TripleDES = BlockCipher._createHelper(TripleDES)
            }
            )();
            return CryptoJS.TripleDES
        })
    }
    , {
        "./cipher-core": 11,
        "./core": 12,
        "./enc-base64": 13,
        "./evpkdf": 15,
        "./md5": 20
    }],
    43: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = exports = factory(require("./core"))
            } else if (typeof define === "function" && define.amd) {
                define(["./core"], factory)
            } else {
                factory(root.CryptoJS)
            }
        }
        )(this, function(CryptoJS) {
            (function(undefined) {
                var C = CryptoJS;
                var C_lib = C.lib;
                var Base = C_lib.Base;
                var X32WordArray = C_lib.WordArray;
                var C_x64 = C.x64 = {};
                var X64Word = C_x64.Word = Base.extend({
                    init: function(high, low) {
                        this.high = high;
                        this.low = low
                    }
                });
                var X64WordArray = C_x64.WordArray = Base.extend({
                    init: function(words, sigBytes) {
                        words = this.words = words || [];
                        if (sigBytes != undefined) {
                            this.sigBytes = sigBytes
                        } else {
                            this.sigBytes = words.length * 8
                        }
                    },
                    toX32: function() {
                        var x64Words = this.words;
                        var x64WordsLength = x64Words.length;
                        var x32Words = [];
                        for (var i = 0; i < x64WordsLength; i++) {
                            var x64Word = x64Words[i];
                            x32Words.push(x64Word.high);
                            x32Words.push(x64Word.low)
                        }
                        return X32WordArray.create(x32Words, this.sigBytes)
                    },
                    clone: function() {
                        var clone = Base.clone.call(this);
                        var words = clone.words = this.words.slice(0);
                        var wordsLength = words.length;
                        for (var i = 0; i < wordsLength; i++) {
                            words[i] = words[i].clone()
                        }
                        return clone
                    }
                })
            }
            )();
            return CryptoJS
        })
    }
    , {
        "./core": 12
    }],
    44: [function(require, module, exports) {
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m;
            var eLen = nBytes * 8 - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var nBits = -7;
            var i = isLE ? nBytes - 1 : 0;
            var d = isLE ? -1 : 1;
            var s = buffer[offset + i];
            i += d;
            e = s & (1 << -nBits) - 1;
            s >>= -nBits;
            nBits += eLen;
            for (; nBits > 0; e = e * 256 + buffer[offset + i],
            i += d,
            nBits -= 8) {}
            m = e & (1 << -nBits) - 1;
            e >>= -nBits;
            nBits += mLen;
            for (; nBits > 0; m = m * 256 + buffer[offset + i],
            i += d,
            nBits -= 8) {}
            if (e === 0) {
                e = 1 - eBias
            } else if (e === eMax) {
                return m ? NaN : (s ? -1 : 1) * Infinity
            } else {
                m = m + Math.pow(2, mLen);
                e = e - eBias
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
        }
        ;
        exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c;
            var eLen = nBytes * 8 - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
            var i = isLE ? 0 : nBytes - 1;
            var d = isLE ? 1 : -1;
            var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
            value = Math.abs(value);
            if (isNaN(value) || value === Infinity) {
                m = isNaN(value) ? 1 : 0;
                e = eMax
            } else {
                e = Math.floor(Math.log(value) / Math.LN2);
                if (value * (c = Math.pow(2, -e)) < 1) {
                    e--;
                    c *= 2
                }
                if (e + eBias >= 1) {
                    value += rt / c
                } else {
                    value += rt * Math.pow(2, 1 - eBias)
                }
                if (value * c >= 2) {
                    e++;
                    c /= 2
                }
                if (e + eBias >= eMax) {
                    m = 0;
                    e = eMax
                } else if (e + eBias >= 1) {
                    m = (value * c - 1) * Math.pow(2, mLen);
                    e = e + eBias
                } else {
                    m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                    e = 0
                }
            }
            for (; mLen >= 8; buffer[offset + i] = m & 255,
            i += d,
            m /= 256,
            mLen -= 8) {}
            e = e << mLen | m;
            eLen += mLen;
            for (; eLen > 0; buffer[offset + i] = e & 255,
            i += d,
            e /= 256,
            eLen -= 8) {}
            buffer[offset + i - d] |= s * 128
        }
    }
    , {}],
    45: [function(require, module, exports) {
        (function(root, factory) {
            if (typeof exports === "object") {
                module.exports = factory()
            } else if (typeof define === "function" && define.amd) {
                define(factory)
            } else {
                root.treeify = factory()
            }
        }
        )(this, function() {
            function makePrefix(key, last) {
                var str = last ? "└" : "├";
                if (key) {
                    str += "─ "
                } else {
                    str += "──┐"
                }
                return str
            }
            function filterKeys(obj, hideFunctions) {
                var keys = [];
                for (var branch in obj) {
                    if (!obj.hasOwnProperty(branch)) {
                        continue
                    }
                    if (hideFunctions && typeof obj[branch] === "function") {
                        continue
                    }
                    keys.push(branch)
                }
                return keys
            }
            function growBranch(key, root, last, lastStates, showValues, hideFunctions, callback) {
                var line = "", index = 0, lastKey, circular, lastStatesCopy = lastStates.slice(0);
                if (lastStatesCopy.push([root, last]) && lastStates.length > 0) {
                    lastStates.forEach(function(lastState, idx) {
                        if (idx > 0) {
                            line += (lastState[1] ? " " : "│") + "  "
                        }
                        if (!circular && lastState[0] === root) {
                            circular = true
                        }
                    });
                    line += makePrefix(key, last) + key;
                    showValues && (typeof root !== "object" || root instanceof Date) && (line += ": " + root);
                    circular && (line += " (circular ref.)");
                    callback(line)
                }
                if (!circular && typeof root === "object") {
                    var keys = filterKeys(root, hideFunctions);
                    keys.forEach(function(branch) {
                        lastKey = ++index === keys.length;
                        growBranch(branch, root[branch], lastKey, lastStatesCopy, showValues, hideFunctions, callback)
                    })
                }
            }
            var Treeify = {};
            Treeify.asLines = function(obj, showValues, hideFunctions, lineCallback) {
                var hideFunctionsArg = typeof hideFunctions !== "function" ? hideFunctions : false;
                growBranch(".", obj, false, [], showValues, hideFunctionsArg, lineCallback || hideFunctions)
            }
            ;
            Treeify.asTree = function(obj, showValues, hideFunctions) {
                var tree = "";
                growBranch(".", obj, false, [], showValues, hideFunctions, function(line) {
                    tree += line + "\n"
                });
                return tree
            }
            ;
            return Treeify
        })
    }
    , {}]
}, {}, [6]);

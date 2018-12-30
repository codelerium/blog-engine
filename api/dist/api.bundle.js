/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/api.js":
/*!********************!*\
  !*** ./api/api.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nvar _dev = __webpack_require__(/*! ./config/dev */ \"./api/config/dev.js\");\n\nvar _graphqlServerExpress = __webpack_require__(/*! graphql-server-express */ \"graphql-server-express\");\n\nvar _graphqlTools = __webpack_require__(/*! graphql-tools */ \"graphql-tools\");\n\nvar _mongodb = __webpack_require__(/*! mongodb */ \"mongodb\");\n\nvar _types = __webpack_require__(/*! ./schemas/types */ \"./api/schemas/types.js\");\n\nvar _resolvers = __webpack_require__(/*! ./schemas/resolvers */ \"./api/schemas/resolvers.js\");\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar _cors2 = _interopRequireDefault(_cors);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _https = __webpack_require__(/*! https */ \"https\");\n\nvar _https2 = _interopRequireDefault(_https);\n\n__webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n// Certificate\nvar privateKey = _fs2.default.readFileSync('/etc/letsencrypt/live/codelirium.io/privkey.pem', 'utf8');\nvar certificate = _fs2.default.readFileSync('/etc/letsencrypt/live/codelirium.io/cert.pem', 'utf8');\nvar ca = _fs2.default.readFileSync('/etc/letsencrypt/live/codelirium.io/chain.pem', 'utf8');\n\nvar credentials = {\n  // key: privateKey,\n  // cert: certificate,\n  // ca: ca\n};\n\nvar directiveResolvers = {\n  requireAuth: function requireAuth(next, src, args, context) {\n    var token = void 0;\n    try {\n      token = context.Authorization.split(' ')[1];\n      var config = _dotenv2.default.config();\n      var valid = _jsonwebtoken2.default.verify(token, config.parsed.SECRET);\n      if (valid) {\n        return next();\n      }\n      return 'Unauthorized';\n    } catch (err) {\n      throw new Error(err);\n    }\n  }\n};\n\nvar init = function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var client, DB, User, Article, Subscriber, Commenter, Comment, schema, app, httpsServer;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return _mongodb.MongoClient.connect(_dev.MONGO_CONN_STRING);\n\n          case 2:\n            client = _context.sent;\n            DB = client.db('grapql-test');\n            User = DB.collection('User');\n            Article = DB.collection('Article');\n            Subscriber = DB.collection('Subscriber');\n            Commenter = DB.collection('Commenter');\n            Comment = DB.collection('Comment');\n            schema = (0, _graphqlTools.makeExecutableSchema)({\n              typeDefs: _types.typeDefs,\n              resolvers: (0, _resolvers.resolvers)(User, Article, Subscriber, Commenter, Comment),\n              directiveResolvers: directiveResolvers\n            });\n            app = (0, _express2.default)();\n\n\n            app.use(_express2.default.static(__dirname, { dotfiles: 'allow' }));\n            app.use((0, _cors2.default)());\n            app.use('/api', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (req) {\n              return {\n                schema: schema,\n                context: {\n                  Authorization: req.headers['authorization']\n                }\n              };\n            }));\n\n            httpsServer = _https2.default.createServer(credentials, app);\n\n            // httpsServer.listen(444, () => {\n            //   console.log('HTTPS Server running on port 444');\n            // });\n\n            app.use('/apis', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/api' }));\n            app.listen(3001, function () {\n              console.log('Server started at http://localhost:3001');\n            });\n\n          case 17:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function init() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\ninit();\n/* WEBPACK VAR INJECTION */}.call(this, \"api\"))\n\n//# sourceURL=webpack:///./api/api.js?");

/***/ }),

/***/ "./api/config/dev.js":
/*!***************************!*\
  !*** ./api/config/dev.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar MONGO_CONN_STRING = exports.MONGO_CONN_STRING = 'mongodb://localhost:27017/grapql-test'; //'mongodb://admin:admin@ds237848.mlab.com:37848/grapql-test';\n\n//# sourceURL=webpack:///./api/config/dev.js?");

/***/ }),

/***/ "./api/schemas/resolvers.js":
/*!**********************************!*\
  !*** ./api/schemas/resolvers.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.resolvers = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _bcryptjs = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n\nvar _bcryptjs2 = _interopRequireDefault(_bcryptjs);\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar resolvers = exports.resolvers = function resolvers(User, Article, Subscriber, Commenter, Comment) {\n  return {\n    Query: {\n      /* retrieveUser: async (root, {_id}) => (await User.findOne({ _id })),\n      retrieveAllUsers: async () => (await User.find({}).toArray()), */\n      login: function () {\n        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, _ref2) {\n          var email = _ref2.email,\n              password = _ref2.password;\n          var user, valid, config;\n          return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  _context.next = 2;\n                  return User.findOne({ email: email });\n\n                case 2:\n                  user = _context.sent;\n                  _context.next = 5;\n                  return _bcryptjs2.default.compare(password, user.password);\n\n                case 5:\n                  valid = _context.sent;\n                  config = _dotenv2.default.config();\n\n                  if (!valid) {\n                    _context.next = 11;\n                    break;\n                  }\n\n                  return _context.abrupt('return', _jsonwebtoken2.default.sign({ email: email }, config.parsed.SECRET));\n\n                case 11:\n                  return _context.abrupt('return', 'Unauthorized');\n\n                case 12:\n                case 'end':\n                  return _context.stop();\n              }\n            }\n          }, _callee, undefined);\n        }));\n\n        return function login(_x, _x2) {\n          return _ref.apply(this, arguments);\n        };\n      }(),\n      retrieveArticle: function () {\n        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, _ref4) {\n          var slug = _ref4.slug;\n          return regeneratorRuntime.wrap(function _callee2$(_context2) {\n            while (1) {\n              switch (_context2.prev = _context2.next) {\n                case 0:\n                  console.log('SLUG', slug);\n                  _context2.next = 3;\n                  return Article.findOne({ slug: slug });\n\n                case 3:\n                  return _context2.abrupt('return', _context2.sent);\n\n                case 4:\n                case 'end':\n                  return _context2.stop();\n              }\n            }\n          }, _callee2, undefined);\n        }));\n\n        return function retrieveArticle(_x3, _x4) {\n          return _ref3.apply(this, arguments);\n        };\n      }(),\n      retrieveAllArticles: function () {\n        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n          return regeneratorRuntime.wrap(function _callee3$(_context3) {\n            while (1) {\n              switch (_context3.prev = _context3.next) {\n                case 0:\n                  _context3.next = 2;\n                  return Article.find({}).toArray();\n\n                case 2:\n                  return _context3.abrupt('return', _context3.sent);\n\n                case 3:\n                case 'end':\n                  return _context3.stop();\n              }\n            }\n          }, _callee3, undefined);\n        }));\n\n        return function retrieveAllArticles() {\n          return _ref5.apply(this, arguments);\n        };\n      }(),\n      retrieveCommenter: function () {\n        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, _ref7) {\n          var _id = _ref7._id;\n          return regeneratorRuntime.wrap(function _callee4$(_context4) {\n            while (1) {\n              switch (_context4.prev = _context4.next) {\n                case 0:\n                  _context4.next = 2;\n                  return Commenter.findOne({ _id: _id });\n\n                case 2:\n                  return _context4.abrupt('return', _context4.sent);\n\n                case 3:\n                case 'end':\n                  return _context4.stop();\n              }\n            }\n          }, _callee4, undefined);\n        }));\n\n        return function retrieveCommenter(_x5, _x6) {\n          return _ref6.apply(this, arguments);\n        };\n      }(),\n      retrieveCommentsByArticle: function () {\n        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root, _ref9) {\n          var articleId = _ref9.articleId;\n          return regeneratorRuntime.wrap(function _callee5$(_context5) {\n            while (1) {\n              switch (_context5.prev = _context5.next) {\n                case 0:\n                  _context5.next = 2;\n                  return Comment.find({ articleId: articleId }).toArray();\n\n                case 2:\n                  return _context5.abrupt('return', _context5.sent);\n\n                case 3:\n                case 'end':\n                  return _context5.stop();\n              }\n            }\n          }, _callee5, undefined);\n        }));\n\n        return function retrieveCommentsByArticle(_x7, _x8) {\n          return _ref8.apply(this, arguments);\n        };\n      }()\n    },\n    Mutation: {\n      createUser: function () {\n        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(root, _ref11) {\n          var _id = _ref11._id,\n              input = _ref11.input;\n          var hashedPassword;\n          return regeneratorRuntime.wrap(function _callee6$(_context6) {\n            while (1) {\n              switch (_context6.prev = _context6.next) {\n                case 0:\n                  _context6.next = 2;\n                  return _bcryptjs2.default.hash(input.password, 10);\n\n                case 2:\n                  hashedPassword = _context6.sent;\n                  _context6.next = 5;\n                  return User.insert({\n                    _id: _id,\n                    email: input.email,\n                    password: hashedPassword\n                  });\n\n                case 5:\n                  _context6.next = 7;\n                  return User.findOne({ _id: _id });\n\n                case 7:\n                  return _context6.abrupt('return', _context6.sent);\n\n                case 8:\n                case 'end':\n                  return _context6.stop();\n              }\n            }\n          }, _callee6, undefined);\n        }));\n\n        return function createUser(_x9, _x10) {\n          return _ref10.apply(this, arguments);\n        };\n      }(),\n      updateUser: function () {\n        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(root, _ref13) {\n          var _id = _ref13._id,\n              input = _ref13.input;\n          return regeneratorRuntime.wrap(function _callee7$(_context7) {\n            while (1) {\n              switch (_context7.prev = _context7.next) {\n                case 0:\n                  _context7.next = 2;\n                  return User.findOneAndUpdate({ _id: _id }, Object.entries(input).reduce(function (res, _ref14) {\n                    var _ref15 = _slicedToArray(_ref14, 2),\n                        field = _ref15[0],\n                        value = _ref15[1];\n\n                    res = _extends({}, res, { $set: _defineProperty({}, field, value) });\n                    return res;\n                  }, {}));\n\n                case 2:\n                  _context7.next = 4;\n                  return User.findOne({ _id: _id });\n\n                case 4:\n                  return _context7.abrupt('return', _context7.sent);\n\n                case 5:\n                case 'end':\n                  return _context7.stop();\n              }\n            }\n          }, _callee7, undefined);\n        }));\n\n        return function updateUser(_x11, _x12) {\n          return _ref12.apply(this, arguments);\n        };\n      }(),\n      deleteUser: function () {\n        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(root, _ref17) {\n          var _id = _ref17._id;\n          return regeneratorRuntime.wrap(function _callee8$(_context8) {\n            while (1) {\n              switch (_context8.prev = _context8.next) {\n                case 0:\n                  _context8.next = 2;\n                  return User.remove({ _id: _id });\n\n                case 2:\n                  return _context8.abrupt('return', _context8.sent);\n\n                case 3:\n                case 'end':\n                  return _context8.stop();\n              }\n            }\n          }, _callee8, undefined);\n        }));\n\n        return function deleteUser(_x13, _x14) {\n          return _ref16.apply(this, arguments);\n        };\n      }(),\n      deleteAllUsers: function () {\n        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {\n          return regeneratorRuntime.wrap(function _callee9$(_context9) {\n            while (1) {\n              switch (_context9.prev = _context9.next) {\n                case 0:\n                  _context9.next = 2;\n                  return User.remove({});\n\n                case 2:\n                  return _context9.abrupt('return', _context9.sent);\n\n                case 3:\n                case 'end':\n                  return _context9.stop();\n              }\n            }\n          }, _callee9, undefined);\n        }));\n\n        return function deleteAllUsers() {\n          return _ref18.apply(this, arguments);\n        };\n      }(),\n      createArticle: function () {\n        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(root, _ref20) {\n          var _id = _ref20._id,\n              input = _ref20.input;\n          return regeneratorRuntime.wrap(function _callee10$(_context10) {\n            while (1) {\n              switch (_context10.prev = _context10.next) {\n                case 0:\n                  _context10.next = 2;\n                  return Article.insert(_extends({ _id: _id }, input));\n\n                case 2:\n                  _context10.next = 4;\n                  return Article.findOne({ _id: _id });\n\n                case 4:\n                  return _context10.abrupt('return', _context10.sent);\n\n                case 5:\n                case 'end':\n                  return _context10.stop();\n              }\n            }\n          }, _callee10, undefined);\n        }));\n\n        return function createArticle(_x15, _x16) {\n          return _ref19.apply(this, arguments);\n        };\n      }(),\n      updateArticle: function () {\n        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(root, _ref22) {\n          var _id = _ref22._id,\n              input = _ref22.input;\n          return regeneratorRuntime.wrap(function _callee11$(_context11) {\n            while (1) {\n              switch (_context11.prev = _context11.next) {\n                case 0:\n                  _context11.next = 2;\n                  return Article.findOneAndUpdate({ _id: _id }, Object.entries(input).reduce(function (res, _ref23) {\n                    var _ref24 = _slicedToArray(_ref23, 2),\n                        field = _ref24[0],\n                        value = _ref24[1];\n\n                    res = _extends({}, res, { $set: _defineProperty({}, field, value) });\n                    return res;\n                  }, {}));\n\n                case 2:\n                  _context11.next = 4;\n                  return Article.findOne({ _id: _id });\n\n                case 4:\n                  return _context11.abrupt('return', _context11.sent);\n\n                case 5:\n                case 'end':\n                  return _context11.stop();\n              }\n            }\n          }, _callee11, undefined);\n        }));\n\n        return function updateArticle(_x17, _x18) {\n          return _ref21.apply(this, arguments);\n        };\n      }(),\n      deleteArticle: function () {\n        var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(root, _ref26) {\n          var _id = _ref26._id;\n          return regeneratorRuntime.wrap(function _callee12$(_context12) {\n            while (1) {\n              switch (_context12.prev = _context12.next) {\n                case 0:\n                  _context12.next = 2;\n                  return Article.remove({ _id: _id });\n\n                case 2:\n                  return _context12.abrupt('return', _context12.sent);\n\n                case 3:\n                case 'end':\n                  return _context12.stop();\n              }\n            }\n          }, _callee12, undefined);\n        }));\n\n        return function deleteArticle(_x19, _x20) {\n          return _ref25.apply(this, arguments);\n        };\n      }(),\n      deleteAllArticles: function () {\n        var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {\n          return regeneratorRuntime.wrap(function _callee13$(_context13) {\n            while (1) {\n              switch (_context13.prev = _context13.next) {\n                case 0:\n                  _context13.next = 2;\n                  return Article.remove({});\n\n                case 2:\n                  return _context13.abrupt('return', _context13.sent);\n\n                case 3:\n                case 'end':\n                  return _context13.stop();\n              }\n            }\n          }, _callee13, undefined);\n        }));\n\n        return function deleteAllArticles() {\n          return _ref27.apply(this, arguments);\n        };\n      }(),\n      subscribe: function () {\n        var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(root, _ref29) {\n          var _id = _ref29._id,\n              input = _ref29.input;\n          var found;\n          return regeneratorRuntime.wrap(function _callee14$(_context14) {\n            while (1) {\n              switch (_context14.prev = _context14.next) {\n                case 0:\n                  _context14.next = 2;\n                  return Subscriber.findOne({ email: input.email });\n\n                case 2:\n                  found = _context14.sent;\n\n                  if (!found) {\n                    _context14.next = 5;\n                    break;\n                  }\n\n                  return _context14.abrupt('return', false);\n\n                case 5:\n                  _context14.next = 7;\n                  return Subscriber.insert({\n                    _id: _id,\n                    email: input.email\n                  });\n\n                case 7:\n                  _context14.next = 9;\n                  return Subscriber.findOne({ _id: _id });\n\n                case 9:\n                  return _context14.abrupt('return', _context14.sent);\n\n                case 10:\n                case 'end':\n                  return _context14.stop();\n              }\n            }\n          }, _callee14, undefined);\n        }));\n\n        return function subscribe(_x21, _x22) {\n          return _ref28.apply(this, arguments);\n        };\n      }(),\n      unsubscribe: function () {\n        var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(root, _ref31) {\n          var _id = _ref31._id;\n          return regeneratorRuntime.wrap(function _callee15$(_context15) {\n            while (1) {\n              switch (_context15.prev = _context15.next) {\n                case 0:\n                  _context15.next = 2;\n                  return Subscriber.remove({ _id: _id });\n\n                case 2:\n                  return _context15.abrupt('return', _context15.sent);\n\n                case 3:\n                case 'end':\n                  return _context15.stop();\n              }\n            }\n          }, _callee15, undefined);\n        }));\n\n        return function unsubscribe(_x23, _x24) {\n          return _ref30.apply(this, arguments);\n        };\n      }(),\n      createComment: function () {\n        var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(root, _ref33) {\n          var _id = _ref33._id,\n              input = _ref33.input;\n          return regeneratorRuntime.wrap(function _callee16$(_context16) {\n            while (1) {\n              switch (_context16.prev = _context16.next) {\n                case 0:\n                  _context16.next = 2;\n                  return Comment.insert(_extends({\n                    _id: _id\n                  }, input));\n\n                case 2:\n                  _context16.next = 4;\n                  return Comment.findOne({ _id: _id });\n\n                case 4:\n                  return _context16.abrupt('return', _context16.sent);\n\n                case 5:\n                case 'end':\n                  return _context16.stop();\n              }\n            }\n          }, _callee16, undefined);\n        }));\n\n        return function createComment(_x25, _x26) {\n          return _ref32.apply(this, arguments);\n        };\n      }(),\n      createCommenter: function () {\n        var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(root, _ref35) {\n          var _id = _ref35._id,\n              input = _ref35.input;\n          var found;\n          return regeneratorRuntime.wrap(function _callee17$(_context17) {\n            while (1) {\n              switch (_context17.prev = _context17.next) {\n                case 0:\n                  _context17.next = 2;\n                  return Commenter.findOne({ _id: _id });\n\n                case 2:\n                  found = _context17.sent;\n\n                  if (!found) {\n                    _context17.next = 5;\n                    break;\n                  }\n\n                  return _context17.abrupt('return', found);\n\n                case 5:\n                  _context17.next = 7;\n                  return Commenter.insert(_extends({\n                    _id: _id\n                  }, input));\n\n                case 7:\n                  _context17.next = 9;\n                  return Commenter.findOne({ _id: _id });\n\n                case 9:\n                  return _context17.abrupt('return', _context17.sent);\n\n                case 10:\n                case 'end':\n                  return _context17.stop();\n              }\n            }\n          }, _callee17, undefined);\n        }));\n\n        return function createCommenter(_x27, _x28) {\n          return _ref34.apply(this, arguments);\n        };\n      }()\n    }\n  };\n};\n\n//# sourceURL=webpack:///./api/schemas/resolvers.js?");

/***/ }),

/***/ "./api/schemas/types.js":
/*!******************************!*\
  !*** ./api/schemas/types.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar typeDefs = exports.typeDefs = [\"\\n    input UserInput {\\n      email: String\\n      password: String\\n    }\\n    input SubscriberInput {\\n      email: String\\n    }\\n    input CommentInput {\\n      content: String\\n      articleId: String\\n      timestamp: String\\n      likes: Int\\n      commenter: CommenterInput\\n    }\\n    input CommenterInput {\\n      name: String\\n      email: String\\n      avatar: String\\n    }\\n    type Subscriber {\\n      _id: String\\n      email: String\\n    }\\n    type Commenter {\\n      _id: String\\n      name: String\\n      email: String\\n      avatar: String\\n    }\\n    type Comment {\\n      _id: String\\n      content: String\\n      articleId: String\\n      timestamp: String\\n      likes: Int\\n      commenter: Commenter\\n    }\\n    type User {\\n      _id: String\\n      email: String\\n      password: String\\n    }\\n    input ArticleInput {\\n      title: String\\n      created: String\\n      author_id: String\\n      slug: String\\n      blocks: [BlockInput]\\n    }\\n    type Block {\\n      _id: String\\n      type: String\\n      content: String\\n    }\\n    input BlockInput {\\n      _id: String\\n      type: String\\n      content: String\\n    }\\n    type Article {\\n      _id: String\\n      slug: String\\n      title: String\\n      created: String\\n      author_id: String\\n      blocks: [Block]\\n    }\\n    type Query {\\n      login(email: String, password: String): User\\n      retrieveArticle(slug: String): Article\\n      retrieveAllArticles: [Article]\\n      retrieveCommentsByArticle(articleId: String): [Comment]\\n      retrieveCommenter(_id: String): Commenter\\n    }\\n    type Mutation {\\n      createUser(_id: String, input: UserInput): User\\n      updateUser(_id: String, input: UserInput): User\\n      deleteUser(_id: String): Boolean\\n      deleteAllUsers: Boolean\\n      createArticle(_id: String, input: ArticleInput): Article\\n      updateArticle(_id: String, input: ArticleInput): Article\\n      deleteArticle(_id: String): Boolean\\n      deleteAllArticles: Boolean\\n      subscribe(_id: String, input: SubscriberInput): Subscriber\\n      unsubscribe(_id: String): Boolean\\n      createCommenter(_id: String, input: CommenterInput): Commenter\\n      createComment(_id: String, input: CommentInput): Comment\\n    }\\n    schema {\\n      query: Query\\n      mutation: Mutation\\n    }\\n  \"];\n\n//# sourceURL=webpack:///./api/schemas/types.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./api/api.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./api/api.js */\"./api/api.js\");\n\n\n//# sourceURL=webpack:///multi_./api/api.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "graphql-server-express":
/*!*****************************************!*\
  !*** external "graphql-server-express" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-server-express\");\n\n//# sourceURL=webpack:///external_%22graphql-server-express%22?");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-tools\");\n\n//# sourceURL=webpack:///external_%22graphql-tools%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ })

/******/ });
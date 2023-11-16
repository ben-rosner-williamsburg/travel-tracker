/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "travelers": () => (/* binding */ travelers),
/* harmony export */   "singleTraveler": () => (/* binding */ singleTraveler),
/* harmony export */   "trips": () => (/* binding */ trips),
/* harmony export */   "destinations": () => (/* binding */ destinations),
/* harmony export */   "travelerData": () => (/* binding */ travelerData),
/* harmony export */   "totalCost": () => (/* binding */ totalCost),
/* harmony export */   "id": () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _dataModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);






let travelers;
let singleTraveler;
let trips;
let destinations;
let travelerData;
let totalCost;
let id;

const submit = document.querySelector('#submitButton');
const username = document.querySelector('#usernameField');
const password = document.querySelector("#passwordField");
const loginForm = document.querySelector(".login-form");
const loginScreen = document.querySelector(".login-screen");
const dashboard = document.querySelector(".main-screen");


loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  id = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.getId)(username);
  if (username.value === `traveler${id}` && password.value === `travel`) {
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
  }
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchSingleTraveler)(id)]).then((data) => {
    singleTraveler = data[0];
    const filterForTrips = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.filterData)(singleTraveler, trips);
    (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.getNewData)(filterForTrips);
    const destinationIDs = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.getDestinationIDs)(filterForTrips);
    const location = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.findDestination)(destinationIDs, destinations);
    const lodgingCosts = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.getLodgingCost)(destinationIDs, filterForTrips, destinations);
    const flightCosts = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.getFlightCost)(destinationIDs, filterForTrips, destinations);
    totalCost = (0,_dataModel__WEBPACK_IMPORTED_MODULE_2__.getTotalCost)(lodgingCosts, flightCosts);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.displayName)(singleTraveler);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.displayTrips)(filterForTrips, location);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.displayMoneySpent)(totalCost);
  })
})

window.addEventListener("load", function () {
  Promise.all(_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchPromises).then((data) => {
    travelers = data[0].travelers;
    trips = data[1].trips;
    destinations = data[2].destinations;
  })
})

submit.addEventListener("click", function (event) {
  event.preventDefault();
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.sendData)(singleTraveler, trips);
})

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: radial-gradient(circle, #00bf7d 0%, #5928ed 100%);\n}\n\n.header-section,\n.main-section {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  align-items: center;\n}\n\n.trip-data {\n  display: flex;\n  flex-direction: row;\n  margin: 10px;\n  padding: 10px;\n}\n\n.text {\n  font-family: 'Open Sans', sans-serif;\n  color: black;\n  letter-spacing: 1.8px;\n  font-size: 18px;\n}\n\n.field {\n  margin: 10px;\n}\n\n\n.form-field {\n  margin: 10px;\n  list-style: none;\n}\n\n.form-container,\n.login-screen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.form-container {\n  margin: 10px;\n  text-align: center;\n}\n\n.login-screen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 1000px;\n}\n\n.error {\n  font-size: 24px;\n  height: 400px;\n  width: 400px;\n}\n\n.hidden {\n  display: none;\n}\n\n.submit-login-button, #submitButton {\n  border-radius: 10px;\n  background-color: #5928ed;\n  color: white;\n}\n\ninput, .form-field, #submitButton {\n  padding: 10px;\n  border-radius: 10px;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,6DAA6D;AAC/D;;AAEA;;EAEE,aAAa;EACb,WAAW;EACX,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,oCAAoC;EACpC,YAAY;EACZ,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;;AAGA;EACE,YAAY;EACZ,gBAAgB;AAClB;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB","sourcesContent":["body {\n  background: radial-gradient(circle, #00bf7d 0%, #5928ed 100%);\n}\n\n.header-section,\n.main-section {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  align-items: center;\n}\n\n.trip-data {\n  display: flex;\n  flex-direction: row;\n  margin: 10px;\n  padding: 10px;\n}\n\n.text {\n  font-family: 'Open Sans', sans-serif;\n  color: black;\n  letter-spacing: 1.8px;\n  font-size: 18px;\n}\n\n.field {\n  margin: 10px;\n}\n\n\n.form-field {\n  margin: 10px;\n  list-style: none;\n}\n\n.form-container,\n.login-screen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.form-container {\n  margin: 10px;\n  text-align: center;\n}\n\n.login-screen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 1000px;\n}\n\n.error {\n  font-size: 24px;\n  height: 400px;\n  width: 400px;\n}\n\n.hidden {\n  display: none;\n}\n\n.submit-login-button, #submitButton {\n  border-radius: 10px;\n  background-color: #5928ed;\n  color: white;\n}\n\ninput, .form-field, #submitButton {\n  padding: 10px;\n  border-radius: 10px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "endpoints": () => (/* binding */ endpoints),
/* harmony export */   "fetchPromises": () => (/* binding */ fetchPromises),
/* harmony export */   "fetchSingleTraveler": () => (/* binding */ fetchSingleTraveler),
/* harmony export */   "postReq": () => (/* binding */ postReq),
/* harmony export */   "sendData": () => (/* binding */ sendData)
/* harmony export */ });
/* harmony import */ var _dataModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





const travelersEndpoint = `http://localhost:3001/api/v1/travelers`;
const tripsEndpoint = `http://localhost:3001/api/v1/trips`;
const destinationsEndpoint = `http://localhost:3001/api/v1/destinations`;

const errorMessage = document.querySelector(".error");
const form = document.querySelector('.form-container');


const endpoints = [travelersEndpoint, tripsEndpoint, destinationsEndpoint];

const fetchPromises = endpoints.map(endpoint =>
  fetch(endpoint).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} : "Failed to fetch data`);
    }
    return response.json();
  }).then((data) => {
    return data;
  }).catch(error => {
    if (error instanceof TypeError) {
      form.classList.add('hidden');
      errorMessage.innerText = "!! Unable to connect to the server.    Please try again later.";
      errorMessage.classList.remove("hidden");
    }
    else {
      console.error(error.message);
    }
  })
);

const fetchSingleTraveler = id =>
  fetch(`http://localhost:3001/api/v1/travelers/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} : "Failed to fetch data`);
    }
    return response.json();
  }).then((data) => {
    return data;
  }).catch(error => {
    if (error instanceof TypeError) {
      form.classList.add('hidden');
      errorMessage.innerText = "!! Unable to connect to the server.    Please try again later.";
      errorMessage.classList.remove("hidden");
    }
    else {
      console.error(error.message);
    }
  })

const postReq = (data) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - Failed to fetch data.`);
      }
      return response.json();
    })
    .then(json => {
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.clearDashboard)();
      fetchPromises;
      _scripts__WEBPACK_IMPORTED_MODULE_2__.trips.push(json.newTrip);
      const newTripData = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.filterData)(_scripts__WEBPACK_IMPORTED_MODULE_2__.singleTraveler, _scripts__WEBPACK_IMPORTED_MODULE_2__.trips);
      const newTrip = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.getNewData)(newTripData);
      const destinationID = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.getDestinationIDs)(newTripData);
      const newDestinationID = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.getDestinationIDs)(newTrip);
      const locations = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.findDestination)(destinationID, _scripts__WEBPACK_IMPORTED_MODULE_2__.destinations);
      const lodgingCost = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.getLodgingCost)(newDestinationID, newTrip, _scripts__WEBPACK_IMPORTED_MODULE_2__.destinations);
      const flightCost = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.getFlightCost)(newDestinationID, newTrip, _scripts__WEBPACK_IMPORTED_MODULE_2__.destinations);
      const totalCostOfNewTrip = (0,_dataModel__WEBPACK_IMPORTED_MODULE_0__.getTotalCost)(lodgingCost, flightCost);
      const totalCostOfAllTrips = totalCostOfNewTrip + _scripts__WEBPACK_IMPORTED_MODULE_2__.totalCost;
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayTrips)(newTripData, locations);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayNewTripPrice)(totalCostOfNewTrip);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayMoneySpent)(totalCostOfAllTrips);
    })
    .catch(error => {
      console.error(error.message);
    })
}

const sendData = (currentData, trips) => {
  let tripDuration = parseInt(duration.value);
  let id = trips.length + 1;
  if (!isNaN(new Date(date.value)) && !isNaN(tripDuration) && tripDuration <= 30 && tripDuration) {
    const payload = {
      id: id,
      userID: currentData.id,
      destinationID: parseInt(destinationPicker.value),
      travelers: parseInt(numberTravelers.value),
      date: date.value,
      duration: tripDuration,
      status: "pending",
      suggestedActivities: []
    }
    postReq(payload);
    return payload;
  }
  else {
    errorMessage.classList.toggle("hidden");
    errorMessage.innerText = "One or more was inputted incorrectly: Incorrect date format and/or number out of range";
  }
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getId": () => (/* binding */ getId),
/* harmony export */   "filterData": () => (/* binding */ filterData),
/* harmony export */   "getDestinationIDs": () => (/* binding */ getDestinationIDs),
/* harmony export */   "findDestination": () => (/* binding */ findDestination),
/* harmony export */   "getLodgingCost": () => (/* binding */ getLodgingCost),
/* harmony export */   "getFlightCost": () => (/* binding */ getFlightCost),
/* harmony export */   "getTotalCost": () => (/* binding */ getTotalCost),
/* harmony export */   "getNewData": () => (/* binding */ getNewData)
/* harmony export */ });
const getId = (username) => {
  const splitUsernameId = username.value.split("traveler");
  const id = parseInt(splitUsernameId[1]);
  return id;
}

const filterData = (selectedTravelerData, tripData) => {
  const travelerData = tripData.filter(data => {
    return selectedTravelerData.id === data.userID;
  })
  return travelerData;
}

const getDestinationIDs = (tripData) => {
  const destinationIDs = tripData.map(location => {
    return location.destinationID;
  })
  return destinationIDs;
}

const findDestination = (destinationIDs, destinationData) => {
  const destinations = destinationIDs.map(id => {
    const destination = destinationData.find(destination => {
      return id === destination.id;
    })
    return destination.destination;
  })
  return destinations;
}


const getLodgingCost = (selectedDestinations, trips, destinationData) => {
  const filterForDestination = selectedDestinations.map(id => {
    const destination = destinationData.find(destination => {
      return id === destination.id;
    })
    return destination;
  })
  const lodgingCost = filterForDestination.map(destination => {
    return destination.estimatedLodgingCostPerDay;
  })
  const duration = trips.map(trip => {
    return trip.duration;
  })
  const allLodgingCosts = lodgingCost.reduce((totalLodgingCosts, lodgingCost) => {
    duration.forEach(tripDuration => {
      totalLodgingCosts += (lodgingCost * tripDuration);
    })
    return totalLodgingCosts;
  }, 0)
  return allLodgingCosts;
}

const getFlightCost = (selectedDestinations, trips, destinationData) => {
  const filterForDestination = selectedDestinations.map(id => {
    const destination = destinationData.find(destination => {
      return id === destination.id;
    })
    return destination;
  })
  const flightCost = filterForDestination.map(destination => {
    return destination.estimatedFlightCostPerPerson;
  })
  const numOfTravelers = trips.map(trip => {
    return trip.travelers;
  })
  const allFlightCosts = flightCost.reduce((totalFlightCosts, flightCost) => {
    numOfTravelers.forEach(flights => {
      totalFlightCosts += flightCost * flights;
    })
    return totalFlightCosts;
  }, 0)
  return allFlightCosts;
}

const getTotalCost = (allLodgingCosts, allFlightCosts) => {
  let initialCost = allLodgingCosts + allFlightCosts;
  let initialCostFees = initialCost * .10;
  const totalCostWithFees = initialCost + initialCostFees;
  const roundedCost = Math.round(totalCostWithFees);
  return roundedCost;
}

const getNewData = (dataset) => {
  const sortedData = dataset.sort((a, b) => new Date(a.date) - new Date(b.date));
  return [sortedData[dataset.length - 1]];
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayName": () => (/* binding */ displayName),
/* harmony export */   "clearDashboard": () => (/* binding */ clearDashboard),
/* harmony export */   "displayTrips": () => (/* binding */ displayTrips),
/* harmony export */   "displayMoneySpent": () => (/* binding */ displayMoneySpent),
/* harmony export */   "displayNewTripPrice": () => (/* binding */ displayNewTripPrice)
/* harmony export */ });
const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const locationsField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");
const newTripPriceField = document.querySelector(".new-trip-price");
const statusField = document.querySelector(".status");


const displayName = (selectedUser) => {
  nameField.innerText = `Welcome ${selectedUser.name}!`;
}

const clearDashboard = () => {
  tripsField.innerHTML = "";
  locationsField.innerHTML = "";
  statusField.innerHTML = "";
}
const displayTrips = (trips, destinations) => {
  trips.forEach(trip => {
    tripsField.innerHTML += `<h1 class="trips text"> ${trip.date} </h1>`;
    statusField.innerHTML += `<h1 class="status text"> (${trip.status}) </h1>`;
  })
  destinations.forEach(destination => {
    locationsField.innerHTML += `<h1 class="location text"> ${destination} </h1>`;
  })
}

const displayMoneySpent = (money) => {
  moneySpentField.innerText = `Total Spent: $${money}`;
}

const displayNewTripPrice = (money) => {
  newTripPriceField.innerText = `This trip will cost you $${money}`;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var lit_element_1 = require("@polymer/lit-element");
var index_1 = require("@material/top-app-bar/index");
var c_1 = require("../base/c");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n    <header class=\"mdc-top-app-bar mdc-top-app-bar--fixed\">\n      <div class=\"mdc-top-app-bar__row\">\n        <section class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-start\">\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__navigation-icon\" style=\"--mdc-ripple-fg-size: 28px;\" @click=", ">menu</a>\n          <span class=\"mdc-top-app-bar__title\">Title</span>\n        </section>\n        <section class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-end\" role=\"toolbar\">\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__action-item\" aria-label=\"Download\" alt=\"Download\">file_download</a>\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__action-item\" aria-label=\"Print this page\" alt=\"Print this page\">print</a>\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__action-item\" aria-label=\"Bookmark this page\" alt=\"Bookmark this page\">bookmark</a>\n        </section>\n      </div>\n    </header>\n    "], ["\n    ", "\n    <header class=\"mdc-top-app-bar mdc-top-app-bar--fixed\">\n      <div class=\"mdc-top-app-bar__row\">\n        <section class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-start\">\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__navigation-icon\" style=\"--mdc-ripple-fg-size: 28px;\" @click=", ">menu</a>\n          <span class=\"mdc-top-app-bar__title\">Title</span>\n        </section>\n        <section class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-end\" role=\"toolbar\">\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__action-item\" aria-label=\"Download\" alt=\"Download\">file_download</a>\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__action-item\" aria-label=\"Print this page\" alt=\"Print this page\">print</a>\n          <a href=\"javascript:;\" class=\"material-icons mdc-top-app-bar__action-item\" aria-label=\"Bookmark this page\" alt=\"Bookmark this page\">bookmark</a>\n        </section>\n      </div>\n    </header>\n    "])), this.myStyles, this.drawer);
    };
    Header.prototype.updated = function () {
        // Instantiation
        var topAppBarElement = this.shadowRoot.querySelector('.mdc-top-app-bar');
        var topAppBar = new index_1.MDCTopAppBar(topAppBarElement);
    };
    Header.prototype.drawer = function () {
        c_1["default"].drawer.open = !c_1["default"].drawer.open;
    };
    Object.defineProperty(Header.prototype, "myStyles", {
        get: function () {
            return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      <style>\n        :host {\n          position: absolute;\n          z-index: 7;\n          display: block;\n        }\n      </style>\n      <style>\n        @import url(/base/icon.css); \n        @import url(/base/material.css);\n      </style>\n    "], ["\n      <style>\n        :host {\n          position: absolute;\n          z-index: 7;\n          display: block;\n        }\n      </style>\n      <style>\n        @import url(/base/icon.css); \n        @import url(/base/material.css);\n      </style>\n    "])));
        },
        enumerable: true,
        configurable: true
    });
    Header = __decorate([
        lit_element_1.customElement('c-header')
    ], Header);
    return Header;
}(lit_element_1.LitElement));
exports.Header = Header;
var templateObject_1, templateObject_2;

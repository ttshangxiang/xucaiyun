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
var c_1 = require("../base/c");
var index_1 = require("@material/list/index");
var index_2 = require("@material/drawer/index");
var classMap = {
    fixed: 'mdc-top-app-bar--fixed-adjust mdc-drawer--open',
    modal: 'mdc-drawer--modal'
};
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super.call(this) || this;
        _this.mode = 'fixed';
        c_1.setIns(_this, _this.id);
        _this.resize();
        window.onresize = function () {
            _this.resize();
        };
        return _this;
    }
    Drawer.prototype.render = function () {
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    ", "\n    <div>\n      <aside class=\"mdc-drawer mdc-drawer--dismissible ", "\"\n        style=\"position: fixed", "\">\n        <div class=\"mdc-drawer__header\">\n          <h3 class=\"mdc-drawer__title\">Mail</h3>\n          <h6 class=\"mdc-drawer__subtitle\">email@material.io</h6>\n        </div>\n        <div class=\"mdc-drawer__content\">\n          <nav class=\"mdc-list\">\n            <a href=\"javascript:;\">\n              <c-route class=\"mdc-list-item \" href=\"/what\"  role=\"nav\">\n                <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">inbox</i>\n                <span class=\"mdc-list-item__text\">Inbox</span>\n              </c-route>\n            </a>\n            <a href=\"javascript:;\">\n              <c-route class=\"mdc-list-item\" href=\"/jj\" role=\"nav\">\n                <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">send</i>\n                <span class=\"mdc-list-item__text\">Outgoing</span>\n              </c-route>\n            </a>\n            <a href=\"javascript:;\">\n              <c-route class=\"mdc-list-item\" href=\"/albums\" role=\"nav\">\n                <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">photo</i>\n                <span class=\"mdc-list-item__text\">\u6211\u7684\u76F8\u518C</span>\n              </c-route>\n            </a>\n          </nav>\n        </div>\n      </aside>\n      <!-- mdc-drawer-scrim\u7684\u70B9\u51FB\u4E8B\u4EF6\u5E93\u62A5\u9519\uFF0C\u590D\u5236\u6837\u5F0F\u81EA\u5DF1\u5199\u4E8B\u4EF6\uFF0C\u7B49\u5F85\u4FEE\u590D -->\n      ", "\n      <!-- end -->\n      <div class=\"mdc-drawer-app-content mdc-top-app-bar--fixed-adjust\">\n        <main class=\"main-content\">\n          <slot></slot>\n        </main>\n      </div>\n    </div>\n    "], ["\n    ", "\n    <div>\n      <aside class=\"mdc-drawer mdc-drawer--dismissible ", "\"\n        style=\"position: fixed", "\">\n        <div class=\"mdc-drawer__header\">\n          <h3 class=\"mdc-drawer__title\">Mail</h3>\n          <h6 class=\"mdc-drawer__subtitle\">email@material.io</h6>\n        </div>\n        <div class=\"mdc-drawer__content\">\n          <nav class=\"mdc-list\">\n            <a href=\"javascript:;\">\n              <c-route class=\"mdc-list-item \" href=\"/what\"  role=\"nav\">\n                <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">inbox</i>\n                <span class=\"mdc-list-item__text\">Inbox</span>\n              </c-route>\n            </a>\n            <a href=\"javascript:;\">\n              <c-route class=\"mdc-list-item\" href=\"/jj\" role=\"nav\">\n                <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">send</i>\n                <span class=\"mdc-list-item__text\">Outgoing</span>\n              </c-route>\n            </a>\n            <a href=\"javascript:;\">\n              <c-route class=\"mdc-list-item\" href=\"/albums\" role=\"nav\">\n                <i class=\"material-icons mdc-list-item__graphic\" aria-hidden=\"true\">photo</i>\n                <span class=\"mdc-list-item__text\">\u6211\u7684\u76F8\u518C</span>\n              </c-route>\n            </a>\n          </nav>\n        </div>\n      </aside>\n      <!-- mdc-drawer-scrim\u7684\u70B9\u51FB\u4E8B\u4EF6\u5E93\u62A5\u9519\uFF0C\u590D\u5236\u6837\u5F0F\u81EA\u5DF1\u5199\u4E8B\u4EF6\uFF0C\u7B49\u5F85\u4FEE\u590D -->\n      ",
            "\n      <!-- end -->\n      <div class=\"mdc-drawer-app-content mdc-top-app-bar--fixed-adjust\">\n        <main class=\"main-content\">\n          <slot></slot>\n        </main>\n      </div>\n    </div>\n    "])), this.myStyles, classMap[this.mode], this.mode === 'modal' ? ';z-index: 9;' : ';', this.mode === 'modal' ? lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          <div class=\"mdc-drawer-scrim\" style=\"display: none;\"></div>\n          <div class=\"mdc-drawer-scrim-fake\" @click=", "></div>"], ["\n          <div class=\"mdc-drawer-scrim\" style=\"display: none;\"></div>\n          <div class=\"mdc-drawer-scrim-fake\" @click=", "></div>"])), function () { return c_1["default"].drawer.open = false; }) : '');
    };
    Drawer.prototype.updated = function () {
        // Instantiation
        c_1["default"].list = index_1.MDCList.attachTo(this.shadowRoot.querySelector('.mdc-list'));
        c_1["default"].list.wrapFocus = true;
        c_1["default"].drawer = index_2.MDCDrawer.attachTo(this.shadowRoot.querySelector('.mdc-drawer'));
    };
    Drawer.prototype.resize = function () {
        var w = window.innerWidth;
        if (w > 599) {
            this.mode = 'fixed';
        }
        else {
            this.mode = 'modal';
        }
    };
    Object.defineProperty(Drawer.prototype, "myStyles", {
        get: function () {
            return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      <style>\n        @import url('/base/icon.css'); \n        @import url('/base/material.css'); \n        :host {\n          display: block;\n        }\n\n        .mdc-drawer-app-content {\n          flex: auto;\n          overflow: auto;\n          position: relative;\n        }\n\n        .main-content {\n          overflow: auto;\n          height: 100%;\n        }\n\n        .mdc-drawer--open ~ .mdc-drawer-scrim-fake {\n          display: block;\n        }\n\n        .mdc-drawer--modal ~ .mdc-drawer-scrim-fake {\n          background-color: rgba(0, 0, 0, 0.32);\n        }\n        .mdc-drawer-scrim-fake {\n          display: none;\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          transition-property: opacity;\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          z-index: 8;\n        }\n      </style>\n    "], ["\n      <style>\n        @import url('/base/icon.css'); \n        @import url('/base/material.css'); \n        :host {\n          display: block;\n        }\n\n        .mdc-drawer-app-content {\n          flex: auto;\n          overflow: auto;\n          position: relative;\n        }\n\n        .main-content {\n          overflow: auto;\n          height: 100%;\n        }\n\n        .mdc-drawer--open ~ .mdc-drawer-scrim-fake {\n          display: block;\n        }\n\n        .mdc-drawer--modal ~ .mdc-drawer-scrim-fake {\n          background-color: rgba(0, 0, 0, 0.32);\n        }\n        .mdc-drawer-scrim-fake {\n          display: none;\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          transition-property: opacity;\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          z-index: 8;\n        }\n      </style>\n    "])));
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        lit_element_1.property()
    ], Drawer.prototype, "mode");
    Drawer = __decorate([
        lit_element_1.customElement('c-drawer')
    ], Drawer);
    return Drawer;
}(lit_element_1.LitElement));
exports.Drawer = Drawer;
var templateObject_1, templateObject_2, templateObject_3;

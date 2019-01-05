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
require("../drawer");
require("../header");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      ", "\n      <c-header hidden></c-header>\n      <c-drawer id=\"c-drawer\" hidden></c-drawer>\n    "], ["\n      ", "\n      <c-header hidden></c-header>\n      <c-drawer id=\"c-drawer\" hidden></c-drawer>\n    "])), this.myStyles);
    };
    Object.defineProperty(Layout.prototype, "myStyles", {
        get: function () {
            return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      <style>\n        :host {\n          display: block;\n          width: 100%;\n        }\n      </style> \n    "], ["\n      <style>\n        :host {\n          display: block;\n          width: 100%;\n        }\n      </style> \n    "])));
        },
        enumerable: true,
        configurable: true
    });
    Layout = __decorate([
        lit_element_1.customElement('c-layout')
    ], Layout);
    return Layout;
}(lit_element_1.LitElement));
exports.Layout = Layout;
var templateObject_1, templateObject_2;

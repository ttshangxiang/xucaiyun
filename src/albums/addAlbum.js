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
var index_1 = require("@material/form-field/index");
var index_2 = require("@material/checkbox/index");
require("./addAlbum.scss");
var AddAlbum = /** @class */ (function (_super) {
    __extends(AddAlbum, _super);
    function AddAlbum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddAlbum.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <link rel=\"stylesheet\" href=\"/albums/addAlbum.css\">\n      <div class=\"mdc-form-field mdc-form-field--align-end\">\n      </div>\n    "], ["\n      <link rel=\"stylesheet\" href=\"/albums/addAlbum.css\">\n      <div class=\"mdc-form-field mdc-form-field--align-end\">\n      </div>\n    "])));
    };
    AddAlbum.prototype.updated = function () {
        var formField = new index_1.MDCFormField(this.shadowRoot.querySelector('.mdc-form-field'));
        var checkbox = new index_2.MDCCheckbox(this.shadowRoot.querySelector('.mdc-checkbox'));
        formField.input = checkbox;
    };
    AddAlbum = __decorate([
        lit_element_1.customElement('c-album-add')
    ], AddAlbum);
    return AddAlbum;
}(lit_element_1.LitElement));
exports.AddAlbum = AddAlbum;
var templateObject_1;

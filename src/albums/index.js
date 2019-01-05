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
var index_1 = require("@material/ripple/index");
require("./style");
var router_1 = require("../base/router");
var Albums = /** @class */ (function (_super) {
    __extends(Albums, _super);
    function Albums() {
        return _super.call(this) || this;
    }
    Albums.prototype.render = function () {
        var _this = this;
        var data = [];
        var i = 1;
        while (i <= 15) {
            data.push("/assets/imgs/albums/" + i + ".jpg");
            i++;
        }
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      <link rel=\"stylesheet\" href=\"/albums/style.css\">\n      <div style=\"padding: 8px; position: relative;\">\n        <ul class=\"mdc-image-list my-image-list mdc-image-list--with-text-protection\">\n          ", "\n        </ul>\n      </div>\n      <button class=\"mdc-fab app-fab--absolute\" aria-label=\"Add\" @click=\"", "\">\n        <span class=\"mdc-fab__icon material-icons\">add</span>\n      </button>\n    "], ["\n      <link rel=\"stylesheet\" href=\"/albums/style.css\">\n      <div style=\"padding: 8px; position: relative;\">\n        <ul class=\"mdc-image-list my-image-list mdc-image-list--with-text-protection\">\n          ",
            "\n        </ul>\n      </div>\n      <button class=\"mdc-fab app-fab--absolute\" aria-label=\"Add\" @click=\"", "\">\n        <span class=\"mdc-fab__icon material-icons\">add</span>\n      </button>\n    "])), data.map(function (o, i) { return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            <li class=\"mdc-image-list__item\" @click=", ">\n              <div class=\"mdc-image-list__image-aspect-container\">\n                <img class=\"mdc-image-list__image\" src=\"", "\">\n              </div>\n              <div class=\"mdc-image-list__supporting\">\n                <span class=\"mdc-image-list__label\">Text label</span>\n              </div>\n            </li>\n          "], ["\n            <li class=\"mdc-image-list__item\" @click=", ">\n              <div class=\"mdc-image-list__image-aspect-container\">\n                <img class=\"mdc-image-list__image\" src=\"", "\">\n              </div>\n              <div class=\"mdc-image-list__supporting\">\n                <span class=\"mdc-image-list__label\">Text label</span>\n              </div>\n            </li>\n          "])), function () { return _this.enterAlbum(i + 1); }, o); }), this.enterAddAlbum);
    };
    /**进入相册 */
    Albums.prototype.enterAlbum = function (i) {
        router_1.Router.push("/albums/" + i);
    };
    /**新增相册 */
    Albums.prototype.enterAddAlbum = function () {
        router_1.Router.push("/albums/add");
    };
    Albums.prototype.updated = function () {
        new index_1.MDCRipple(this.shadowRoot.querySelector('.mdc-fab'));
    };
    Albums = __decorate([
        lit_element_1.customElement('c-albums')
    ], Albums);
    return Albums;
}(lit_element_1.LitElement));
exports.Albums = Albums;
var Album = /** @class */ (function (_super) {
    __extends(Album, _super);
    function Album() {
        return _super.call(this) || this;
    }
    Album.prototype.render = function () {
        var _this = this;
        var data = [];
        var i = 1;
        while (i <= 15) {
            data.push("/assets/imgs/photos/" + i + ".jpg");
            i++;
        }
        return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      <link rel=\"stylesheet\" href=\"/albums/style.css\">\n      <div style=\"padding: 8px; position: relative;\">\n        <ul class=\"mdc-image-list mdc-image-list--masonry my-masonry-image-list\">\n          ", "\n        </ul>\n      </div>\n    "], ["\n      <link rel=\"stylesheet\" href=\"/albums/style.css\">\n      <div style=\"padding: 8px; position: relative;\">\n        <ul class=\"mdc-image-list mdc-image-list--masonry my-masonry-image-list\">\n          ",
            "\n        </ul>\n      </div>\n    "])), data.map(function (o, i) {
            return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n              <li class=\"mdc-image-list__item\" @click=", ">\n                <img class=\"mdc-image-list__image\" src=\"", "\">\n                <div class=\"mdc-image-list__supporting\">\n                  <span class=\"mdc-image-list__label\">Text label</span>\n                </div>\n              </li>\n            "], ["\n              <li class=\"mdc-image-list__item\" @click=", ">\n                <img class=\"mdc-image-list__image\" src=\"", "\">\n                <div class=\"mdc-image-list__supporting\">\n                  <span class=\"mdc-image-list__label\">Text label</span>\n                </div>\n              </li>\n            "])), function () { return _this.enterPhoto(i + 1); }, o);
        }));
    };
    /**进入照片 */
    Album.prototype.enterPhoto = function (i) {
        var albumId = router_1.Router.params.albumId;
        router_1.Router.push("/albums/" + albumId + "/" + i);
    };
    Album = __decorate([
        lit_element_1.customElement('c-album')
    ], Album);
    return Album;
}(lit_element_1.LitElement));
exports.Album = Album;
var Photo = /** @class */ (function (_super) {
    __extends(Photo, _super);
    function Photo() {
        return _super.call(this) || this;
    }
    Photo.prototype.render = function () {
        var photoId = router_1.Router.params.photoId;
        var src = "/assets/imgs/photos/" + photoId + ".jpg";
        return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      <link rel=\"stylesheet\" href=\"/albums/style.css\">\n      <div style=\"padding: 8px; position: relative;\">\n        <ul class=\"mdc-image-list my-mdc-image-detail\">\n          <li class=\"mdc-image-list__item\">\n            <img class=\"mdc-image-list__image\" src=\"", "\">\n            <div class=\"mdc-image-list__supporting\">\n              <span class=\"mdc-image-list__label\">Text label</span>\n            </div>\n          </li>\n        </ul>\n      </div>\n    "], ["\n      <link rel=\"stylesheet\" href=\"/albums/style.css\">\n      <div style=\"padding: 8px; position: relative;\">\n        <ul class=\"mdc-image-list my-mdc-image-detail\">\n          <li class=\"mdc-image-list__item\">\n            <img class=\"mdc-image-list__image\" src=\"", "\">\n            <div class=\"mdc-image-list__supporting\">\n              <span class=\"mdc-image-list__label\">Text label</span>\n            </div>\n          </li>\n        </ul>\n      </div>\n    "])), src);
    };
    Photo = __decorate([
        lit_element_1.customElement('c-photo')
    ], Photo);
    return Photo;
}(lit_element_1.LitElement));
exports.Photo = Photo;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

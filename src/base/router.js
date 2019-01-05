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
var queryString = require("query-string");
var c_1 = require("./c");
var lit_element_1 = require("@polymer/lit-element");
var Router = /** @class */ (function () {
    function Router() {
    }
    /**初始化 */
    Router.init = function (conf) {
        var _this = this;
        this.conf = conf;
        window.onpopstate = function (e) {
            if (window.location.pathname === _this.oldPath) {
                return;
            }
            _this.render();
        };
        setTimeout(function () { return _this.render(); }, 0);
    };
    /**添加路由 */
    Router.push = function (path, title) {
        if (title === void 0) { title = ''; }
        if (path === this.path)
            return;
        window.history.pushState(null, title, path);
        this.render();
    };
    /**路由切碎 */
    Router.splitPath = function (path) {
        if (path[0] === '/') {
            path = path.slice(1);
        }
        return path.split('/');
    };
    /**加载页面 */
    Router.render = function () {
        var _a = window.location, search = _a.search, pathname = _a.pathname;
        this.oldPath = pathname;
        this.path = pathname;
        this.query = queryString.parse(search);
        this.paths = this.splitPath(pathname);
        var matchRoute = this.match();
        var ins = c_1.getIns('c-drawer');
        if (!matchRoute) {
            console.log('路由错误');
            ins.innerHTML = '路由错误';
            return;
        }
        if (typeof matchRoute.component === 'function') {
            matchRoute.component();
            ins.innerHTML = "<" + matchRoute.tag + " hidden></" + matchRoute.tag + ">";
        }
        else {
            ins.innerHTML = matchRoute.component;
        }
        // 路由选中状态修改
        this.routes.forEach(function (o) {
            if (o.getAttribute('role') !== 'nav')
                return;
            if (pathname === o.href || pathname !== '/' && pathname.includes(o.href)) {
                o.classList.add('mdc-list-item--activated');
                o.setAttribute('aria-selected', 'true');
                o.focus();
            }
            else {
                o.classList.remove('mdc-list-item--activated');
                o.setAttribute('aria-selected', 'false');
                o.blur();
            }
        });
    };
    /**匹配 */
    Router.match = function () {
        var _this = this;
        var routes = this.conf.routes;
        var route;
        var count = 0;
        this.params = {};
        routes.forEach(function (o) {
            var p = _this.splitPath(o.path);
            if (p.length > _this.paths.length) {
                return;
            }
            // 重量，模糊匹配0.99，普通的1
            var heavy = 0;
            var result = p.every(function (s, i) {
                if (s[0] === ':') {
                    _this.params[s.slice(1)] = _this.paths[i];
                    heavy += 0.99;
                    return true;
                }
                if (s === _this.paths[i]) {
                    heavy += 1;
                    return true;
                }
                return false;
            });
            if (result && count < heavy) {
                route = o;
                count = heavy;
            }
        });
        return route;
    };
    /**保存路由标签 */
    Router.routes = [];
    /**路由的query */
    Router.query = {};
    /**路由的params */
    Router.params = {};
    /**path */
    Router.path = '/';
    /**paths */
    Router.paths = [];
    return Router;
}());
exports.Router = Router;
/**路由标签 */
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        var _this = _super.call(this) || this;
        _this.href = '/';
        Router.routes.push(_this);
        _this.addEventListener('click', function (e) {
            Router.push(_this.href, _this.title);
        });
        return _this;
    }
    Route.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<slot></slot>"], ["<slot></slot>"])));
    };
    __decorate([
        lit_element_1.property({ type: String })
    ], Route.prototype, "href");
    Route = __decorate([
        lit_element_1.customElement('c-route')
    ], Route);
    return Route;
}(lit_element_1.LitElement));
exports.Route = Route;
var templateObject_1;

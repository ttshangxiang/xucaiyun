"use strict";
exports.__esModule = true;
require("./base/style.scss");
require("./base/icon.scss");
require("./base/material.scss");
var router_1 = require("./base/router");
/**路由 */
router_1.Router.init({
    routes: [
        { path: '/what', component: '<what></what>' },
        { path: '/jj', component: 'jj' },
        { path: '/albums', component: function () { return Promise.resolve().then(function () { return require('./albums'); }); }, tag: 'c-albums' },
        { path: '/albums/:albumId', component: function () { return Promise.resolve().then(function () { return require('./albums'); }); }, tag: 'c-album' },
        { path: '/albums/:albumId/:photoId', component: function () { return Promise.resolve().then(function () { return require('./albums'); }); }, tag: 'c-photo' },
        { path: '/albums/add', component: function () { return Promise.resolve().then(function () { return require('./albums/addAlbum'); }); }, tag: 'c-album-add' },
        { path: '/albums/:albumId/add', component: function () { return Promise.resolve().then(function () { return require('./albums/addPhoto'); }); }, tag: 'c-photo-add' },
    ]
});
require("./layout");

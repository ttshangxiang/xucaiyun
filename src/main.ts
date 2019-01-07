
import {Router} from './base/router';

/**路由 */
Router.init({
  routes: [
    {path: '/', component: '首页'},
    {path: '/jj', component: 'jj'},
    {path: '/albums',component: () => import('./albums'), tag: 'c-albums'},
    {path: '/albums/:albumId', component: () => import('./albums'), tag: 'c-album'},
    {path: '/albums/:albumId/:photoId', component: () => import('./albums'), tag: 'c-photo'},
    {path: '/albums/add', component: () => import('./albums/addAlbum'), tag: 'c-album-add'},
    {path: '/albums/:albumId/add', component: () => import('./albums/addPhoto'), tag: 'c-photo-add'},
  ]
});

import './layout';
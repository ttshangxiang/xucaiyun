
import {Router} from './base/router';

/**路由 */
Router.init({
  routes: [
    {path: '/', component: '首页'},
    {path: '/jj', component: 'jj'},
    {path: '/albums',component: () => import('./albums'), tag: 'xcy-albums'},
    {path: '/albums/:albumId', component: () => import('./albums'), tag: 'xcy-album'},
    {path: '/albums/:albumId/:photoId', component: () => import('./albums'), tag: 'xcy-photo'},
    {path: '/albums/add', component: () => import('./albums/addAlbum'), tag: 'xcy-album-add'},
    {path: '/albums/:albumId/add', component: () => import('./albums/addPhoto'), tag: 'xcy-photo-add'},
  ]
});

import './layout';
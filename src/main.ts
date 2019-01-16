import { Router } from './base/router';

/**路由 */
Router.init({
  routes: [
    {
      title: 'Xcy',
      path: '/',
      component: '首页'
    },
    {
      title: 'jj',
      path: '/jj',
      component: 'jj'
    },
    { 
      title: '相册',
      path: '/albums',
      component: () => import('./albums'),
      tag: 'xcy-albums'
    },
    {
      title: '相册',
      path: '/albums/:albumId',
      component: () => import('./albums'),
      tag: 'xcy-album',
      button: 'back'
    },
    {
      title: '相册',
      path: '/albums/:albumId/:photoId',
      component: () => import('./albums'),
      tag: 'xcy-photo',
      button: 'back'
    },
    {
      title: '添加相册',
      path: '/albums/add',
      component: () => import('./albums/addAlbum'),
      tag: 'xcy-album-add',
      button: 'back'
    },
    {
      title: '添加照片',
      path: '/albums/:albumId/add',
      component: () => import('./albums/addPhoto'),
      tag: 'xcy-photo-add',
      button: 'back'
    }
  ]
});

import './layout';

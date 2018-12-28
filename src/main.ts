
import './base/style';
import {Router} from './base/router';

/**路由 */
Router.init({
  routes: [
    {path: '/what', component: '<what></what>'},
    {path: '/jj', component: 'jj'},
    {path: '/photos', component: function () { import('./photos') }, tag: '<c-photos></c-photos>'},
    {path: '/photos/:id', component: 'photossdsads'}
  ]
});

import './layout';

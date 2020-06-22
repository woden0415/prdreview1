// spa入口文件
import React from "react";
import { LayoutView } from '@/views/_layout';
import Index from '@/views/index';

import '@/assets/less/common.less';

import { Route, routerRedux, Switch } from 'dva/router'

const Routers = ({ history }) => {
    return <routerRedux.ConnectedRouter history={history}>
            <LayoutView>
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/index" component={Index} />
              </Switch>
            </LayoutView>
        </routerRedux.ConnectedRouter>
}
export default Routers;

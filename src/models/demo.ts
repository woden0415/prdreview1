import { getDemo } from '@/services/request'
import { Subscription, Effect } from 'dva';
import { Reducer } from 'redux';
import { notification } from 'antd';

export interface DemoModelType {
  namespace: 'demo';
  state: DemoState;
  effects: {
    getDemo: Effect;
  };
  reducers: {
    save: Reducer<DemoState>;
  };
  subscriptions?: { setup: Subscription };
}

export interface DemoState {
  demoList?: DemoItem[];
}

export interface DemoItem {
  id: number;
}

const DemoModel: DemoModelType = {
  namespace: 'demo',

  state: {
    demoList: [],
  },
  reducers: {
    save(state, { payload }) {
        return { ...state, ...payload };
    }
},
effects: {
    * getDemo({ payload }, { put, call }) {
        const { params } = payload;
        const resData = yield call(getDemo, params);
        yield put({
          type: 'save',
          payload: {
            demoList: resData.data.data
          }
      });
    }, 
  }
};

export default DemoModel
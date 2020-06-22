import { DemoState } from './demo'

export interface ConnectState {
  loading: Loading;
  demo: DemoState;
}

export interface Loading {
  effects: { [key: string]: boolean | undefined };
  models: {
  };
}
/*
 * @desc 全屏布局文件
 */
import * as React from "react";
import './index.less'
export const LayoutView: React.StatelessComponent<{}> = (props) => (
  <div className="layout" style={{ minHeight: '100vh' }}>
    <div style={{ padding: '0 50px' }}>
      {props.children}
    </div>
  </div>
)
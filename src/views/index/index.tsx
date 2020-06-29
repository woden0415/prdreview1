import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Table, Form } from "antd";
import { getTestJson, postString, postFile } from "@/services/request";
import { stringify } from "querystring";

interface IResponse {
  success: boolean;
  data: any;
}

const Index: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [prdUrl, setPrdUrl] = useState<string>('');

  const handleGetInfo = function () {
    getTestJson();
  }

  const handleUploadString = function () {
    const params = {
      uname: 'wangdong',
      uage: '13'
    };
    postString(params);
  }

  const handleUploadFile = () => {
    var filenode: HTMLInputElement = document.querySelector('#inputfile');
    if (filenode.files.length === 0) {
      alert('请选择文件')
    }
    var file: File = filenode.files[0];

    let formData: FormData = new FormData();
    formData.append('file', file);

    postFile(formData, (res: IResponse) => {
      const { success, data } = res;
      success && setPrdUrl(data.prdUrl);
    });
  }

  return (
    <div>
      <div>Hello React hooks1!</div>

      <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +1
        </button>
        <button onClick={() => { handleGetInfo() }}>获取一个文件</button>
        <div>
          <button onClick={() => { handleUploadString(); }}>上传文本字符串</button>
        </div>
        <div>
          <input id="inputfile" type="file" />
          <button onClick={() => { handleUploadFile() }}>上传文件</button>
          {prdUrl ? <div>prd线上地址为：{prdUrl}</div> : <div></div>}
        </div>
      </div>
    </div>
  );
};
export default Index;

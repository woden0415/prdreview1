import React, { useState, useEffect } from "react";
import { postFile } from "@/services/request";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import './index.less';
interface IResponse {
  success: boolean;
  data: any;
}

const Index: React.FC = () => {
  const [prdUrl, setPrdUrl] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<Boolean>(false);

  const props = {
    onRemove: (file: UploadFile) => {
      setFileList([]);
    },
    beforeUpload: (file: UploadFile) => {
      return false;
    },
    accept: '.zip',
    fileList,
    onChange(info: UploadChangeParam) {
      console.log('info :>> ', info);
      setFileList(info.fileList)
    },
  };

  const handleUpload = () => {
    let formData: FormData = new FormData();
    fileList.forEach((file: UploadFile) => {
      formData.append('files', file.originFileObj);
    });
    postFile(formData, (res: IResponse) => {
      const { success, data } = res;
      success && setPrdUrl(data.prdUrl);
    });
  };

  return (
    <div className="body-wrapper index-wrapper">
      <div className="c-fileupload">
        <div className="c-fileupload-header">
          <h2 className="header-h2">线上预览prd文件</h2>
        </div>
        <div className="c-fileupload-wrapper">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon" >
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击此处或者拖拽文件上传</p>
          </Dragger>
          <Button
            className="btn-upload"
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{ marginTop: 16 }}
          >
            {uploading ? '上传中' : '开始上传'}
          </Button>
          <p className="ant-upload-hint">
            {prdUrl || '此处显示线上地址'}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Index;

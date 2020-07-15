import React, { useState } from "react";
import { postFile, postValidFolderName } from "@/services/request";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { Upload, Button, Col, Row } from 'antd';
import InboxOutlined from '@ant-design/icons/InboxOutlined';

const { Dragger } = Upload;
import './index.less';
import { IResponse, IMyFile } from '@/models/interfaces';
import Util from "@/utils/util";

const Index: React.FC = () => {
  const [prdUrl, setPrdUrl] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const props = {
    onRemove: (file: UploadFile) => {
      setFileList([]);
    },
    beforeUpload: (file: UploadFile) => {
      return false;
    },
    fileList,
    onChange(info: UploadChangeParam) {
      Util.debounce(setFileList(info.fileList), 100);
    },
    directory: true,
    webkitdirectory: true,
  };

  /**
   * @description 提前校验是否有重复文件夹名
   * @returns {Boolean} true
   */
  const handleBeforeUpload = async () => {
    const firstFile: UploadFile = fileList[0];
    const firstFileResource: IMyFile = firstFile.originFileObj as IMyFile;
    const relativePath: string = firstFileResource.webkitRelativePath;
    const relativePathArr = relativePath.split('/');
    let floderName: string;
    if (relativePathArr.length > 0) {
      floderName = relativePathArr[0];
    }
    const resp: IResponse = await postValidFolderName({ floderName });
    const { success } = resp;
    if (!success) {
      return false;
    }
    return true;
  }

  const handleUpload = async () => {
    const flag = await handleBeforeUpload();
    if (!flag) {
      return;
    }
    if (uploading) { return }

    let formData: FormData = new FormData();
    fileList.forEach((file: UploadFile) => {
      const currentFile = file.originFileObj as IMyFile; // 为File接口添加webkitRelativePath属性
      formData.append('fileLists', currentFile, window.encodeURIComponent(currentFile.webkitRelativePath));
    });
    setUploading(true);
    postFile(formData, (res: IResponse) => {
      const { success, data } = res;
      success && setPrdUrl(data.prdUrl);
      setUploading(false);
      handlerClear();
    }, (error: Error) => {
      console.error(error);
      setUploading(false);
      handlerClear();
    });
  };

  const handlerClear = () => {
    setFileList([]);
  }

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
            <p className="ant-upload-text">点击此处或者拖拽文件夹上传</p>
          </Dragger>
          <Row gutter={[16, 24]}>
            <Col span={6}>
              <Button
                className="btn-upload"
                type="dashed"
                onClick={handlerClear}
                style={{ marginTop: 16 }}
              >
                清除当前已选文件
              </Button>
            </Col>
            <Col span={18}>
              <Button
                className="btn-upload"
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                style={{ marginTop: 16 }}
                loading={uploading}
              >
                {uploading ? '上传中' : '开始上传'}
              </Button>
            </Col>
          </Row>
          {prdUrl ? (
            <a className="ant-upload-hint" href={prdUrl} target="_blank"> {prdUrl} </a>)
            : (
              <p className="ant-upload-hint"> 此处显示线上地址 </p>
            )}
        </div>
      </div>
    </div>
  );
};
export default Index;

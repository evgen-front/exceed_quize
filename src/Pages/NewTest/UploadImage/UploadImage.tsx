import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd/es/upload';
import { QuestionService } from '../../../api/services/QuestionService';

interface UploadImageProps {
  questionId: number | null;
  testId: number | null;
}

export function UploadImage({ questionId, testId }: UploadImageProps) {
  const baseUrl = `http://localhost/tests/${testId}/questions/${questionId}/images/`;

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (testId && questionId) {
      QuestionService.getImage(testId, questionId)
        .then(() =>
          setFileList([
            {
              uid: questionId.toString(),
              name: '',
              status: 'done',
              url: baseUrl,
              thumbUrl: baseUrl,
            },
          ])
        )
        .catch((err) => setFileList([]));
    }
  }, [testId, questionId]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const deleteImage = () => {
    QuestionService.deleteImage(testId, questionId).catch((err) => console.log(err));
  };

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <PlusOutlined />
        Загрузить картинку
      </div>
    </div>
  );
  return (
    <div>
      <Upload
        action={baseUrl}
        listType='picture-card'
        fileList={fileList}
        withCredentials
        name='file'
        accept='image/png, image/jpeg, image/jpg, image/gif'
        onRemove={deleteImage}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    </div>
  );
}

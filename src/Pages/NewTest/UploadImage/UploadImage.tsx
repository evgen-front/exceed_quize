import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { NewTestService } from "../../../services/NewTestService";
import "./UploadImage.scss";

interface UploadImageProps {
  questionId: number | null;
  testId: number | null;
}

export function UploadImage({ questionId, testId }: UploadImageProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const getBase64 = (img: Blob, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: File) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Размер картинки должен быть до 5MB!");
    }
    return isLt5M;
  };

  const deleteImage = () => {
    setImageUrl("");
    NewTestService.deleteImage(testId, questionId).catch((err) =>
      console.log(err)
    );
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        setImageUrl(imageUrl)
      );
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузка...</div>
    </div>
  );

  return (
    <div className="upload_wrapper">
      <Upload
        name="files"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        listType="picture"
        className="upload_image"
        showUploadList={{
          showPreviewIcon: false,
          showRemoveIcon: true,
          showDownloadIcon: false,
        }}
        withCredentials
        multiple={false}
        action={`http://localhost/tests/${testId}/questions/${questionId}/images/`}
        beforeUpload={beforeUpload}
        progress={{
          strokeWidth: 3,
          strokeColor: {
            "0%": "#f0f",
            "100%": "#ff0",
          },
        }}
        onChange={handleChange}
        onRemove={deleteImage}>
        {imageUrl ? (
          <img
            className="imagetest"
            src={`http://localhost/tests/${testId}/questions/${questionId}/images/`}
            alt="question"
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

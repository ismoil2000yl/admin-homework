import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ckeditor = ({ field: { name, value }, form: { setFieldValue } }) => {
  return (
    <>
      <div className="my-[20px]">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFieldValue(name, data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
      </div>
    </>
  );
};

export default ckeditor;
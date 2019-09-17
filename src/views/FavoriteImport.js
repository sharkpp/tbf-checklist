"use struct";

import React, {useCallback} from 'react'

import { Button } from 'react-router-bootstrap'

import {useDropzone} from 'react-dropzone'
import 'react-dropzone/examples/theme.css';

function FavoriteImportView() {

  const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png'
  });
  
  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
      <div className='page-container'>
        <h3>
          お気に入りのインポート
        </h3>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>ここでエクスポートしたお気に入りをドラッグ＆ドロップするか、クリックして選択してください</p>
          <em>(*.json のみ指定可能)</em>
        </div>
        {0&&<div
        //type is invalid -- expected a string がでる
        >
        <Button variant="primary" onClick={}>インポート</Button>
        <Button variant="secondary" onClick={}>戻る</Button>
        </div>}
      </div>
  );
}

export default FavoriteImportView;

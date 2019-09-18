"use struct";

import React, {useState, useCallback} from 'react'

import { ButtonToolbar, Button } from 'react-bootstrap';

import {useDropzone} from 'react-dropzone'
import 'react-dropzone/examples/theme.css';

import MessageBox from '../components/MessageBox';

const MsgImportSuccess = 'お気に入りのインポートに成功しました';
const MsgImportFailed  = 'お気に入りのインポートに失敗しました';

function FavoriteImportView({ models, history }) {
  const { favorite } = models;

  const [ message, setMessage ] = useState(false);

  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'application/json'
  });

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} は利用できません。
    </li>
  ));

  const handleImportClick = useCallback(() => {
    if (acceptedFiles.length < 1) {
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    // ファイル情報をキャプチャ
    reader.onload = (e) => {
      if (!favorite.import(e.target.result)) {
        setMessage(MsgImportFailed);
      }
      else {
        setMessage(MsgImportSuccess);
      }
    };

    // Read in the image file as a data URL.
    reader.readAsText(file);

  }, [acceptedFiles, favorite]);

  const handleBackClick = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleMessageClose = () => {
    setMessage(false);
  };

  // インポートに成功したので戻る
  const handleMessageCloseWithBack = useCallback(() => {
    setMessage(false);
    history.goBack();
  }, [history]);

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
        <ol>
          {rejectedFilesItems}
        </ol>
        <ButtonToolbar>
          <Button variant="primary"   onClick={handleImportClick} disabled={acceptedFiles.length<1}>インポート</Button>
          <Button variant="secondary" onClick={handleBackClick}>戻る</Button>
        </ButtonToolbar>
        <MessageBox
          title="インポート"
          message={message}
          onClose={message === MsgImportSuccess ? handleMessageCloseWithBack : handleMessageClose}
        />
      </div>
  );
}

export default FavoriteImportView;

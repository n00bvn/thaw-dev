import React, { Fragment, useEffect, useState } from 'react'
import { firebaseDb } from '../../firebase'

import TinymceEditor from './tinymce_editor'

export default function EditIntro({ toggleIntro }) {
  const [intro, setIntro] = useState('');
  useEffect(() => {
    firebaseDb.ref('thaw_dev_intro').once('value', snapshot => {
      setIntro(snapshot.val());
    });
  }, []);

  const handleEditorChange = (content, editor) => {
    setIntro(content);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firebaseDb.ref('thaw_dev_intro').set(intro, (error) => {
      if (error) {
        alert('ERROR');
        console.log(error);
      } else {
        toggleIntro();
      }
    });
  }

  return (
    <Fragment>
      <h1>Edit Intro</h1>
      <TinymceEditor
        initValue={intro}
        handleEditorChange={handleEditorChange}
      />
      <div className="mt-4 text-center">
        <button className="btn btn-primary btn-lg mr-3" onClick={(e) => handleSubmit(e)}>Update Changes</button>
        <button className="btn btn-secondary" onClick={() => toggleIntro()}>Cancel</button>
      </div>
    </Fragment>
  )
}

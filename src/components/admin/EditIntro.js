import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { firebaseDb } from '../../firebase'

import TinymceEditor from './tinymce_editor'

export default function EditIntro() {
  const [intro, setIntro] = useState('');
  useEffect(() => {
    firebaseDb.ref('thaw_dev_intro').once('value', snapshot => {
      setIntro(snapshot.val());
    });
  }, []);

  const handleEditorChange = (content, editor) => {
    setIntro(content);
  }

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    firebaseDb.ref('thaw_dev_intro').set(intro, (error) => {
      if (error) {
        alert('ERROR');
        console.log(error);
      } else {
        history.push('/');
      }
    });
  }

  return (
    <Fragment>
      <h4>Edit Intro</h4>
      {intro && (
        <TinymceEditor
          initValue={intro}
          handleEditorChange={handleEditorChange}
        />
      )}
      <div className="mt-4 text-center">
        <button className="btn btn-primary btn-lg mr-3" onClick={(e) => handleSubmit(e)}>Update Changes</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </div>
    </Fragment>
  )
}

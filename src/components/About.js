import React, { useState, useEffect } from 'react'
import { firebaseDb } from '../firebase'

import Loading from './Loading'

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseDb.ref('thaw_dev_intro').once('value', snapshot => {
      setLoading(false);
      document.getElementById('IntroContent').innerHTML = snapshot.val();
    });
  });

  return (
    <section className="resume-section">
      <div className="resume-section-content">
        <h1 className="mb-0">
          <span className="text-primary">Thaw</span>&nbsp;Tran
        </h1>
        <div className="subheading mb-5">
          Full stack developer | Ruby, Python, React, Meteor
        </div>
        <div className="lead mb-5" id="IntroContent">
          {loading && <Loading />}
        </div>
        <div className="social-icons">
          <a className="social-icon" href="mailto:mr.thaw1809@gmail.com"><i className="fas fa-envelope"></i></a>
          <a className="social-icon" href="https://github.com/n00bvn" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a className="social-icon" href="https://thaw.dev/CV_Thaw.pdf" target="_blank" rel="noopener noreferrer"><i className="fas fa-file"></i></a>
        </div>
      </div>
    </section>
  )
}

import React from 'react'

export default function Main() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 bg-info p-4 text-light">
          Welcome to Thaw blog
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-9">
          <h1>List Articles</h1>
        </div>

        <div className="col-3">
          <h3>List Tags</h3>
        </div>
      </div>
    </div>
  )
}

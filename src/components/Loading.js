import React from 'react'

export default function Loading() {
  return (
    <div className="container">
      <div className="m-auto text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

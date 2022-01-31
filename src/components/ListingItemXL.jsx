import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ListingItemXL({ listing, id }) {
  const [views, setViews] = useState(0)

  useEffect(() => {
    const updateVisitCount = async () => {
      await fetch(`https://api.countapi.xyz/get/ultrasoft.uz/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setViews(res.value)
        })
    }
    updateVisitCount()
  }, [id])
  return (
    <div
      className="card card-compact xl:card-side w-full card-bordered mb-5 shadow-xl"
      key={id}
    >
      <figure className="explore-card-figure p-5 bg-gradient-to-br from-black via-base-100 to-transparent">
        <img
          src={listing.iconUrl[0]}
          alt={listing.name}
          className="object-cover w-60 mx-auto"
        />
      </figure>
      <div className="card-body justify-center">
        <h2 className="card-title">
          {listing.name}
          {new Date(listing.timestamp.seconds * 1000).getDate() >=
            new Date().getDate() - 7 && (
            <div className="badge mx-2 uppercase">yangi</div>
          )}
        </h2>
        <p>
          {listing.overview.length > 130
            ? listing.overview.slice(0, 130) + '...'
            : listing.overview}
        </p>
        <div className="card-actions">
          <a
            href={listing.linkToDownload}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Yuklab olish
          </a>
          <Link to={`/category/${listing.type}/${listing.category}/${id}`}>
            <button className="btn btn-outline">Ko'proq ma'lumot</button>
          </Link>
          <div className="badge badge-ghost self-end ml-auto gap-3">
            <i className="far fa-eye"></i>
            {views}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingItemXL

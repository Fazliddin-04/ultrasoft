import { Link } from 'react-router-dom'

function ListingItem({ listing, id, onEdit, onDelete, classes }) {
  return (
    <li class="indicator">
      <Link
        to={`/category/${listing.type}/${id}`}
        className={`card card-bordered ${
          classes ? classes : ''
        } bg-base-300 h-full transition hover:shadow-xl`}
      >
        <figure className="flex-1 flex items-center justify-center p-2">
          <img src={listing.iconUrl[0]} alt={listing.name} />
        </figure>
        <div className="card-body flex-1 bg-neutral justify-between">
          <h2 className="card-title">
            {listing.name}
            <div className="badge mx-2 badge-secondary">NEW</div>
          </h2>
          {/* Vote Average */}
          <div className="card-actions">
            <div className="badge badge-primary capitalize">
              {listing.category}
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <div
          class="indicator-item badge badge-ghost text-red-700 text-2xl p-4"
          onClick={() => onDelete(listing.id, listing.name)}
        >
          <i className="far fa-trash-alt"></i>
        </div>
      )}

      {onEdit && (
        <div
          className="indicator-item indicator-top after-delIcon indicator-end badge badge-ghost text-yellow-500 text-2xl p-4"
          onClick={() => onEdit(id)}
        >
          <i className="far fa-edit"></i>
        </div>
      )}
    </li>
  )
}

export default ListingItem

import { Link } from 'react-router-dom'

function ListingItem({
  listing,
  id,
  onEdit,
  onDelete,
  classes,
  bodyClasses,
  cardFigureClass,
}) {
  return (
    <li className="indicator">
      <Link
        to={`/${listing.type}/${listing.category}/${id}`}
        className={`card card-bordered ${
          classes ? classes : ''
        } transition hover:shadow-xl`}
      >
        <figure
          className={`${
            cardFigureClass
              ? cardFigureClass
              : 'flex items-center justify-center p-2'
          }`}
        >
          <img src={listing.iconUrl[0]} alt={listing.name} />
        </figure>
        <div className={`card-body ${bodyClasses}`}>
          <h2 className="card-title">
            {listing.name}
            {new Date(listing.timestamp.seconds * 1000).getDate() ===
              new Date().getDate() && (
              <div className="badge mx-2 badge-secondary uppercase">yangi</div>
            )}
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
        <div className="indicator-item indicator-bottom indicator-center flex items-center gap-5 text-center">
          <div
            className=" badge badge-ghost text-red-700 text-2xl px-2 py-4"
            onClick={() => onDelete(listing.id, listing.name)}
          >
            <i className="far fa-trash-alt"></i>
          </div>
          {onEdit && (
            <div
              className="badge badge-ghost text-yellow-500 text-2xl px-2 py-4"
              onClick={() => onEdit(id)}
            >
              <i className="far fa-edit"></i>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export default ListingItem

import DownloadItem from './DownloadItem'

function Downloader({ files = [], remove }) {
  return (
    <div className="downloader">
      <div className="card">
        <div className="card-header">File Downloader</div>
        <ul className="list-group list-group-flush">
          {files.map((file, idx) => (
            <DownloadItem
              key={idx}
              removeFile={() => remove(file.downloadId)}
              {...file}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Downloader

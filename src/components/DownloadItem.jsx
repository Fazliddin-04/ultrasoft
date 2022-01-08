import { useState, useEffect } from 'react'
import { Axios } from 'axios'

function DownloadItem({ name, file, filename, removeFile }) {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  })

  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        })
      },
    }

    Axios.get(file, {
      responseType: 'blob',
      ...options,
    }).then(function (response) {
      console.log(response)

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers['content-type'],
        })
      )

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()

      setDownloadInfo((info) => ({
        ...info,
        completed: true,
      }))

      setTimeout(() => {
        removeFile()
      }, 4000)
    })
  })

  const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 d-flex">
          <div className="d-inline font-weight-bold text-truncate">{name}</div>
          <div className="d-inline ml-2">
            <small>
              {downloadInfo.loaded > 0 && (
                <>
                  <span className="text-success">
                    {formatBytes(downloadInfo.loaded)}
                  </span>
                  / {formatBytes(downloadInfo.total)}
                </>
              )}

              {downloadInfo.loaded === 0 && <>Initializing...</>}
            </small>
          </div>
          <div className="d-inline ml-2 ml-auto">
            {downloadInfo.completed && (
              <span className="text-success">Completed</span>
            )}
          </div>
        </div>
        <div className="col-12 mt-2">
          <div class="p-6 space-y-2 artboard phone">
            <progress
              class="progress progress-primary"
              value={downloadInfo.progress}
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </li>
  )
}

export default DownloadItem

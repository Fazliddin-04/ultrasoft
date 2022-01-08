import { useState } from "react";
import Downloader from "../components/Downloader";
import { v4 as uuidv4 } from "uuid";

const useFileDownloader = () => {
  const [files, setFiles] = useState(() => []);

  const download = (file) =>
    setFiles((fileList) => [...fileList, { ...file, downloadId: uuidv4() }]);

  const remove = (removeId) =>
    setFiles((files) => [
      ...files.filter((file) => file.downloadId !== removeId),
    ]);

  return [
    (e) => download(e),
    files.length > 0 ? (
      <Downloader files={files} remove={(e) => remove(e)} />
    ) : null,
  ];
}

export default useFileDownloader

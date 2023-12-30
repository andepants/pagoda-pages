'use client'
import firebase_app from '../services/firebase/config.js'
import { getStorage, getDownloadURL, ref } from 'firebase/storage'

export default function Home() {
  const riEpubLink = 'https://firebasestorage.googleapis.com/v0/b/pagoda-pages.appspot.com/o/Reverend%20Insanity%20-%20Gu%20Zhen%20Ren.epub?alt=media&token=740542ae-965c-41b3-b45c-7ed150eaac88';
  const riMobiLink = 'https://firebasestorage.googleapis.com/v0/b/pagoda-pages.appspot.com/o/Reverend-Insanity-Gu-Zhen-Ren.mobi?alt=media&token=67b8c785-34ef-47ca-97c7-f205c6ffbcfc';
  const riRenZhuLegendEpubLink = 'https://firebasestorage.googleapis.com/v0/b/pagoda-pages.appspot.com/o/The%20Legends%20of%20Ren%20Zu%20-%20Gu%20Zhen%20Ren.epub?alt=media&token=4bfedd87-c7a5-45a1-924a-5b3ee0ed742b';
  const riRenZhuLegendMobiLink = 'https://firebasestorage.googleapis.com/v0/b/pagoda-pages.appspot.com/o/The-Legends-of-Ren-Zu-Gu-Zhen-Ren.mobi?alt=media&token=e1c612e7-fb52-402a-a209-a31ed048fbaf';
  const epubStorageLocation = 'gs://pagoda-pages.appspot.com/The Legends of Ren Zu - Gu Zhen Ren.epub'

  const storage = getStorage(firebase_app);

  // used to get a firebase url to get a public URL for ALL files (pdf, mobi, epub, etc.)
  const getURL = (firebaseFileLocation : string) => {
    console.log('inside downlaod book');
    getDownloadURL(ref(storage, firebaseFileLocation))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(url, 'downlaoded URL is this');
      })
      .catch((error) => {
        console.log('error : ', error);
      });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className="texdark-500 text-4xl font-bold flex justify-center">
        Pagoda Pages
      </h1>
      <ul className="flex justify-center flex-col p-4">
        <li className="m-4">
          <div className="text-2xl text-center font-bold">Reverand Insanity</div>
          <div className="text-m text-center">All Chapters (1-2334)</div>
          <div className="flex justify-center">
            <a href={riEpubLink} download className="btn-blue">epub</a>
            <a href={riMobiLink} download className="btn-blue">mobi</a>
          </div>
        </li>
        <li>
          <div className="text-2xl text-center font-bold">The Legends of Ren Zhu</div>
          <div className="flex justify-center">
            <a href={riRenZhuLegendEpubLink} download className="btn-blue">epub</a>
            <a href={riRenZhuLegendMobiLink} download className="btn-blue">mobi</a>
          </div>
        </li>
      </ul>
      {/* <button onClick={() => getURL(epubStorageLocation)} className="btn-blue">get URL</button> */}
      {/* <button onClick={downloadBook} className="btn-blue">download PDF</button> */}
    </main>
  )
}

// git commit --allow-empty -m "add defer to script" --date='11 days ago'

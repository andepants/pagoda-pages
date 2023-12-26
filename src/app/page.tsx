'use client'
import firebase_app from '../services/firebase/config.js'
import { getStorage, getDownloadURL, ref } from 'firebase/storage'

export default function Home() {
  const pdfURL = 'https://firebasestorage.googleapis.com/v0/b/pagoda-pages.appspot.com/o/Chapter%201%20%E2%80%93%20The%20heart%20of%20a%20demon%20never%20has%20regret%20even%20in%20death.pdf?alt=media&token=48537d71-7272-4388-8e48-21260b4b60e6';
  const epubURL = 'https://firebasestorage.googleapis.com/v0/b/pagoda-pages.appspot.com/o/RI%20-%20Volume%201.epub?alt=media&token=7bd990c8-468b-4366-b21c-1523b2c69093';
  const pdfStorageLocation = 'gs://pagoda-pages.appspot.com/Chapter 1 – The heart of a demon never has regret even in death.pdf'
  const epubStorageLocation = 'gs://pagoda-pages.appspot.com/RI - Volume 1.epub'

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

  const downloadBook = async () => {
    // currently not working
    console.log
    try {
      const response = await fetch(pdfURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'filename.pdf'; // replace with your desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="texdark-500 text-4xl font-bold flex justify-center">
        Pagoda Pages
      </h1>
      <h2>I have been waiting for you brother ...</h2>
      <ul className="text-2xl font-bold flex justify-center p-4">Reverand Insanity</ul>
      <div>Volume 1 (first 2 chapters atm)</div>
      <div className="flex justify-between">
        <a href={epubURL} download className="btn-blue">epub</a>
        <a href={pdfURL} download className="btn-blue">pdf</a>
      </div>

      {/* <button onClick={() => getURL(epubStorageLocation)} className="btn-blue">get URL</button> */}
      {/* <button onClick={downloadBook} className="btn-blue">download PDF</button> */}
    </main>
  )
}

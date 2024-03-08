// download a random image with search terms on google
import google from 'googlethis'
import fs from 'fs';
import fetch from 'node-fetch';

async function searchImages(searchTerms) {
  try {
    const images = await google.image(searchTerms,
      {
        safe: false
      });
    return images[Math.floor(Math.random() * images.length)].url;
  }
  catch (error) {
    return searchImages("nothing found");
  }
}

async function downloadImage(url, path) {

  fetch(url)
  .then((response) => response.buffer())
  .then((buffer) => {
    fs.writeFile(path, buffer, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
}

export { searchImages, downloadImage };

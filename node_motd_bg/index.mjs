import { searchImages, downloadImage } from './search.mjs';
import { exec } from 'child_process';

// Path: index.js

// download a random image with search terms on google
// search terms are system arguments

searchImages(process.argv.slice(2).join(" ")).then((url) => {
  downloadImage(url, './.fehbg').then(() => {
    exec('feh --bg-fill ./.fehbg');
  });
});

import { readFile } from 'fs';
import { MarkovMachine } from './markov.js';
import axios from 'axios';

function generate(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

let [method, path] = process.argv.slice(2);

switch (method) {
  case "file":
    readFile(path, 'utf8', (err, data) => {
      if ( err) {
        console.log(`Error reading ${path}: ${err}`);
        process.exit(1);
      }
      generate(data);
    })
    break;
  case "url":
    axios.get(path)
      .then(resp => generate(resp.data))
      .catch(err => {
        console.log(`Error fetching ${path}: ${err}`);
        process.exit(1);
      })
    break;
  default:
    console.error(`Forbidden method: ${method}`);
    process.exit(1);
}


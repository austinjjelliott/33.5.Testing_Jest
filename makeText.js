/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const { markovMachine } = require("./markov");
const process = require("process");

//  Make Markov machine from text and generate text from it.

function makeText(text) {
  let mm = new markovMachine(text);
  console.log(mm.makeText());
}

// Read file, generate text from that instead
function makeTextFile(path) {
  fs.readFile(path, "utf8", function (err, response) {
    if (err) {
      console.error(`Cannot read ${path}: ${err}`);
      process.exit(1);
    } else {
      makeText(response);
    }
  });
}

// Read URL, generate text from that instead
async function makeTextUrl(web) {
  let response;
  try {
    response = await axios.get(web);
  } catch (err) {
    console.error(`Cannot read ${web}: ${err}`);
    process.exit(2);
  }
  makeText(response.data);
}

// Command line decides what to do:
let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeTextFile(path);
} else if (method === "url") {
  makeTextUrl(path);
} else {
  console.error(`Error! Method unknown, ${method}`);
  process.exit(3);
}

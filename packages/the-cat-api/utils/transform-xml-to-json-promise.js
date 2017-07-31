import { parseString } from 'xml2js';

export default function parseResponseXML(data) {
  return new Promise((resolve, reject) => (
    parseString(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  ));
}

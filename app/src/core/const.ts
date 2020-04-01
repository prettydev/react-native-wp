const baseUrl = "http://vps271456.vps.ovh.ca";
const baseApiUrl = "http://vps271456.vps.ovh.ca/?rest_route=/rest/v1/";
const senderID = '825670207641';

const PostServer = (url, body) => {
  return new Promise(function(resolve, reject) {
    fetch(baseApiUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((response) => {
      resolve(response);
    })
    .catch(err => {
      reject(err);      
    });
  });
};


export { baseUrl, baseApiUrl, senderID};
export { PostServer};

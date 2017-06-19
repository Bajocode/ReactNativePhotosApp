const apiKey = 'a6d819499131071f158fd740860a5a88';
const baseURLString = 'https://api.flickr.com/services/rest';

export function executeFetchRequest(url, completion) {
    fetch(url)
        .then(response => response.json())
        .then(json => handleResponse(json))
        .then(photos => completion(photos))
        .catch(error => console.log(error));
}
export function urlForSearchtext(searchText) {
    const params = {
        api_key: apiKey,
        method: 'flickr.photos.search',
        text: searchText,
        extras: 'url_m,url_h',
        format: 'json',
        nojsoncallback: '1'
    };
    const queryString = Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&');
    return baseURLString + '?' + queryString
}
function handleResponse(json) {
    return new Promise((resolve, reject) => {
            if (json.stat === 'ok') {
                var photosWithURL;
                for (var photo in json.photos.photo) {
                    if (photo.url_m != null && photo.url_h != null) {
                        photosWithURL.push(photo)
                    }
                }
                resolve(json.photos.photo);
            } else {
                reject('Flicker error code: ' + json.stat);
            }
        }
    );
}

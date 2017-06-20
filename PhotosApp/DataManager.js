// Constants
const apiKey = 'a6d819499131071f158fd740860a5a88';
const baseURLString = 'https://api.flickr.com/services/rest';
const flickrMethod = {
    search: 'flickr.photos.search',
    interesting: 'flickr.interestingness.getList'
}

// Public
export function executeFetchRequest(url, completion) {
    fetch(url)
        .then(response => response.json())
        .then(json => _handleResponse(json))
        .then(photos => completion(photos))
        .catch(error => console.log(error));
}
export function urlForSearchtext(searchText) {
    const extraParams = { text: searchText };
    return _constructFlickrURL(flickrMethod.search, extraParams);
}
export function urlForInteresting() {
    return _constructFlickrURL(flickrMethod.interesting);
}

// Private
function _constructFlickrURL(method, extraParams) {
    let params = {
        api_key: apiKey,
        method: method,
        extras: 'url_m,url_h',
        format: 'json',
        nojsoncallback: '1'
    };
    Object.assign(params, extraParams);
    const queryString = Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&');
    return baseURLString + '?' + queryString
}
function _handleResponse(json) {
    return new Promise((resolve, reject) => {
            if (json.stat === 'ok') {
                resolve(json.photos.photo);
            } else {
                reject('Flicker error code: ' + json.stat + ', reason: ' + json.message);
            }
        }
    );
}

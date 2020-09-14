// 1. prompt user to login to spotify and get active tab url 
let timeout;

var scopes = 'user-read-private user-read-email';
setTimeout(loginToSpotify, 100);

chrome.tabs.onActivated.addListener( (tabId, changeInfo, tab) => {
    chrome.tabs.query({'active': true, 'currentWindow': true, 'lastFocusedWindow': true}, (tabs) => {
        console.log("Active tab: " + tabs[0].url)
        triggerAfter10minutes(tabs[0]);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        console.log("Active tab: " + changeInfo.url);  
        triggerAfter10minutes(changeInfo);
    }
});

// 2. if tab url matches regex, is social media -> start stopwatch
function triggerAfter10minutes(tab) {
  if(/\binstagram.com|\byoutube.com|\btwitter.com|\bfacebook.com/g.test(tab.url)) {
    timeout = setTimeout(replacePlaylist, 50000); //5 minutes
  } else {
    clearTimeout(timeout);
  }
}

function loginToSpotify() {
  chrome.identity.launchWebAuthFlow({
    url: generateOauth2Url(),
    interactive: true
  }, (redirect_url) => {
    console.log(redirect_url);

    sendResponse('success');
  });

  return true;
}

function generateOauth2Url() {
  let url = 'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + CLIENT_ID +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);

  return url;
}

// 3. if stopwatch time > 5 minutes: get user playlists -> GET https://api.spotify.com/v1/me/playlists and replace all tracks in all playlists with yummy, baby, africa by toto, call me maybe -> PUT https://api.spotify.com/v1/playlists/{playlist_id}/tracks
function replacePlaylist() {}
// 4. follow justin bieber -> PUT https://api.spotify.com/v1/me/following

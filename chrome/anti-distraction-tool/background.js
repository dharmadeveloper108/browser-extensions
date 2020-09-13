// 1. get active tab url && check if tab url matches regex (is social media)
let timeout;

chrome.tabs.onActivated.addListener( (tabId, changeInfo, tab) => {
    chrome.tabs.query({'active': true, 'currentWindow': true, 'lastFocusedWindow': true}, (tabs) => {
        console.log("Active tab: " + tabs[0].url)
// 2. if tab url matches regex, is social media -> start stopwatch
        triggerAfter10minutes(tabs[0]);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        console.log("Active tab: " + changeInfo.url);  
// 2. if tab url matches regex, is social media -> start stopwatch
        triggerAfter10minutes(changeInfo);
    }
});



function triggerAfter10minutes(tab) {
  if(/\binstagram.com|\byoutube.com|\btwitter.com|\bfacebook.com/g.test(tab.url)) {
    timeout = setTimeout(replacePlaylist, 50000); //5 minutes
  } else {
    clearTimeout(timeout);
  }
}

function replacePlaylist() {

}



// if stopwatch time > 10 minutes, get user playlists -> GET https://api.spotify.com/v1/me/playlists

// replace all tracks in all playlists with yummy, baby, africa by toto, call me maybe -> PUT https://api.spotify.com/v1/playlists/{playlist_id}/tracks

// follow justin bieber -> PUT https://api.spotify.com/v1/me/following

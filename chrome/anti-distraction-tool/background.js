// 1. get active tab url && check if tab url matches regex (is social media)
chrome.tabs.onActivated.addListener( (tabId, changeInfo, tab) => {
    chrome.tabs.query({'active': true, 'currentWindow': true, 'lastFocusedWindow': true}, (tabs) => {
        console.log("Active tab: " + tabs[0].url)
        if(/\binstagram.com|\byoutube.com|\btwitter.com|\bfacebook.com/g.test( tabs[0].url )) {
                alert("hi there");
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        console.log("Active tab: " + changeInfo.url);    
        if(/\binstagram.com|\byoutube.com|\btwitter.com|\bfacebook.com/g.test(changeInfo.url)) {
            alert("hi there");
    }       
    }
});

// 2. if tab url matches regex, is social media -> start stopwatch

// if stopwatch time > 10 minutes, get user playlists -> GET https://api.spotify.com/v1/me/playlists

// replace all tracks in all playlists with yummy, baby, africa by toto, call me maybe -> PUT https://api.spotify.com/v1/playlists/{playlist_id}/tracks

// follow justin bieber -> PUT https://api.spotify.com/v1/me/following

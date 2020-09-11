async function destroy(query) {
  
    let tabs = await browser.tabs.query({});
    let tabsUnreduced = [];
    tabsUnreduced = tabs;

    // get unique urls
    const uniqueUrlsTabs = tabs.reduce((uniqueUrls, item) => {
        uniqueUrls[item.url] = ++uniqueUrls[item.url] || 0;
        return uniqueUrls;
    }, {});

    // filtered array 
    const duplicatedURLs = tabsUnreduced.filter(item => uniqueUrlsTabs[item.url]);
  
    // tabs to destroy
    let tabsToClose = [];

    duplicatedURLs.forEach((item)=> {
    if (tabsToClose[item.url]) {
        tabsToClose.push(item)
    } else {
        tabsToClose[item.url] = true;
    }
    });
    tabsToClose.forEach(item => browser.tabs.remove(item.id));
}
  
  let backgroundPage = browser.extension.getBackgroundPage();
  let button = document.getElementById("btn");

  button.addEventListener("click", function(e) {
    e.preventDefault();  
    destroy();
    setTimeout(Init(), 15);
    button.style.zIndex = -1;
  });

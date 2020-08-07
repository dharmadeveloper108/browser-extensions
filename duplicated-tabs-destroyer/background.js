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
    let tabsToDelete = [];

    duplicatedURLs.forEach((item)=> {
    if (tabsToDelete[item.url]) {
        tabsToDelete.push(item)
    } else {
        tabsToDelete[item.url] = true;
    }
    });
    tabsToDelete.forEach(item => browser.tabs.remove(item.id));
}
  
  let backgroundPage = browser.extension.getBackgroundPage();
  let button = document.getElementById("kaboom");

  button.addEventListener("click", function(e) {
    e.preventDefault();  
    destroy();
    setTimeout(Init(), 15);
    document.getElementById("btn").style.zIndex = -1;
  });

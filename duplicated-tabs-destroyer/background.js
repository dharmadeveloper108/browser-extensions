async function destroy(query) {
  
    let tabs = await browser.tabs.query({});
    let tabsArray = []

    for(let tab of tabs) {
        tabsArray.push(tab)
    }

    const openTabs = tabs.reduce((x, y) => {
        x[y.url] = ++x[y.url] || 0;
        return x;
    }, {});

    const duplicatedURLs = tabsArray.filter(y => openTabs[y.url]);
    const tabsToDelete = []
    duplicatedURLs.forEach( el => tabsToDelete.push(el));

    tabsToDelete.filter((item, index) => tabsToDelete.indexOf(item.url) !== index);
   
    let urls = {};
    let duplicates = [];

    tabsToDelete.forEach((item)=> {
    if (urls[item.url]) {
        duplicates.push(item)
    } else {
        urls[item.url] = true;
    }
    });
    duplicates.forEach(item => browser.tabs.remove(item.id));
}
  
  let backgroundPage = browser.extension.getBackgroundPage();
  let button = document.getElementById("kaboom");

  button.addEventListener("click", function(e) {
    e.preventDefault();  
    destroy();
    setTimeout(Init(), 15);
    document.getElementById("btn").style.zIndex = -1;
  });

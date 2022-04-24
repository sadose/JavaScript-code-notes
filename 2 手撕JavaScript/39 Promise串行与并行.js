// 1 给定 URL 的数组，串行请求数据

function getData1(urls, callback) {
    if(!urls.length) return;
    let lastPromise = null;
    for(const url of urls) {
        if(lastPromise) {
            lastPromise = lastPromise.then((data) => {
                callback(data);
                return fetch(url);
            });
        } else {
            lastPromise = fetch(url);
        }
    }
    lastPromise.then((data) => callback(data));
}

// 2 给定 URL 的数组，并行请求数据

function getData2(urls, callback) {
    for(const url of urls) {
        fetch(url).then((data) => callback(data));
    }
}
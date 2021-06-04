/*global chrome*/


/**
 * Get data from chrome storage sync via a promise
 */
export const getChromeStorageSyncData = (keys) => {
    return new Promise(
        resolve => {
            chrome.storage.sync.get(
                keys,
                response => {
                    console.log(`getChromeStorageSyncData get: ${JSON.stringify(response)}`);
                    resolve(response);
                }
            );
        }
    )
 }

export const setChromeStorageSyncData = data => {
    return new Promise(
        resolve => {
            chrome.storage.sync.set(
                data,
                () => {
                    console.log(`Data set: ${JSON.stringify(data)}`);
                    resolve();
                }
            )  
        }
    );
}
  
export const removeChromeStorageSyncData = (keys) => {
    return new Promise(
        resolve => {
            chrome.storage.sync.remove(
                keys,
                () => {
                    console.log(`Keys removed: ${JSON.stringify(keys)}`);
                    resolve();
                }
            );
        }
    )
}

export const clearChromeStorageSyncData = () => {
    return new Promise(
        resolve => {
            chrome.storage.sync.clear(
                () => {
                    console.log(`Data cleared`);
                    resolve();
                }
            )  
        }
    );
}
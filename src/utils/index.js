export const getUrlData = (url) => {
  if (url === '/') return null;

  
  let isHasHttps = /^(?:f|ht)tps?\:\/\//.test(url)

  if (!isHasHttps) {
    url = "https://" + url;
  }

  
  const urlData = new URL(url);
  
  return urlData;
}
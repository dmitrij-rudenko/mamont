export const getUrlData = (url) => {
  let isHasHttps = /^(?:f|ht)tps?\:\/\//.test(url)

  if (!isHasHttps) {
    url = "https://" + url;
  }
  
  const urlData = new URL(url);
  // console.log(urlData)

  return urlData;
}
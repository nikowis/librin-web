
export function filterMatchesUrl(filter, urlSearch) {
  const params = new URLSearchParams(urlSearch);
  for (const [key, value] of params) {
      if(!filter[key] || String(filter[key]) !== value) {
        return false;
      }
  }
  return true;
}



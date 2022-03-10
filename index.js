function pickOnly(data, include) {
  const results = {}

  for (const property of include) {
    results[property] = data[property]
  }

  return results
}

function filterSecurityProperties(data) {
  let results = data

  if (typeof results === 'object') {
    if (
      'name' in results &&
      'version' in results &&
      'scripts' in results &&
      'main' in results
    ) {
      results = pickOnly(results, ['name', 'version'])
    }
  }

  return results
}

module.exports = function (source) {
  if (this.cacheable) this.cacheable();

  var value = typeof source === "string" ? JSON.parse(source) : source;

  value = filterSecurityProperties(value)
  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `module.exports = ${value}`;
}

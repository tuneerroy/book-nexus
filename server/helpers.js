const fColInList = (col, list) => {
  if (list === undefined || list.length === 0) return 'TRUE';
  return `${col} IN (${list.map((item) => `'${item}'`).join(', ')})`;
};

module.exports = {
  fColInList,
};
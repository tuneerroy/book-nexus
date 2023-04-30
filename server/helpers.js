const fColInList = (col, list) => {
  if (list === undefined || list.length === 0) return "TRUE";
  return `${col} IN (${list.map((item) => `'${item}'`).join(", ")})`;
};

const fColNotInList = (col, list) => {
  if (list === undefined || list.length === 0) return "FALSE";
  return `${col} NOT IN (${list.map((item) => `'${item}'`).join(", ")})`;
};

const fColInRange = (col, low, high) => {
  if (low === undefined && high === undefined) return "TRUE";
  if (low === undefined) return `${col} <= ${high}`;
  if (high === undefined) return `${col} >= ${low}`;
  return `${col} BETWEEN ${low} AND ${high}`;
};

const fGetPage = (page, pageSize) => {
  if (page === undefined || pageSize === undefined) return "";
  return `LIMIT ${pageSize} OFFSET ${Math.max(page - 1, 0) * pageSize}`;
};

const fListToTable = (arr) =>
  "VALUES " + arr.map((item) => `ROW("${item}")`).join(", ");

module.exports = {
  fColInList,
  fColNotInList,
  fColInRange,
  fGetPage,
  fListToTable,
};

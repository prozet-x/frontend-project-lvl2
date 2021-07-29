const makeStatus = (sym) => {
  if (sym === '-') {
    return 'deleted';
  }
  return sym === '+' ? 'added' : 'no changes';
};

/* export default (data) => {
  const makeAll = (arr, res) => {
    arr.forEach((elem) => {
      const obj = {
        name: elem[1],
        status: makeStatus(elem[0]),
        value: Array.isArray(elem[2]) ? makeAll(elem[2], []) : elem[2],
      };
      res.push(obj);
    });
    return res;
  };

  const res = makeAll(data, []);
  return JSON.stringify(res);
}; */

export default (data) => {
  const makeAll = (arr) => {
    const res = [];
    arr.forEach((elem) => {
      const obj = {
        name: elem[1],
        status: makeStatus(elem[0]),
        value: Array.isArray(elem[2]) ? makeAll(elem[2]) : elem[2],
      };
      res.push(obj);
    });
    return res;
  };

  const result = makeAll(data);
  return JSON.stringify(result);
};

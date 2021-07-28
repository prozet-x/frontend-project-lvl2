export default (data) => {
  const makeAll = (arr, res) => {
    arr.forEach((elem) => {
      const obj = {};
      [, obj.name] = elem;
      if (elem[0] === '-') {
        obj.status = 'deleted';
      } else if (elem[0] === '+') {
        obj.status = 'added';
      } else {
        obj.status = 'no changes';
      }
      obj.value = Array.isArray(elem[2]) ? makeAll(elem[2], []) : elem[2];
      res.push(obj);
    });
    return res;
  };

  const res = makeAll(data, []);
  return JSON.stringify(res);
};

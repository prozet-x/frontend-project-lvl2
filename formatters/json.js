const makeStatus = (sym) => {
  if (sym === '-') {
    return 'deleted';
  }
  return sym === '+' ? 'added' : 'no changes';
};

export default (data) => {
  const makeAll = (arr) => arr.map((elem) => {
    const obj = {
      name: elem[1],
      status: makeStatus(elem[0]),
      value: Array.isArray(elem[2]) ? makeAll(elem[2]) : elem[2],
    };
    return obj;
  });

  return JSON.stringify(makeAll(data));
};

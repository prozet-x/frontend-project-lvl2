const getOffset = (level) => '  '.repeat(level);

export const stylish = (data) => {
  const out = (arr, level) => {
    let str = '';
    arr.forEach((elem) => {
      str = str.concat(`${getOffset(level)}${elem[0]} ${elem[1]}: `);
      if (Array.isArray(elem[2])) {
        str = str.concat('{\n'.concat(out(elem[2], level + 2)));
        str = str.concat(`${getOffset(level + 1)}}`);
      } else {
        str = str.concat(elem[2]);
      }
      str = str.concat('\n');
    });
    return str;
  };
  console.log(`{\n${out(data, 1)}}`);
};

export default stylish;

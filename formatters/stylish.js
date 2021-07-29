const getOffset = (level) => '  '.repeat(level);

export default (data) => {
  const out = (arr, level) => arr.reduce((acc, elem) => acc
    .concat(`${getOffset(level)}${elem[0]} ${elem[1]}: `)
    .concat(Array.isArray(elem[2])
      ? '{\n'.concat(out(elem[2], level + 2)).concat(`${getOffset(level + 1)}}`)
      : elem[2])
    .concat('\n'), '');

  /* let str = '';
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
    return str; */

  return `{\n${out(data, 1)}}`;
};

const getOffset = (level) => '  '.repeat(level);

export default (data) => {
  const out = (arr, level) => arr.reduce((acc, elem) => acc
    .concat(`${getOffset(level)}${elem[0]} ${elem[1]}: `)
    .concat(Array.isArray(elem[2])
      ? '{\n'.concat(out(elem[2], level + 2)).concat(`${getOffset(level + 1)}}`)
      : elem[2])
    .concat('\n'), '');

  return `{\n${out(data, 1)}}`;
};

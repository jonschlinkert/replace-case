'use strict';

const replace = require('..');
const str = 'foo Foo FOO foo';

// Uses "gi" RegExp flags by default
console.log(replace(str, 'foo', 'bar')); //=> bar Bar BAR
console.log(replace(str, '[fF]oo', 'bar', 'g')); //=> bar Bar BAR
console.log(replace(str, 'foo', 'bar', 'i')); //=> bar Bar BAR
console.log(replace(str, 'foo', 'bar', '')); //=> bar Bar BAR

const patterns = [
  { input: 'foo Foo FOO foo', substr: 'foo', replacement: 'bar' },
  { input: 'foo Foo FOO foo', substr: '[fF]oo', replacement: 'bar', flags: 'g' },
  { input: 'foo Foo FOO foo', substr: 'foo', replacement: 'bar', flags: 'i' },
  { input: 'foo Foo FOO foo', substr: 'foo', replacement: 'bar', flags: '' }
];

for (const { input, substr, replacement, flags } of patterns) {
  const output = replace(input, substr, replacement, flags);
  const f = flags != null ? `, '${flags}'` : '';
  console.log(`console.log(replace('${input}', '${substr}', '${replacement}'${f})); //=> ${output}`);
}

const input = `
  .alphaconfig.json
  AlphaWord
  Alpha
  ALPHA_FOO_BAR
`;

console.log(replace(input, 'alpha', 'beta'));
console.log(replace(input, 'alpha', 'beta', 'i'));
console.log(replace(input, '\\balpha\\b', 'beta'));
console.log(replace(input, 'alpha(config)*', 'beta'));
console.log(replace(input, 'alpha([^\\s_.]*)', 'beta'));

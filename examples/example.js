'use strict';

const replace = require('..');

const input = `
  assemblefile.js
  .assemblerc.json
  AssembleClass
  Assemble
  ASSEMBLE_ENV_VAR
`;

console.log(replace(input, 'assemble(rc)?', 'generate'))
console.log(replace(input, 'assemble(rc)?', (casing, match, ...rest) => {
  return `generate${rest[0] === 'rc' ? '-rc' : ''}`
}))

'use strict';

const detect = require('detect-case');
const { snakecase, uppersnake, camelcase, pascalcase, titlecase } = require('./utils');

module.exports =  (input, substring, replacement, flags = 'gim') => {
  return input.replace(new RegExp(substring, flags), (match, ...args) => {
    if (typeof replacement === 'function') {
      return replacement(detect(match), match, ...args);
    }

    switch (detect(match)) {
      case 'lowercase': return replacement.toLocaleLowerCase();
      case 'uppercase': return replacement.toLocaleUpperCase();
      case 'snakecase': return snakecase(replacement);
      case 'uppersnake': return uppersnake(replacement);
      case 'titlecase': return titlecase(replacement);
      case 'pascalcase': return pascalcase(replacement);
      case 'camelcase': return camelcase(replacement);
      default: {
        return replacement;
      }
    }
  });
};

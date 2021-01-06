'use strict';

exports.toWords = input => {
  const output = input.replace(/^[_\W]+|[_\W]+$/g, '');
  const words = output.split(/[\W_]+/);
  return words.length === 1 ? output.split(/(?=[A-Z][^A-Z]*)/) : words.filter(Boolean);
};

exports.changeCase = (input, oneCharFn, transformFn) => {
  if (typeof input !== 'string') return '';
  const str = input.trim();
  if (str === '') return '';
  if (str.length === 1) return oneCharFn(str);
  return transformFn(str);
};

exports.titlecase = input => {
  return exports.changeCase(input, str => str.toLocaleUpperCase(), str => {
    const first = str[0].toLocaleUpperCase();
    const rest = str.slice(1) || '';

    if (rest && !/[a-z]/.test(rest)) {
      return first + rest.toLocaleLowerCase();
    }

    return first + rest;
  });
};

exports.titleize = exports.titlecase;

/**
 * Convert the given string to pascalcase
 * @param {String} input
 */

exports.pascalcase = input => {
  return exports.changeCase(input, str => str.toLocaleUpperCase(), str => {
    return exports.toWords(str).map(m => exports.titlecase(m)).join('');
  });
};

/**
 * Convert the given string to camelcase
 * @param {String} input
 */

exports.camelcase = input => {
  return exports.changeCase(input, str => str.toLocaleLowerCase(), str => {
    const output = exports.pascalcase(str);
    return output[0].toLocaleLowerCase() + (output.slice(1) || '');
  });
};

/**
 * Snake-case the given string.
 * @param {String} input
 */

exports.snakecase = input => {
  return exports.changeCase(input, str => str.toLocaleLowerCase(), str => {
    return exports.toWords(str).map(word => word.toLocaleLowerCase()).join('_');
  });
};

/**
 * Upper-snake-case the given string.
 * @param {String} string
 */

exports.uppersnake = input => exports.snakecase(input).toLocaleUpperCase();

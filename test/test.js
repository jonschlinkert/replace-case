'use strict';

require('mocha');
const assert = require('assert').strict;
const replace = require('..');

describe('replace-case', () => {
  describe('replace', () => {
    const patterns = [
      {
        message: 'should match lowercase and convert uppercase replacement',
        input: 'foo .alphaconfig.json bar',
        substr: 'alpha',
        replacement: 'BETA',
        expected: 'foo .betaconfig.json bar'
      },
      {
        message: 'should support regex source string as substr',
        input: 'foo AlphaWord bar',
        substr: '[aA]lpha',
        replacement: 'Beta',
        expected: 'foo BetaWord bar'
      },
      {
        message: 'should support regex "g" flag',
        input: 'foo AlphaWord bar ALPHA_OMEGA',
        substr: '[aA]lpha',
        replacement: 'Beta',
        flags: 'g',
        expected: 'foo BetaWord bar ALPHA_OMEGA'
      },
      {
        message: 'should support regex "i" flag',
        input: 'foo AlphaWord bar ALPHA_OMEGA',
        substr: '[aA]lpha',
        replacement: 'Beta',
        flags: 'gi',
        expected: 'foo BetaWord bar BETA_OMEGA'
      },
      {
        message: 'should replace titlecase',
        input: 'foo Alpha bar',
        substr: 'alpha',
        replacement: 'beta',
        expected: 'foo Beta bar'
      },
      {
        message: 'should replace uppersnake',
        tests: [
          {
            input: 'foo ALPHA_ bar',
            substr: 'Alpha',
            replacement: 'beta',
            expected: 'foo BETA_ bar'
          },
          {
            input: 'foo ALPHA_ bar',
            substr: 'aLpHa',
            replacement: 'beta',
            expected: 'foo BETA_ bar'
          },
          {
            input: 'foo ALPHA_ bar',
            substr: 'ALPHA',
            replacement: 'beta',
            expected: 'foo BETA_ bar'
          },
          {
            input: 'foo ALPHA_ bar',
            substr: 'ALPHA',
            replacement: 'b10_c20',
            expected: 'foo B10_C20_ bar'
          },
          {
            input: 'foo ALPHA_FOO_BAR bar',
            substr: 'alpha',
            replacement: 'beta',
            expected: 'foo BETA_FOO_BAR bar'
          }
        ]
      },
      {
        message: 'should replace uppersnake with numbers',
        tests: [
          {
            input: 'foo ALPHA_FOO_BAR words ALPHA_1F2_BAR bar',
            substr: 'alpha',
            replacement: 'beta',
            expected: 'foo BETA_FOO_BAR words BETA_1F2_BAR bar'
          }
        ]
      },
      {
        input: 'foo ALPHA_FOO_BAR words ALPHA_1F2_BAR bar',
        substr: 'alpha_foo_bar',
        replacement: 'betaFooBar',
        expected: 'foo BETA_FOO_BAR words ALPHA_1F2_BAR bar'
      }
    ];

    it('should replace all occurrences of a word', () => {
      const output = replace('foo bar foo qux foo', 'foo', 'bar');
      assert.equal(output, 'bar bar bar qux bar');
    });

    const run = (units = []) => {
      for (const unit of units) {
        const { input, substr, replacement, message = input, flags, expected, tests } = unit;

        if (tests) {
          describe(message, () => run(tests));
          continue;
        }

        it(message, () => {
          assert.equal(replace(input, substr, replacement, flags), expected);
        });
      }
    };

    run(patterns);
  });
});

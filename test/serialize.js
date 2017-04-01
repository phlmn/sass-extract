const { expect } = require('chai');
const path = require('path');
const { render, renderSync } = require('../lib');
const { normalizePath } = require('../lib/extract');
const { EOL } = require('os');

const serializeFile = path.join(__dirname, 'sass', 'serialize.scss');

function verifySerialized(rendered, sourceFile) {
  console.log(rendered.vars);
  expect(rendered.vars).to.exist;
  expect(rendered.vars).to.have.property('global');
  expect(rendered.vars.global).to.have.property('$strings');
}

describe('serialize', () => {
  describe('sync', () => {
    it('should extract all variables', () => {
      const rendered = renderSync({ file: serializeFile })
      verifySerialized(rendered, serializeFile);
    });
  });

  describe('async', () => {
    it('should extract all variables', () => {
      return render({ file: serializeFile })
      .then(rendered => {
        verifySerialized(rendered, serializeFile);
      });
    });
  });
});

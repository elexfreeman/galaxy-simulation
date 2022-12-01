const path = require('path');
const { transformSync } = require('esbuild');
const loaders = ['js', 'jsx', 'ts', 'tsx'];
const target = `node${process.versions.node}`;

exports.process = function (code, sourcefile) {
  const extname = path.extname(sourcefile);
  const loader = loaders.find((x) => `.${x}` === extname) || 'js';
  const options = {
    target,
    loader,
    sourcefile,
    format: 'cjs',
    sourcemap: 'external',
  };
  return transformSync(code, options);
};

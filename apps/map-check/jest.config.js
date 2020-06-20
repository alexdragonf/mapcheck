module.exports = {
  name: 'map-check',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/map-check',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};

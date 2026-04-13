module.exports = {
  presets: ['module:@react-native/babel-preset','nativewind/babel'],
  plugins: [
    [
      'inline-import',
      {
        extensions: ['.sql'],
      },
    ],
  ],
};

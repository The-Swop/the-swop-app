
# React Native App with DFINITY Integration

This project demonstrates a React Native application integrated with DFINITY's Internet Computer, showcasing blockchain interaction in a mobile environment.

## Getting Started

### Start the packager

```bash
yarn start
```

### Run iOS app on Simulator

```bash
yarn ios
```

### Run Android app on Simulator / connected Android device

```bash
yarn android
```

### Running on iOS real device

Download the Expo Go app on your iPhone device. Once the Expo development tools appear in the browser, scan the QR code with the app on your device to test on the device.

## Known Issues

### Issue on Android

Due to BigInts not being supported on the Android JS Engine, a while loop inside `@dfinity/candid` runs infinitely, and thus `await actor.get()` in `HomeScreen.tsx` never returns/completes. When trying to tap 'Run Query' or navigate to the screen, the app becomes locked and unresponsive. Here's the problematic code snippet:

```javascript
// From node_modules/@dfinity/candid/lib/cjs/utils/leb128.js
// v0.9.2
while (true) {
    const i = Number(value & BigInt(0x7f));
    value /= BigInt(0x80);
    if (value === BigInt(0)) {
        pipe.write([i]);
        break;
    } else {
        pipe.write([i | 0x80]);
    }
}
```

Using a simple `bigint` polyfill does not resolve the issue.

#### Potential Solution

A potential solution is for @dfinity JS libraries to move to using [JSBI](https://github.com/GoogleChromeLabs/jsbi), allowing it to work in an environment that does not support BigInts natively.

### Expo (React Native) JS Engine when running in Debug

When the app is run in Debug mode on Android (by shaking the phone and tapping 'Debug Remote JS'), it works because the JS Engine supports BigInt. However, this is not the case in normal mode and native builds.

## Authors

[Your Name]
[Your Contact Information]

## License

This project is licensed under the [Your License] - see the LICENSE.md file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [DFINITY Internet Computer](https://dfinity.org/)

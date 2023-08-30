## The Swop Web Application
### Version 0.4

This is the overall web framework for The Swop's mobile application. The frontend is built using React-TS and the backend is built using Azle.

### Easy Setup:

This repo has a one step setup command that you can run as long as you have NodeJS, NPM, and DFX installed.

```
npm run setup
```

#### Setting Up The Backend:

If you have never used Azle before or have recently updated it, Azle will attempt to install and setup all of the necessary Rust and Wasm components that it needs to function before it builds your canister. This will happen automatically but may take between 5-15 minutes to complete. This will only happen once, after that the build process will proceed as it would normally. You can build your smart contract by running:

```
npm run build-backend
```

#### To Start Frontend Development Mode:
```
npm run dev
```

This application is currently in alpha stages. This means it is subject to errors, inconsistent operation, and crashes. Please report all bugs to the development team.
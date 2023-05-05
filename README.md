# Module_fedration

# React Module Federation Example

This is an example project demonstrating the use of [Webpack 5 Module Federation](https://webpack.js.org/concepts/module-federation/) with React.

## Getting Started

### Installation

To install the project, first clone the repository:

```bash
git clone https://github.com/your-username/react-module-federation-example.git
```

Then, navigate into the project directory and install the dependencies:

```bash
cd react-module-federation-example
npm install
```

### Running the App

To start the app, run:

```bash
npm start
```

This will start the development server and open the app in your browser at `http://localhost:3000`.

### Building the App

To build the app for production, run:

```bash
npm run build
```

This will create a `build` folder with the production-ready files.

## How It Works

This example consists of two separate projects: `app-shell` and `app-remote`.

`app-shell` is the "host" project, and `app-remote` is the "remote" project. The remote project exposes a React component that the shell project can use.

When the shell project is built, it includes the remote component as a dependency using Webpack 5's Module Federation feature.

### App Shell

The `app-shell` project is a basic React app that imports the `RemoteButton` component from the `app-remote` project.

```jsx
import { lazy, Suspense } from "react";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const RemoteButton = lazy(() => import("app_remote/Button"));

function App() {
  return (
    <Router>
      <div style={{ padding: 16 }}>
        <h1>App Shell</h1>
        <Suspense fallback={<div>Loading Button...</div>}>
          <RemoteButton />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
```

### App Remote

The `app-remote` project is a simple React component that exports a `Button` component.

```jsx
import { Button } from "antd";

function RemoteButton() {
  return <Button type="primary">Remote Button</Button>;
}

export default RemoteButton;
```

### Webpack Configuration

Both projects use a custom Webpack configuration that enables the use of Module Federation.

#### App Shell Webpack Configuration

```javascript
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: "app_shell",
      remotes: {
        app_remote: "app_remote@http://localhost:3001/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
```

#### App Remote Webpack Configuration

```javascript
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: "app_remote",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: ["react", "react-dom", "antd"],
    }),
  ],
};
```

The `name` property specifies the unique name of the project. The `remotes` property specifies the remote project(s) that this project depends on. The `exposes` property specifies which components or modules this project makes available for other projects to use. The `shared` property specifies which modules should be shared between projects to prevent duplication and reduce bundle size.

## Conclusion

Webpack 5 Module Federation is a powerful feature that enables developers

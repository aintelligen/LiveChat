This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

##Eslint 

[Airbnb Javascript](https://github.com/airbnb/javascript)

##Antd motion

[Motion Design](https://motion.ant.design/)

##项目打包上线

npm run build  生成 build 目录  
express 中间件，拦截路由，手动渲染index.html  
bulid 设置为静态资源地址  

```js
// server.js
// 中间件
app.use(function (req, res, next) {
  if (req.url.startsWith('/chat/') || req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})

// 设置静态资源路径
app.use('/', express.static(path.resolve('build')))
```

##SSR  
@babel/node @babel/cli corss-env  支持jsx  
新建 server下  .babelrc
```json
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
```


```jsx
// server.js
import { renderToString } from 'react-dom/server'
function App() {
  return (
    <h2>
      <p>server render</p>
      <p>imooc server</p>
    </h2>
  )
}
const htmlRes = renderToString(App());
return res.send(htmlRes)
```

package.json
```json
"server": "cross-env NODE_ENV=test nodemon --exec babel-node server/server.js",
```

# SSR hook
png
asset-require-hook
css
css-modules-require-hook






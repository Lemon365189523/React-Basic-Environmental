# React-Basic-Environmental
### react项目的脚手架
### 已经搭建好webpack等环境，拿来就能用！

配置.babelrc

```
{
  "presets": ["es2015","stage-0", "react"],
  "plugins": ["transform-runtime","react-hot-loader/babel"],
  "env": {
    "production": {
      "presets": ["react-optimize"]
    }
  }
}

```


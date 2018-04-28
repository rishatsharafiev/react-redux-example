# React Redux Example

### Версии софти и библиотек
- nvm: 0.33.6
- node: v8.9.4
- yarn: v1.6.0
- npm: 5.6.0
- dependencies: ./package.json
- devDependencies: ./webpack/package.json

### Как запускать
development
```
yarn start
yarn start:only
```

production
```
yarn run build
yarn run build:only
```

В production режиме используется следующий конфиг nginx, см. devops/nginx/frontend.conf

# RiegoReact
Sistema de riego Inteligente basado en internet de las cosas


## librerias

charjs
```bash
npm install react-charjs-2
```

bootstrap
```bash
npm install bootstrap
```

calendar
```bash
npm i react-calendar
```
react-icons
```bash
npm i react-icons
```
react-routes
```bash
npm i react-router-dom
```
## heroku 

```bash
git push heroku master
```

```bash
heroku config:set NODE_OPTIONS="--max_old_space_size=2560" -a riego-react
```

"start": "node --max_old_space_size=2560 node_modules/.bin/react-scripts start",
"build": "node --max_old_space_size=2560 node_modules/.bin/react-scripts build",


## heroku link 
https://riego-react.herokuapp.com/
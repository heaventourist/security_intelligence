# security_intelligence

This webpage is built to help visualize a security intelligence data feed from [National Vulnerability Database](https://nvd.nist.gov/vuln/data-feeds). The front-end is written in [Vue.js](https://vuejs.org/v2/guide/index.html), a very good single page application (SPA) framework. During front-end development, I use WebPack with a lot of cool features provided. The UI components are taken from [iView](https://www.iviewui.com/). The backend is written in Python, using [Flask](http://flask.pocoo.org/) as framework to serve index.html which contains my Vue.js app. Flask has API endpoints to help access from SPA. The back-end data is stored in [sqlite3](https://docs.python.org/2/library/sqlite3.html), a built-in module available in Python.

------------------------------------------------------------------------------------------------------------------------

Steps I took to set up the environment: ([reference](https://codeburst.io/full-stack-single-page-application-with-vue-js-and-flask-b1e036315532))

### Front-end:
1. I use vue-cli to help generate a basic Vue.js app. 
```
$ npm install -g vue-cli
```
2. Front-end and back-end code are split to different folders with corresponding names. To initialize front-end part, Here is what I did:
```
$ mkdir flaskvue
$ cd flaskvue
$ vue init webpack frontend
```
3. Go through installation wizard. My setup is:
* Vue build — Runtime only
* Install vue-router? — Yes
* Pick an ESLint preset — Standard
* Setup unit tests with Karma + Mocha? — No
* Setup e2e tests with Nightwatch? — No

To run the app in development mode:
```
$ cd frontend
$ npm install
# after installation
$ npm run dev
```
4. iView is the UI toolkit I use.
```
$ npm install iview --save
```
You can refer to the concrete configurations [here](https://www.iviewui.com/docs/guide/start-en).

4. Run `$ npm run build` to create a bundle. The output is directed to template folder the same level as `/frontend`.


### Back-end:
1. Inside root `/flaskvue` folder I creat a new sub-folder for back-end code and initialize virtual environment in the same level:
```
$ virtualenv -p python3 venv
$ mkdir backend
```
To enable virtual environment run (on macOS):
```
$ source venv/bin/activate
```

2. Under virtual environment install Flask:
```
(venv) pip install Flask
```

### DataBase:

I use sqlite3 as a convenient disk database with API built in Python. The query to create the 'nvd' table is written in schema.sql. The application will automatically build a new table if the table is not created. I use import_data.py to help put all the data in json file into database. The json file is acquired from [National Vulnerability Database](https://nvd.nist.gov/vuln/data-feeds) and is named nvdcve-1.0-modified.json. You can definitely download other json files from the same origin. The fields I chose are vuln_id, summary, cvss_severity, product_name, vendor_name and extra. I use 'extra' to keep all the other infomation that cannot be represented by these chosen fields.

------------------------------------------------------------------------------------------------------------------------

Steps to start the application:

1. You don't need to do anything to start the front-end because the compiled bundle has already been generated. But you can still try the development mode by running `$ npm run dev` in `/frontend` folder. I wrote two components to fulfill all features: Home.vue and About.vue. Home.vue is responsible for managing the data visualization in a table. About.vue is a simple explaination for features and motivation I had for this webpage. App.vue is the rendezvous where Home.vue and About.vue meets to form the overall display. 

2. Because we are running in virtual environment, you don't have to configure the environment like I did. A script is provided to help start the backend easily:
```
$ source venv/bin/activate
(venv) bash run_server
```
If you want to exit virtual environment
```
(venv) deactivate
```


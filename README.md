## RUN IN POSTMAN LINK

https://app.getpostman.com/run-collection/da1de12b7a16cfbdbf35?action=collection%2Fimport

# Main service
SETTING UP GCP ON YOUR SYSTERM
1. Download and Install python
2. Install gcloud e.g brew install --cask google-cloud-SDK
3. Then initiate gcloud gcloud init
4. Login 
5. Choose project or enter project id or create a new project
6. Run: gcloud compute --zone and --region flag to set your zone and region
* For help run : gcloud help config
* Run `gcloud --help` to see the Cloud Platform services you can interact with. 
* And run `gcloud help COMMAND` to get help on any gcloud command.
* Run `gcloud topic --help` to learn about advanced features of the SDK like arg files and output formatting
* Run `gcloud cheat-sheet` to see a roster of go-to `gcloud` commands.
After setting up your project

7. Run: `gcloud app deploys` to deploy your application. 
Note: make sure you have your app.yaml in your base directory. 

# Adding new service
We’ll create a new service called "service-name" and we’ll route all traffic from /service-name to this service. Each microservice is a separate application with its own dependencies and an app.yaml file. Routing requests to this microservice is done by configuring dispatch.yaml in our main application(ie default service).
1. Let’s begin by creating a directory for our service-name. This directory can be anywhere but we’ll put it inside of our node-microservices-example directory for convenience. mkdir ~/main-service/service-name
2. Your service-name application has to be complete on its own. It must have a package.json file with its start script, engine property, and its own dependencies. 
3. Initialize a Node.js project with npm init
So far, you’ll have a directory with only package.json in it. The next step is to modify your package.json to have all of the configurations that GAE needs to properly configure the app when it’s deployed.
4. Create a server.js file. It’ll contain the code for the Node.js server that that’ll respond to all requests for this application.
5. Edit your package.json file to tell GAE how to start your server when it’s deployed. To do this, add the start property to the hash of the script.
```bash
{
  ...
  "scripts": {
    "start": "node server.js"
  },
  ...
}
```
GAE uses the node start command to start the server. This command looks for the start script. node server.js will execute server.js with node executable.
6. Let’s tell GAE to use Node.js 6 to run our server by specifying engine property in package.json.
```bash
{
  ...
  "engines": { 
    "node" : ">=6.0.0" 
  },
  ...
}
```
GAE uses app.yaml file as a default entry point into your application. This file tells GAE the runtime to use for the project and the environment configuration.
7. To tell GAE that you’re creating another service, you must provide a service name in the app.yaml file of your microservice.

```bash
      env: flex
      runtime: nodejs
     service: service-name
```
app.yaml does not need to be called app.yaml. You could call it admin.yaml as long as service: service-name property is set, GAE will know that you’re deploying a microservice and not the default service. Using app.yaml makes it possible to run gcloud app deploy inside of service-name directory and gcloud command will look for app.yaml automatically.
8. Create a server.js for the service-name section.
```bash
"use strict"; const express = require('express'); 
const app = express(); app.get('/', (req, res) => {    
   res.status(200).send('service-name Section');
});app.listen(process.env.PORT);
```
9. We’re not done yet, but let’s deploy this service to see what happens. To deploy a microservice, you can run gcloud app deploy inside of the microservice’s directory or gcloud app deploy service-name/app.yaml from the main app’s directory.
10. If you run gcloud app browse -s service-name, a browser window will open on a subdomain of your default service’s URL. Every service automatically gets a subdomain that can be accessed by going to the URL.
11. We want our service-name service to be accessible from /service-name url instead of the subdomain. We can configure routing for our default app by adding this dispatch.yaml file on main service.
add to dispatch file:
```bash
  - url: '*/service-name'
    module: service-name
```
12. The dispatch configuration tells GAE how to route requests inside of your application. It doesn’t do any rewriting of URLs. So our server must explicitly listen to requests on /service-name. Let’s modify service-name/server.js to handle /service-name url.
```bash
"use strict";const express = require('express');
const app = express();app.get('/service-name', (req, res) => {    
   res.status(200).send('service-name Section');
});app.listen(process.env.PORT);
```
13. Let’s deploy our updated service-name service and routing configuration by running gcloud app deploy service-name/app.yaml dispatch.yaml

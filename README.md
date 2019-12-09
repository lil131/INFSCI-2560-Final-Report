# INFSCI 2560 Final Report
###### tags: `Web`
# Note
- Nov.22
  - changed page routes, created user model and api

| Route | Note |
| -------- | -------- |
| /     | |
| /login | |
| /chapters| |
| /chapter | |
| /questions | |
| /manager#create| Connected to DB |
| /manager#search|  |


## Project Name - Staff Training System
- Team Members  
    - Chia-Hsuan Hsieh(4301472, chh171@pitt.edu)
    - Linlu Liu (4302031, lil131@pitt.edu)
    - Shengxuan Qiu(4321458, shq14@pitt.edu)
    - Cai-Cian Song(4301228, cas386@pitt.edu)
- Project Description:
    - Framework/library: React JS, Express JS, Node JS
    - Database: MongoDB
    - CSS: Ant Design

## Introduction
We are going to adopt MERN stack in this project and the web tools are listed above. In this web application, we provide the staff training system that users can access articles or any kind of training material online, and take tests online. Also, by providing Access control lists(ACL), the system allows administrators to create/delete user accounts, monitor/manage user data and add/modify teaching materials.
Linlu Liu and Shengxuan Qiu are mainly responsible for front-end, Cai-Cian Song and Chia-Hsuan Hsieh are mainly responsible for back-end.

## Objective
`Describe with more specific details what your objectives and goals are for the project. What problems did you want to solve or what did you want to learn in developing this application? What features, beyond the ones listed in the assignment requirements, did you implement?`

##  Technical Architecture
`What are the libraries, frameworks, and other technologies you used and how did you put them together. Use the MVC conceptual model to provide a guide (i.e. what are the models/views/controllers and what do they do).`
##  Challenges
`Discuss any challenges you faced in trying to develop this app. Were there libraries or technologies you wanted to use but we’re frustrating? Where there features you couldn’t get working?`
## Future Work
`What features would you like to add to your application? If you had more time what technologies would you like to learn?`
## Conclusion
`Reflect upon the web technologies and standards you learned in this course, did you learn what you wanted? What technologies or standards do you think would be useful in future iterations of this course?
Documentation List any resources that you used in creating this project.`

## Environment Setup
### Package installation
```
npm run install-dev
```
If there is a problem to install node_modules, try to delete package-lock.json, client/package-lock.json, node_modules, client/node_modules folders. Then, execute the command above again.

### Start the local environment
Do not use `npm start` for this project, please use the command below to start your local server.
```
npm run start-dev
```

### Environment configuration
```
MONGODB_URI=***
NODE_ENV=***
PORT=***
```

## References
- An Easy Way to Get Started with the MERN Stack: https://alligator.io/react/mern-stack-intro/
- React-route-dom: https://reacttraining.com/react-router/web/guides/quick-start
- Axios: https://github.com/axios/axios
- PrivateRoute: https://github.com/ReactTraining/react-router/issues/4105#issuecomment-287262726
- mern: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
- Redux tutorial: http://chentsulin.github.io/redux/index.html
- Awesome redux: https://github.com/xgrommx/awesome-redux
- https://blog.csdn.net/qq_32193233/article/details/89218760

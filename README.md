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
When we tried to build the reset password API, we did face some challenges head-on. The first is less secure problem and the other one is about encrypting the password. Fortunately, we overcame two critical challenges and activated the functions. 
1. Less secure app
> In our structure, we expect that users enter their emails as the parameter of the API after they click the “forgot password” button in the frontend application,  and backend system will create a random token and send the authentic email to the user immediately. After the user confirms the email in an hour, it will redirect the user to the reset password page with unique token which allows our system to verify the reset request is from the user.  Therefore, we use “nodemailer” in node.js to achieve this function and it needs a transport service using which it can send emails.  (We used gmail as our transport service.) 
However,  Google account did not allow us to access since it determined that our app is non secure. We have tried to create and use app passwords from the google document. It did not work at first, but after we enabled the less secure apps option, it worked. Meaning, nodemailer can use our gmail for sending the emails now.
2. Password encryption
> Nevertheless, we faced another issue immediately while resetting the password. At first, we used a synchronous approach ` bcrypt.hashSync('myPassword', 10); ` to create one-way hashes. Yet, it did not consist with our structure as we worked with asynchronous JavaScript.  While the sync version is more convenient, it's best to stick with async since we are concerned about performance. The asynchronous approach is recommended because hashing is CPU intensive, and the synchronous version will block the event loop and prevent your app from handling other requests until it finishes. Thus, we changed to use asynchronous approach ` bcrypt.hash('myPassword', 10, function(err, hash){});` and properly hashed and verified the password using Node.js and Bcrypt.

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
MAILER_EMAIL_ID=***
MAILER_PASSWORD=***
LOCALHOST_URL=http://localhost:8080/api/users

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

# INFSCI 2560 Final Report

## Project Name - Staff Training System
![](https://i.imgur.com/ny3oslC.jpg)

- Team Members  
    - Chia-Hsuan Hsieh(4301472, chh171@pitt.edu)
    - Linlu Liu (4302031, lil131@pitt.edu)
    - Shengxuan Qiu(4321458, shq14@pitt.edu)
    - Cai-Cian Song(4301228, cas386@pitt.edu)
- Deploy URL: https://staff-training-system-deploy.herokuapp.com/
- Github repo: https://github.com/lil131/staff-training-system/tree/mern/eden

- Account for test
```
Admin
Account: tonya.edmonds@pitt.edu
Password: 1234

Employee
Account: test@pitt.edu
Password: 1234
```
## Introduction
We use MERN stack in this project and the web tools are listed in project description. In this web application, we provide the staff training system lettin users access articles or any kind of training material online, and take tests in our system. Also, by providing Access control lists(ACL), the system allows administrators to create/delete user accounts, monitor/manage user data and add/modify teaching materials.
Linlu Liu and Shengxuan Qiu are mainly responsible for front-end, Cai-Cian Song and Chia-Hsuan Hsieh are mainly responsible for back-end.

## Objective
Our main objective for this web application is making an online staff training system for both administrator and staff to realize the function of online studying and testing with regard to their routine work. By providing multiple chapters, the staff can access each of them and make the test after reading the correspond chapter. Each chapter contains multiple choice questions for the staff to complete. After completing the test, a test score will show up automatically. The best score status will show whether the staff pass the test. This application allows administrator to control the whole procedure of online training and testing. It’s a convenient way for both administrator and staff to learn and train.

##  Technical Architecture
Here is the main library we use, and our project structure. In order to run front-end and back-end at the same time, we figure out that we can use `concurrently` to host both applications in different ports.
- Framework/library: React JS, Express JS, Node JS
- Database: MongoDB
- CSS: Ant Design
```
├── Procfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
├── models
│   ├── chapter.js
│   ├── comment.js
│   ├── counter.js
│   ├── progress.js
│   ├── reset.js
│   └── user.js
├── package.json
├── public
│   └── images
├── routes
│   ├── chapters.js
│   ├── comments.js
│   ├── index.js
│   ├── progresses.js
│   └── users.js
└── server.js
```
## Screenshot
### Chapter list(Main page)
![](https://i.imgur.com/SXOyDVq.png)

### Chpater Content
![](https://i.imgur.com/j3U1Fnc.png)

### Management page
![](https://i.imgur.com/bOvZUbq.png)

### User profile
![](https://i.imgur.com/wmF1Dex.png)

### Password reset email
![](https://i.imgur.com/vRdsKo6.png)

### Password updated
![](https://i.imgur.com/wsKwf38.png)


##  Challenges
When we tried to build the reset password API, we did face some challenges head-on. The first is less secure problem and the other one is about encrypting the password. Fortunately, we overcame two critical challenges and activated the functions.

### **1. Less secure app**
In our structure, we expect that users enter their emails as the parameter of the API after they click the “forgot password” button in the frontend application,  and backend system will create a random token and send the authentic email to the user immediately. After the user confirms the email in an hour, it will redirect the user to the reset password page with unique token which allows our system to verify the reset request is from the user.  Therefore, we use “nodemailer” in node.js to achieve this function and it needs a transport service using which it can send emails.  (We used gmail as our transport service.)
However,  Google account did not allow us to access since it determined that our app is non secure. We have tried to create and use app passwords from the google document. It did not work at first, but after we enabled the less secure apps option, it worked. Meaning, nodemailer can use our gmail for sending the emails now.
### **2. Password encryption**
 Nevertheless, we faced another issue immediately while resetting the password. At first, we used a synchronous approach ` bcrypt.hashSync('myPassword', 10); ` to create one-way hashes. Yet, it did not consist with our structure as we worked with asynchronous JavaScript.  While the sync version is more convenient, it's best to stick with async since we are concerned about performance. The asynchronous approach is recommended because hashing is CPU intensive, and the synchronous version will block the event loop and prevent your app from handling other requests until it finishes. Thus, we changed to use asynchronous approach ` bcrypt.hash('myPassword', 10, function(err, hash){});` and properly hashed and verified the password using Node.js and Bcrypt.

## API list

| Route | Method | Description |
| -------- | -------- | -------- |
| /users     | GET | |
| /users/:user_id | GET | |
| /users| POST | |
| /users/:user_id | PUT | |
| /users/login | POST | |
| /users/manager/search| POST | For searching users by conditions|
| /users/forgot | GET | |
| /users/reset/:token | POST | Reset password with temoprary token |
| /chapters/users/:user_id | GET | Query all chapters for a user |
| /chapters/chapter_id/users/:user_id | GET | Query one chapter content and user progress |
| /chapters | POST | |
| /progresses | GET | |
| /progresses | POST | |
| /progresses/:chapter_id/users/:user_id | PUT | |
| /progresses/users/:user_id/reset | POST | |

## Future Work
In our application, we only provide the basic functions for users and administrators. We may add the competition system for the staffs. We will record the time they finish the test,  rank the best score from all employees, and provide award system. On the other hand, we may support multimedia for staff to learn. If we dig into this field, we will offer the interactive teaching concept to support our staff training system. Furthermore, since React makes it painless to create interactive UIs and there are plenty of documents which we can search online, we will explore its library to improve our application as much as we can.
## Conclusion
Reflect upon the web technologies and standards we learned in this course, we do learn the concepts and frameworks we want. Although we did not really concentrate on the particular lecture, this course is still useful as an introduction for web-developers. The frameworks and libraries used in the reality are also well introduced in this class. The next step that we should do is not only learning some other concepts like DevTools, data formats, APIs and authentication, but also testing. For the small application, we can ignore writing tests but if we are building a large application, writing tests like unit tests and other types of the test will help in making the whole process robust and debugging become easier. Last but not the least, as a web developer we should spend time on learning platforms like cloud, AWS, Heroku, Netlify etc. Having the knowledge of maintenance, scaling, migrating and deploying our code on different platforms is important as well.
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
secretOrkey=***
MAILER_EMAIL_ID=***
MAILER_PASSWORD=***
LOCALHOST_URL=https://staff-training-system-deploy.herokuapp.com

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

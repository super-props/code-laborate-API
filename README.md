# Project 3: Code-laborate (API)

This Repository is for the API end of the Code-Laborate application! Code-Laborate is a message board for software engineers to collaborate and post questions about difficult programming issues that are encountered. Other users are then able to leave comments on posts with helpful solutions.

### Authentication:
| Action | Method | Path |
| ----------- | ----------- | ----------- |
| Sign-Up | POST | /sign-up
| Sign-In | POST  | /sign-in
| Change-Password |  PATCH | /change-password
| Sign-Out | DELETE | /delete


### Posts: (Token Required)
| Routes | Method | Path |
| ----------- | ----------- | ----------- |
| Create | POST | /posts
| Index All | GET | /posts
| Index User | GET | /posts/user
| Show | GET | /posts/:id
| Update | PATCH | /posts/:id
| Delete | DELETE | /posts/:id



### Comments: (Token Required)
| Routes | Method | Path |
| ----------- | ----------- | ----------- |
| Create | POST | /comments
| Update | PATCH | /comments/:commentId
| Delete | DELETE | /comments/:commentId

## Other Important Links & Resources Used:


- [Front End Repo](https://github.com/super-props/code-laborate-front-end)
- [Deployed API](https://murmuring-shelf-77263.herokuapp.com/)
- [Deployed App](https://super-props.github.io/code-laborate-front-end/#/)

**Website Resources**
- [w3schools](w3schools.com)
- [developer.mozilla](developer.mozilla.org)
- [stackOverflow](stackOverflow.com)
- [React Docs](reactjs.org)

## Planning and Story: Development Process and Problem-Solving Strategy:

### Planning:
- We started by choosing a prompt and decided to go with a message board. Next, we mapped out our process by drawing an ERD to show the relationship between our resources (the user, the posts, and the comments). Afterwards, we drew up a wireframe to plan out how we wanted the UI to appear to the user. We wrote user stories to layout the functionality we wanted to create for the user experience.

### CRUD Posts & Comments:
- We began by building the models for post and comments. Next we decided the relationship between the user and the resources. We did the same process for the relationship between posts and comments. Afterwards, we planned out the routes we need based on the user stories and created the routes. Then we tested all of the routes using Postman.

### Problem-Solving:
- Any problems we ran into we collaborated as a team to troubleshoot and resolve.

## Technologies Used:
- JavaScript
- Express
- MongoDB
- Mongoose
- Passport
- bcrypt
- crypto

## Unsolved Problems:
- Checkbox for rather or not the issue has been resolved
- Like Button to show which answer is most supported

## ERD:
![ERD](https://i.imgur.com/qHC0b3f.png "ERD")

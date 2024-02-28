# Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
  - [Problem Statement](#problem-statement)
    - [REST APIs](#rest-apis)
    - [Frontend](#frontend)
      - [Users List View (Default View, route = `/`)](#users-list-view-default-view-route--)
      - [New User (route = `/new`)](#new-user-route--new)
      - [View User (route = `/:id`)](#view-user-route--id)
      - [P5 History (route = `/:id/p5`)](#p5-history-route--idp5)
      - [Reward History (route = `/:id/rewards`)](#reward-history-route--idrewards)
      - [New Reward (route = `/:id/rewards/new`)](#new-reward-route--idrewardsnew)
  - [Completed](#completed)

## Getting Started

### Backend code setup :

**1. After cloning the backend code**

- cd solvative-backend
- npm i
- npm start
- You can check the response using postman at [localhost](http://localhost:5000)

## Problem Statement

### REST APIs

- User - Create, edit
- P5 (Points given) - Create, read, delete
- Reward (Points received) - Read

### Frontend

- We are only looking for decent UI, which can just work.
- Please do not use any css framework like bootstrap, tailwind, etc.
- You can use either Ruby on Rails, React, Vue, Angular or vanilla HTML/CSS/JavaScript.
- Inline styles not allowed
- `:id` in all routes below is `id` of user

#### Users List View (Default View, route = `/`)

- A button to create new user - clicking on which user will be redirected to `/new/` route
- Basic Table layout with all users
  - Table should have 6 columns: #, Name, P5 balance, Reward balance, Login
    - `#` - Static count number starting with 1
    - Name - User's name
    - P5 balance - self explanatory
    - Reward balance - self explanatory
    - Login - a edit button, clicking on which user will be redirected to `/:id` route
- Show each user in separate row

#### New User (route = `/new`)

- 1 input for name
- Save button - saves the user, and redirects user back to list view, i.e. route `/`
- Cancel button - redirects user back to list view, i.e. route `/`

#### View User (route = `/:id`)

- Show a form with user details
  - Re-use the same component from New User
  - Pre-fill the name from the existing user
  - Save button - saves the user
- a button with text which shows logged in user's P5 balance, click on which user will be redirected to `/:id/p5` route
- a button with text which shows logged in user's Reward balance, click on which user will be redirected to `/:id/rewards` route

#### P5 History (route = `/:id/p5`)

- A button to create new reward - clicking on which user will be redirected to `/:id/rewards/new` route
- Show P5 balance
- Basic Table layout with all P5 history
  - Table should have 6 columns: #, Date-Time, P5 given, User Name, Delete
    - `#` - Static count number starting with 1
    - Date-Time - self explanatory
    - P5 given - self explanatory
    - User Name - name of user to whom P5 were given
    - Delete - a delete button which will reverse the P5 given
- Show each P5 in separate row

#### Reward History (route = `/:id/rewards`)

- Show Rewards balance
- Basic Table layout with all Rewards history
  - Table should have 6 columns: #, Date-Time, Rewards received, User Name
    - `#` - Static count number starting with 1
    - Date-Time - self explanatory
    - Rewards received - self explanatory
    - User Name - name of user who gave rewards
- Show each Reward in separate row

#### New Reward (route = `/:id/rewards/new`)

- Basic Form layout to create a new reward
  - A dropdown with list of all users, except self
  - An numeric input with validation of max limit set to 100
    - Below input, show how much P5 balance user have
  - A submit button
    - Clicking on which will create a new reward (deduct P5 from current user and transfer to awardee)
    - Button should be disabled if user enters more than 100 in numeric input or if not sufficient balance
    - After successful submission, user will be redirected back back
  - A cancel button, click on which user will be redirected back

### Completed

- Backend

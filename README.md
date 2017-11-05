# nodepop

## Instructions to run the web application

1. Clone the repo.
2. cd to the repo.
3. Edit connectMongoose to meet your mongodb port.
4. Start your mongodb server. In my case, in home folder **mongod --dbpath data/db --directoryperdb**.
5. Do **npm install**.
6. In another terminal do **npm run start-all** to install some advertisements objects in your db and run de server and gulp.
7. To run e2e tests do **npm run e2e**.

## How to use the app.
1. Wait until gulp finish loading the files.
2. Go to localhost:3001.
3. You will not see advertisements because you need to login.
4. On the menu, go to Log In.
5. The password is **1234**.
6. Now you can see some advertisements.
7. To create one go to create using the navigation menu.
8. Fill all the fields and upload a file.
9. Click on create.
10. you should see the new advertisement.

## Instructions to use the API

1. To list all the tags do a **http GET request** to *http://localhost:3000/apiv1/tags*
2. To list all the advertisement do a **http GET request** to *http://localhost:3000/apiv1/advertisements*
3. You can use these filters using the querystring:
    - name. his will fetch all the advertisements with **name** starting with **name**.
    - minPrice. This will fetch all the advertisements with **price** higher to **minPrice**.
    - maxPrice. This will fetch all the advertisements with **price** lower to **maxPrice**.
    - tags. This will fetch all the advertisements with **tags** containing the words in **tags**.
    - isSale. This will fetch all the advertisements with **isSale** equals to **true**.
    - isWanted. This will fetch all the advertisements with **isSale** equals to **false**.
    - skip. This will fetch all the advertisements skipping the amount specified.
    - limit. This will fetch all the advertisements limiting the result with the amount specified.

### API Examples:
#### Advertisements
- **Get all** the advertisements.
    *http://localhost:3000/apiv1/advertisements/*
- Get advertisements with **price** between 300 and 800.
    *http://localhost:3000/apiv1/advertisements/?minPrice=300&maxPrice=800*
- Get advertisements with **price** higher than 300.
    *http://localhost:3000/apiv1/advertisements/?minPrice=300*
- Get advertisements with **price** lower than 300.
    *http://localhost:3000/apiv1/advertisements/?maxPrice=300*
- Get advertisements with the **name** starting with *"bici"*.
    *http://localhost:3000/apiv1/advertisements/?name=bici*
- Get advertisements with **tags** motor and work.
    *http://localhost:3000/apiv1/advertisements/?tags=motor&tags=work*
- Get advertisements with **tags** motor.
    *http://localhost:3000/apiv1/advertisements/?tags=motor*
- Get advertisements **for sale**.
    *http://localhost:3000/apiv1/advertisements/?isSale=on*
- Get the **looking for** advertisements.
    *http://localhost:3000/apiv1/advertisements/?isWanted=on*
- Skip first 2 results.
    *http://localhost:3000/apiv1/advertisements/?skip=2*
- Limit the results to 3 results.
    *http://localhost:3000/apiv1/advertisements/?limit=3*

#### Tags
- Get all the tags.
    *http://localhost:3000/apiv1/tags/*


# This is the project for the end of the IT camp

Project containes folders for API and CLIENT. You only need to modify the client side of the project.
Open VS Code of the client folder and create the app for the Test.pdf requirements.

# Run the API app

## Open an VS Code instance of the api folder

### Install packages:

    npm i

### Run the project:

    node index.js

## Open an VS Code instance of the client folder

### Install packages:

    npm i

### Run the project:

    npm start

# Additional tasks:

## 1. Create Login page

Login page in which you have two inputs (username, password) and a submit button.
Users you can login with:

    {
        username: "fazi",
        password: "1234",
    },
    {
        username: "pera",
        password: "1234",
    },
    {
        username: "mika",
        password: "1234",
    },
    {
        username: "zika",
        password: "1234",
    }

### Make Login request

    Post http://localhost:8000/sessions

### Request body:

    {
        "username":"zika",
        "password": "1234"
    }

### Request response:

    {
        "accessToken": "yuim98oq-e275-45a2-bc2e-b3098036d655"
    }

## 2. Add Logout button on the quotes page

## 3. Create logout logic on the logout button

# Requests that require access token in the header:

    GET http://localhost:8000/tags

    GET http://localhost:8000/quotes

    GET http://localhost:8000/quotes/:id

    POST http://localhost:8000/quotes

    POST http://localhost:8000/quotes/:id/upvote

    DELETE http://localhost:8000/quotes/:id/upvote

    POST http://localhost:8000/quotes/:id/downvote

    DELETE http://localhost:8000/quotes/:id/downvote

#Example of the request that uses an accessToken:

    const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";
    useEffect(() => {
    axios
      .get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log);
    }, []);

## Other instructions can be found in the Test.pdf file inside the Repository.

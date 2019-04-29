
# Dummy API
Developed with Typescript, Express & TypeORM.

## Setup:
- Clone the repo locally
- Run `npm i && npm run dev`

## Testing:
- Run `npm run dev`

> Note: Currently the project is setup with sqlite db, `database.sqlite` in the root folder of the project. If we reset the db then first we need to run `npm start` and then `npm run migration:run` in order to create the first admin user.

## Existing endpoints

### Login to get token
- Endpoint: POST `http://localhost:3000/auth/login`
- Body:
  ```
  {
    "username": "admin",
    "password": "admin"
  }
  ```
- Response:
  ```
  {
    "token": <token>
  }
  ```

### Get all users
- Endpoint: GET `http://localhost:3000/users`
- Headers:
  - `Authorization` => Bearer xxxx.
- Response:
  ```
  [
    {
      "id": 1,
      "username": "admin",
      "role": "ADMIN"
    },
    {
      "id": 2,
      "username": "test.account",
      "role": "USER"
    }
  ]
  ```

### Get one user by id
- Endpoint: `http://localhost:3000/users/1`
- Headers:
  - `Authorization` => Bearer xxxx.
- Response:
  ```
  {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
  ```

### Create new user
- Endpoint: GET `http://localhost:3000/users`
- Headers:
  - `Authorization` => Bearer xxxx.
- Body:
  ```
  {
    "username": "new_test.account",
    "password": "secret",
    "role": "USER"
  }
  ```
- Response:
  ```
  {
    "message": "User created",
    "user": {
      "id": 2,
      "username": "new_test.account",
      "role": "USER",
      "createdAt": "2019-04-25T19:52:33.000Z",
      "updatedAt": "2019-04-25T19:52:33.000Z"
    }
  }
  ```

### Update existing user
- Endpoint: GET `http://localhost:3000/users/2`
- Headers:
  - `Authorization` => Bearer xxxx.
- Body:
  ```
  {
    "username": "test6.account",
    "role": "USER"
  }
  ```
- Response:
  ```
  {
    "message": "User updated!",
    "user": {
      "id": 2,
      "username": "test6.account",
      "role": "USER",
      "createdAt": "2019-04-25T19:25:38.000Z",
      "updatedAt": "2019-04-25T20:18:21.000Z"
    }
  }
  ```

### Delete user
- Endpoint: GET `http://localhost:3000/users/2`
- Headers:
  - `Authorization` => Bearer xxxx.
- Response:
  ```
  {
    "message": "User deleted!"
  }
  ```

---

### Get all projects
- Endpoint: GET `http://localhost:3000/projects`
- Headers:
  - `Authorization` => Bearer xxxx.
- Response:
  ```
  [
    {
      "id": 1,
      "name": "Second project",
      "createdAt": "2019-04-25T20:53:31.000Z",
      "updatedAt": "2019-04-25T20:59:09.000Z"
    },
    {
      "id": 2,
      "name": "Best project",
      "createdAt": "2019-04-25T20:58:05.000Z",
      "updatedAt": "2019-04-25T20:58:05.000Z"
    }
  ]
  ```

### Get one project by id
- Endpoint: `http://localhost:3000/projects/1`
- Headers:
  - `Authorization` => Bearer xxxx.
- Response:
  ```
  {
    "id": 1,
    "name": "Second project"
  }
  ```

### Create new project
- Endpoint: GET `http://localhost:3000/projects`
- Headers:
  - `Authorization` => Bearer xxxx.
- Body:
  ```
  {
	  "name": "Best project"
  }
  ```
- Response:
  ```
  {
    "message": "Project created",
    "project": {
      "id": 2,
      "name": "Best project",
      "user": 1,
      "createdAt": "2019-04-25T20:58:05.000Z",
      "updatedAt": "2019-04-25T20:58:05.000Z"
    }
  }
  ```

### Update existing project
- Endpoint: GET `http://localhost:3000/projects/2`
- Headers:
  - `Authorization` => Bearer xxxx.
- Body:
  ```
  {
    "name": "Second project"
  }
  ```
- Response:
  ```
  {
    "message": "Project updated!",
    "project": {
      "id": 1,
      "name": "Second project",
      "createdAt": "2019-04-25T20:53:31.000Z",
      "updatedAt": "2019-04-25T20:59:09.000Z"
    }
  }
  ```

### Delete project
- Endpoint: GET `http://localhost:3000/project/2`
- Headers:
  - `Authorization` => Bearer xxxx.
- Response: <NoContent>
  ```
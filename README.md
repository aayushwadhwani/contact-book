# Contact Book

Contact Book is a REST API, where a user can login and CREATE, UPDATE, DELETE, VIEW their contacts.

## Run Locally

Clone the project

```bash
  git clone https://github.com/aayushwadhwani99/contact-book.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run devStart
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`

`JWT_LIFETIME`




## Link of Hosted Version

 - [Click Here](https://contact-book-nodejs.herokuapp.com/)
## Register A User

A User can Register in the system by providing Name, email, password.

```http
 POST /api/v1/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your Name |
| `email` | `string` | **Required** and **Unique** |
| `password` | `string` | **Not Null**|


## Login user

A user can Login by providing email, password which they provided while registering

```http
 POST /api/v1/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` |**Required** Your Email |
| `password` | `string` | **Not Null**|


## Add A Contact

Once Logged in, user can add a contact which can have name, Phone Number and Email.

```http
 POST /api/v1/contact
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |**Required** contact's name|
| `Phone Number` | `string` |10 digit **Unique** Number|
| `email` | `string` ||


## Get All Contact

Once Logged in, user can view all contact which are stored by them.

```http
 GET /api/v1/contact
```

| Query String Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pageNumber` | `Integer` |Default set to 1|
| `Limit` | `Integer` |Default set to 10|
| `seemsLike` | `Integer` |Search according to the number given |

## Get Contact

Once Logged in, user can view single contact.

```http
 GET /api/v1/contact/${id}
```

| Param | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `Integer` | Contact's Phone Number|

## Update Contact

Once Logged in, user can update an existing contact.

```http
 PATCH /api/v1/contact/${id}
```

| Param | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` |ObjectID of the contact|

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |contact's name|
| `Phone Number` | `string` |10 digit Number|
| `email` | `string` ||

## Delete Contact

Once Logged in, user can Delete an existing contact.

```http
 DELETE /api/v1/contact/${id}
```

| Param | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` |ObjectID of the contact|

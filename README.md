# Book Nexus

## Description
Many of us on the development team are avid readers that are open to book recommendations. Therefore we thought creating a tool to help people like us find books to read would make for a good project.

Firstly, we wanted to make a way to search through a large catalog of books for specific criteria. Users are able to either search using keywords for a natural language search, or browse books by using a set of filters on authors, genres, years, and ratings.

From there they can select a book page to view information about the book, reviews for it, and other similar books.

Secondly, we wanted to make recommendations based on our preferences. Our application allows one to flag books and authors as favorites. We then use those preferences to guess what other authors and books the user may like, via aggregating genre preferences and checking for similarities in reviews.

## Guide to repo:

- **book-nexus-project**: front-end of the application
  - **public**: static files for application
  - **src**: source folder with React components and Javascript files, and CSS files
    - **Components**: React components
- **server**: back-end of the application
  - **routes**: routes for SQL and MongoDB queries
  - **userDB**: connection and schemas for MongoDB 

## Running app locally:

If a `.env` file doesn't exist, please email one of us to get the file.

Run `npm install` in the root directory, and then `npm start` to start the backend. Then enter the `book-nexus-project` directory and, similarly, run `npm install` followed by `npm start` to start the frontend. The application will be running in `localhost:3000`. 

Note that login via Facebook and Google are not possible locally and can only be done on the deployed site. This is because they need to redirect to a URL that is not localhost.
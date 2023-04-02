
## README for Front Gestion des Séances App

### Description

"Gestion des sessions" is a web app that allows cinema owners to manage the sessions they offer. Cinema owners can add, edit, and delete sessions, and view their session history.

The app was built with Vue.js and uses Axios to communicate with a RESTful API that stores session data.

### Methods

#### `getSessions()`

This method retrieves sessions from the server based on the current page and the number of sessions per page. The default value for sessions per page is 10. The method calculates the number of sessions to skip based on the current page and retrieves the sessions from the server using an HTTP GET request. The retrieved sessions are then assigned to the `sessions` data property of the Vue instance.

#### `prevPage()`

This method decrements the current page number and retrieves the sessions for the new page number using the `getSessions()` method.

#### `nextPage()`

This method increments the current page number and retrieves the sessions for the new page number using the `getSessions()` method.

#### `addSession()`

This method adds a new session to the server using an HTTP POST request. The new session data is stored in the `newSession` data property of the Vue instance. After the session is successfully added to the server, it is added to the beginning of the `sessions` array.

#### `deleteSession(sessionId)`

This method deletes a session from the server using an HTTP DELETE request. The `sessionId` parameter specifies the ID of the session to delete. After the session is successfully deleted from the server, it is removed from the `sessions` array.

#### `editSession(session)`

This method sets the `editing` flag of a session to `true`, allowing the session to be edited. The `session` parameter specifies the session to edit. When the `editing` flag is set to `true`, the session is displayed in an editable form.

#### `saveSession(session)`

This method saves the changes made to a session using an HTTP PUT request. The `session` parameter specifies the session to save. After the changes are successfully saved to the server, the `editing` flag of the session is set to `false`, and the session is displayed in its original form.

#### `cancelEdit(session)`

This method cancels the editing of a session. The `session` parameter specifies the session to cancel editing. The `editing` flag of the session is set to `false`, and the session is displayed in its original form.

### How to use

To use the "Gestion des sessions" app, follow these steps:

1.  Clone the project repository to your local machine.
2.  Install the required dependencies by running `npm install`.
3.  Start the app by running `npm run serve`.
4.  Open your browser and navigate to `http://localhost:8080` to view the app.

### Requirements

To run the "Gestion des sessions" app, you need the following:

-   Node.js version 12 or higher
-   NPM version 6 or higher
-   A web browser that supports ECMAScript 6

### Possible Improvements

Here are some possible improvements that could be made to the app:

-   Add validation to the input fields to prevent invalid data from being submitted to the server.
-   Improve the UI design to make it more user-friendly.
-   Add search functionality to allow cinema owners to search for sessions by movie title or cinema location.
-   Add sorting functionality to allow cinema owners to sort sessions by date or cinema location.
-   Add the ability to generate reports on session attendance and revenue.

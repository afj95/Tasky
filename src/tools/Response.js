/**
 * message: 'Error while searching the user',
    status: 'Error',
    error: err
*/

const statuses = {
    500: 'Error',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    400: 'Bad Request',
    200: 'Success',
    201: 'Created',
}

const Response = (message, status, data) => {
    return {
        message: message,
        status: statuses[status],
        data: data
    }
}

module.exports = {
    Response
}
const HTTP_CODES = require('./http_codes.enum');

exports.sendForbiddenResponse = res => {
  res.status(HTTP_CODES.FORBIDDEN).json();
};

exports.sendUnauthorizedResponse = res => {
  res.status(HTTP_CODES.UNAUTHORIZED).json();
};

exports.sendServerError = (res, error = null) => {
  res.status(HTTP_CODES.SERVER_ERROR).json({
    message: 'Something happened',
    error
  });
};

exports.sendConflictResponse = (res, message) => {
  res.status(HTTP_CODES.CONFLICT).json({
    message
  });
};

exports.sendCreatedResponse = (res, payload) => {
  res.status(HTTP_CODES.CREATED).json({
    payload
  });
};

exports.sendOkResponse = (res, payload) => {
  res.status(HTTP_CODES.OK).json({
    payload
  });
};

exports.sendNotFoundResponse = (res, message) => {
  res.status(HTTP_CODES.NOT_FOUND).json({
    message
  });
};

exports.sendNoContentResponse = (res, payload) => {
  res.status(HTTP_CODES.NO_CONTENT).json({
    payload
  });
};

exports.sendUnauthorizedResponse = res => {
  res.status(HTTP_CODES.UNAUTHORIZED).json();
};

exports.sendOkWithErrorsResponse = (res, payload) => {
  res.status(HTTP_CODES.OK_WITH_ERRORS).json({payload})
}

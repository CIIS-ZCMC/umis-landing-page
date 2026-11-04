/**
 * Validate Status OK
 *
 * verify if the response status is success (between 200 and 300)
 * status that is greater or below the condition will throw
 * an exception.
 *
 * @param {object} res
 * @return {Exception}
 */
export function validateStatusOk(res) {
  const status = res.status;

  if (!(status >= 200 && status < 300)) {
    throw new Error("Bad response", { cause: res });
  }

  return res.data;
}

/**
 * Handle Failed Status
 *
 * handle different type of status and none status error
 * to ensure that the proper callBack back will be return to
 * the requester functional component.
 * ex. Login Component Page, Sign up Component Page
 *
 * @param {Exception} err
 * @returns {object}
 */
export function handleFailedStatus(err, parametersCount = 2) {
  if (!err) {
    const fallback = "An unexpected error occurred.";
    return parametersCount === 3 ? [500, fallback, null] : [500, fallback];
  }

  if (err.response) {
    const status = err.response.status || 500;
    const data = err.response.data;
    let message = "An unexpected error occurred.";

    if (typeof data === "string") {
      message = data;
    } else if (data && typeof data === "object") {
      if (typeof data.message === "string") {
        message = data.message;
      } else if (typeof data.error === "string") {
        message = data.error;
      } else if (data.errors && typeof data.errors === "object") {
        const firstKey = Object.keys(data.errors)[0];
        const firstVal = data.errors[firstKey];
        message = Array.isArray(firstVal) ? firstVal[0] : String(firstVal);
      } else if (err.message && typeof err.message === "string") {
        message = err.message;
      }
    } else if (err.message && typeof err.message === "string") {
      message = err.message;
    }

    if (parametersCount === 3) return [status, message, null];
    return [status, message];
  }

  const errorMessage =
    err.message && typeof err.message === "string"
      ? err.message
      : "Failed to connect to the server. Please check your connection.";

  if (parametersCount === 3) return [500, errorMessage, null];
  return [500, errorMessage];
}


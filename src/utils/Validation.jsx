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
  const status = err?.response?.status || 500;
  let message = "An unexpected error occurred.";

  if (err?.response?.data) {
    const data = err.response.data;
    if (typeof data === "string") {
      message = data;
    } else if (typeof data === "object" && data !== null) {
      message =
        data.message ||
        data.error ||
        (data.errors ? Object.values(data.errors).flat().join(", ") : null) ||
        JSON.stringify(data);
    }
  } else if (err?.message && typeof err.message === "string") {
    message = err.message;
  }

  if (typeof message !== "string") {
    message = String(message || "An unexpected error occurred.");
  }

  if (parametersCount === 3) return [status, message, null];

  return [status, message];
}

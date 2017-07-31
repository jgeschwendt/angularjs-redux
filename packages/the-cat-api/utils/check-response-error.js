export default function checkResponseError(response) {
  if (response && response.apierror && response.apierror.length > 0) {
    throw new Error(response.apierror[0].message[0]);
  }
  return true;
}

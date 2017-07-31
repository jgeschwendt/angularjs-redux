export default function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  throw Object.assign(new Error('Unknown Server Error'), {
    error: response,
  });
}

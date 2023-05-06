
export function request<TResponse>(
  url: string,
  // eslint-disable-next-line no-undef
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    // When got a response call a `json` method on it
    .then((response) => response.json())
    // and return the result data.
    .then((data) => data as TResponse)
    .catch(error => error)
  
}
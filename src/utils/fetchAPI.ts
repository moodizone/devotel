const BASE_URL = 'https://assignment.devotel.io';

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { body, ...customOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...customOptions.headers,
  };

  const config: RequestInit = {
    ...customOptions,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

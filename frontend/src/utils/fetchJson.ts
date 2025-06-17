export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request to ${url} failed`);
  }
  return res.json();
}

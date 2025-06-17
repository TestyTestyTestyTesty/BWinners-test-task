import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchJson } from '@utils/fetchJson'; // adjust path as needed

describe('fetchJson', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns parsed JSON when response is OK', async () => {
    const mockData = { success: true };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchJson<typeof mockData>('https://example.com');
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith('https://example.com', undefined);
  });

  it('throws error with response text when not ok', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      text: async () => 'Bad request',
    });

    await expect(fetchJson('https://example.com')).rejects.toThrow('Bad request');
  });

  it('throws generic error when no text response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      text: async () => '',
    });

    await expect(fetchJson('https://api.example.com/data')).rejects.toThrow(
      'Request to https://api.example.com/data failed'
    );
  });
});

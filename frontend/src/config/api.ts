import { messages } from '@messages/messages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(messages.errors.api_url_not_set);
}

export const config = {
  API_BASE_URL,
};

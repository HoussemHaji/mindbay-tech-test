import axios from 'axios';
import { APIResponse } from '@/types/books';

const API_KEY = process.env.NEXT_PUBLIC_NYT_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/books/v3';

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    'api-key': API_KEY,
  },
});

export const getBooksOverview = async (publishedDate?: string): Promise<APIResponse> => {
  const params = publishedDate ? { published_date: publishedDate } : {};
  const response = await client.get('/lists/overview.json', { params });
  return response.data;
};

export interface Book {
  age_group: string;
  author: string;
  contributor: string;
  description: string;
  price: number;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  title: string;
}

export interface BookList {
  list_id: number;
  display_name: string;
  updated: string;
  list_image?: string;
  books: Book[];
}

export interface APIResponse {
  status: string;
  num_results: number;
  results: {
    bestsellers_date: string;
    published_date: string;
    lists: BookList[];
  };
}

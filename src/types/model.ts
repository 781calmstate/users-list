export interface User {
  id: string;
  name: string;
  username: string;
}

export interface Option {
  value: string;
  name: string;
}

export interface Filter {
  query: string;
  sort: string;
}

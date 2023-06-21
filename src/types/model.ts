export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
}

export interface Option {
  value: string;
  name: string;
}

export interface Filter {
  query: string;
  sort: string;
}

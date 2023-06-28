export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
}

export interface IOption {
  value: string;
  name: string;
}

export interface IFilter {
  query: string;
  sort: string;
}

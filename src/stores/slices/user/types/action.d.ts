export interface UserAction {
  login: (name: string) => void;
  logout: () => void;
}

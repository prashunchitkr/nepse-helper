interface IStore<T> {
  get<K extends keyof T>(key: K): T[K];
  set(newValues: Partial<T>): void;
}

export class Store<T> implements IStore<T> {
  private _state: Readonly<T>;

  constructor(initialValue: T) {
    this._state = initialValue;
  }

  get<K extends keyof T>(key: K): T[K] {
    return this._state[key];
  }

  set(newValues: Partial<T>): void {
    this._state = { ...this._state, ...newValues };
  }
}

interface TokenStore {
  accessToken: string;
  refreshToken: string;
  magicNumbers: number[];
  magicNumber: number;
  serverDay: number;
}

export const tokenStore = new Store<TokenStore>({
  accessToken: "",
  refreshToken: "",
  magicNumbers: [],
  magicNumber: 0,
  serverDay: 0,
});

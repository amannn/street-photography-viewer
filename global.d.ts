type Messages = typeof import('./messages/en.json');
declare interface IntlMessages extends Messages {}

declare namespace NodeJS {
  interface ProcessEnv {
    UNSPLASH_ACCESS_KEY: string;
  }
}

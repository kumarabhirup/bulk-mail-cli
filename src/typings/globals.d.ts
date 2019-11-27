/* eslint-disable prettier/prettier */

export {}

declare global {
  namespace NodeJS {
    interface Global {
      appRoot: string;
    }
  }
}
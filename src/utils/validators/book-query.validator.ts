import { Schema } from 'express-validator';

export const bookQueryValidator: Schema = {
  searchKey: {
    in: ['query'],
    isString: true,
    optional: true,
  },
  category: {
    in: ['query'],
    isArray: true,
    optional: true,
  },
  limit: {
    in: ['query'],
    isInt: true,
    optional: true,
  },
  page: {
    in: ['query'],
    isInt: true,
    optional: true,
  },
};
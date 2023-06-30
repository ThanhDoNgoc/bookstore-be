import { Schema } from 'express-validator';

export const bookQueryValidator: Schema = {
  search: {
    in: ['query'],
    isString: true,
    optional: true,
  },
  category: {
    in: ['query'],
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
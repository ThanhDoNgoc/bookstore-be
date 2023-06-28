import { Schema } from 'express-validator';

export const getBookDetailValidation: Schema = {
  id: {
    notEmpty: true,
    in: ['params'],
    isMongoId: {
      errorMessage: 'Invalid bookId',
      bail: true,
    },
  },
};
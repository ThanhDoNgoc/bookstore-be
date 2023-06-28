import { Schema } from "express-validator";

import { Category } from "../../components/book/utils/category.enum";

export const createBookValidation: Schema = {
  title: {
    notEmpty: true,
    in: ["body"],
  },
  description: {
    notEmpty: true,
    in: ["body"],
  },
  image: {
    notEmpty: true,
    in: ["body"],
  },
  price: {
    notEmpty: true,
    isNumeric: true,
    in: ["body"],
  },
  quantity: {
    notEmpty: true,
    isNumeric: true,
    in: ["body"],
  },
  category: {
    notEmpty: true,
    in: ["body"],
    isIn: {
      options: [Object.values(Category)],
      errorMessage: "Invalid category",
    },
  },
};

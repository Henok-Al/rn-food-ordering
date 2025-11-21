import Joi from 'joi';

export const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      menuItem: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    }),
  ),
});

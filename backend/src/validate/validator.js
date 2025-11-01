import Joi from "joi";

export const validatorCreate = (data) => {
  const schema = Joi.object({
    type: Joi.string().valid("income", "expense").required(),
    amount: Joi.number().min(0).required(),
    description: Joi.string().allow("").optional(),
    category: Joi.string().required(),
    date: Joi.date().required(),
  });

  return schema.validate(data);
};

export const validatorUpdate = (data) => {
  const schema = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().valid("income", "expense").required(),
    description: Joi.string().allow("").optional(),
    date: Joi.date().required(),
  }).unknown(true);

  return schema.validate(data);
};

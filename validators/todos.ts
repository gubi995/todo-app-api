import Joi from '@hapi/joi';

const todoSchema = Joi.object({
  body: {
    title: Joi.string()
      .required()
      .min(5),
    priority: Joi.string().required(),
    deadline: Joi.string().required(),
    assignee: Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
    }).required(),
    subTasks: Joi.array().items(
      Joi.object({
        title: Joi.string()
          .required()
          .min(5),
        completed: Joi.boolean().required(),
      })
    ),
  },
});

export { todoSchema };

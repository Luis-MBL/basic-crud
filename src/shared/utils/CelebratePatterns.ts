import { Joi } from 'celebrate';

const JoiCP = {
  uuid: Joi.string().uuid({ version: 'uuidv4' }),
  limit: Joi.number().integer().positive(),
  offset: Joi.number().integer().positive(),
};

export default JoiCP;

const router = require('express').Router();
const UsersService = require('../services/users');
const service = new UsersService;
const { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');

router.get('/',
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const order = await service.create(req.body);
      res.status(201).json({
        message: 'The order was created succesfully',
        order: order,
      });
    } catch (error) {
      next(error);
    };
  });

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const order = await service.findOne(req.params.id);
      res.status(302).json(order);
    } catch (error) {
      next(error);
    };
  });


router.patch('/:id',
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const order = await service.update(req.params.id, req.body);
      res.status(202).json(order);
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(202).json('The order was deleted');
    } catch (error) {
      next(error);
    };
  });


module.exports = router;

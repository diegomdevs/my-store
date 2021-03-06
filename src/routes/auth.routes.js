const router = require('express').Router();
const passport = require('passport');
const AuthService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');
const changePasswordSquema = require('../schemas/change_password');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.signToken(req.user));
    } catch (error) {
      next(error);
    };
  }
);
router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      res.status(200).json(await service.sendRecovery(email));
    } catch (error) {
      next(error);
    };
  }
);
router.post('/change-password',
  validatorHandler(changePasswordSquema, 'req'),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.changePassword(req.body.token, req.body.newPassword));
    } catch (error) {
      next(error);
    };
  }
);


module.exports = router;

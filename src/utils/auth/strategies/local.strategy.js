const { Strategy } = require('passport-local');
const boom = require('@hapi/boom')
const UserService = require('../../../services/users');
const service = new UserService;
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
},
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) done(boom.unauthorized(), false);
      const isMatch = await bcrypt.compare(password, user._previousDataValues.password);
      if (!isMatch) done(boom.unauthorized(), false);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });

module.exports = LocalStrategy;

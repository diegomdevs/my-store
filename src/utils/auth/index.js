const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const jwtStategy = require('./strategies/jwt.strategy')

passport.use(LocalStrategy);
passport.use(jwtStategy);
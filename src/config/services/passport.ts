import passport from 'passport';
import { Strategy as StrategyJwt, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import * as passportLocal from 'passport-local';
import _ from 'lodash';
import Logger from './logger';
import config from '../env';

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  //done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  /* User.findById(id, function(err, user) {
    done(err, user);
  }); */
});

// JWT

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: ''
};

jwtOpts.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderWithScheme('Bearer'), 
  ExtractJwt.fromUrlQueryParameter("token")
]);
jwtOpts.secretOrKey = config.auth.jwt.secret;
passport.use(
  new StrategyJwt(jwtOpts, function(payload, done) {
    /* User.findOne({ _id: payload.uid })
      .select('-services -token')
      .exec(function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }); */
  })
);

// local
const localOpts = {
  usernameField: 'email'
};
const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy(localOpts, (email, password, done) => {
  Logger.info('========localStrategy========');
  /* User.findOne({
    email
  })
    .then(user => {
      if (!user) {
        return done(null, false);
      } else if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    }); */
});

passport.use(localStrategy);

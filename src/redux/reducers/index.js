import auth from './auth'
import App from './app'
import { requests, toast, modal } from './common';
import { combineReducers } from 'redux'
import Projects from './project'
import {Investor} from './investor'
import {User} from './user'
import {
  Building,
} from './building'

export default {
  auth,
  requests,
  App,
  Projects,
  Building,
  User,
  Investor,
  ui: combineReducers({
    toast,
    modal
  })
};

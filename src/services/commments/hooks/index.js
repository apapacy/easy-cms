import errors from 'feathers-errors';
import areCommentsPermitted from './are-comments-permitted';
import prependSlash from './prepend-slash';
import isApproved from './is-approved';
import recaptcha from './google-recaptcha';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'moderateComments';
const restriction = {approved: true};

exports.before = {
  all: [
    prependSlash()
  ],
  find: [
    globalHooks.verifyOrRestrict
auth.verifyOrRestrict(restriction),
    globalHooks.populateOrRestrict(restriction),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrict(permissionName, restriction)
  ],
  get: [
    globalHooks.verifyOrRestrict
auth.verifyOrRestrict(restriction),
    globalHooks.populateOrRestrict(restriction),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrict(permissionName, restriction)
  ],
  create: [
    isApproved(),
    areCommentsPermitted(),
    recaptcha()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ],
  patch: [
    globalHooks.allowUpsert(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

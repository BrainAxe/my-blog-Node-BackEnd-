const { createUserHandler } = require('./controller/user.controller');
const {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler
} = require('./controller/session.controller');
const validateRequest = require('./middleware/validateRequest');
const requiresUser = require('./middleware/requiresUser');
const {
  createUserSchema,
  createUserSessionSchema
} = require('./schema/user.schema');

module.exports = function (app) {
  app.get('/healthcheck', (req, res) => res.sendStatus(200));

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get('/api/sessions', requiresUser, getUserSessionsHandler);

  // Logout
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);
};

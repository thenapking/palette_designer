// passport@0.7.0 downloaded from https://ga.jspm.io/npm:passport@0.7.0/lib/index.js

import*as e from"pause";import*as t from"util";import*as s from"passport-strategy";import*as r from"utils-merge";import i from"./framework/connect.js";import"./middleware/initialize.js";import"./http/request.js";import"./middleware/authenticate.js";import"http";import"./errors/authenticationerror.js";var n=e;try{"default"in e&&(n=e.default)}catch(e){}var o=t;try{"default"in t&&(o=t.default)}catch(e){}var a=s;try{"default"in s&&(a=s.default)}catch(e){}var u=typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:global;var f={};var h=n,p=o,l=a;
/**
 *  Create a new `SessionStrategy` object.
 *
 * An instance of this strategy is automatically used when creating an
 * `{@link Authenticator}`.  As such, it is typically unnecessary to create an
 * instance using this constructor.
 *
 * @classdesc This `Strategy` authenticates HTTP requests based on the contents
 * of session data.
 *
 * The login session must have been previously initiated, typically upon the
 * user interactively logging in using a HTML form.  During session initiation,
 * the logged-in user's information is persisted to the session so that it can
 * be restored on subsequent requests.
 *
 * Note that this strategy merely restores the authentication state from the
 * session, it does not authenticate the session itself.  Authenticating the
 * underlying session is assumed to have been done by the middleware
 * implementing session support.  This is typically accomplished by setting a
 * signed cookie, and verifying the signature of that cookie on incoming
 * requests.
 *
 * In {@link https://expressjs.com/ Express}-based apps, session support is
 * commonly provided by {@link https://github.com/expressjs/session `express-session`}
 * or {@link https://github.com/expressjs/cookie-session `cookie-session`}.
 *
 * @public
 * @class
 * @augments base.Strategy
 * @param {Object} [options]
 * @param {string} [options.key='passport'] - Determines what property ("key") on
 *          the session data where login session data is located.  The login
 *          session is stored and read from `req.session[key]`.
 * @param {function} deserializeUser - Function which deserializes user.
 */function SessionStrategy$2(e,t){if(typeof e=="function"){t=e;e=void 0}e=e||{};l.call(this||u);
/** The name of the strategy, set to `'session'`.
   *
   * @type {string}
   * @readonly
   */(this||u).name="session";(this||u)._key=e.key||"passport";(this||u)._deserializeUser=t}p.inherits(SessionStrategy$2,l);
/**
 * Authenticate request based on current session data.
 *
 * When login session data is present in the session, that data will be used to
 * restore login state across across requests by calling the deserialize user
 * function.
 *
 * If login session data is not present, the request will be passed to the next
 * middleware, rather than failing authentication - which is the behavior of
 * most other strategies.  This deviation allows session authentication to be
 * performed at the application-level, rather than the individual route level,
 * while allowing both authenticated and unauthenticated requests and rendering
 * responses accordingly.  Routes that require authentication will need to guard
 * that condition.
 *
 * This function is protected, and should not be called directly.  Instead,
 * use `passport.authenticate()` middleware and specify the {@link SessionStrategy#name `name`}
 * of this strategy and any options.
 *
 * @protected
 * @param {http.IncomingMessage} req - The Node.js {@link https://nodejs.org/api/http.html#class-httpincomingmessage `IncomingMessage`}
 *          object.
 * @param {Object} [options]
 * @param {boolean} [options.pauseStream=false] - When `true`, data events on
 *          the request will be paused, and then resumed after the asynchronous
 *          `deserializeUser` function has completed.  This is only necessary in
 *          cases where later middleware in the stack are listening for events,
 *          and ensures that those events are not missed.
 *
 * @example
 * passport.authenticate('session');
 */SessionStrategy$2.prototype.authenticate=function(e,t){if(!e.session)return this.error(new Error("Login sessions require session support. Did you forget to use `express-session` middleware?"));t=t||{};var s,r=this||u;e.session[(this||u)._key]&&(s=e.session[(this||u)._key].user);if(s||s===0){var i=t.pauseStream?h(e):null;this._deserializeUser(s,e,(function(t,s){if(t)return r.error(t);if(s){var n=e._userProperty||"user";e[n]=s}else delete e.session[r._key].user;r.pass();i&&i.resume()}))}else r.pass()};f=SessionStrategy$2;var c=f;var d=r;try{"default"in r&&(d=r.default)}catch(e){}var y=typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:global;var v={};var g=d;function SessionManager$1(e,t){if(typeof e=="function"){t=e;e=void 0}e=e||{};(this||y)._key=e.key||"passport";(this||y)._serializeUser=t}SessionManager$1.prototype.logIn=function(e,t,s,r){if(typeof s=="function"){r=s;s={}}s=s||{};if(!e.session)return r(new Error("Login sessions require session support. Did you forget to use `express-session` middleware?"));var i=this||y;var n=e.session;e.session.regenerate((function(o){if(o)return r(o);i._serializeUser(t,e,(function(t,o){if(t)return r(t);s.keepSessionInfo&&g(e.session,n);e.session[i._key]||(e.session[i._key]={});e.session[i._key].user=o;e.session.save((function(e){if(e)return r(e);r()}))}))}))};SessionManager$1.prototype.logOut=function(e,t,s){if(typeof t=="function"){s=t;t={}}t=t||{};if(!e.session)return s(new Error("Login sessions require session support. Did you forget to use `express-session` middleware?"));e.session[(this||y)._key]&&delete e.session[(this||y)._key].user;var r=e.session;e.session.save((function(i){if(i)return s(i);e.session.regenerate((function(i){if(i)return s(i);t.keepSessionInfo&&g(e.session,r);s()}))}))};v=SessionManager$1;var m=v;var _=typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:global;var k={};var z=c,w=m;function Authenticator$1(){(this||_)._key="passport";(this||_)._strategies={};(this||_)._serializers=[];(this||_)._deserializers=[];(this||_)._infoTransformers=[];(this||_)._framework=null;this.init()}Authenticator$1.prototype.init=function(){this.framework(i());this.use(new z({key:(this||_)._key},(this||_).deserializeUser.bind(this||_)));(this||_)._sm=new w({key:(this||_)._key},(this||_).serializeUser.bind(this||_))};
/**
 * Register a strategy for later use when authenticating requests.  The name
 * with which the strategy is registered is passed to {@link Authenticator#authenticate `authenticate()`}.
 *
 * @public
 * @param {string} [name=strategy.name] - Name of the strategy.  When specified,
 *          this value overrides the strategy's name.
 * @param {Strategy} strategy - Authentication strategy.
 * @returns {this}
 *
 * @example <caption>Register strategy.</caption>
 * passport.use(new GoogleStrategy(...));
 *
 * @example <caption>Register strategy and override name.</caption>
 * passport.use('password', new LocalStrategy(function(username, password, cb) {
 *   // ...
 * }));
 */Authenticator$1.prototype.use=function(e,t){if(!t){t=e;e=t.name}if(!e)throw new Error("Authentication strategies must have a name");(this||_)._strategies[e]=t;return this||_};
/**
 * Deregister a strategy that was previously registered with the given name.
 *
 * In a typical application, the necessary authentication strategies are
 * registered when initializing the app and, once registered, are always
 * available.  As such, it is typically not necessary to call this function.
 *
 * @public
 * @param {string} name - Name of the strategy.
 * @returns {this}
 *
 * @example
 * passport.unuse('acme');
 */Authenticator$1.prototype.unuse=function(e){delete(this||_)._strategies[e];return this||_};
/**
 * Adapt this `Authenticator` to work with a specific framework.
 *
 * By default, Passport works as {@link https://github.com/senchalabs/connect#readme Connect}-style
 * middleware, which makes it compatible with {@link https://expressjs.com/ Express}.
 * For any app built using Express, there is no need to call this function.
 *
 * @public
 * @param {Object} fw
 * @returns {this}
 */Authenticator$1.prototype.framework=function(e){(this||_)._framework=e;return this||_};
/**
 * Create initialization middleware.
 *
 * Returns middleware that initializes Passport to authenticate requests.
 *
 * As of v0.6.x, it is typically no longer necessary to use this middleware.  It
 * exists for compatiblity with apps built using previous versions of Passport,
 * in which this middleware was necessary.
 *
 * The primary exception to the above guidance is when using strategies that
 * depend directly on `passport@0.4.x` or earlier.  These earlier versions of
 * Passport monkeypatch Node.js `http.IncomingMessage` in a way that expects
 * certain Passport-specific properties to be available.  This middleware
 * provides a compatibility layer for this situation.
 *
 * @public
 * @param {Object} [options]
 * @param {string} [options.userProperty='user'] - Determines what property on
 *          `req` will be set to the authenticated user object.
 * @param {boolean} [options.compat=true] - When `true`, enables a compatibility
 *          layer for packages that depend on `passport@0.4.x` or earlier.
 * @returns {function}
 *
 * @example
 * app.use(passport.initialize());
 */Authenticator$1.prototype.initialize=function(e){e=e||{};return(this||_)._framework.initialize(this||_,e)};
/**
 * Create authentication middleware.
 *
 * Returns middleware that authenticates the request by applying the given
 * strategy (or strategies).
 *
 * Examples:
 *
 *     passport.authenticate('local', function(err, user) {
 *       if (!user) { return res.redirect('/login'); }
 *       res.end('Authenticated!');
 *     })(req, res);
 *
 * @public
 * @param {string|string[]|Strategy} strategy
 * @param {Object} [options]
 * @param {boolean} [options.session=true]
 * @param {boolean} [options.keepSessionInfo=false]
 * @param {string} [options.failureRedirect]
 * @param {boolean|string|Object} [options.failureFlash=false]
 * @param {boolean|string} [options.failureMessage=false]
 * @param {boolean|string|Object} [options.successFlash=false]
 * @param {string} [options.successReturnToOrRedirect]
 * @param {string} [options.successRedirect]
 * @param {boolean|string} [options.successMessage=false]
 * @param {boolean} [options.failWithError=false]
 * @param {string} [options.assignProperty]
 * @param {boolean} [options.authInfo=true]
 * @param {function} [callback]
 * @returns {function}
 *
 * @example <caption>Authenticate username and password submitted via HTML form.</caption>
 * app.get('/login/password', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
 *
 * @example <caption>Authenticate bearer token used to access an API resource.</caption>
 * app.get('/api/resource', passport.authenticate('bearer', { session: false }));
 */Authenticator$1.prototype.authenticate=function(e,t,s){return(this||_)._framework.authenticate(this||_,e,t,s)};
/**
 * Create third-party service authorization middleware.
 *
 * Returns middleware that will authorize a connection to a third-party service.
 *
 * This middleware is identical to using {@link Authenticator#authenticate `authenticate()`}
 * middleware with the `assignProperty` option set to `'account'`.  This is
 * useful when a user is already authenticated (for example, using a username
 * and password) and they want to connect their account with a third-party
 * service.
 *
 * In this scenario, the user's third-party account will be set at
 * `req.account`, and the existing `req.user` and login session data will be
 * be left unmodified.  A route handler can then link the third-party account to
 * the existing local account.
 *
 * All arguments to this function behave identically to those accepted by
 * `{@link Authenticator#authenticate}`.
 *
 * @public
 * @param {string|string[]|Strategy} strategy
 * @param {Object} [options]
 * @param {function} [callback]
 * @returns {function}
 *
 * @example
 * app.get('/oauth/callback/twitter', passport.authorize('twitter'));
 */Authenticator$1.prototype.authorize=function(e,t,s){t=t||{};t.assignProperty="account";var r=(this||_)._framework.authorize||(this||_)._framework.authenticate;return r(this||_,e,t,s)};
/**
 * Middleware that will restore login state from a session.
 *
 * Web applications typically use sessions to maintain login state between
 * requests.  For example, a user will authenticate by entering credentials into
 * a form which is submitted to the server.  If the credentials are valid, a
 * login session is established by setting a cookie containing a session
 * identifier in the user's web browser.  The web browser will send this cookie
 * in subsequent requests to the server, allowing a session to be maintained.
 *
 * If sessions are being utilized, and a login session has been established,
 * this middleware will populate `req.user` with the current user.
 *
 * Note that sessions are not strictly required for Passport to operate.
 * However, as a general rule, most web applications will make use of sessions.
 * An exception to this rule would be an API server, which expects each HTTP
 * request to provide credentials in an Authorization header.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 * Options:
 *   - `pauseStream`      Pause the request stream before deserializing the user
 *                        object from the session.  Defaults to _false_.  Should
 *                        be set to true in cases where middleware consuming the
 *                        request body is configured after passport and the
 *                        deserializeUser method is asynchronous.
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */Authenticator$1.prototype.session=function(e){return this.authenticate("session",e)};Authenticator$1.prototype.serializeUser=function(e,t,s){if(typeof e==="function")return(this||_)._serializers.push(e);var r=e;if(typeof t==="function"){s=t;t=void 0}var i=(this||_)._serializers;(function pass(e,n,o){"pass"===n&&(n=void 0);if(n||o||o===0)return s(n,o);var a=i[e];if(!a)return s(new Error("Failed to serialize user into session"));function serialized(t,s){pass(e+1,t,s)}try{var u=a.length;u==3?a(t,r,serialized):a(r,serialized)}catch(e){return s(e)}})(0)};Authenticator$1.prototype.deserializeUser=function(e,t,s){if(typeof e==="function")return(this||_)._deserializers.push(e);var r=e;if(typeof t==="function"){s=t;t=void 0}var i=(this||_)._deserializers;(function pass(e,n,o){"pass"===n&&(n=void 0);if(n||o)return s(n,o);if(o===null||o===false)return s(null,false);var a=i[e];if(!a)return s(new Error("Failed to deserialize user out of session"));function deserialized(t,s){pass(e+1,t,s)}try{var u=a.length;u==3?a(t,r,deserialized):a(r,deserialized)}catch(e){return s(e)}})(0)};Authenticator$1.prototype.transformAuthInfo=function(e,t,s){if(typeof e==="function")return(this||_)._infoTransformers.push(e);var r=e;if(typeof t==="function"){s=t;t=void 0}var i=(this||_)._infoTransformers;(function pass(e,n,o){"pass"===n&&(n=void 0);if(n||o)return s(n,o);var a=i[e];if(!a)return s(null,r);function transformed(t,s){pass(e+1,t,s)}try{var u=a.length;if(u==1){var f=a(r);transformed(null,f)}else u==3?a(t,r,transformed):a(r,transformed)}catch(e){return s(e)}})(0)};
/**
 * Return strategy with given `name`. 
 *
 * @param {String} name
 * @return {Strategy}
 * @api private
 */Authenticator$1.prototype._strategy=function(e){return(this||_)._strategies[e]};k=Authenticator$1;var $=k;var S=s;try{"default"in s&&(S=s.default)}catch(e){}var A={};var b=$,T=c;A=A=new b;A.Passport=A.Authenticator=b;A.Strategy=S;A.strategies={};A.strategies.SessionStrategy=T;var U=A;const E=A.Authenticator,j=A.Strategy,P=A.strategies;const q=A.Passport;export{E as Authenticator,q as Passport,j as Strategy,U as default,P as strategies};


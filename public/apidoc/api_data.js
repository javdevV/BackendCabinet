define({ "api": [
  {
    "type": "POST",
    "url": "/forgot",
    "title": "send email for forgotten password",
    "name": "Forgot",
    "group": "API",
    "version": "0.0.0",
    "filename": "./routes/forgot.route.js",
    "groupTitle": "API"
  },
  {
    "type": "POST",
    "url": "/",
    "title": "Sign in",
    "name": "Login",
    "group": "API",
    "version": "0.0.0",
    "filename": "./routes/auth.route.js",
    "groupTitle": "API"
  },
  {
    "type": "POST",
    "url": "/",
    "title": "Sign out",
    "name": "Logout",
    "group": "API",
    "version": "0.0.0",
    "filename": "./routes/auth.route.js",
    "groupTitle": "API"
  },
  {
    "type": "GET",
    "url": "/reset/",
    "title": "Generate reset password",
    "name": "RESET",
    "group": "API",
    "version": "0.0.0",
    "filename": "./routes/forgot.route.js",
    "groupTitle": "API"
  },
  {
    "type": "POST",
    "url": "/reset/",
    "title": "send email to user after changing password.",
    "name": "RESET",
    "group": "API",
    "version": "0.0.0",
    "filename": "./routes/forgot.route.js",
    "groupTitle": "API"
  },
  {
    "type": "POST",
    "url": "/",
    "title": "Creating New ACCOUNT",
    "name": "Register",
    "group": "API",
    "version": "0.0.0",
    "filename": "./routes/auth.route.js",
    "groupTitle": "API"
  }
] });

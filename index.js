require('dotenv').config()

// In production we run the compiled JS in dist/
if (process.env.NODE_ENV === 'production') {
  require('./dist/server.js')
} else {
  // In development use ts-node-dev (via npm script) to run TS directly.
  // This file exists for compatibility and to start the compiled server in prod.
  console.log('Run `npm run dev` for development (typescript)')
}

import { config } from '@keystone-6/core'
import { lists } from './schema'
require('dotenv').config({ path: 'variables.env' })
import { withAuth, session } from './auth'
require('dotenv').config({ path: 'variables.env' })

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },

      port: 3003,
    },
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
)

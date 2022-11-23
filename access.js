import { permissionsList } from './fields'

// At it's simplest, the access control returns a yes or no value depending on the users session

export function isSignedIn({ session }) {
  return !!session
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }) {
      return !!session?.data.role?.[permission]
    },
  ])
)

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
}

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageUsers({ session }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageUsers({ session })) {
      return true
    }
    // Otherwise they may only update themselves!
    return { id: session.itemId }
  },
  canManageRoles({ session }) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageUsers({ session })) {
      return true
    }
    // Otherwise they may only update themselves!

    return { id: session.itemId }
  },
}

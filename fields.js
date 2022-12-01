import { checkbox } from '@keystone-6/core/fields'

export const permissionFields = {
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  cantDoIt: checkbox({
    defaultValue: false,
    label: 'Nobody can do it',
  })
}

export const permissionsList = Object.keys(permissionFields)

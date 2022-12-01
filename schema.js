import { list } from '@keystone-6/core'
import { permissionFields } from './fields'
import { permissions, rules, isSignedIn } from './access'
import {
  text,
  relationship,
  password,
  integer,
  checkbox,
  virtual,
  timestamp,
  select,
} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { cloudinaryImage } from '@keystone-6/cloudinary'
require('dotenv').config({ path: 'variables.env' })
export const lists = {
  // Here we define the user list.
  User: list({
    access: {
      create: () => true,
      query: rules.canManageUsers,
      update: rules.canManageUsers,
      delete: permissions.canManageUsers,
    },
    ui: {
      hideCreate: (args) => !permissions.canManageUsers(args),
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      isAdmin: checkbox({
        defaultValue: false,
      }),
      password: password({ validation: { isRequired: true } }),

      role: relationship({
        ref: 'Role.assignedTo',
        access: {
          create: permissions.canManageUsers,
          update: permissions.canManageUsers,
        },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email'],
      },
    },
  }),
  Submission: list({
    fields: {
      firstName: text({ isRequired: true }),
      lastName: text({ isRequired: true }),
      fianceFirst: text({ isRequired: true }),

      status: select({
        options: [
          { label: 'NEW', value: 'unseen' },
          { label: 'seen', value: 'seen' },
          { label: 'replied', value: 'responded' },
        ],
        defaultValue: 'unseen',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: text({ isRequired: true }),
      eventDate: timestamp(),
      serviceRequested: select({
        options: [
          { label: 'Full Service', value: 'fullService' },
          { label: 'Coordination', value: 'coordination' },
          { label: 'Partial Planning', value: 'partial' },
          { label: 'Not Sure', value: 'tbd' },
        ],
      }),
      publishedAt: timestamp({
        defaultValue: { kind: 'now' },
        access: {
          update: permissions.cantDoIt,
        },
      }),
      email: text({isRequired: true}),
      mobilePhone: text({isRequired: true}),
      venue: text({isRequired: true}),
      additionalInfo: text(),
    },
    ui: {
      listView: {
        initialColumns: ['publishedAt', 'status','firstName', 'lastName', 'email'],
      },
    },
  }),

  Role: list({
    access: {
      create: permissions.canManageRoles,
      query: permissions.canManageRoles,
      update: permissions.canManageRoles,
      delete: permissions.canManageRoles,
    },
    ui: {
      hideCreate: (args) => !permissions.canManageRoles(args),
      hideDelete: (args) => !permissions.canManageRoles(args),
      isHidden: (args) => !permissions.canManageRoles(args),
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      ...permissionFields,
      assignedTo: relationship({
        ref: 'User.role',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),
}

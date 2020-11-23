/*
 * Main and demo navigation arrays
 */

export default {
  'main': [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'si si-speedometer'
    },
    {
      name: 'Impacts',
      to: '/impact',
      icon: 'si si-speedometer'
    },
    {
      name: 'Users',
      to: '/users',
      icon: 'si si-speedometer'
    },
    {
      name: 'Link User',
      to: '/link-user',
      icon: 'si si-speedometer'
    },
    {
      name: 'Company',
      to: '/company',
      icon: 'si si-speedometer'
    },
    {
      name: 'Global goals',
      to: '/global',
      icon: 'si si-speedometer'
    },
    {
      name: 'Categories',
      to: '/categories',
      icon: 'si si-speedometer'
    },
    {
      name: 'Tags',
      to: '/tags',
      icon: 'si si-speedometer'
    },
    {
      name: 'Types',
      icon: 'si si-layers',
      subActivePaths: '/types',
      sub: [
             {
              name: 'Recipients',
              to: '/recipient'
            },
            {
              name: 'Impact Type',
              to: '/impact-type'
            },
            {
              name: 'Action',
              to: '/action'
            },
            {
              name: 'Who Needs to Know',
              to: '/wntk'
            },
          ]
    }
  ]
}

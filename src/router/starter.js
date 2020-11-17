/*
 * Starter Router
 */

// Vue and Vue Router
import Vue from 'vue'
import Router from 'vue-router'

// Main layouts
import LayoutBackend from '@/layouts/variations/Backend.vue'
// import LayoutBackendBoxed from '@/layouts/variations/BackendBoxed.vue'
import LayoutSimple from '@/layouts/variations/Simple.vue'

import store from "../store"

// Frontend Page Example
// const Landing = () => import("@/views/starter/Landing.vue")

// Backend Page Example
const Dashboard = () => import("@/views/starter/Dashboard.vue")

// Toucan Pages
// Backend: General
const Impact = () => import("@/views/starter/impact/Impact.vue")
const ImpactCreate = () => import("@/views/starter/impact/ImpactCreate.vue")
const ImpactEdit = () => import("@/views/starter/impact/ImpactEdit.vue")
const Users = () => import("@/views/starter/Users.vue")
const UsersEdit = () => import("@/views/starter/UsersEdit.vue")
const Company = () => import("@/views/starter/Company.vue")
const CompanyEdit = () => import("@/views/starter/CompanyEdit.vue")
const Categories = () => import("@/views/starter/Categories.vue")
const CategoriesEdit = () => import("@/views/starter/CategoriesEdit.vue")
const LinkUser = () => import("@/views/starter/LinkUser.vue")
const GlobalGoals = () => import("@/views/starter/GlobalGoals.vue")
const GlobalGoalsEdit = () => import("@/views/starter/GlobalGoalsEdit.vue")

const ActionType = () => import("@/views/starter/types/ActionType.vue")
const ActionTypeEdit = () => import("@/views/starter/types/ActionTypeEdit.vue")
const ImpactType = () => import("@/views/starter/types/ImpactType.vue")
const ImpactTypeEdit = () => import("@/views/starter/types/ImpactTypeEdit.vue")
const Recipients = () => import("@/views/starter/types/Recipients.vue")
const RecipientsEdit = () => import("@/views/starter/types/RecipientsEdit.vue")
const WhoNeedsToKnow = () => import("@/views/starter/types/WhoNeedsToKnow.vue")
const WhoNeedsToKnowEdit = () => import("@/views/starter/types/WhoNeedsToKnowEdit.vue")
const Tags = () => import("@/views/starter/types/Tags.vue")
const TagsEdit = () => import("@/views/starter/types/TagsEdit.vue")

// AUTH Pages
const AuthSignIn = () => import(/* webpackChunkName: "auth-signin" */"@/views/starter/auth/SignIn.vue")
const AuthSignUp = () => import(/* webpackChunkName: "auth-signup" */"@/views/starter/auth/SignUp.vue")
const AuthReminder = () => import(/* webpackChunkName: "auth-reminder" */"@/views/starter/auth/Reminder.vue")
const Errors404 = () => import("@/views/starter/error/404.vue")
const Errors500 = () => import("@/views/starter/error/500.vue")

// role
const Role = {
  Admin: 'Admin',
  User: 'User'
}

// Register Vue Router
Vue.use(Router)

// initialize routes
const routes = [
  {
    path: '/auth',
    component: LayoutSimple,
    children: [
      {
        path: 'signin',
        name: 'Sign In',
        component: AuthSignIn
      },
      {
        path: 'signup',
        name: 'Sign Up',
        component: AuthSignUp
      },
      {
        path: 'reminder',
        name: 'Auth Reminder',
        component: AuthReminder
      },
    ]
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: LayoutBackend,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: 'impact',
        name: 'Impact',
        component: Impact,
        meta: { requiresAuth: true }
      },
      {
        path: 'impact-create',
        name: 'Impact-Create',
        component: ImpactCreate,
        meta: { requiresAuth: true }
      },
      {
        path: 'impact/:id',
        name: 'Impact Edit',
        component: ImpactEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        meta: { requiresAuth: true }
      },
      {
        path: 'users/:id',
        name: 'Users Edit',
        component: UsersEdit,
        meta: { requiresAuth: true , authorize: [Role.Admin]  }
      },
      {
        path: 'link-user',
        name: 'Link User',
        component: LinkUser,
        meta: { requiresAuth: true , authorize: [Role.Admin]  }
      },
      {
        path: 'company',
        name: 'Company',
        component: Company,
        meta: { requiresAuth: true }
      },
      {
        path: 'company/:id',
        name: 'Company Edit',
        component: CompanyEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'global',
        name: 'Global Goals',
        component: GlobalGoals,
        meta: { requiresAuth: true }
      },
      {
        path: 'global/:id',
        name: 'Global Goals Edit',
        component: GlobalGoalsEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories,
        meta: { requiresAuth: true , authorize: [Role.Admin]  }
      },
      {
        path: 'categories/:id',
        name: 'Categories Edit',
        component: CategoriesEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'tags',
        name: 'Tags Type',
        component: Tags,
        meta: { requiresAuth: true }
      },
      {
        path: 'tags/:id',
        name: 'Tags Edit',
        component: TagsEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'recipient',
        name: 'Recipients',
        component: Recipients,
        meta: { requiresAuth: true , authorize: [Role.Admin]  }
      },
      {
        path: 'recipient/:id',
        name: 'Recipients Edit',
        component: RecipientsEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'impact-type',
        name: 'Impact Type',
        component: ImpactType,
        meta: { requiresAuth: true, authorize: [Role.Admin]  }
      },
      {
        path: 'impact-type/:id',
        name: 'Impact Type Edit',
        component: ImpactTypeEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'action',
        name: 'Action',
        component: ActionType,
        meta: { requiresAuth: true , authorize: [Role.Admin] }
      },
      {
        path: 'action/:id',
        name: 'Action Edit',
        component: ActionTypeEdit,
        meta: { requiresAuth: true }
      },
      {
        path: 'wntk',
        name: 'Who Needs To Know',
        component: WhoNeedsToKnow,
        meta: { requiresAuth: true }
      },
      {
        path: 'wntk/:id',
        name: 'Who Needs To Know Edit',
        component: WhoNeedsToKnowEdit,
        meta: { requiresAuth: true , authorize: [Role.Admin]  }
      }
    ]
  },
  {
    path: '500',
    name: 'Error 500',
    component: Errors500
  },
  {
    path: '*',
    name: 'Error 404',
    component: Errors404
  }
]

// Router Configuration
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {

  // check if the route requires authentication and user is not logged in
  if (to.matched.some(route => route.meta.requiresAuth) && !store.getters.isLoggedIn) {
      // redirect to login page
      next({ name: 'Sign In' })
      return
  }

  // if logged in redirect to dashboard
  if(to.path === 'Sign In' && store.getters.isLoggedIn) {
      next({ name: 'dashboard' })
      return
  }
  // if server error
  // if (Error === 500) {
  //   next({name: 'Error 500'})
  //   return
  // }

  next()
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isAuthenticated = store.getters.isLoggedIn;
//   if( requiresAuth && !isAuthenticated ) {
//     next("/auth/signin")
//   }else {
//     next()
//   }
// })

export default router;
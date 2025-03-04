import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import OverviewPage from './pages/OverviewPage'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Pots from './pages/Pots'
import RecurringBills from './pages/RecurringBills'

const router = createBrowserRouter([
  {
    path : '/',
    element: <Root />,
    children : [
      {
        index:true,
        element : <OverviewPage />
      },
      {
        path: '/transactions',
        element : <Transactions />
      },
      {
        path: '/budgets',
        element : <Budgets />
      },
      {
        path : '/pots',
        element : <Pots />
      },
      {
        path:'/recurringbills',
        element : <RecurringBills  />
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
import './App.css'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { RootLayout } from './components/RootLayout'
import { ProductList } from './pages/ProductList'
import { Orders } from './pages/Orders'
import { ProductForm } from './pages/ProductForm'
import { EditProduct } from './pages/EditProduct'

function App() {

  const router = createBrowserRouter([
    {
      path: '/', element: <RootLayout />, children: [
        { path: "/", element: <Dashboard />, },
        { path: "/products", element: <ProductList /> },
        { path: "/addProduct", element: <ProductForm /> },
        { path: "/products/edit/:productId", element: <EditProduct /> },
        { path: "/orders", element: <Orders /> },

      ]
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App

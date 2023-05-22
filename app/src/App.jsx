import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import InverseProtectedRoute from './Components/InverseProtectedRoute/InverseProtectedRoute';
import RootLayout from './Components/RootLayout/RootLayout';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import SendMessage from './Components/SendMessage/SendMessage';
import SignUp from './Components/SignUp/SignUp';
import UserContextProvider from './Context/UserContext';
import Update from './Components/Update/Update';
import { useTranslation } from 'react-i18next';

let routers = createBrowserRouter([
  {path:'/', element: <RootLayout/>, children:[
    {path:'login', element: <InverseProtectedRoute><Login/></InverseProtectedRoute>},
    {path:'register', element: <InverseProtectedRoute><SignUp/></InverseProtectedRoute>},
    {index:true, element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:"update", element: <ProtectedRoute><Update/></ProtectedRoute>},
    {path:"sent/:id", element: <SendMessage/>},
    {path:'*', element: <ErrorPage/>}
    
  ]}
])

function App() {
  const {i18n}= useTranslation()  

  return (
    <>
      <div dir={i18n.language==="ar" ? "rtl":"ltr"}>
      <UserContextProvider>
              <RouterProvider router={routers}/>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;

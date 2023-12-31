import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Enrolled from "../pages/Dashboard/Enrolled/Enrolled";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Dashboard/Payment/Payment";
import AllClasses from "../pages/AllClasses/AllClasses";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import InstructorRoute from "./InstructorRoute";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/allClasses',
                element: <AllClasses />
            },
            {
                path: '/allInstructors',
                element: <InstructorsPage />
            },
            {
                path: 'signIn',
                element: <SignIn />,
            },
            {
                path: 'signUp',
                element: <SignUp />
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
                children: [
                    // For Users
                    {
                        path: 'selectClasses',
                        element: <Cart />
                    },
                    {
                        path: 'enrolledClasses',
                        element: <Enrolled />
                    },
                    {
                        path: 'payment',
                        element: <Payment />
                    },
                    // For Instructor
                    {
                        path: 'addClass',
                        element: <InstructorRoute><AddClass /></InstructorRoute>
                    },
                    {
                        path: 'myClass',
                        element: <InstructorRoute><MyClass /></InstructorRoute>
                    },

                    // For Admin
                    {
                        path: 'allUsers',
                        element: <AdminRoute><AllUsers /></AdminRoute>
                    },
                    {
                        path: 'manageClasses',
                        element: <AdminRoute><ManageClasses /></AdminRoute>
                    },
                ]
            }
        ]
    }
])
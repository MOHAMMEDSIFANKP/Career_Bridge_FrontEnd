import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import AdminProtected from '../ProtectedRoutes/AdminProtected'
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes'

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoutes/>}>
            <Route path='/login' element={<AdminLoginPage />} />
            </Route>
            <Route element={<AdminProtected/>}>
            <Route path='/' element={<AdminHomePage />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes

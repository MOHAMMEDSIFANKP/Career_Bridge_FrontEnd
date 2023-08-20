import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'

function Admin() {
    return (
        <Routes>
            <Route path='login' element={<AdminLoginPage />} />
        </Routes>
    )
}

export default Admin

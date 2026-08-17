import React from 'react'
import { UserAuth } from '../context/AuthContext'
const Dashboard = () => {
    const {session} = UserAuth();

    console.log(session);
    return (
        <div>Dashboard {session?.user?.email}</div>
    )
}

export default Dashboard

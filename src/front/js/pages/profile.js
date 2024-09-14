import React, { useContext } from "react"
import { Context } from "../store/appContext"
import { Navigate } from "react-router-dom"

const Profile = () => {

    const { store } = useContext(Context)
    const { user } = store

    return (
        <>
            {
                store.token ?
                    <>
                        <h1>Email: {user?.email}</h1>
                        <h1>Lastname: {user?.lastname}</h1>
                        <img src={user?.avatar} />
                    </>
                    :
                    <Navigate to="/login" />
            }

        </>
    )
}

export default Profile
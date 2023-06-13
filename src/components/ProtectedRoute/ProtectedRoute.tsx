import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const ProtectedRoute = (props: any) => {

    const isAuthenticated = useSelector((state) => state.account.isAuthenticated)

    console.log(isAuthenticated);

    return (
        <>
            {isAuthenticated === true ?
                <>{props.children}</>
                :
                <Navigate to="/login" replace />
            }

        </>
    )
}

export default ProtectedRoute
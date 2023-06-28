import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import NotAuthorise from "./NotAuthorise"


const RoleProtectedRoute = (props: any) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin")
    const user = useSelector((state) => state.account.user)
    const userRole = user.role

    // console.log("isAdminRoute", isAdminRoute);
    // console.log("userRole", userRole);

    if (isAdminRoute && userRole === "ADMIN") {

        return (
            <>{props.children}</>
        )
    } else {
        return (
            <><NotAuthorise /></>
        )
    }

}

const ProtectedRoute = (props: any) => {

    const isAuthenticated = useSelector((state) => state.account.isAuthenticated)

    // console.log(isAuthenticated);

    return (
        <>
            {isAuthenticated === true ?

                <>
                    <RoleProtectedRoute>
                        {props.children}
                    </RoleProtectedRoute>
                </>
                :
                <Navigate to="/login" replace />
            }

        </>
    )
}

export default ProtectedRoute
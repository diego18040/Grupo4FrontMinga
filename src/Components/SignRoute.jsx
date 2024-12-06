import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

function SignRoute({children}) {

    const token = useSelector(state=>state.authStore.token);
    if(token)
        return <Navigate to="/" replace></Navigate>
    return children

    
}

export default SignRoute;
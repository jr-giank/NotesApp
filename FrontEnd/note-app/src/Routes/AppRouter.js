import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegisterPage } from '../Users/RegisterPage';
import { LoginPage } from '../Users/LoginPage';
import { AppContext } from '../Context/AuthContext';
import { InitialState } from '../Hooks/InitialState';
import { PrivateRoute } from './PrivatesRoutes';
import { Home } from '../NoteApp/Home';

export const AppRouter = () => {
    return(
        <AppContext.Provider value={InitialState()}>
            <Router>
                <Routes>
                    <Route exact path='sign/up' element={<RegisterPage/>}/>
                    <Route exact path='login/' element={<LoginPage/>}/>
                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/' element={<Home/>}/>
                    </Route>
                </Routes>
            </Router>
        </AppContext.Provider>
    )
}
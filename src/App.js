import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "presentation/assets/style/style.css"
import MainRoute from 'core/routes';
import LoginPage from 'presentation/pages/login';

function App() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<LoginPage />} />
            </Routes>
            <MainRoute />
        </BrowserRouter>
    )
}

export default App;

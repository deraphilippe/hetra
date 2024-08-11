import Construction from 'presentation/pages/listConstruction';
import AboutConstruction from 'presentation/pages/aboutConstruction';
import AvisImposition from 'presentation/pages/avis';
import Dashboard from 'presentation/pages/dashboard';
import Carte from 'presentation/pages/map';
import { Routes, Route } from 'react-router-dom';
import Main from 'presentation/main';

const MainRoute = () => {
    return (
        <Routes>
            <Route
                path='/admin'
                element={<Main />}
            >
                <Route path="construction" element={<Construction />} />
                <Route path="construction/:id" element={<AboutConstruction />} />
                <Route path="avis" element={<AvisImposition />} />
                <Route path="avis/:id" element={<AvisImposition />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="map" element={<Carte />} />
                <Route path="map/idfoko=:idfoko/numcons=:numcons" element={<Carte />} />
            </Route>
        </Routes>
    )
}

export default MainRoute
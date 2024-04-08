import {Route, Routes} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Register from './pages/RegisterPage/Register';
import Signin from './pages/SigninPage/Signin';
import Profile from './pages/ProfilePage/Profile';
import ShortLink from './pages/ShortLinkPage/ShortLink';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/register' element={<Register/>}/>
				<Route path='/signin' element={<Signin/>}/>
				<Route path='/profile' element={<Profile/>}/>
				<Route path='/shortLink' element={<ShortLink/>}/>
			</Routes>
		</>
	);
}

export default App;

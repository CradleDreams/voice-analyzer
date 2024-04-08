import './styles.css';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {
	return (
		<div>
			<div className={'HomeWindow'}>
				<center>
					<h1 className={'title'}> Ссылочный Кликер</h1>
					<p className={'logo'}/>
					{"accessToken" in window.localStorage ? (
						<>
							<br/><Link to={'/shortLink'} className={'HomeButtom'}>
							<Button>
								Вернуться к кликеру
							</Button>
						</Link>
						</>
					) : (
						<>
							<Link to={'/signin'} className={'HomeButtom'}>
								<Button>
									Войти
								</Button>
							</Link><br></br><br></br>
							<Link to={'/register'} className={'HomeButtom'}>
								<Button>
									Зарегистрироваться
								</Button>
							</Link>
						</>
					)}
				</center>
			</div>
		</div>
	);
};

export default Home;
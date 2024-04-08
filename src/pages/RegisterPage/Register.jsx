import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth, selectIsRegister,} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Link, Navigate} from "react-router-dom";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

const Register = () => {
	const IsRegister = useSelector(selectIsRegister);
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
	} = useForm({
		defaultValues: {
			username: "Вася Пупкин",
			password: "1234",
			passwordRepeat: '1234',
		},
		mode: "onChange",
	});
	
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	
	const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
	const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
	
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const onSubmit = async (values) => {
		if (values.password !== values.passwordRepeat) {
			return alert("Пароли не совпадают");
		}
		const data = await dispatch(fetchRegister({username: values.username, password: values.password}));
		if (data.error?.message) {
			return alert("Такой пользователь уже существует");
		}
		
	};
	if (IsRegister) {
		return <Navigate to="/signin"/>;
	}
	if ("accessToken" in window.localStorage) {
		return <Navigate to="/"/>;
	}
	return (
		<div>
			<div className={'PegisterWindow'}>
				<center>
					<h1>Регистрация</h1><br></br>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={Boolean(errors.username?.message)}
							helperText={errors.username?.message}
							{...register("username", {required: "Укажите логин"})}
							label='Логин'
							className={'RegisterInput'}/><br></br><br></br>
						<FormControl variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
							<OutlinedInput
								error={Boolean(errors.password?.message)}
								helperText={errors.password?.message}
								{...register("password", {required: "Укажите пароль"})}
								label='Пароль'
								className={'RegisterInput'}
								type={showPassword1 ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword1}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword1 ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl><br></br><br></br>
						<FormControl variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Повторите пароль</InputLabel>
							<OutlinedInput
								error={Boolean(errors.passwordRepeat?.message)}
								helperText={errors.passwordRepeat?.message}
								{...register("passwordRepeat", {required: "Повторите пароль"})}
								label='Повторите пароль'
								className={'RegisterInput'}
								type={showPassword2 ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword2}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword2 ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<br/><br/>
						<Button
							disabled={!isValid}
							type="submit"
							size='large'
							className={'RegisterButtom'}>
							Зарегистрироваться
						</Button><br></br>
						<Link to='/signin'>
							<Button
								size='large'>
								У вас уже есть аккаунт?
							</Button>
						</Link>
					</form>
				</center>
			</div>
		</div>
	
	);
};

export default Register;
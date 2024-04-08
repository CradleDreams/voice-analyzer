import './styles.css';

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Input, TextField} from "@mui/material";
import {Created_ShortLinks} from "../../components/Created_ShortLinks/Created_ShortLinks";
import {fetchAvatar, fetchProfile, fetchUserLinks} from "../../redux/slices/profile";
import {Scrollbars} from 'react-custom-scrollbars-2';
import {Link} from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useForm} from "react-hook-form";
import axios from "../../axios";


const Profile = () => {
	const dispatch = useDispatch();
	
	const [save, setSave] = useState(true)
	const [update, setUpdate] = useState(true)
	
	React.useEffect(() => {
		dispatch(fetchProfile());
		dispatch(fetchUserLinks());
		dispatch(fetchAvatar());
	}, []);
	const {profile, links, avatar} = useSelector((state) => state.links);
	const isLinksLoading = links.status === "loading";
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: {errors},
	} = useForm({
		defaultValues: {
			username: null,
			mail: null,
			avatar: null,
		},
		mode: "onChange",
	});
	if (update) {
		if (links.status === 'loaded' && profile.status === 'loaded' && avatar.status === 'loaded') {
			setValue('username', profile.items.username)
			setValue('mail', profile.items.mail)
			setValue('avatar', avatar.img)
			setUpdate(false)
		}
	}
	const handleChangeFile = async (event) => {
		const formData = new FormData();
		formData.append('file', event.target.files[0])
		await axios.post("/file/upload", formData)
			.then((res) => {
				setValue('avatar', URL.createObjectURL(event.target.files[0]))
				console.log(`Success` + res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const onSubmit = async () => {
		const data = await axios.post('/user/change', {
			username: getValues('username'),
			mail: getValues('mail')
		});
		if (data.error?.message) {
			return alert("Данные введены не правильно");
		}
	};
	return (
		<div>
			<div className={'ProfileWindow'}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<center>
						<h1>Профиль</h1>
						{save ? (
							<img
								className={'avatar'}
								src={getValues('avatar')}
							></img>
						) : (
							<>
								<Avatar src="/broken-image.jpg" sx={{width: 115, height: 115, bgcolor: 'primary.light'}}/><br/>
								<Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
									Upload file
									<Input type="file" onChange={handleChangeFile} sx={{
										clip: 'rect(0 0 0 0)',
										clipPath: 'inset(50%)',
										height: 1,
										overflow: 'hidden',
										position: 'absolute',
										bottom: 0,
										left: 0,
										whiteSpace: 'nowrap',
										width: 1,
									}}/>
								</Button>
							</>
						)}
						<br></br><br></br>
						<TextField
							error={Boolean(errors.username?.message)}
							helperText={errors.username?.message}
							{...register("username")}
							disabled={save}
							className={'ProfileInput'}
						/><br></br><br></br><br></br>
						<TextField
							error={Boolean(errors.username?.message)}
							helperText={errors.username?.message}
							{...register("mail")}
							disabled={save}
							className={'ProfileInput'}
						/><br></br><br></br>
					</center>
					<Scrollbars style={{width: 420, height: 156, left: 22}}>
						{links.items.length !== 0 ? ((isLinksLoading ? [...Array(5)] : links.items).map((obj, index) =>
							isLinksLoading ? (
								<Created_ShortLinks key={index} isLoading={true}/>
							) : (
								<Created_ShortLinks
									shortLink={obj.shortLink}
									link={obj.link}
								/>
							)
						)) : (<Created_ShortLinks
						/>)}
					</Scrollbars>
					<div className={'ConteinerBtnProfile'}>
						{save ? (
							<>
								<Link to="/shortLink">
									<Button sx={{fontSize: 15}} onClick={() => setUpdate(true)}>Назад</Button>
								</Link>
								<Button sx={{fontSize: 15}} type='btn' onClick={() => setSave(!save)}>Изменить</Button>
							</>
						) : (
							<>
								<Button sx={{fontSize: 15, marginTop: -2}} onClick={() => setSave(!save)}>Назад</Button>
								<Button sx={{fontSize: 15, marginTop: -2}} type="submit"
								        onClick={() => setSave(!save)}>Сохранить</Button>
							</>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Profile;
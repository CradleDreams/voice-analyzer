import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import CopyLinkToClipboardButton from "../button";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import {Button} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";
import GitHubIcon from "@mui/icons-material/GitHub";
import './styles.module.scss';
import styles from "./styles.module.scss";
import clsx from "clsx";

export const Created_ShortLinks = ({
	                                   uuid,
	                                   shortLink,
	                                   link,
	                                   redirectCount
                                   }) => {
	
	return (
		<div className={clsx(styles.root, {uuid})}>
			<br/>
			<a id='copy' className={'LinkRes'} href={shortLink}>
				<LinkIcon/>
				{shortLink}
			</a><br></br>
			<a id='copy' className={'LinkRes'} href={shortLink}>
				<LinkIcon/>
				{link}
			</a><br></br><br/>
			<div className={'ConteinerBtn'}>
				<CopyLinkToClipboardButton>
				</CopyLinkToClipboardButton>
				<PopupState variant="popover" popupId="demo-popup-menu">
					{(popupState) => (
						<>
							<Button variant="contained" className={'BtnRes'} {...bindTrigger(popupState)}>
								<ShareIcon/>
							</Button>
							<Menu {...bindMenu(popupState)}>
								<MenuItem onClick={popupState.close}><a
									href='https://web.telegram.org/k/' className='Icon'><TelegramIcon/> Телеграм</a></MenuItem>
								<MenuItem onClick={popupState.close}><a href='https://www.reddit.com/?rdt=58403'
								                                        className='Icon'><RedditIcon/> Редит</a></MenuItem>
								<MenuItem onClick={popupState.close}><a href='https://github.com'
								                                        className='Icon'><GitHubIcon/> Гитхаб</a></MenuItem>
							</Menu>
						</>
					)}
				</PopupState>
			
			</div>
			<p>{redirectCount}</p>
			{/*<img src={qrcode} className={'QRCode'}></img>*/}
		</div>
	);
};

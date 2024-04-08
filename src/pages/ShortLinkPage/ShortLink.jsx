import './styles.css';

import React, {useState} from "react";
import {Header} from "../../components/Header/Header";
import axios from "axios";
import AudioTimer from "./AudioTimer";
import {ReactMic} from "react-mic";
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from "@mui/material";

const ShortLink = () => {
	const [isRunning, setIsRunning] = React.useState(false);
	const [elapsedTime, setElapsedTime] = React.useState(0);
	const [voice, setVoice] = React.useState(false);
	const [recordBlobLink, setRecordBlobLink] = React.useState(null);
	const [texts, setTexts] = React.useState(null)
	const [amoutions, setAmoutions] = React.useState(null)
	
	const onStop = async (recordedBlob) => {
        console.log(recordedBlob.blobURL)
        setRecordBlobLink(recordedBlob.blobURL);
        setIsRunning(false)
        let blobWithProp = new Blob([recordedBlob["blob"]], recordedBlob["options"]);
        console.log(blobWithProp)
        const audioFile = new File([blobWithProp], "incomingaudioclip.mp3");
        const data= new FormData();
        data.append('file', audioFile);
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },

        data : data
      }
      
      axios.request(config)

        .then((response) => {
            const data = Array.from(response.data)
            console.log(data)

            setTexts(data[1][0])
            setAmoutions(data[1][1])
        })


        .catch((error) => {
            console.log(error);
        })
    };

    const startHandle = () => {
        setElapsedTime(0)
        setIsRunning(true)
        setVoice(true)
	      setTexts(null)
	      setAmoutions(null)
    }
    const stopHandle = () => {
        setIsRunning(false)
        setVoice(false)
    }

    const clearHandle = () => {
        setIsRunning(false)
        setVoice(false)
        setRecordBlobLink(false)
        setElapsedTime(0)
    }
	return (
		<>
			<Header/>
			<div className={'ShortLinkWindow'}>
				<p className={'logoSmall'}></p>
				<h1 className={'ShortLinkTitle'}>Голосовой анализатор</h1>
				<p className={'ShortLinkText'}>Запишите своё голосовое сообщение и посмотрите как программа считала ваш голос и вашу эмоцию</p>
				<div style={{position: 'absolute',
                    top: 140,
                    left: 360}}>
				<AudioTimer
						isRunning={isRunning}
						elapsedTime={elapsedTime}
						setElapsedTime={setElapsedTime}
				/>
					</div>
				<div style={{position: 'absolute',
                    left: 80}}>
				<ReactMic
						record={voice}
						onStop={onStop}
						strokeColor="#000000"
						mimeType='audio/mpeg'
				/>
					</div>
				<div style={{position: 'absolute',
                    top: 290,
                    left: 330}}>
						{recordBlobLink ? <Button onClick={clearHandle}> Clear </Button> : ""}
				</div>
					<div style={{position: 'absolute',
                    top: 290,
                    left: 410}}>
						{!voice ? <Button onClick={startHandle}>Start</Button> : <Button onClick={stopHandle}>Stop</Button>}
					</div>
					<div style={{position: 'absolute',
                    top: 330,
                    left: 250}}>
						{recordBlobLink ? <audio controls src={recordBlobLink}/> : ""}
					</div>
					{texts && amoutions != null ? (
						<div style={{position: 'absolute',
                    top: 390,
                    left: 80}}>
						<h5>Текст: {texts}</h5>
						<h5>Эмоция: {amoutions}</h5>
						</div>
						): isRunning ? <CircularProgress style={{position: 'absolute',
                    top: 420,
                    left: 380}}/> : <></>
					}
				</div>
		</>
	);
};
export default ShortLink;
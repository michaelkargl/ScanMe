import React, {useEffect, useRef, useState} from "react";
import {ReactElement} from "react";
import decodeQR from "qr/decode.js";
import {Layout} from "../layout";

async function initializeVideoCaptchaAsync(videoElementSelector: string): Promise<void> {
    const video = document.querySelector<HTMLVideoElement>(videoElementSelector)
    if (!video) {
        return;
    }

    const stream = await navigator
        .mediaDevices
        .getUserMedia({video: true, audio: false});
    const videoTracks = stream.getVideoTracks();
    console.log(`Using video device: ${videoTracks[0].label}`);

    video.srcObject = stream;
    await video.play();


    console.log(video);
}

const ScannerPage: React.FC = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [qrContent, setQrContent] = useState<string>('');
    useEffect(() => {
        initializeVideoCaptchaAsync('#video').then(r =>
            console.log('Initialized video captcha')
        );
    });

    const takeScreenshot = (): ImageData | null => {
        const canvas = canvasRef.current;
        const drawingContext = canvas?.getContext(('2d'))
        const video = videoRef?.current;
        if (!canvas || !drawingContext || !video) {
            console.warn('Drawing context or video ref is not ready yet...');
            return null;
        }
        const width = canvas.width = video.videoWidth;
        const height = canvas.height = video.videoHeight;
        drawingContext.fillRect(0, 0, width, height);
        drawingContext.drawImage(video, 0, 0, width, height);

        return drawingContext.getImageData(0, 0, width, height);
    }

    const analyzeQrStillImage = (imageData: ImageData): string | null => {
        try {
            return decodeQR(imageData);
        } catch {
            console.warn("No QR code found")
            return null;
        }
    }

    const analyzeCurrentVideoFrame = () => {
        const screenshot = takeScreenshot();
        if (!screenshot) {
            console.error('Screenshot not found');
            return null;
        }

        const content = analyzeQrStillImage(screenshot);
        if (!content) {
            console.warn('No QR code found');
            return null;
        }

        console.log('Qr content: %s', content);
        setQrContent(content);
    }

    return (<div className='scanner-page-component'>
        <Layout>
            <video ref={videoRef} style={{backgroundColor: 'green'}} id='video'/>
            <canvas ref={canvasRef} style={{backgroundColor: 'orange'}}/>
            <button onClick={() => analyzeCurrentVideoFrame()}>Screenshot</button>
            <pre>
            {qrContent}
        </pre>
        </Layout>
    </div>)
}

export default ScannerPage;
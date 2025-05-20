import React, {ReactElement, useEffect, useRef, useState} from "react";
import decodeQR from "qr/decode.js";
import {Layout} from "../layout";
import {frontalCamera} from "qr/dom.js";

interface Camera {
    stop: () => void;
}


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
}

const ScannerPage: React.FC = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [camera, setCamera] = useState<Camera | null>(null);


    const [qrContent, setQrContent] = useState<string>('');
    useEffect(() => {
        const initCamera = async () => {
            if (!videoRef.current) {
                return;
            }
            setCamera(await frontalCamera(videoRef.current));
        }

        initCamera().then(r => {
            console.log('Camera initialized successfully');
        }, err => {
            console.error("Failed to initialize camera", err);
        });

        return () => {
            if (camera) {
                camera.stop();
            }
        }

        // initializeVideoCaptchaAsync('#video').then(r => {
        //     const frameCallback = videoRef.current!.requestVideoFrameCallback;
        //     frameLoop((ns) => console.log(ns));
        //     console.log('Initialized video captcha')
        // });
    }, []);
    //
    // const takeScreenshot = (): ImageData | null => {
    //     const canvas = canvasRef.current;
    //     const drawingContext = canvas?.getContext(('2d'))
    //     const video = videoRef?.current;
    //     if (!canvas || !drawingContext || !video) {
    //         console.warn('Drawing context or video ref is not ready yet...');
    //         return null;
    //     }
    //     const width = canvas.width = video.videoWidth;
    //     const height = canvas.height = video.videoHeight;
    //     drawingContext.fillRect(0, 0, width, height);
    //     drawingContext.drawImage(video, 0, 0, width, height);
    //
    //     return drawingContext.getImageData(0, 0, width, height);
    // }

    // const analyzeQrStillImage = (imageData: ImageData): string | null => {
    //     try {
    //         return decodeQR(imageData);
    //     } catch {
    //         console.warn("No QR code found")
    //         return null;
    //     }
    // }

    // const analyzeCurrentVideoFrame = () => {
    //     const screenshot = takeScreenshot();
    //     if (!screenshot) {
    //         console.error('Screenshot not found');
    //         return null;
    //     }
    //
    //     const content = analyzeQrStillImage(screenshot);
    //     if (!content) {
    //         console.warn('No QR code found');
    //         return null;
    //     }
    //
    //     console.log('Qr content: %s', content);
    //     return content;
    // }

    // const findQrContent = () => {
    //     let timeoutReached = false;
    //     let content = null;
    //
    //     setTimeout(() => {
    //         timeoutReached = true;
    //     }, 10 * 1000);
    //
    //     do {
    //         content = analyzeCurrentVideoFrame();
    //     } while (!timeoutReached && !content?.length);
    //
    //     setQrContent(content!);
    // }

    return (<div className='scanner-page-component'>
        <Layout>
            <h2>Camera Feed</h2>
            <video playsInline ref={videoRef} style={{backgroundColor: 'green'}} id='video'/>

            {/*<canvas ref={canvasRef} style={{backgroundColor: 'orange'}}/>*/}
            {/*<button onClick={() => findQrContent()}>Screenshot</button>*/}
            <pre>
            {qrContent}
        </pre>
        </Layout>
    </div>)
}

export default ScannerPage;
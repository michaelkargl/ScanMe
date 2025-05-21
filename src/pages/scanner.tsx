import React, {ReactElement, useEffect, useRef, useState} from "react";
import {Layout} from "../layout";
import {filter} from "rxjs";
import {LogLevel} from "../services/log-level";
import {QrCamera} from "../services/qr-camera";
import {LogEntry} from "../services/log-entry";


const ScannerPage: React.FC = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [qrContent, setQrContent] = useState<string>('');
    const [logEntry, setLogEntry] = useState<string>('');

    useEffect(() => {
        const camera = new QrCamera(videoRef.current!, canvasRef.current!);
        camera.start().then((qrCodeContent$) => {
                qrCodeContent$.subscribe((content: string) => {
                    console.error(content);
                    setQrContent(content)
                    // we only need to have 1 result => stop right after receiving it
                    camera.stop();
                });

                camera.getLogFeed().pipe(
                    filter((entry: LogEntry) => entry.level >= LogLevel.DEBUG),
                ).subscribe((logEntry: LogEntry) => {
                    console.log(logEntry);
                    setLogEntry(logEntry.message);
                });
            }
        );

        return () => {
            camera.stop();
        }
    }, []);

    return (<div className='scanner-page-component'>
        <Layout>
            <h2>Camera Feed</h2>
            <p>
                Camera feed is 110% local and does not send anything to any server whatsoever!
            </p>
            <video autoPlay playsInline ref={videoRef} style={{backgroundColor: 'green'}} id='video'/>
            <canvas ref={canvasRef} style={{backgroundColor: 'orange'}}/>
            <pre>{logEntry}</pre>
            <pre>
            {qrContent}
        </pre>
        </Layout>
    </div>)
}

export default ScannerPage;
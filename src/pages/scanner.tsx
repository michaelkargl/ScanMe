import React, {ReactElement, useEffect, useRef, useState} from "react";
import {Layout} from "../layout";
import {filter} from "rxjs";
import {LogLevel} from "../services/log-level";
import {QrCamera} from "../services/qr-camera";
import {LogEntry} from "../services/log-entry";
import './scanner.scss';


const ScannerPage: React.FC = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [qrContent, setQrContent] = useState<string>('');
    const [logEntry, setLogEntry] = useState<string>('');

    useEffect(() => {
        const camera = new QrCamera(videoRef.current!, canvasRef.current!);
        camera.start().then((qrCodeContent$) => {
                qrCodeContent$.subscribe((content: string) => {
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

            <fieldset>
                <h2>Camera Feed</h2>
                <p>
                    The camera is only used on this screen and is 110% local (no servers are involved in any way)!<br/>
                    Processing &gt;pauses&lt; when moving into the background to save energy.
                </p>
            </fieldset>

            <fieldset>
                <div className="video-container">
                    <video className='hidden' autoPlay playsInline ref={videoRef} id='video'/>
                    <canvas ref={canvasRef} />
                </div>
                <p>
                    {logEntry}
                </p>
            </fieldset>

            <fieldset>
                <div className='field-row-stacked'>
                    <label htmlFor='qr-content'>Content</label>
                    <textarea id='qr-content' rows={10} defaultValue={qrContent}>
                    </textarea>
                </div>
            </fieldset>
        </Layout>
    </div>)
}

export default ScannerPage;
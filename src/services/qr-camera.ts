import {BehaviorSubject, distinctUntilChanged, filter, Observable, race, ReplaySubject, takeUntil} from "rxjs";
import {IQrCamera} from "./qr-camera.iface";
import {LogEntry} from "./log-entry";
import {frontalCamera} from "qr/dom.js";
import {LogLevel} from "./log-level";
import decodeQR from "qr/decode.js";

export class QrCamera implements IQrCamera {
    private frontalCamera?: any = undefined;
    private qrCodeContentSubject = new ReplaySubject<string>(1);
    private stopCameraSubject = new BehaviorSubject<boolean>(false);
    private logFeed$ = new ReplaySubject<LogEntry>(1);

    private get stopRequested() {
        return this.stopCameraSubject.getValue();
    }

    private get stop$() {
        return this.stopCameraSubject.asObservable().pipe(
            distinctUntilChanged(),
            filter(Boolean)
        );
    }

    private get qrCodeContent$() {
        return this.qrCodeContentSubject.asObservable().pipe(
            distinctUntilChanged(),
            takeUntil(this.stop$)
        );
    }

    public constructor(
        private videoElement: HTMLVideoElement,
        private canvasElement: HTMLCanvasElement
    ) {
    }

    public async start(): Promise<Observable<string>> {
        this.log('Setting up camera feed / playing the camera video');
        try {
            this.frontalCamera = await frontalCamera(this.videoElement);
            this.log('Camera feed ready...');

            this.requestProcessingIteration();
        } catch (e) {
            this.log('Unable to set up camera feed. Error: ' + e, LogLevel.ERROR);
        }

        return this.qrCodeContent$;
    }

    public stop(): void {
        this.log('Stopping camera...', LogLevel.INFO);
        if(this.frontalCamera) {
            this.frontalCamera.stop();
        }
        this.stopCameraSubject.next(true)
    }

    public getLogFeed(): Observable<LogEntry> {
        return this.logFeed$
            .asObservable()
            .pipe(
                takeUntil(this.stop$),
                distinctUntilChanged((a, b) => a.level === b.level && a.message === b.message)
            );
    }

    private log(message: string, level = LogLevel.DEBUG) {
        this.logFeed$.next({level, message});
    }

    /**
     * Asks the browser to process the next frame.
     * This is done so that the browser can process the frame as soon as possible
     * without freezing up the UI thread.
     * @private
     */
    private requestProcessingIteration() {
        if (!this.stopCameraSubject.getValue()) {
            requestAnimationFrame(() => this.processFrame());
        }
    }

    /**
     * Takes a screenshot and returns the raw bitmap image data.
     * @private
     */
    private takeScreenshot(): ImageData | null {
        // A screenshot is a bitmap image that contains the current video frame.
        // To take a screenshot, we need to draw the current video frame onto a canvas.
        const drawingContext = this.canvasElement?.getContext(('2d'))

        if (!this.canvasElement || !drawingContext || !this.videoElement) {
            this.log('Either the canvas or the video feed is not ready yet...', LogLevel.WARN);
            return null;
        }

        // The screenshot size depends on the video size => we need to resize the canvas to fit its contents
        const width = this.canvasElement.width = this.videoElement.videoWidth;
        const height = this.canvasElement.height = this.videoElement.videoHeight;

        const videoNotReady = width + height <= 0;
        if (videoNotReady) {
            this.log("Unable to take a screenshot. The video stream is not running yet. Skipping...");
            return null;
        }

        drawingContext.fillRect(0, 0, width, height);
        drawingContext.drawImage(this.videoElement, 0, 0, width, height);
        return drawingContext.getImageData(0, 0, width, height);
    }

    private analyzeQrStillImage(imageData: ImageData): string | null {
        try {
            const content = decodeQR(imageData);
            this.log(`Resolved QR code: ${content}`, LogLevel.INFO);
            return content;
        } catch {
            this.log("No QR code found");
            return null;
        }
    }

    private processFrame() {
        this.log("Processing frame...");

        // The only way to get ahold of a camera frame is to take a screenshot
        const screenshot = this.takeScreenshot();
        if (screenshot) {
            // Now we can analyze the screenshot to see if it contains a QR code
            const result = this.analyzeQrStillImage(screenshot);
            if (!!result) {
                this.qrCodeContentSubject.next(result);
            }
        }

        // We are done with this frame, so ask the browser to process the next one
        if (!this.stopRequested) {
            this.requestProcessingIteration();
        } else {
            this.log("Stopping camera processing...");
        }
    }
}
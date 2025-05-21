import { Observable } from "rxjs"
import {LogEntry} from "./log-entry";

/**
 * Represents a Qr Code camera that can be used to scan QR codes.
 *
 * The camera is initialized with a video element and a canvas element.
 *    - The video element is used to display the camera feed.
 *    - The canvas element is used to capture the current video frame so
 *      that it can be processed (think of it like taking screenshots).
 *      If you were to display the camera and canvas side by side, they
 *      would show the same video frames.
 *
 * The camera can be started and stopped and exposes its log messages
 * as feed in case you want to display some live setup information to
 * the screen.
 *
 * Mind that having this camera feed open, produces a significant amount
 * of CPU usage. Stop the camera when you are done with it to save battery
 * of phone and notebook users.
 */
export interface IQrCamera {
    /**
     * The log feed is a stream of log entries.
     * This represents the progress and error log the camera is producing.
     * @returns {Observable<LogEntry>}
     */
    getLogFeed(): Observable<LogEntry>

    /**
     * Starts the camera.
     * @returns {Promise<Observable<string>>}
     *    - The returned observable is a stream of successfully interpreted QR codes.
     *    - The stream is completed when the camera is manually stopped.
     */
    start(): Promise<Observable<string>>

    /**
     * Stops the processing of the camera feed and frees up CPU and memory resources.
     */
    stop(): void
}
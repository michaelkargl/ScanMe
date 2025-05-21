import {LogLevel} from "./log-level";

export interface LogEntry {
    level: LogLevel
    message: string
}
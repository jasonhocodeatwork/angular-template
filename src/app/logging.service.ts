export class LoggingService {

    logstatuschange(status: string) {
        console.log('a server status changed, new status: ' + status);
        
    }

}
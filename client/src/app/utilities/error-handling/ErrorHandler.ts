
import { HttpStatusCode } from '../../enums/HttpStatusCodes';


export function handleApiError(
    err: any,  // whatever the type is that the `err` rxjs operator passes
    userAlertCallback: (msg: string) => void,
    messages: {  // a mapping of various messages to conditionally supply to the above callback
        notFound: string,
        generic: string,
        unexpected4xx: string
    }
): void {
    const status = err?.status;

    switch (status) {
        case HttpStatusCode.NOT_FOUND:
            userAlertCallback(messages.notFound);
            break;

        case HttpStatusCode.INTERNAL_SERVER_ERROR:
        case HttpStatusCode.BAD_GATEWAY:
        case HttpStatusCode.SERVICE_UNAVAILABLE:
        case HttpStatusCode.GATEWAY_TIMEOUT:
            userAlertCallback(messages.generic);
            break;

        case HttpStatusCode.BAD_REQUEST:
        case HttpStatusCode.UNAUTHORIZED:
        case HttpStatusCode.FORBIDDEN:
            userAlertCallback(messages.unexpected4xx);
            break;

        default:
            userAlertCallback('An unknown error occurred.');
            break;
    }
  console.error('API error:', err);
}

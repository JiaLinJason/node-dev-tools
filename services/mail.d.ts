type MailServiceOptions = {
    service?: string;
    user: string;
    pass: string;
};
type MailOptions = {
    subject?: string;
    html?: string;
    file?: Array<string> | string;
};
function sendMail(to: string, text?: string, optional?: MailOptions): Promise<any>;

declare interface MailService {
    mailService: (options: MailServiceOptions) => typeof sendMail;
}

declare module '@emailjs/browser' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  function send(
    serviceID: string,
    templateID: string,
    templateParams?: Record<string, unknown>,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;

  function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement | string,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;

  function init(publicKey: string): void;

  export { send, sendForm, init, EmailJSResponseStatus };
  export default { send, sendForm, init };
}

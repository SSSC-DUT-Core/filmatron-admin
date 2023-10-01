declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T>, CustomHTMLProps {}
}
interface CustomHTMLProps {
  className?: string;
}

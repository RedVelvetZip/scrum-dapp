export {};
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
declare global {
  interface Window {
    example: string;
    // ethereum: ???; //TODO: put actual Object type here so I can remove 'declare var window: any;' from App.tsx
  }
}

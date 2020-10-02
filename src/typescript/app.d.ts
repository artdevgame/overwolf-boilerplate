/// <reference types="@overwolf/types" />

import { Store } from '~store/store';

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare global {
  interface Window {
    store: Store
  }
}
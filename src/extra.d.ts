
declare module '@material/list/index' {
  export class MDCList {
    static attachTo(dom: any): any;
  }
}

declare module '@material/drawer/index' {
  export class MDCDrawer {
    static attachTo(dom: any): any;
  }
}

interface Window {
  $content: HTMLElement
}
declare var window: Window;
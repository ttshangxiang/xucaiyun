import './base/base.css';

interface WebComponents {
  waitFor: any
}
interface Window {
  WebComponents: WebComponents
}
declare var WebComponents: WebComponents;
declare var window: Window;

// <!-- Load components via WebComponents.waitFor -->
window.WebComponents = window.WebComponents || { 
  waitFor(cb: any){ addEventListener('WebComponentsReady', cb) }
} 
WebComponents.waitFor(async () => { 
  import('./layout');
});

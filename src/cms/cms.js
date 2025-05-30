/**
 * The default export of `decap-cms-app` is an object with all of the Decap CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from "decap-cms-app"
import "../../libs/decap/decap-contrib-encrypted-widget/dist/main";

/**
 * Any imported styles should be automatically be applied to the editor preview
 * pane thus eliminating the need to use `registerPreviewStyle` for imported
 * styles. However if you are experiencing build errors regarding importing css,
 * sass or scss into a cms module when deploying to the netlify platform, you
 * may need to follow the implementation found in netlify documentation here:
 * https://www.decapcms.org/docs/beta-features/#raw-css-in-registerpreviewstyle
 * All of the example imports below would result in styles being applied to the
 * preview pane.
 */
// import "module-that-imports-styles.js"
// import "styles.scss"
// import "../other-styles.css"

/**
 * Let's say you've created widget and preview components for a custom image
 * gallery widget in separate files:
 */
export const HelloWidgetControl = (props) => 'Hello Widget';
export const HelloWidgetPreview = props => 'Hello Widget Preview';
CMS.registerWidget('hello-widget', HelloWidgetControl, HelloWidgetPreview);
CMS.registerWidget('mywidget', window.StarterControl, window.StarterPreview);

console.log('CMS registered');
console.log('CMS loaded');
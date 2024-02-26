# vue3-detect-browser
Plugin (with TypeScript support) for Vue3 that detects browser name, version, and user-agent. This is a fork of https://github.com/smg99/vue-detect-browser.

## Installation with npm

```bash
npm i vue3-detect-browser
```

## Installation with yarn
```bash
yarn add vue3-detect-browser
```

## Option API Usage

In your `main.js:`

```javascript
import detectBrowser from "vue-detect-browser";
app.use(detectBrowser);
```

### Browser

In any component file it is available as `this.detectBrowser` data property

```bash
this.detectBrowser.isChrome
this.detectBrowser.isFirefox
this.detectBrowser.isOpera
this.detectBrowser.isSafari
this.detectBrowser.isEdge
this.detectBrowser.isChromeIOS
this.detectBrowser.isIOS
this.detectBrowser.isIE
```
## Composition API Usage
```javascript
<script setup>
import { useBrowserDetect } from 'vue3-detect-browser';
const { isFirefox, isChrome } = useBrowserDetect();
</script>
```
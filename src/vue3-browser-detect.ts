import {App, reactive} from 'vue';

// Define interfaces for browser detection and browser specs
interface BrowserSpecs {
    name: string;
    version: string;
    ua: string;
}

interface BrowserDetectState {
    isOpera: boolean;
    isEdge: boolean;
    isFirefox: boolean;
    isSafari: boolean;
    isIE: boolean;
    isChrome: boolean;
    isChromeIOS: boolean;
    isIOS: boolean;
    meta: BrowserSpecs;
}

export function createBrowserDetect(): BrowserDetectState
{
    const ua = navigator.userAgent;
    const browserDetect = reactive<BrowserDetectState>({
        isOpera: !!(window as any).opera || ua.includes(' OPR/'),
        isEdge: /Edge/.test(ua),
        isFirefox: /Firefox/.test(ua),
        isSafari: /constructor/i.test((window as any).HTMLElement) || (function(p: any) {
                      return p.toString() === '[object SafariRemoteNotification]';
                  })(!(window as any)['safari'] || ((window as any)['safari'] && (window as any)['safari'].pushNotification)),

        isIE: /*@cc_on!@*/ false || !!(document as any).documentMode,
        isChrome: /Google Inc/.test(navigator.vendor) && !/Edge/.test(ua),
        isChromeIOS: /CriOS/.test(ua),
        isIOS: /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream,
        meta: browserSpecs(ua),
    });

    function browserSpecs(uaString: string): BrowserSpecs
    {
        let tem, M = uaString.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(uaString) || [];
            return {name: 'IE', version: tem[1] || '', ua: uaString};
        }
        if (M[1] === 'Chrome') {
            tem = uaString.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
                return {
                    name: tem[1].replace('OPR', 'Opera'),
                    version: tem[2],
                    ua: uaString,
                };
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = uaString.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
        return {name: M[0], version: M[1], ua: uaString};
    }

    return browserDetect;
}

export const browserDetect = {
    install(app: App) {
        const browserDetect = createBrowserDetect();
        app.config.globalProperties.$browserDetect = browserDetect;
    },
};

export const useBrowserDetect = createBrowserDetect;

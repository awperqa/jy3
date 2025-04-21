var Navigator = function Navigator() { // 构造函数
    throw new TypeError("Illegal constructor");
};
dogvm.safefunction(Navigator);

Object.defineProperties(Navigator.prototype, {
    [Symbol.toStringTag]: {
        value: "Navigator",
        configurable: true
    }
});

navigator = {};
navigator.__proto__ = Navigator.prototype;

////////// 浏览器代码自动生成部分

// Navigator对象
Object.defineProperty(Navigator.prototype, "vendorSub",{"configurable":true,"enumerable":true,"get": function vendorSub_get(){debugger; return ""},set:undefined, });
Object.defineProperty(Navigator.prototype, "productSub",{"configurable":true,"enumerable":true,"get": function productSub_get(){debugger; return "20030107"},set:undefined, });
Object.defineProperty(Navigator.prototype, "vendor",{"configurable":true,"enumerable":true,"get": function vendor_get(){debugger; return "Google Inc."},set:undefined, });
Object.defineProperty(Navigator.prototype, "maxTouchPoints",{"configurable":true,"enumerable":true,"get": function maxTouchPoints_get(){debugger; return "0"},set:undefined, });
Object.defineProperty(Navigator.prototype, "scheduling",{"configurable":true,"enumerable":true,"get": function scheduling_get(){debugger; return "[object Scheduling]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "userActivation",{"configurable":true,"enumerable":true,"get": function userActivation_get(){debugger; return "[object UserActivation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "doNotTrack",{"configurable":true,"enumerable":true,"get": function doNotTrack_get(){debugger; return "null"},set:undefined, });
Object.defineProperty(Navigator.prototype, "geolocation",{"configurable":true,"enumerable":true,"get": function geolocation_get(){debugger; return "[object Geolocation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "connection",{"configurable":true,"enumerable":true,"get": function connection_get(){debugger; return "[object NetworkInformation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "plugins",{"configurable":true,"enumerable":true,"get": function plugins_get(){debugger; return "[object PluginArray]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mimeTypes",{"configurable":true,"enumerable":true,"get": function mimeTypes_get(){debugger; return "[object MimeTypeArray]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "pdfViewerEnabled",{"configurable":true,"enumerable":true,"get": function pdfViewerEnabled_get(){debugger; return "true"},set:undefined, });
Object.defineProperty(Navigator.prototype, "webkitTemporaryStorage",{"configurable":true,"enumerable":true,"get": function webkitTemporaryStorage_get(){debugger; return "[object DeprecatedStorageQuota]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "webkitPersistentStorage",{"configurable":true,"enumerable":true,"get": function webkitPersistentStorage_get(){debugger; return "[object DeprecatedStorageQuota]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "windowControlsOverlay",{"configurable":true,"enumerable":true,"get": function windowControlsOverlay_get(){debugger; return "[object WindowControlsOverlay]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "hardwareConcurrency",{"configurable":true,"enumerable":true,"get": function hardwareConcurrency_get(){debugger; return 16},set:undefined, });
Object.defineProperty(Navigator.prototype, "cookieEnabled",{"configurable":true,"enumerable":true,"get": function cookieEnabled_get(){debugger; return "true"},set:undefined, });
Object.defineProperty(Navigator.prototype, "appCodeName",{"configurable":true,"enumerable":true,"get": function appCodeName_get(){debugger; return "Mozilla"},set:undefined, });
Object.defineProperty(Navigator.prototype, "appName",{"configurable":true,"enumerable":true,"get": function appName_get(){debugger; return "Netscape"},set:undefined, });
Object.defineProperty(Navigator.prototype, "appVersion",{"configurable":true,"enumerable":true,"get": function appVersion_get(){debugger; return "'5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0'"},set:undefined, });
Object.defineProperty(Navigator.prototype, "platform",{"configurable":true,"enumerable":true,"get": function platform_get(){debugger; return "Win32"},set:undefined, });
Object.defineProperty(Navigator.prototype, "product",{"configurable":true,"enumerable":true,"get": function product_get(){debugger; return "Gecko"},set:undefined, });
Object.defineProperty(Navigator.prototype, "userAgent",{"configurable":true,"enumerable":true,"get": function userAgent_get(){debugger; return "'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0'"},set:undefined, });
Object.defineProperty(Navigator.prototype, "language",{"configurable":true,"enumerable":true,"get": function language_get(){debugger; return "zh-CN"},set:undefined, });
Object.defineProperty(Navigator.prototype, "languages",{"configurable":true,"enumerable":true,"get": function languages_get(){debugger; return ['zh-CN', 'en', 'en-GB', 'en-US']},set:undefined, });
Object.defineProperty(Navigator.prototype, "onLine",{"configurable":true,"enumerable":true,"get": function onLine_get(){debugger; return "true"},set:undefined, });
Object.defineProperty(Navigator.prototype, "webdriver",{"configurable":true,"enumerable":true,"get": function webdriver_get(){debugger; return "false"},set:undefined, });
Object.defineProperty(Navigator.prototype, "getGamepads",{"configurable":true,"enumerable":true,"writable":true,"value": function getGamepads(){debugger;},});dogvm.safefunction(Navigator.prototype.getGamepads);
Object.defineProperty(Navigator.prototype, "javaEnabled",{"configurable":true,"enumerable":true,"writable":true,"value": function javaEnabled(){debugger;},});dogvm.safefunction(Navigator.prototype.javaEnabled);
Object.defineProperty(Navigator.prototype, "sendBeacon",{"configurable":true,"enumerable":true,"writable":true,"value": function sendBeacon(){debugger;},});dogvm.safefunction(Navigator.prototype.sendBeacon);
Object.defineProperty(Navigator.prototype, "vibrate",{"configurable":true,"enumerable":true,"writable":true,"value": function vibrate(){debugger;},});dogvm.safefunction(Navigator.prototype.vibrate);
Object.defineProperty(Navigator.prototype, "deprecatedRunAdAuctionEnforcesKAnonymity",{"configurable":true,"enumerable":true,"get": function deprecatedRunAdAuctionEnforcesKAnonymity_get(){debugger; return "false"},set:undefined, });
Object.defineProperty(Navigator.prototype, "protectedAudience",{"configurable":true,"enumerable":true,"get": function protectedAudience_get(){debugger; return "[object ProtectedAudience]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "bluetooth",{"configurable":true,"enumerable":true,"get": function bluetooth_get(){debugger; return "[object Bluetooth]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "storageBuckets",{"configurable":true,"enumerable":true,"get": function storageBuckets_get(){debugger; return "[object StorageBucketManager]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "clipboard",{"configurable":true,"enumerable":true,"get": function clipboard_get(){debugger; return "[object Clipboard]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "credentials",{"configurable":true,"enumerable":true,"get": function credentials_get(){debugger; return "[object CredentialsContainer]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "keyboard",{"configurable":true,"enumerable":true,"get": function keyboard_get(){debugger; return "[object Keyboard]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "managed",{"configurable":true,"enumerable":true,"get": function managed_get(){debugger; return "[object NavigatorManagedData]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mediaDevices",{"configurable":true,"enumerable":true,"get": function mediaDevices_get(){debugger; return "[object MediaDevices]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "storage",{"configurable":true,"enumerable":true,"get": function storage_get(){debugger; return "[object StorageManager]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "serviceWorker",{"configurable":true,"enumerable":true,"get": function serviceWorker_get(){debugger; return ServiceWorkerContainer.createDog();},set:undefined, });
Object.defineProperty(Navigator.prototype, "virtualKeyboard",{"configurable":true,"enumerable":true,"get": function virtualKeyboard_get(){debugger; return "[object VirtualKeyboard]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "wakeLock",{"configurable":true,"enumerable":true,"get": function wakeLock_get(){debugger; return "[object WakeLock]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "deviceMemory",{"configurable":true,"enumerable":true,"get": function deviceMemory_get(){debugger; return "8"},set:undefined, });
Object.defineProperty(Navigator.prototype, "userAgentData",{"configurable":true,"enumerable":true,"get": function userAgentData_get(){debugger; return "[object NavigatorUAData]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "login",{"configurable":true,"enumerable":true,"get": function login_get(){debugger; return "[object NavigatorLogin]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "ink",{"configurable":true,"enumerable":true,"get": function ink_get(){debugger; return "[object Ink]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mediaCapabilities",{"configurable":true,"enumerable":true,"get": function mediaCapabilities_get(){debugger; return "[object MediaCapabilities]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "hid",{"configurable":true,"enumerable":true,"get": function hid_get(){debugger; return "[object HID]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "locks",{"configurable":true,"enumerable":true,"get": function locks_get(){debugger; return "[object LockManager]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "gpu",{"configurable":true,"enumerable":true,"get": function gpu_get(){debugger; return "[object GPU]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mediaSession",{"configurable":true,"enumerable":true,"get": function mediaSession_get(){debugger; return "[object MediaSession]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "permissions",{"configurable":true,"enumerable":true,"get": function permissions_get(){debugger; return "[object Permissions]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "presentation",{"configurable":true,"enumerable":true,"get": function presentation_get(){debugger; return "[object Presentation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "usb",{"configurable":true,"enumerable":true,"get": function usb_get(){debugger; return "[object USB]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "xr",{"configurable":true,"enumerable":true,"get": function xr_get(){debugger; return "[object XRSystem]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "serial",{"configurable":true,"enumerable":true,"get": function serial_get(){debugger; return "[object Serial]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "adAuctionComponents",{"configurable":true,"enumerable":true,"writable":true,"value": function adAuctionComponents(){debugger;},});dogvm.safefunction(Navigator.prototype.adAuctionComponents);
Object.defineProperty(Navigator.prototype, "runAdAuction",{"configurable":true,"enumerable":true,"writable":true,"value": function runAdAuction(){debugger;},});dogvm.safefunction(Navigator.prototype.runAdAuction);
Object.defineProperty(Navigator.prototype, "canLoadAdAuctionFencedFrame",{"configurable":true,"enumerable":true,"writable":true,"value": function canLoadAdAuctionFencedFrame(){debugger;},});dogvm.safefunction(Navigator.prototype.canLoadAdAuctionFencedFrame);
Object.defineProperty(Navigator.prototype, "canShare",{"configurable":true,"enumerable":true,"writable":true,"value": function canShare(){debugger;},});dogvm.safefunction(Navigator.prototype.canShare);
Object.defineProperty(Navigator.prototype, "share",{"configurable":true,"enumerable":true,"writable":true,"value": function share(){debugger;},});dogvm.safefunction(Navigator.prototype.share);
Object.defineProperty(Navigator.prototype, "clearAppBadge",{"configurable":true,"enumerable":true,"writable":true,"value": function clearAppBadge(){debugger;},});dogvm.safefunction(Navigator.prototype.clearAppBadge);
Object.defineProperty(Navigator.prototype, "getBattery",{"configurable":true,"enumerable":true,"writable":true,"value": function getBattery(){debugger;},});dogvm.safefunction(Navigator.prototype.getBattery);
Object.defineProperty(Navigator.prototype, "getUserMedia",{"configurable":true,"enumerable":true,"writable":true,"value": function getUserMedia(){debugger;},});dogvm.safefunction(Navigator.prototype.getUserMedia);
Object.defineProperty(Navigator.prototype, "requestMIDIAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function requestMIDIAccess(){debugger;},});dogvm.safefunction(Navigator.prototype.requestMIDIAccess);
Object.defineProperty(Navigator.prototype, "requestMediaKeySystemAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function requestMediaKeySystemAccess(){debugger;},});dogvm.safefunction(Navigator.prototype.requestMediaKeySystemAccess);
Object.defineProperty(Navigator.prototype, "setAppBadge",{"configurable":true,"enumerable":true,"writable":true,"value": function setAppBadge(){debugger;},});dogvm.safefunction(Navigator.prototype.setAppBadge);
Object.defineProperty(Navigator.prototype, "webkitGetUserMedia",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitGetUserMedia(){debugger;},});dogvm.safefunction(Navigator.prototype.webkitGetUserMedia);
Object.defineProperty(Navigator.prototype, "clearOriginJoinedAdInterestGroups",{"configurable":true,"enumerable":true,"writable":true,"value": function clearOriginJoinedAdInterestGroups(){debugger;},});dogvm.safefunction(Navigator.prototype.clearOriginJoinedAdInterestGroups);
Object.defineProperty(Navigator.prototype, "createAuctionNonce",{"configurable":true,"enumerable":true,"writable":true,"value": function createAuctionNonce(){debugger;},});dogvm.safefunction(Navigator.prototype.createAuctionNonce);
Object.defineProperty(Navigator.prototype, "joinAdInterestGroup",{"configurable":true,"enumerable":true,"writable":true,"value": function joinAdInterestGroup(){debugger;},});dogvm.safefunction(Navigator.prototype.joinAdInterestGroup);
Object.defineProperty(Navigator.prototype, "leaveAdInterestGroup",{"configurable":true,"enumerable":true,"writable":true,"value": function leaveAdInterestGroup(){debugger;},});dogvm.safefunction(Navigator.prototype.leaveAdInterestGroup);
Object.defineProperty(Navigator.prototype, "updateAdInterestGroups",{"configurable":true,"enumerable":true,"writable":true,"value": function updateAdInterestGroups(){debugger;},});dogvm.safefunction(Navigator.prototype.updateAdInterestGroups);
Object.defineProperty(Navigator.prototype, "deprecatedReplaceInURN",{"configurable":true,"enumerable":true,"writable":true,"value": function deprecatedReplaceInURN(){debugger;},});dogvm.safefunction(Navigator.prototype.deprecatedReplaceInURN);
Object.defineProperty(Navigator.prototype, "deprecatedURNToURL",{"configurable":true,"enumerable":true,"writable":true,"value": function deprecatedURNToURL(){debugger;},});dogvm.safefunction(Navigator.prototype.deprecatedURNToURL);
Object.defineProperty(Navigator.prototype, "getInstalledRelatedApps",{"configurable":true,"enumerable":true,"writable":true,"value": function getInstalledRelatedApps(){debugger;},});dogvm.safefunction(Navigator.prototype.getInstalledRelatedApps);
Object.defineProperty(Navigator.prototype, "getInterestGroupAdAuctionData",{"configurable":true,"enumerable":true,"writable":true,"value": function getInterestGroupAdAuctionData(){debugger;},});dogvm.safefunction(Navigator.prototype.getInterestGroupAdAuctionData);
Object.defineProperty(Navigator.prototype, "registerProtocolHandler",{"configurable":true,"enumerable":true,"writable":true,"value": function registerProtocolHandler(){debugger;},});dogvm.safefunction(Navigator.prototype.registerProtocolHandler);
Object.defineProperty(Navigator.prototype, "unregisterProtocolHandler",{"configurable":true,"enumerable":true,"writable":true,"value": function unregisterProtocolHandler(){debugger;},});dogvm.safefunction(Navigator.prototype.unregisterProtocolHandler);

////////////

////////

dogvm.safeproperty(Navigator);

navigator = dogvm.proxy(navigator);
import { Dimensions, Platform } from "react-native";
// import { isIphoneX } from "react-native-iphone-x-helper/index";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

export const PADDING_TOP = Platform.OS === "ios" ? 20 : 10;

// export const PADDING_BOTTOM = (() => {
//   if (Platform.OS === "ios") return isIphoneX() ? 30 : 10;
//   return 30;
// })();

// export const HEADER_MARGIN_TOP = isIphoneX() ? PADDING_TOP + 15 : PADDING_TOP;
export const HEADER_HEIGHT = 50;

export const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.8;
export const BOTTOM_SHEET_IMAGE_SIZE = 96;

export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
export const LATITUDE_DELTA = 0.0042;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const REM = SCREEN_WIDTH / 414;

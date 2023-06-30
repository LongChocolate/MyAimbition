export const colors = {
    primary: '#008080',
    lightGrey: '#D3D3D3',
    white: '#FFFFFF',
    black: '#000000',
    error: '#F44336',
    grey: '#C9C2C0',
    warning: '#FFCA28',
    darkGrey: '#231F20',
    lightGreen: '#8fcbbc',
};

export const sizes = {
    size12: 12,
    size14: 14,
    size16: 16,
    size18: 18,
    size25: 25,
};

export const fonts = {
    size12: {
        fontSize: sizes.size12,
    },
    size14: {
        fontSize: sizes.size14,
    },
    size16: {
        fontSize: sizes.size16,
    },
    size18: {
        fontSize: sizes.size18,
    },
    size25: {
        fontSize: sizes.size25,
    },
};

type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export function boxShadow(color, x = 0, y = 6, blur = 10) {
    return {
        shadowColor: color,
        shadowOffset: {width: x, height: y},
        shadowOpacity: 1,
        shadowRadius: blur,
        elevation: y < 0 ? 2 : y + 1,
    };
}

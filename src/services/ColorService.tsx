import { getTheme } from './ThemeService';

const COLORS = {
    'default': 'yellow'
};

function getColors(theme?) {
    return getTheme(theme);
}

function getRandomColor() {    
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
}

export { getColors, getRandomColor };
export { COLORS };
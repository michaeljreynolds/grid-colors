import { getTheme } from './ThemeService';

const COLORS = {
    'default': 'yellow'
};

function getColors(theme?) {
    return getTheme(theme);
}

export { getColors };
export { COLORS };
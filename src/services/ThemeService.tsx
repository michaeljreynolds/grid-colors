let themes = {
    "defaultTheme": [
        'yellow',    
        'blue',
        'red',
        'green'        
    ],
    "dark": [
        "black",
        "blue",
        "purple",
        "red",
        "yellow"
    ],
    "rainbow": [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet"
    ],
    "rainbow-long": [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
        "indigo",
        "blue",
        "green",
        "yellow",
        "orange"
    ],
    "neon": [
        '#FE53BB',
        "#08F7FE",
        '#7fff00',        
        "#09FBD3",             
        '#fcf340'   
    ],
    "neonRainbow": [
        '#8c00fc',
        '#3500ff',
        '#01fe01',
        '#fffe37',
        '#ff8600',
        '#ed0003',
        '#ff8600',
        '#fffe37',
        '#01fe01',
        '#3500ff',
    ],
    "popular": [
        'rgb(34, 40, 49)',
        'rgb(57, 62, 70)',
        'rgb(0, 173, 181)',
        'rgb(238, 238, 238)',
        'rgb(168, 230, 207)',
        'rgb(220, 237, 193)',
        'rgb(255, 211, 182)',
        'rgb(255, 170, 165)',
        '#B983FF',
        '#94B3FD',
        '#94DAFF',
        '#99FEFF'
    ],
    "random": []
};

function getTheme(theme) {
    return themes[theme] === undefined ? themes["defaultTheme"] : themes[theme];
}

export { themes, getTheme };


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
        '#ed0003'
    ]
};

function getTheme(theme) {
    return themes[theme] === undefined ? themes["defaultTheme"] : themes[theme];
}

export { themes, getTheme };


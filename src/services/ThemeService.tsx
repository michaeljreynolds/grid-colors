let themes = {
    "defaultTheme": [
        'blue',
        'red',
        'green',
        'yellow'    
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
    ]
};

function getTheme(theme) {
    return themes[theme] === undefined ? themes["defaultTheme"] : themes[theme];
}

export { getTheme };
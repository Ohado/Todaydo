export const styleService = {
    updateStyle,
}

function updateStyle(prefs){
    for(const pref in prefs) {
        console.log('pref is '+ pref)
        switch(pref){
            case 'textColor':
                document.documentElement.style.setProperty("--color-txt", prefs[pref]);
                break
            case 'backgroundColor':
                document.documentElement.style.setProperty("--color-bg", prefs[pref]);
        }
    }
}
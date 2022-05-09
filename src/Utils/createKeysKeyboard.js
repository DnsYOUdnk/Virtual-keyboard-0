
export const createKeysKeyboard = (data, lang, shiftOn, capsOn) => {
    let newKeyboardData = data,
        keyboardKeys = '';
    newKeyboardData.forEach(element => {
            let nameKey = Object.keys(element)[0],
            {key, shiftKey = key} = element[nameKey]['value' + lang];
            key = key.length === 1 && capsOn ? key.toUpperCase() : key
            keyboardKeys += `
                            <div class="${nameKey} ${nameKey === 'CapsLock' && capsOn ? 'active' : ''} keyboard__keys">${!shiftOn ? key : shiftKey}</div>
                            `
    });
    return keyboardKeys;
}
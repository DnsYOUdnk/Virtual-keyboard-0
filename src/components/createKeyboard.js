import keyboard from './keyboardData.js'

const createKeyboard = () => {
      const keyboardApp = document.createElement('div');
            keyboardApp.setAttribute('id',`app-keyboard`);
      const keyboardWripper = document.createElement('div');
            keyboardWripper.classList.add('keyboard__wrapper')
      
      const getKeyboard = (data, lang, shiftOn) => {
            let newKeyboardData = data,
                keyboardKeys = '';
            newKeyboardData.forEach(element => {
                  let nameKey = Object.keys(element)[0],
                  {key, shiftKey = key} = element[nameKey]['value' + lang];
                  keyboardKeys += `
                                    <div class="${nameKey} keyboard__keys">${!shiftOn ? key : shiftKey}</div>
                                 `
            });
            keyboardWripper.innerHTML = keyboardKeys;
      }
      getKeyboard(keyboard, 'En', false)
      keyboardApp.appendChild(keyboardWripper)
      document.body.append(keyboardApp)
}



export { createKeyboard };
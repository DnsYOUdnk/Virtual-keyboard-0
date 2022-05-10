import KeyboardData from './KeyboardData.js';

function Keyboard() {
      const keyboardProperties = localStorage.getItem('keyboardProperties') ? JSON.parse(localStorage.getItem('keyboardProperties')) : {lang: 'En', capsOn: false};
      let shiftOn = [false, ''];

      this.init = () => {
            this.create();
            this.addEventKeysKeyboard();
            this.addEventKeysMouse();
      }

      this.create = () => {
            const keyboardApp = document.createElement('div');
                  keyboardApp.setAttribute('id',`app-keyboard`);
            const otherInf = document.createElement('div');
                  otherInf.classList.add(`app-keyboard__other-inform`);
                  otherInf.innerHTML = `
                                          <div>Операционная система Windows. Переключение языка Shift+Alt</div>
                                          `
            this.keyboardWripper = document.createElement('div');
            this.keyboardWripper.classList.add('keyboard__wrapper');
            
            this.getKeys();
            
            keyboardApp.append(this.keyboardWripper, otherInf);
            document.body.append(keyboardApp);
      };

      this.getKeys = () => {
            let newKeyboardData = KeyboardData,
                { lang, capsOn } = keyboardProperties,
                keyboardKeys = '';

            newKeyboardData.forEach(element => {
                  let nameKey = Object.keys(element)[0],
                  {key, shiftKey = key} = element[nameKey]['value' + lang];
                  key = key.length === 1 && capsOn ? key.toUpperCase() : key;
                  shiftKey = shiftKey.length === 1 && shiftOn ? (capsOn ? shiftKey.toLowerCase() : shiftKey.toUpperCase()) : shiftKey;
                  keyboardKeys +=  `
                                    <div class="${nameKey} ${nameKey === 'CapsLock' && capsOn ? 'active' : ''} ${nameKey === shiftOn[1] && shiftOn[0] ? 'active__press' : ''} keyboard__keys">
                                          ${!shiftOn[0] ? key : shiftKey}
                                    </div>
                                    `
            });
            this.keyboardWripper.innerHTML = keyboardKeys;
      }

      this.addEventKeysKeyboard = () => {
            document.addEventListener('keydown', (event) => {
                  
                  event.preventDefault();
                  switch(event.code) {
                        case 'CapsLock' : keyboardProperties.capsOn =  !keyboardProperties.capsOn ? true : false; 
                        break;
                        case 'AltLeft' : event.getModifierState('Shift') && (keyboardProperties.lang = keyboardProperties.lang === 'En' ? 'Ru' : 'En');
                        break;
                        case ('ShiftLeft') :  shiftOn[0] = true, shiftOn[1] = event.code; 
                        this.getKeys()
                        break;
                        case ('ShiftRight') : shiftOn[0] = true, shiftOn[1] = event.code;
                        this.getKeys()
                        break;
                  }
                  
                  this.pressKeyKeybord(event)
                  localStorage.setItem('keyboardProperties',JSON.stringify(keyboardProperties))
                  
            })
            document.addEventListener('keyup', (event) => {
                  shiftOn[0] = event.key === 'Shift' ? false : shiftOn[0];
                  shiftOn[1] = event.key === 'Shift' ? '' : shiftOn[1];
                  
                  this.getKeys()
                  localStorage.setItem('keyboardProperties',JSON.stringify(keyboardProperties))
            })
      }

      this.pressKeyKeybord = (event) => {
            const arrKeys = document.querySelectorAll('.keyboard__keys');
            arrKeys.forEach(item => {
                  if(item.classList.contains(event.code)) {
                        item.classList.add('active__press')
                  }
            })
      }

      this.addEventKeysMouse = () => {
            
      }
}

const keyboard = new Keyboard().init();

export default keyboard ;
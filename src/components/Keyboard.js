import KeyboardData from './KeyboardData.js';
import { createKeysKeyboard } from '../Utils/createKeysKeyboard.js';

function Keyboard() {
      const keyboardProperties = localStorage.getItem('keyboardProperties') ? JSON.parse(localStorage.getItem('keyboardProperties')) : {lang: 'En', capsOn: false};
      this.init = () => {
            this.create();
            this.addEventKeysKeyboard();
      }

      this.create = () => {
            const keyboardApp = document.createElement('div');
                  keyboardApp.setAttribute('id',`app-keyboard`);
            this.keyboardWripper = document.createElement('div');
            this.keyboardWripper.classList.add('keyboard__wrapper');
            
            this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, keyboardProperties.lang, false, keyboardProperties.capsOn);
            
            keyboardApp.appendChild(this.keyboardWripper);
            document.body.append(keyboardApp);
      };

      this.addEventKeysKeyboard = () => {
            document.addEventListener('keydown', (event) => {
                  if(event.getModifierState("CapsLock")) {
                        this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, keyboardProperties.lang, false, true);
                  } else {
                        this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, keyboardProperties.lang, false, false);
                  }

                  if(event.key === 'Shift') {
                        // this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, 'En', true, false);
                        document.addEventListener('keydown', (event) => {
                              if(event.key === 'Alt'){
                                    keyboardProperties.lang = keyboardProperties.lang === 'En' ? 'Ru' : 'En'
                                    this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, keyboardProperties.lang, false, false);
                              }
                        })
                        // this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, 'En', false, true);
                  } else {
                        // this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, 'En', false, false);
                  }
                  // event.code - имя клавиши  event.key - значение клавиши; {name: , valueEng: , valueRus: }
                  // console.log(event.code, event.key, event);
                  // console.log(event.getModifierState("CapsLock"))
            })
      }
}

const keyboard = new Keyboard().init();

export default keyboard ;
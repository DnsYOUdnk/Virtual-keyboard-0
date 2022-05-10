import KeyboardData from './KeyboardData.js';

function Keyboard() {
      const keyboardProperties = localStorage.getItem('keyboardProperties') ? JSON.parse(localStorage.getItem('keyboardProperties')) : {lang: 'En', capsOn: false};
      let shiftOn = false;

      this.init = () => {
            this.create();
            this.addEventKeysKeyboard();
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
                  key = key.length === 1 && capsOn ? key.toUpperCase() : key
                  keyboardKeys +=  `
                                          <div class="${nameKey} ${nameKey === 'CapsLock' && capsOn ? 'active' : ''} keyboard__keys">
                                                ${!shiftOn ? key : shiftKey}
                                          </div>
                                    `
            });
            this.keyboardWripper.innerHTML = keyboardKeys;
      }

      this.addEventKeysKeyboard = () => {
            document.addEventListener('keydown', (event) => {
                  switch(event.code) {
                        case 'CapsLock' : keyboardProperties.capsOn =  !keyboardProperties.capsOn ? true : false;
                        break;
                        case 'AltLeft' : event.getModifierState('Shift') && (keyboardProperties.lang = keyboardProperties.lang === 'En' ? 'Ru' : 'En');
                        default :
                        break;
                  }
                  
                  this.getKeys()
                  localStorage.setItem('keyboardProperties',JSON.stringify(keyboardProperties))
                  
                  // event.code - имя клавиши  event.key - значение клавиши; {name: , valueEng: , valueRus: }
                  // console.log(event.code, event.key, event);
                  // console.log(event.getModifierState("CapsLock"))
            })
      }
}

const keyboard = new Keyboard().init();

export default keyboard ;
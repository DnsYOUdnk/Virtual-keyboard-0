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
                        default :
                        break;
                  }
                  
                  this.getKeys()
                  localStorage.setItem('keyboardProperties',JSON.stringify(keyboardProperties))
                  /* if(event.key === 'Shift') {
                        // this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, 'En', true, false);
                        document.addEventListener('keydown', (event1) => {
                              if(event1.key === 'Alt'){
                                    
                                    keyboardProperties.lang = keyboardProperties.lang === 'En' ? 'Ru' : 'En'
                                    this.keyboardWripper.innerHTML = this.getKeys(KeyboardData, keyboardProperties.lang, false, false);
                              }
                        })
                        // this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, 'En', false, true);
                  } else {
                        // this.keyboardWripper.innerHTML = createKeysKeyboard(KeyboardData, 'En', false, false);
                  } */
                  // event.code - имя клавиши  event.key - значение клавиши; {name: , valueEng: , valueRus: }
                  // console.log(event.code, event.key, event);
                  // console.log(event.getModifierState("CapsLock"))
            })
            document.addEventListener('keydown', (event) => {
                  if(event.key === 'Shift') {
                        document.addEventListener('keydown', (e) => {
                              if(e.code === 'AltLeft') {
                                    e.preventDefault()
                                    console.log('asd')
                              } else {
                              }
                        })
                  }
            })
      }
}

const keyboard = new Keyboard().init();

export default keyboard ;
import KeyboardData from './KeyboardData.js';

function Keyboard() {
      const keyboardProperties = localStorage.getItem('keyboardProperties') ? JSON.parse(localStorage.getItem('keyboardProperties')) : {lang: 'En', capsOn: false};
      let shiftOn = [false, '', false];

      this.init = () => {
            this.create();
            this.addEventKeysKeyboard();
            this.addEventKeysMouse();
            this.textareaItem;
      }

      this.create = () => {
            const keyboardApp = document.createElement('div');
                  keyboardApp.setAttribute('id',`app-keyboard`);
            const otherInf = document.createElement('div');
                  otherInf.classList.add(`app-keyboard__other-inform`);
                  otherInf.innerHTML = `
                                          <div>Операционная система Windows. Переключение языка Shift+Alt</div>
                                          `
            const textareaBlock = document.createElement('div');
                  textareaBlock.classList.add(`app-keyboard__textarea`);
                  textareaBlock.innerHTML = `
                                                <textarea class="app-keyboard__textarea__item" wrap autofocus></textarea>
                                          `
            this.keyboardWripper = document.createElement('div');
            this.keyboardWripper.classList.add('keyboard__wrapper');
            
            this.getKeys();
            
            keyboardApp.append(textareaBlock, this.keyboardWripper, otherInf);
            document.body.append(keyboardApp);

            this.textareaItem = document.querySelector('.app-keyboard__textarea__item');
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
            this.addEventKeysMouse();
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
                        break;
                        case ('ShiftRight') : shiftOn[0] = true, shiftOn[1] = event.code;
                        break;
                  }
                  
                  if(!shiftOn[2] && shiftOn[0]) {
                        this.getKeys();
                        shiftOn[2] = true;
                  }
                  this.pressKeyKeybord(event)
                  let keySymbol = KeyboardData.filter((item) => Object.keys(item)[0] === event.code);
                      keySymbol = keySymbol.map(item => {
                           let res = item[Object.keys(item)[0]]['value' + keyboardProperties.lang][(!shiftOn[0] ? 'key' : 'shiftKey')]
                               res = !res ? item[Object.keys(item)[0]]['value' + keyboardProperties.lang]['key'] : res;
                              return res
                        })[0]  
                  this.inputTextKeyboard(keySymbol)
                  localStorage.setItem('keyboardProperties',JSON.stringify(keyboardProperties))
                  
            })
            document.addEventListener('keyup', (event) => {
                  shiftOn[0] = event.key === 'Shift' ? false : shiftOn[0];
                  shiftOn[1] = event.key === 'Shift' ? '' : shiftOn[1];
                  shiftOn[2] = event.key === 'Shift' ? false : shiftOn[2];
                  
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
            const arrKeys = document.querySelectorAll('.keyboard__keys');
            arrKeys.forEach(item => {
                  item.addEventListener('click', (e) => {
                        if(e.target.classList.contains('CapsLock')) {
                              keyboardProperties.capsOn =  !keyboardProperties.capsOn ? true : false;
                              this.getKeys()
                        } else {
                              let textIn = e.target.classList[0] === 'Space' ? ' ' : e.target.innerText;
                              this.inputTextKeyboard(textIn)
                        }
                  })
            })
      }
      
      let textInput = '';

      this.inputTextKeyboard = (keySym) => {
            textInput += keySym.length === 1 ? keySym : '';
            console.log(keySym.length)
            this.textareaItem.value = textInput;
      }
}

const keyboard = new Keyboard().init();

export default keyboard ;
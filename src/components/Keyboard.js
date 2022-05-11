import KeyboardData from './KeyboardData.js';

function Keyboard() {
  const keyboardProperties = localStorage.getItem('keyboardProperties') ? JSON.parse(localStorage.getItem('keyboardProperties')) : { lang: 'En', capsOn: false };
  let shiftOn = [false, '', false];

  this.init = () => {
    this.create();
    this.addEventKeysKeyboard();
    this.addEventKeysMouse();
  };

  this.create = () => {
    const keyboardApp = document.createElement('div');
    keyboardApp.setAttribute('id', 'app-keyboard');
    const otherInf = document.createElement('div');
    otherInf.classList.add('app-keyboard__other-inform');
    otherInf.innerHTML = `
                            <div>Операционная система Windows. Переключение языка Shift+Alt. Del - удаление всего текста.</div>
                        `;
    const textareaBlock = document.createElement('div');
    textareaBlock.classList.add('app-keyboard__textarea');
    textareaBlock.innerHTML = `
                                <textarea class="app-keyboard__textarea__item" wrap autofocus></textarea>
                            `;
    this.keyboardWripper = document.createElement('div');
    this.keyboardWripper.classList.add('keyboard__wrapper');

    this.getKeys();

    keyboardApp.append(textareaBlock, this.keyboardWripper, otherInf);
    document.body.append(keyboardApp);

    this.textareaItem = document.querySelector('.app-keyboard__textarea__item');
  };

  this.getKeys = () => {
    let newKeyboardData = KeyboardData;
    let { lang, capsOn } = keyboardProperties;
    let keyboardKeys = '';

    newKeyboardData.forEach(element => {
      let nameKey = Object.keys(element)[0];
      let { key, shiftKey = key } = element[nameKey]['value' + lang];
      key = key.length === 1 && capsOn ? key.toUpperCase() : key;
      let shiftKeyCap = capsOn ? shiftKey.toLowerCase() : shiftKey.toUpperCase();
      shiftKey = shiftKey.length === 1 && shiftOn ? shiftKeyCap : shiftKey;
      keyboardKeys += `
                                    <div class="${nameKey} ${nameKey === 'CapsLock' && capsOn ? 'active' : ''} ${nameKey === shiftOn[1] && shiftOn[0] ? 'active__press' : ''} keyboard__keys">
                                          ${!shiftOn[0] ? key : shiftKey}
                                    </div>
                                    `;
    });
    this.keyboardWripper.innerHTML = keyboardKeys;
    this.addEventKeysMouse();
  };

  this.addEventKeysKeyboard = () => {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'CapsLock':
          keyboardProperties.capsOn = !keyboardProperties.capsOn;
          break;
        case 'AltLeft':
          if (event.getModifierState('Shift')) keyboardProperties.lang = keyboardProperties.lang === 'En' ? 'Ru' : 'En';
          break;
        case 'ShiftLeft':
          shiftOn[0] = true; shiftOn[1] = event.code;
          break;
        case 'ShiftRight':
          shiftOn[0] = true; shiftOn[1] = event.code;
          break;
        default: break;
      }

      if (!shiftOn[2] && shiftOn[0]) {
        this.getKeys();
        shiftOn[2] = true;
      }
      this.pressKeyKeybord(event);
      let keySymbol = KeyboardData.filter((item) => Object.keys(item)[0] === event.code);
      keySymbol = keySymbol.map(item => {
        let res = item[Object.keys(item)[0]]['value' + keyboardProperties.lang][(!shiftOn[0] ? 'key' : 'shiftKey')];
        res = !res ? item[Object.keys(item)[0]]['value' + keyboardProperties.lang].key : res;
        return res;
      })[0];
      if (keySymbol === undefined) {
        this.popUp();
        return;
      } if (keySymbol.length === 1 && keyboardProperties.capsOn && shiftOn[0]) {
        keySymbol = keySymbol.toLowerCase();
      } else if (keySymbol.length === 1 && keyboardProperties.capsOn) {
        keySymbol = keySymbol.toUpperCase();
      }
      this.inputTextKeyboard(keySymbol);
      localStorage.setItem('keyboardProperties', JSON.stringify(keyboardProperties));
    });
    document.addEventListener('keyup', (event) => {
      shiftOn[0] = event.key === 'Shift' ? false : shiftOn[0];
      shiftOn[1] = event.key === 'Shift' ? '' : shiftOn[1];
      shiftOn[2] = event.key === 'Shift' ? false : shiftOn[2];

      this.getKeys();
      localStorage.setItem('keyboardProperties', JSON.stringify(keyboardProperties));
    });
  };

  this.popUp = () => {
    if (document.querySelector('.pop-up__attention')) return;
    const popUp = document.createElement('div');
    popUp.classList.add('pop-up__attention');
    popUp.innerHTML = `
                        <div class="pop-up">
                          ${keyboardProperties.lang === 'Ru' ? '<h1>Извините. Данная кнопка на этом устройстве не работает:(</h1>' : '<h1>Sorry. This button does not work on this device:(</h1>'}
                          <button class="pop-up__close"></button>
                        </div>
                      `;
    document.body.append(popUp);
    const btn = document.querySelector('.pop-up__close');
    btn.addEventListener('click', () => {
      popUp.remove();
    });
  };

  this.pressKeyKeybord = (event) => {
    const arrKeys = document.querySelectorAll('.keyboard__keys');
    arrKeys.forEach(item => {
      if (item.classList.contains(event.code)) {
        item.classList.add('active__press');
      }
    });
  };

  this.addEventKeysMouse = () => {
    const arrKeys = document.querySelectorAll('.keyboard__keys');
    arrKeys.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('CapsLock')) {
          keyboardProperties.capsOn = !keyboardProperties.capsOn;
          this.getKeys();
        } else {
          let textIn = e.target.classList[0] === 'Space' ? ' ' : e.target.innerText;
          this.inputTextKeyboard(textIn);
        }
      });
    });
  };

  let textInput = this.textareaItem ? this.textareaItem.value : '';

  this.inputTextKeyboard = (keySym) => {
    let valueKey = keySym.length === 1 ? keySym : '';
    let cursorPlace = this.textareaItem.selectionStart;

    const focusArea = (btn) => {
      let placeC = btn === 'Del' ? cursorPlace : cursorPlace - 1;
      textInput = textInput.split('').filter((_, index) => index !== placeC).join('');
      this.textareaItem.value = textInput;
      this.textareaItem.selectionEnd = placeC < 0 ? 0 : placeC;
      this.textareaItem.selectionStart = this.textareaItem.selectionEnd;
      this.textareaItem.focus();
    };
    const changeArea = (value) => {
      let newPlace = cursorPlace - 1 < 0 ? 0 : cursorPlace - 1;
      if (cursorPlace === 0 && textInput.length > 0) {
        textInput = textInput.split('');
        textInput.unshift(value);
        textInput = textInput.join('');
      } else if (textInput.length > 0) {
        textInput = textInput.split('').map((item, index) => {
          let newItem = index === newPlace ? item + value : item;
          return newItem;
        }).join('');
      } else {
        textInput = value;
      }

      this.textareaItem.value = textInput;
      this.textareaItem.selectionEnd = (cursorPlace + value.length);
      this.textareaItem.selectionStart = this.textareaItem.selectionEnd;
      this.textareaItem.focus();
    };

    switch (keySym.split(' ')[0]) {
      case 'Enter': valueKey = '\n';
        changeArea(valueKey);
        break;
      case 'Tab': valueKey = '\t';
        changeArea(valueKey);
        break;
      case 'Backspace': focusArea('Back');
        break;
      case 'Del': focusArea('Del');
        break;
      default: changeArea(valueKey);
        break;
    }
  };
}

const keyboard = new Keyboard().init();

export default keyboard;

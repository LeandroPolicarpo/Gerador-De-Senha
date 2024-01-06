/**
 * Gerenciador de senhas 
 **/

const _password = {
    value: '',
    length: 15,
    characters: {
        numbers: '012345678910',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        special: '?/~^{}[]!@#$%&*()_-+=.,:;'
    },
    generate(chars) {
        let pwd = '';

        this.length = this.length < 6 || this.length > 15 ? 15 : this.length;

        chars = chars || Object.values(this.characters).join();

        for (let i = 0; i < this.length; i++) {
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }

        this.value = pwd;
        return pwd;
    }
}


/**
 * Gerador de senhas
 **/

const pwdContent = document.getElementById('pwdContent');
const btnGenerate = document.getElementById('btnGenerate');

const pwdRange = document.getElementById('pwdRange');
const pwdRangeStatus = document.getElementById('pwdRangeStatus');
const pwdInputsChars = document.getElementById('pwdInputsChars').getElementsByTagName('input');

function pwdGenerator() {

    let chars = '';

    for (let i = 0; i < pwdInputsChars.length; i++) {
        if (pwdInputsChars[i].checked) {
            chars += _password.characters[pwdInputsChars[i].name];
        }
    }

    _password.length = pwdRange.value;
    pwdContent.textContent = _password.generate(chars);
}

pwdRange.addEventListener('input', (evt) => {
    pwdRangeStatus.textContent = evt.currentTarget.value;
})

btnGenerate.addEventListener('click', pwdGenerator);
pwdRange.addEventListener('change', pwdGenerator);
for (let i = 0; i < pwdInputsChars.length; i++) {
    pwdInputsChars[i].addEventListener('change', pwdGenerator);
}

pwdGenerator();


/**
 * Método para copiar senha
 */

const btnCopy = document.getElementById('btnCopy');
btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(_password.value)
    btnCopy.textContent = 'Copiado!';
    setTimeout(() => {
        btnCopy.textContent = 'Copiar';
    }, 2000);
})
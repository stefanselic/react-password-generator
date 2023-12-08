/** @format */

import styles from './App.module.scss';
import { Copy } from 'lucide-react';
import { useState, useRef } from 'react';
import { COPY_SUCCESS, ALERT } from './Message';
import {
  number,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './Characters';

export default function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUpperCase] = useState(true);
  const [lowercase, setLowerCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const copyBtn = useRef();
  const handleGeneratePassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      alert(ALERT);
    }

    let characterList = '';
    if (uppercase) {
      characterList += upperCaseLetters;
    }
    if (lowercase) {
      characterList += lowerCaseLetters;
    }
    if (numbers) {
      characterList += number;
    }
    if (symbols) {
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  };
  const passwordCreator = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  };

  const handleCopyPassword = () => {
    // Create a temporary input element to copy the password
    const tempInput = document.createElement('input');
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(COPY_SUCCESS);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.generator}>
          <h2 className={styles.generatorHeader}>Password Generator</h2>
          <div className={styles.generatorPassword}>
            {password}
            <button
              className={styles.generatorButton}
              ref={copyBtn}
              onClick={handleCopyPassword}>
              <Copy />
            </button>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password-length">Password length</label>
            <input
              name="password-length"
              id="password-length"
              type="number"
              max="20"
              min="7"
              defaultValue={passwordLength}
              onChange={(event) => setPasswordLength(event.currentTarget.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
            <input
              id="uppercase-letters"
              className="uppercase-letters"
              type="checkbox"
              checked={uppercase}
              onChange={(event) => setUpperCase(event.currentTarget.checked)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lowercase">Include Lower Case Letters</label>
            <input
              id="lowercase-letters"
              className="lowercase-letters"
              type="checkbox"
              checked={lowercase}
              onChange={(event) => setLowerCase(event.currentTarget.checked)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              id="include-numbers"
              className="include-numbers"
              type="checkbox"
              checked={numbers}
              onChange={(event) => setNumbers(event.currentTarget.checked)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              id="include-symbols"
              className="include-symbols"
              type="checkbox"
              checked={symbols}
              onChange={(event) => setSymbols(event.currentTarget.checked)}
            />
          </div>
          <button
            className={styles.generatePasswordButton}
            onClick={handleGeneratePassword}>
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

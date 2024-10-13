// testHashing.js
const bcrypt = require('bcrypt');

async function testHashing() {
    const password = '123456'; // Пароль, который вы использовали для регистрации
    const hashedPasswordFromDb = '$2b$10$FsWvFIEuVGM20R1gNL0htuKOsgnurV0fU1hmHLMpovUIEYKp0JDoS'; // Новый хэш из базы данных

    const isMatch = await bcrypt.compare(password, hashedPasswordFromDb);
    console.log('Пароли совпадают:', isMatch); // Это должно вернуть true
}

testHashing();

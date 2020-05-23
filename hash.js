const bcrypt = require('bcrypt');

async function getHash()
{
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash('password123',salt);
    console.log(salt);
    console.log(hash);
}

getHash();



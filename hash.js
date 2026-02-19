import bcrypt from 'bcryptjs';

const hash = await bcrypt.hash('HelloWorldWebvertize!23', 12);

console.log('hashed password is: ', hash);

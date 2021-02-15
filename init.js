const bcrypt = require('bcrypt');
const User = require('./models/user');

module.exports = async () => {
  if ((await User.find()).length == 0) {
    console.log('No users found. Created default user (user, p@ssword).');
    try {
      const hashedPassword = await bcrypt.hash('p@ssword', 10);
      const newUser = new User({
        username: 'user',
        password: hashedPassword,
      });
      await newUser.save();
    } catch (err) {
      console.log(err);
    }
  }
};

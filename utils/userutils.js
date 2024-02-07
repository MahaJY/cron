const User = require('../models/usermodel');
const cron = require('node-cron');

const getUsers = async (req,res) => {
  try {
    const users = await User.findAll();
    console.log('Fetched users:', users);

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const scheduleGetUsersTask = () => {
    const corn = cron.schedule('*/40 * * * * *', async () => {
      console.log('Running getUsers task at:', new Date());
      try {
         await getUsers();
        corn.stop();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }, {
      scheduled: true,
      timezone: "UTC" 
    });
  };

module.exports = { getUsers, scheduleGetUsersTask };
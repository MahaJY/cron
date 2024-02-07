const {  scheduleGetUsersTask,upload,exceltosql} = require('../utils/userutils');
const UserAuth = require('../models/empmodel'); 
const ExcelJS = require('exceljs');
const cron = require('node-cron')
const uploadJob = ()=>{
    const corn =cron.schedule('*/30 * * * * *', async () => {
        console.log('Running importing data from excel task at:', new Date());
    try {
      await upload();
      corn.stop();
    } catch (error) {
      console.error('Error executing upload function:', error.message);
    }
  }, {
    scheduled: true,
    timezone: "UTC" 
  });
};
  const exportExcel = ()=>{
    const cronjob1 = cron.schedule('*/30 * * * * * ',async () => {
        console.log('Running exporting data from sql  task at:', new Date());
        try{
            await exceltosql();
            cronjob1.stop();
          } catch (error) {
            console.error('Error executing upload function:', error.message);
          }
        
      }, {
          scheduled: true,
          timezone: "UTC" 
        });
      };

const getAllUsers = async (req, res) => {
    try {
      const users=await scheduleGetUsersTask();
      res.status(201).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



module.exports = { getAllUsers,uploadJob,exportExcel };

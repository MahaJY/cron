const {  scheduleGetUsersTask } = require('../utils/userutils');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/empmodel'); 
const jwtutils = require('../utils/jwtutils');
const ExcelJS = require('exceljs');
const bcrypt = require('bcrypt');
const cron = require('node-cron')

const importExcel = () => {
    const cronjob = cron.schedule('*/50 * * * * *', async (req,res) => {
      try {
        const filePath = req.body.filePath;
  
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
  
        await worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
          if (rowNumber > 1) {
            const data = row.values;
            console.log('Row values:', data);
            if (data[1] && data[2] && data[3] && data[4] && data[5] && data[6]) {
              const hashedPassword = bcrypt.hashSync(data[6], 10);
              await UserAuth.create({
                id: data[1],
                name: data[2],
                jobtitle: data[3],
                department: data[4],
                username: data[5],
                password: hashedPassword,
                role: data[7],
              });
            } else {
              console.error('Incomplete data in Excel row:', data);
            }
          }
        });
        cronjob.stop();
  
        return res.status(200).json({ message: 'Data imported successfully' });
      } catch (error) {
        console.error('Error importing data:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }, {
      scheduled: true,
      timezone: 'UTC'
    });
    return cronjob;
  };

const exportExcel = ()=>{
    const cronjob1 = cron.schedule('*/20 * * * * * ',async (req, res) => {
  
    try {
      const emp = await UserAuth.findAll();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('sheet 1');
      const headers = Object.keys(UserAuth.rawAttributes);
      worksheet.addRow(headers);
      emp.forEach(employee => {
          const rowData = Object.values(employee.dataValues);
          console.log(rowData);
          worksheet.addRow(rowData);
        });
      const filePath='C:/Users/Asus/Desktop/nodejs_pratice/empexcel.xlsx'
      await workbook.xlsx.writeFile(filePath);
  
      console.log('Data exported to Excel file:', filePath);
      res.status(200).json({ message: 'Data exported to Excel successfully', filePath });
      cronjob1.stop();
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  },true,"UTC");}

const getAllUsers = async (req, res) => {
    try {
      const users=await scheduleGetUsersTask();
      res.status(201).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



module.exports = { getAllUsers,importExcel,exportExcel };
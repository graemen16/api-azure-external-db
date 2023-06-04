const dotenv=require('dotenv').config();
export const config= {
    db_string: process.env.DB_STRING,
    listPerPage: 10    
  };
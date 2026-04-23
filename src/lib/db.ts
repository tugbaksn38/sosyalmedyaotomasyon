//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\lib\db.ts

import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function connectDB() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

export async function query(sqlText: string, params?: any[]) {
  const pool = await connectDB();
  const request = pool.request();

  if (params) {
    params.forEach((param, index) => {
      request.input(`p${index}`, param);
    });
  }

  const result = await request.query(sqlText);
  return result.recordset;
}



/*
import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool: sql.ConnectionPool | null = null;

export async function connectDB() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

*/

/*
import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  options: {
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function connectDB() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}
*/
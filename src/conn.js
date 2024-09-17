const oracledb = require('oracledb');

const config = {
  user: 'dbahums',         
  password: 'hums@lock573',       
  connectString: '192.168.10.236:1521/sml'
};

// Necessário para a versão atual do banco Oracle
oracledb.initOracleClient({ libDir: '' });

async function connectToOracle() {
  let connection;

  try {
    connection = await oracledb.getConnection(config);
    // console.log('Conectado ao Oracle!');
    return connection; 
  } catch (err) {
    console.error('Erro ao conectar ao Oracle:', err);
    throw err;
  }
}

module.exports = connectToOracle; 

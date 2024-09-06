// Necessario a biblioteca: npm install oracledb

const oracledb = require('oracledb');

const config = {
  user: '',         
  password: '',       
  connectString: ''
};

// Necessário para a versão atual do banco oracle, alterar para instancia oracle instalada
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_12' });

async function connectToOracle() {
  let connection;

  try {
    connection = await oracledb.getConnection(config);
    console.log('Conectado ao Oracle!');

    // select simples da funão de data e hora atual do banco
    const result = await connection.execute(`SELECT sysdate FROM dual`);
    console.log(result.rows);

  } catch (err) {
    console.error('Erro ao conectar ao Oracle:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

connectToOracle();
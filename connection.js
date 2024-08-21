const oracledb = require('oracledb');

async function run() {
  let connection;

  try {
    // Tenta estabelecer a conexão
    connection = await oracledb.getConnection({
      user: 'system',
      password: '159753',
      connectString: 'localhost:1521/XE'  // Exemplo: 'localhost/XE' ou 'hostname:porta/SID'
    });

    console.log('Conexão bem-sucedida!');

    // Execute alguma consulta para testar
    const result = await connection.execute(`SELECT 'Conexão bem-sucedida!' AS status FROM dual`);
    console.log(result.rows[0][0]);

  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
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

run();
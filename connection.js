const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_12'});

async function run() {
  let connection;

  try {
    // Tenta estabelecer a conexão
    // connection = await oracledb.getConnection({
    //   user: 'system',
    //   password: '159753',
    //   connectString: 'localhost:1521/XE'  // Exemplo: 'localhost/XE' ou 'hostname:porta/SID'
    // });

    connection = await oracledb.getConnection({
        user: 'dbamv',
        password: 'suporte@98huI*!',
        connectString: '192.168.10.236:1521/sml'  // Exemplo: 'localhost/XE' ou 'hostname:porta/SID'
      });

    console.log('Conexão bem-sucedida!');

    // Execute alguma consulta para testar
    const result = await connection.execute(`SELECT dt_atendimento FROM dbamv.atendime where cd_atendimento = 654`);
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
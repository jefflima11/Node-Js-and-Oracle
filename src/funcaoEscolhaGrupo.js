const connectionDatabase = require("./conn");
const consultaPrincipal = require("./consultaFormatada");
const messageFormat = require("./messageFormat");


async function retornaDados(codigoPrestador, dataCompetencia, procedimentos) {
    const db = await connectionDatabase();
    try {
        // Obtenha a consulta SQL formatada
        let consulta = consultaPrincipal(procedimentos);
        
        // Passa as variáveis bind ao executar a consulta
        let resultadoConsulta = await db.execute(consulta, {
            dataCompetencia,  // Valor para o placeholder :dataCompetencia
            codigoPrestador  // Valor para o placeholder :codigoPrestador
        });
        
        // console.log(consulta);
        // console.log(resultadoConsulta.rows);

        for (let i = 0; i < resultadoConsulta.rows.length; i++) {
            let row = resultadoConsulta.rows[i];
            
            // Exibe informações formatadas sobre cada linha do resultadoConsultaado
            messageFormat(row[0], row[1], row[2], row[3], row[4]);
        }
    } catch (error) {
        console.error(`Erro ao realizar a execução: ${error.message}`);
    } finally {
        await db.close();
    }
}

module.exports = retornaDados;
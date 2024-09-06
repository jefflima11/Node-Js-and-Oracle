const connectionDatabase = require("./connection");


let dtCompetencia = '01/07/2024';
let cdPrestador ;

async function executeQuery() {
    const db = await connectionDatabase(); 
    let query = ``;

    const binds = {
        cdPrestador: cdPrestador || null, 
        dtCompetencia: dtCompetencia || null  
    };
    try {
        const result = await db.execute(query, binds); 
        console.log('Resultados da consulta:', result.rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        try {
            await db.close();
        } catch (closeErr) {
            console.error('Erro ao fechar a conexão:', closeErr);
        }
    }
}

executeQuery();

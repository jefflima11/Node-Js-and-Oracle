const connectionDatabase = require("./conn");


function excolheGrupo(codGrupo){
    if(codGrupo == 1) {
        return [
            "99990135","99990037","99990038","99990039","99990040",
            "99990041","99990042","99990043","99990044","99990045",
            "99990046","99990047","99990048","99990049"];
    } if (codGrupo == 2) {
        return [
            
        ]
    }
    else {
        return [];
    }
};

let proFatOtorrino = excolheGrupo(1);

async function executeTeste(proFatOtorrino) {
    const db = await connectionDatabase();
    
    try {
        let query = `SELECT CD_PRO_FAT, DS_PRO_FAT FROM DBAMV.PRO_FAT WHERE CD_PRO_FAT IN (${proFatOtorrino.map(value => `'${value}'`).join(', ')})`;
        let result = await db.execute(query);   
        console.log(result.rows);
        // console.log(profatTest);
    } catch (error){
        console.error(`Erro ao realizar a execução ${error.message}`);
    } finally {
        await db.close();  
    }
}

executeTeste(proFatOtorrino);
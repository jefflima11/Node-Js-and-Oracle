const connectionDatabase = require("./conn");
const primaryQuery = require("./f-query");
const messageFormat = require("./messageFormat");

// true: Provider || false: Group
let grupo = 2;


function chooseProviderOrGroup(chooseProviderOrGroup, grupo, providerAndGroup) {
    if (chooseProviderOrGroup === true) {
        console.log("é prestador");
    } else {
        console.log("é grupo");

        // Filtra os itens do array que possuem o mesmo valor de group
        const matchingItems = providerAndGroup.filter(item => item.group === grupo);

        // Extrai os valores de prestador dos itens filtrados
        const teste = matchingItems.map(item => item.prestador);

        console.log(`Os valores de teste são: ${teste.join(', ')}`); // Exibe os valores de teste
    }
}

// Exemplo de providerAndGroup
let providerAndGroup = [
    {
        prestador: 245,
        group: 1
    },
    {
        prestador: 388,
        group: 1
    },
    {
        prestador: 230,
        group: 2
    },
    {
        prestador: 450,
        group: 1
    }
];

// Chamada da função com o grupo 1
chooseProviderOrGroup(false, 1, providerAndGroup);


function returnsGroupProcedure(providerOrGroup) {
    switch (providerOrGroup) {
        case 1:
            return [
                "99990135", "99990037", "99990038", "99990039", "99990040",
                "99990041", "99990042", "99990043", "99990044", "99990045",
                "99990046", "99990047", "99990048", "99990049"
            ];
        case 2:
            return ["31303188"];
        case 3:
            return ["10101006"];
        default:
            return [];
    }
}




async function returnsData(providerOrGroup, dtComp, cdPrestador) {
    const chooseGroup = returnsGroupProcedure(providerOrGroup);  // Escolhe o grupo com base no código

    if (chooseGroup.length === 0) {
        console.error("Nenhum grupo encontrado para o código fornecido.");
        return;
    }

    const db = await connectionDatabase();
    
    try {
        // Obtenha a consulta SQL formatada
        let query = primaryQuery(chooseGroup);
        
        // Passa as variáveis bind ao executar a consulta
        let result = await db.execute(query, {
            dtComp,  // Valor para o placeholder :dtComp
            cdPrestador  // Valor para o placeholder :cdPrestador
        });
        
        for (let i = 0; i < result.rows.length; i++) {
            let row = result.rows[i];

            // Exibe informações formatadas sobre cada linha do resultado
           messageFormat(row[0], row[1], row[2], row[3], row[4]);
        }
    } catch (error) {
        console.error(`Erro ao realizar a execução: ${error.message}`);
    } finally {
        await db.close();
    }
}

returnsData(2, '07/24', null);  // Aqui, null indica que não está filtrando por prestador

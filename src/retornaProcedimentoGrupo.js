function retornaProcedimentoGrupo(prestadorOuGrupo) {
    let procedimentosDoGrupo;

    switch (prestadorOuGrupo) {
        case 1:
            procedimentosDoGrupo = [
                "99990135", "99990037", "99990038", "99990039", "99990040",
                "99990041", "99990042", "99990043", "99990044", "99990045",
                "99990046", "99990047", "99990048", "99990049"
            ];
            break;
        case 2:
            procedimentosDoGrupo = ["31303188"];
            break;
        case 3:
            procedimentosDoGrupo = ["10101006"];
            break;
        case 4:
            procedimentosDoGrupo = ["01000118", "03010113"];
            break;
        default:
            procedimentosDoGrupo = [];
            break;
    }

    let regra = retornaRegraDeProcedimentos(procedimentosDoGrupo.length);

    return retornaTipoDeFiltro(regra, procedimentosDoGrupo);
}

function retornaRegraDeProcedimentos(tamanho) {
    if (tamanho >= 2) {
        return 1;
    } else {
        return 2;
    }
}

function retornaTipoDeFiltro(RegraDeProcedimento, procedimentosDoGrupo) {
    switch (RegraDeProcedimento) {
        case 1:
            return `AND IRF.CD_PRO_FAT IN (${procedimentosDoGrupo.map(value => `'${value}'`).join(', ')})`;
        default:
            return `AND IRF.CD_PRO_FAT = '${procedimentosDoGrupo[0]}'`;
    }
}

module.exports = { retornaProcedimentoGrupo };


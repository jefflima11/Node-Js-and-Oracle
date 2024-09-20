// Função que retorna uma consulta SQL formatada

function consultaPrincipal(procedimentos, codigoPrestador, dataCompetencia) {
    return `
        SELECT DISTINCT
            PA.NM_PRESTADOR,
            'PC: ' || PF.CD_PRO_FAT || ' , PAC: ' || P.NM_PACIENTE || ' , DATA: ' || TO_CHAR(IRF.DT_LANCAMENTO, 'DD/MM/YYYY') AS DESCRICAO,
            PF.CD_PRO_FAT,
            ROWNUM AS TST,
            PA.CD_PRESTADOR
        FROM DBAMV.REG_FAT RF
            INNER JOIN DBAMV.ITREG_FAT IRF ON RF.CD_REG_FAT = IRF.CD_REG_FAT
            INNER JOIN DBAMV.REMESSA_FATURA RE ON RF.CD_REMESSA = RE.CD_REMESSA
            INNER JOIN DBAMV.FATURA F ON RE.CD_FATURA = F.CD_FATURA
            INNER JOIN DBAMV.AVISO_CIRURGIA AC ON RF.CD_ATENDIMENTO = AC.CD_ATENDIMENTO
            INNER JOIN DBAMV.CIRURGIA_AVISO CA ON AC.CD_AVISO_CIRURGIA = CA.CD_AVISO_CIRURGIA
            INNER JOIN DBAMV.PRESTADOR_AVISO PA ON AC.CD_AVISO_CIRURGIA = PA.CD_AVISO_CIRURGIA
                AND CA.CD_CIRURGIA_AVISO = PA.CD_CIRURGIA_AVISO
            INNER JOIN DBAMV.ATENDIME A ON RF.CD_ATENDIMENTO = A.CD_ATENDIMENTO
            INNER JOIN DBAMV.PACIENTE P ON A.CD_PACIENTE = P.CD_PACIENTE
            INNER JOIN DBAMV.PRO_FAT PF ON IRF.CD_PRO_FAT = PF.CD_PRO_FAT
        WHERE PA.CD_ATI_MED = 01
        ${procedimentos}
        AND TO_CHAR(IRF.DT_LANCAMENTO, 'MM/YY') = :dataCompetencia
        AND PA.CD_PRESTADOR IN (:codigoPrestador)
        AND CA.SN_PRINCIPAL = 'S'
        ORDER BY 5
    `;
}

module.exports = consultaPrincipal;

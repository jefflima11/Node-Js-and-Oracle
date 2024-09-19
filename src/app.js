const readline = require('readline');
const prestadorGrupo = require("./prestadorGrupo");
const retornaDados = require("./funcaoEscolhaGrupo");
const { retornaProcedimentoGrupo } = require("./retornaProcedimentoGrupo");

// Cria interface para entrada e saída no console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pergunta inicial ao usuário
console.log(`Grupo ou Prestador?\n\np => Prestador\ng => Grupo\n`);
rl.question('Escolha: \n', (escolha) => {
    if (escolha === 'p') {
        // Solicita código do prestador e competência
        rl.question('\nInforme o código do prestador: \n', (prestador) => {
           rl.question('\nInforme a competencia: ', (competencia) => {
                console.log("\n");  
                
                // Filtra grupo com base no prestador informado
                let escolhendoPrestadorGrupo = prestadorGrupo.filter(prest => prest.prestador == prestador).map(grupo => grupo.group);
               
                // Executa função com dados filtrados
                retornaDados(prestador, competencia, retornaTipoDeFiltro(escolhendoPrestadorGrupo[0]));
                
                rl.close();
            });
        });
    } else if(escolha === 'g') {
        // Opção 'Grupo' escolhida
        console.log("Você escolheu Grupo");
        rl.question('\nInforme o código do grupo de repasse: \n', (grupo) => {
            rl.question('\nInforme a competencia: ', (competencia) => {
                console.log("\n");

                let prestadoresDoRepasse = prestadorGrupo.filter(prest => prest.group == grupo).map(prest => prest.prestador);
                console.log(prestadoresDoRepasse);
                console.log(grupo);

                for (let i = 0; i < prestadoresDoRepasse.length; i++) {
                    const element = prestadoresDoRepasse[i];
                    retornaDados(element, competencia, retornaProcedimentoGrupo(grupo));
                    console.log(retornaProcedimentoGrupo(grupo));
                }

                rl.close();
            })
        });
    } else {
        // Opção inválida
        console.log("Opção não disponível");
        rl.close();
    };
});

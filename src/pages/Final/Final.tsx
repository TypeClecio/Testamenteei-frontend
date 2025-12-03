import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Final.style.scss";
import Marca from "../../assets/components/Marca/Marca";

// interface classificado {
//   id?: number;
//   criado_em?: string;
//   jogador: string;
//   acertos: number;
//   tempo: number;
// }

const Final: React.FC = () => {
  const navigate = useNavigate();

  // const [listaClassificados, setListaClassificados] = useState<classificado[]>([]);
  // const [foiClassificado, setFoiClassificado] = useState<boolean>(false);
  // const [carregando, setCarregando] = useState<boolean>(true);

  // const medirPontuacao = async (data: classificado[]) => {
  //   const acertosJogador = Number(localStorage.getItem("acertos")) ?? 0;
  //   const tempoJogador = Number(localStorage.getItem("tempo")) ?? 0;
  //   const nomeJogador = localStorage.getItem("jogador") ?? "";

  //   // Verificar se o jogador já existe na lista
  //   const jogadorExiste = data.some(
  //     (c) => c.jogador.toLowerCase() === nomeJogador.toLowerCase()
  //   );

  //   // Se não existe, criar novo classificado
  //   let listaAtualizada = data;
  //   if (!jogadorExiste) {
  //     const novoClassificado: classificado = {
  //       jogador: nomeJogador,
  //       acertos: acertosJogador,
  //       tempo: tempoJogador
  //     };
  //     listaAtualizada = [...data, novoClassificado];
  //   }

  //   // Ordenar por acertos (decrescente) e tempo (crescente como desempate)
  //   listaAtualizada.sort((a, b) => {
  //     if (b.acertos !== a.acertos) {
  //       return b.acertos - a.acertos; // Mais acertos primeiro
  //     }
  //     return a.tempo - b.tempo; // Menos tempo como desempate
  //   });

  //   // Verificar se o jogador está no top 5
  //   const posicaoJogador = listaAtualizada.findIndex(
  //     (c) => c.jogador.toLowerCase() === nomeJogador.toLowerCase()
  //   );

  //   const estaNoTop5 = posicaoJogador >= 0 && posicaoJogador < 5;
  //   setFoiClassificado(estaNoTop5);

  //   // Manter apenas os 5 melhores
  //   const top5 = listaAtualizada.slice(0, 5);

  //   // Atualizar state com a lista atualizada
  //   setListaClassificados(top5);

  //   // Se foi classificado, enviar para o banco de dados
  //   if (estaNoTop5) {
  //     await enviarClassificacaoAoBancoDados({
  //       jogador: nomeJogador,
  //       acertos: acertosJogador,
  //       tempo: tempoJogador
  //     });
  //   }

  //   setCarregando(false);
  // };

  // const enviarClassificacaoAoBancoDados = async (novoClassificado: classificado) => {
  //   try {
  //     const response = await fetch("http://localhost:3000/classificados/atualizar", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(novoClassificado)
  //     });

  //     if (!response.ok) {
  //       const erro = await response.json();
  //       console.error('Erro ao enviar classificação:', erro);
  //       return;
  //     }

  //     const resultado = await response.json();
  //     console.log('Classificação atualizada com sucesso:', resultado);
  //   } catch (error) {
  //     console.error('Erro ao enviar classificação:', error);
  //   }
  // };

  const jogarNovamente = () => {
    if (!localStorage.getItem("jogador")) return navigate("/inicio");
    navigate("/jogatina", { replace: true });
    location.reload();
  };

  useEffect(() => {
    // document.title = "Final | Testamenteei";

    // const obterClassificacao = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/classificados/obter", {
    //       method: "GET",
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     });

    //     const { data } = await response.json();
    //     medirPontuacao(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // obterClassificacao();
  }, []);

  return (
    <main id="inicio">
      <Marca />

      <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ul id="melhores-jogadores">
          <li>
            <span>53</span>
            <span>Ruth</span>
          </li>
          <li>
            <span>50</span>
            <span>Clécio</span>
          </li>
          {/* {listaClassificados.map(({ jogador, acertos }, index) => (
            <li key={index}>
              <span>{acertos}</span>
              <span>{jogador}</span>
            </li>
          ))} */}
        </ul>
      </section>

      <section id="jogar">
        <h3>Seu resultado</h3>
        <div>
          <ul>
            <li>Acertos: {Number(localStorage.getItem("acertos")) ?? 0}</li>
            <li>Tempo decorrido: {Number(localStorage.getItem("tempo")) ?? 0}s</li>
            {/* <li>{foiClassificado ? "Classificado no top 5!" : "Não classificado"}</li> */}
          </ul>

          <button onClick={() => jogarNovamente()}>
            {"Jogar novamente"}
          </button>
        </div>
      </section>

      <section id="desenvolvedor">
        <h3>Desenvolvedor</h3>
        <div id="info-desenvolvedor">
          <img src={logoTypeclecio} alt="typeclecio" />

          <div>
            <a href="https://www.instagram.com/typeclecio/" target="_blank">@typeclecio</a>
            <h2>Clécio Duarte</h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Final;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollText } from "lucide-react";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Final.style.scss";

interface classificado {
  id?: number;
  created_at?: string;
  jogador: string;
  acertos: number;
  tempo: number;
}

const Final: React.FC = () => {
  const navigate = useNavigate();

  const [listaClassificados, setListaClassificados] = useState<classificado[]>([]);
  const [foiClassificado, setFoiClassificado] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);

  const medirPontuacao = async (data: classificado[]) => {
    const acertosJogador = Number(localStorage.getItem("acertos")) ?? 0;
    const tempoJogador = Number(localStorage.getItem("tempo")) ?? 0;
    const nomeJogador = localStorage.getItem("jogador") ?? "";

    // Criar novo classificado com dados do jogador atual
    const novoClassificado: classificado = {
      jogador: nomeJogador,
      acertos: acertosJogador,
      tempo: tempoJogador
    };

    // Adicionar o novo classificado à lista
    const listaAtualizada = [...data, novoClassificado];

    // Ordenar por acertos (decrescente) e tempo (crescente como desempate)
    listaAtualizada.sort((a, b) => {
      if (b.acertos !== a.acertos) {
        return b.acertos - a.acertos; // Mais acertos primeiro
      }
      return a.tempo - b.tempo; // Menos tempo como desempate
    });

    // Verificar se o jogador está no top 5
    const posicaoJogador = listaAtualizada.findIndex(
      (c) => c.jogador === nomeJogador && c.acertos === acertosJogador && c.tempo === tempoJogador
    );

    const estaNoTop5 = posicaoJogador < 5;
    setFoiClassificado(estaNoTop5);

    // Se estiver no top 5, manter apenas os 5 melhores
    const top5 = estaNoTop5 ? listaAtualizada.slice(0, 5) : listaAtualizada.slice(0, 5);

    // Atualizar state com a lista atualizada
    setListaClassificados(top5);

    // Se foi classificado, fazer POST para o banco de dados
    if (estaNoTop5) {
      await enviarClassificacaoAoBancoDados(top5);
    }

    setCarregando(false);
  };

  const enviarClassificacaoAoBancoDados = async (listaAtualizada: classificado[]) => {
    try {
      const response = await fetch("http://localhost:3000/classificados", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: listaAtualizada })
      });

      if (!response.ok) {
        const erro = await response.json();
        console.error('Erro ao enviar classificação:', erro);
        return;
      }

      const resultado = await response.json();
      console.log('Classificação atualizada com sucesso:', resultado);
    } catch (error) {
      console.error('Erro ao enviar classificação:', error);
    }
  };

  const jogarNovamente = () => {
    if (!localStorage.getItem("jogador")) return navigate("/inicio");
    navigate("/jogatina", { replace: true });
    location.reload();
  };

  useEffect(() => {
    document.title = "Final | Testamenteei";

    const obterClassificacao = async () => {
      try {
        const response = await fetch("http://localhost:3000/classificados", {
          method: "GET",
          credentials: "include", // <- envia cookies ou credenciais da sessão
          headers: {
            "Content-Type": "application/json"
          }
        });

        const { data } = await response.json();
        if (!response.ok) {
          console.error('Erro ao obter classificação:', data);
          return;
        }

        setListaClassificados(data);
        medirPontuacao(data);
      } catch (error) {
        console.log(error);
      }
    }

    obterClassificacao();
  }, []);

  return (
    <main id="inicio">
      <h1>
        <ScrollText id="logo" size={32} strokeWidth={3} />
        Testamenteei
      </h1>

      <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ul id="melhores-jogadores">
          {listaClassificados.map(({ id, jogador, acertos }) => (
            <li key={id}>
              <span>{acertos}</span>
              <span>{jogador}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="jogar">
        <h3>Seu resultado</h3>
        <div>
          <ul>
            <li>Acertos: {localStorage.getItem("acertos") ?? 0}</li>
            <li>Tempo decorrido: {localStorage.getItem("tempo") ?? 0}s</li>
            <li>{foiClassificado ? "Classificado no top 5!" : "Não classificado"}</li>
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
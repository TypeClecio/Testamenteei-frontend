import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Final.style.scss";
import Marca from "../../assets/components/Marca/Marca";
import { getApiUrl, API_ENDPOINTS } from "../../config/api";
import initialLivros from "../../assets/uteis/livros";

interface JogadorTop {
  tempo: string;
  nome: string;
  criado_em: string;
}

const Final: React.FC = () => {
  const navigate = useNavigate();
  const [jogadoresTop, setJogadoresTop] = useState<JogadorTop[]>([]); // Lista dos 5 melhores jogadores

  const carregarJogadoresDoCache = () => {
    const cached = localStorage.getItem("jogadoresTop");
    if (cached) {
      try {
        const jogadores = JSON.parse(cached) as JogadorTop[];
        setJogadoresTop(jogadores);
      } catch (error) {
        console.error("Erro ao carregar jogadores do cache:", error);
      }
    }
  };

  const jogarNovamente = () => {
    if (!localStorage.getItem("jogador")) return navigate("/inicio", { replace: true });
    navigate("/jogatina", { replace: true });
    location.reload();
  };

  useEffect(() => {
    const salvarJogador = async () => {
      const acertos = Number(localStorage.getItem("acertos")) ?? 0;
      const tempo = Number(localStorage.getItem("tempo")) ?? 0;
      const nome = localStorage.getItem("jogador") ?? "";

      // Condição: Jogador não acertou todos os livros (66 no total)
      const errouMeta = acertos < initialLivros.length;
      
      if (errouMeta) {
        // Carrega a lista de top jogadores do cache (localStorage)
        carregarJogadoresDoCache();
        return;
      }

      // Envia ao Backend o resultado da partida
      await fazerPostSalvarJogador(nome, tempo);
    };

    salvarJogador();
  }, []); // Executa ao carregar a página

  const fazerPostSalvarJogador = async (nome: string, tempo: number) => {
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.CRIAR_CLASSIFICACAO), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          tempo: tempo,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar jogador");

      const resultado = await response.json();
      if (resultado.sucesso) {
        setJogadoresTop(resultado.novoRanking);
      }
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };

  return (
    <main id="inicio">
      <Marca />

      <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ul id="melhores-jogadores">
          {jogadoresTop.map((jogador, index) => (
            <li key={index}>
              <span>{jogador.tempo}</span>
              <span>{jogador.nome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="jogar">
        <h3>Seu resultado</h3>
        <div>
          <ul>
            <li>Acertos: {Number(localStorage.getItem("acertos")) ?? 0}</li>
            <li>Tempo decorrido: {Number(localStorage.getItem("tempo")) ?? 0}s</li>
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
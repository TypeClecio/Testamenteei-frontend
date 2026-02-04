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

      // Condição 1: Jogador acertou todos os livros (22 no total)
      const acertouTodos = acertos >= initialLivros.length;

      if (!acertouTodos) {
        // Carrega a lista de top jogadores do cache (localStorage)
        carregarJogadoresDoCache();
        return;
      }

      // Condição 2: Verificar se tempo é menor que o último do ranking
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.OBTER_CLASSIFICACAO));
        if (!response.ok) throw new Error("Erro ao buscar jogadores");

        const data = await response.json();
        const jogadores: JogadorTop[] = data.jogadores || [];

        if (jogadores.length === 0) {
          // Se não há jogadores, salva automaticamente
          await fazerPostSalvarJogador(nome, tempo);
          return;
        }

        const ultimoDoRanking = Number(jogadores[jogadores.length - 1].tempo);

        if (tempo < ultimoDoRanking || jogadores.length < 5) {
          // Se tempo é menor que o último OU ainda não há 5 jogadores
          await fazerPostSalvarJogador(nome, tempo);
        }
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      }
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
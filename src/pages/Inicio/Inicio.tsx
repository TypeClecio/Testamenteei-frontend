import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Inicio.style.scss";
import Marca from "../../assets/components/Marca/Marca";
import { getApiUrl, API_ENDPOINTS } from "../../config/api";

interface JogadorTop {
  tempo: string;
  nome: string;
  criado_em: string;
}

interface ApiResponse {
  jogadores: JogadorTop[];
  sucesso: boolean;
}

const Inicio: React.FC = () => {
  const navigate = useNavigate();
  const [jogador, setJogador] = useState(""); // Nome do jogador
  const [jogadoresTop, setJogadoresTop] = useState<JogadorTop[]>([]); // Lista dos 5 melhores jogadores
  const [erroApi, setErroApi] = useState(false); // Alerta de erro por não receber a lista dos CLASSIFICADOS

  const limiteDeCaracterNomeDeJogador = 10;

  const iniciarPartida = () => {
    if (!jogador) return alert("Por favor, digite seu nome para iniciar a partida.");
    navigate("/jogatina");
  }; // Função para iniciar a partida, verificando se o nome do jogador foi inserido

  useEffect(() => {
    const fetchJogadoresTop = async () => {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.OBTER_CLASSIFICACAO));
        if (!response.ok) throw new Error("Erro ao buscar jogadores");
        const dados: ApiResponse = await response.json();
        if (dados.sucesso) {
          setJogadoresTop(dados.jogadores);
          // Armazena no localStorage para uso posterior
          localStorage.setItem("jogadoresTop", JSON.stringify(dados.jogadores));
        } else {
          console.error("Erro na resposta da API:", dados);
        }
      } catch (error) {
        setErroApi(true)
      }
    };

    fetchJogadoresTop();
  }, []); // Busca os 5 melhores jogadores ao carregar a página

  useEffect(() => {
    localStorage.setItem("jogador", jogador);
  }, [jogador]); // Salva o nome do jogador no localStorage sempre que ele mudar

  useEffect(() => {
    const jogador = localStorage.getItem("jogador") || "";
    if (!jogador) return;
    setJogador(jogador);
  }, []); // Preenche o nome do jogador ao carregar a página

  return (
    <main id="inicio">
      <Marca />

      <section id="informativo">
        <h3>Conhece a Bíblia?</h3>
        <p>Consegue dizer se o livro é do antigo ou do novo testamento?</p>
      </section>

      <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ul id="melhores-jogadores">
          {
            erroApi
              ? (<p>Não foi possível carregar os Classificados.</p>)
              : jogadoresTop.map((jogador, index) => (
                <li key={index}>
                  <span>{jogador.tempo}</span>
                  <span>{jogador.nome}</span>
                </li>
              ))
          }
        </ul>
      </section>

      <section id="jogar">
        <h3>Digite o seu nome</h3>
        <div id="nome-jogador">
          <fieldset>
            <input
              name="jogador"
              type="text"
              value={jogador}
              placeholder="Digite..."
              onChange={(e) => {
                const valor = e.target.value;
                const digitado = valor.toLowerCase().trim();
                if (valor.length <= limiteDeCaracterNomeDeJogador) setJogador(digitado);
              }}
            />

            <span>{jogador.length}/{limiteDeCaracterNomeDeJogador}</span>
          </fieldset>

          <button onClick={() => iniciarPartida()}>Jogar</button>
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

export default Inicio;
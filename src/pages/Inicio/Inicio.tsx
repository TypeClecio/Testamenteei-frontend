import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollText } from "lucide-react";

// import classificados from "../../assets/uteis/classificacao";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Inicio.style.scss";

const Inicio: React.FC = () => {
  const navigate = useNavigate();

  const [jogador, setJogador] = useState("");
  // const [listaClassificados, setListaClassificados] = useState(classificados);

  const iniciarPartida = () => {
    if (!jogador) return alert("Por favor, digite seu nome para iniciar a partida.");
    navigate("/jogatina");
  }; // Função para iniciar a partida, verificando se o nome do jogador foi inserido

  useEffect(() => {
    if (!jogador) return;
    localStorage.setItem("jogador", jogador);
  }, [jogador]); // Salva o nome do jogador no localStorage sempre que ele mudar

  useEffect(() => {
    document.title = "Início | Testamenteei";

    const jogador = localStorage.getItem("jogador") || "";
    if (!jogador) return;
    setJogador(jogador);

    const obterClassificacao = async () => {
      try {
        const response = await fetch("http://localhost:3000/classificados", {
          method: "GET",
          credentials: "include", // <- envia cookies ou credenciais da sessão
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    obterClassificacao();
  }, []); // Preenche o nome do jogador ao carregar a página

  return (
    <main id="inicio">
      <h1>
        <ScrollText id="logo" size={32} strokeWidth={3} />
        Testamenteei
      </h1>

      <section id="informativo">
        <h3>Conhece a Bíblia?</h3>
        <p>Consegue dizer se o livro é do antigo ou do novo testamento?</p>
      </section>

      {/* <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ol id="melhores-jogadores" type="1">
          {listaClassificados.map(({ jogador }, index) => (
            <li key={index}>
              <span id="nome-jogador">{ jogador }</span>
            </li>
          ))}
        </ol>
      </section> */}

      <section id="jogar">
        <h3>Digite o seu nome</h3>
        <div id="nome-jogador">
          <input
            type="text"
            value={jogador}
            placeholder="Digite..."
            onChange={(e) => setJogador((e.target.value).toLowerCase())}
          />
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
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Inicio.style.scss";
import Marca from "../../assets/components/Marca/Marca";

// interface classificado {
//   id: number;
//   created_at: string;
//   jogador: string;
//   acertos: number;
//   tempo: number;
// }

const Inicio: React.FC = () => {
  const navigate = useNavigate();

  const [jogador, setJogador] = useState("");
  // const [listaClassificados, setListaClassificados] = useState<classificado[]>([]);

  const iniciarPartida = () => {
    if (!jogador) return alert("Por favor, digite seu nome para iniciar a partida.");
    navigate("/jogatina");
  }; // Função para iniciar a partida, verificando se o nome do jogador foi inserido

  useEffect(() => {
    if (!jogador) return;
    localStorage.setItem("jogador", jogador);
  }, [jogador]); // Salva o nome do jogador no localStorage sempre que ele mudar

  useEffect(() => {
    // document.title = "Test a-menteei";

    // const obterClassificacao = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/classificados/obter", {
    //       method: "GET",
    //       credentials: "include", // <- envia cookies ou credenciais da sessão
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     });

    //     const { data } = await response.json();
    //     if (!response.ok) {
    //       console.error('Erro ao obter classificação:', data);
    //       return;
    //     }

    //     setListaClassificados(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    const jogador = localStorage.getItem("jogador") || "";
    if (!jogador) return;
    setJogador(jogador);

    // obterClassificacao();
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
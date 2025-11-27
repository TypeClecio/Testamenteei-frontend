import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollText } from "lucide-react";

// import classificados from "../../assets/uteis/classificacao";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Final.style.scss";

const Final: React.FC = () => {
  const navigate = useNavigate();

  const jogarNovamente = () => {
    if (!localStorage.getItem("jogador")) return navigate("/inicio");
    navigate("/jogatina", { replace: true });
    location.reload();
  };

  useEffect(() => {
    document.title = "Final | Testamenteei"
  }, []);

  return (
    <main id="inicio">
      <h1>
        <ScrollText id="logo" size={32} strokeWidth={3} />
        Testamenteei
      </h1>

      {/* <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ol id="melhores-jogadores" type="1">
          {classificados.map(({jogador}, index) => (
            <li key={index}>{jogador}</li>
          ))}
        </ol>
      </section> */}

      <section id="jogar">
        <h3>Seu resultado</h3>
        <div>
          <ul>
            <li>Acertos: {localStorage.getItem("acertos") ?? 0}</li>
            <li>Tempo decorrido: {localStorage.getItem("tempo") ?? 0}s</li>
            <li>Você não entrou nos classificáveis</li>
          </ul>

          <button onClick={() => jogarNovamente()}>Jogar novamente</button>
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
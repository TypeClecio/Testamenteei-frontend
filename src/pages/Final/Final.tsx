import { useNavigate } from "react-router-dom";

import logoTypeclecio from "../../../public/logo-typeclecio.jpg";
import "./Final.style.scss";
import Marca from "../../assets/components/Marca/Marca";

const Final: React.FC = () => {
  const navigate = useNavigate();

  const jogarNovamente = () => {
    if (!localStorage.getItem("jogador")) return navigate("/inicio", { replace: true });
    navigate("/jogatina", { replace: true });
    location.reload();
  };

  return (
    <main id="inicio">
      <Marca />

      <section id="colocacao">
        <h3>Melhores jogadores</h3>
        <ul id="melhores-jogadores">
          <li>
            <span>36.2s</span>
            <span>Ruth</span>
          </li>
          <li>
            <span>54.8s</span>
            <span>Clécio</span>
          </li>
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LibraryBig } from "lucide-react";

import "./Jogatina.style.scss";
import initialLivros from "../../assets/uteis/livros";

const coresDoTemporizador = ["FF8E8E", "FF8E8E", "FFF28E", "FFF28E", "8EFF9B"];

const quantidadeDeLivros = initialLivros.length;

let tempoAoIniciar = new Date().getTime();;

const shuffle = <T,>(arr: T[]) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Jogatina: React.FC = () => {
  const navigate = useNavigate();

  const [tempo, setTempo] = useState(100);
  const [acertos, setAcertos] = useState(0);
  const [livroAtual, setLivroAtual] = useState<{ nome: string, testamento: string }>({ nome: "", testamento: "" });
  const [ordem] = useState(() => shuffle(initialLivros));
  const [index, setIndex] = useState(0);

  const fimDaPartida = () => {
    const tempoAoFinalizar = new Date().getTime();
    const tempoDecorrido = ((tempoAoFinalizar - tempoAoIniciar) / 1000).toFixed(1);

    localStorage.setItem("tempo", `${tempoDecorrido}`); // Salvar o tempo de jogatina
    localStorage.setItem("acertos", `${acertos}`); // Salvar a quantidade de acerto
    return navigate("/final", { replace: true });
  }

  const correcaoResposta = (resposta: string) => {
    if (livroAtual?.testamento != resposta) return fimDaPartida();
    setAcertos(a => a + 1);

    // se está no último livro, finaliza a partida
    if (index >= ordem.length - 1) return fimDaPartida();

    setTempo(100);
    setIndex(i => i + 1);
  };

  useEffect(() => {
    if (tempo === 0) {
      correcaoResposta("");
    }

    const regressivo = setTimeout(() => {
      setTempo(t => t - 20);
    }, 1000);

    return () => clearTimeout(regressivo);
  }, [tempo]); // Função para iniciar a partida com o temporizador

  useEffect(() => {
    // atualiza o livro atual quando o índice mudar
    setLivroAtual(ordem[index] || { nome: "", testamento: "" });
  }, [index, ordem]);

  useEffect(() => {
    document.title = "Jogatina | Testamenteei";
    if (acertos < 1) tempoAoIniciar = new Date().getTime();
    // já iniciamos com index 0 e ordem embaralhada
  }, []);

  return (
    <main id="jogatina">
      <section id="informativos">
        <div id="contador">
          <LibraryBig size={24} strokeWidth={2} />

          <div>
            <span id="acertos">{acertos}</span>
            <span id="quantidade-de-livros">/{quantidadeDeLivros}</span>
          </div>
        </div>

        <div id="nome-do-livro-atual">{livroAtual?.nome}</div>
      </section>

      <section id="controles">
        <div id="temporizador" style={{ width: `${tempo}%`, backgroundColor: `#${coresDoTemporizador[(tempo / 20) - 1]}` }}></div>
        <button id="antigo" onClick={() => correcaoResposta("antigo")}>ANTIGO</button>
        <button id="novo" onClick={() => correcaoResposta("novo")}>NOVO</button>
      </section>

    </main>
  );
};

export default Jogatina;
import { useEffect, useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import SeletorIdioma from './components/SeletorIdioma.jsx';
import { IDIOMAS, traduzir } from './i18n.js';

const PAGINAS = ['painel', 'colheitas', 'vendas'];

export default function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');
  const [idioma, setIdioma] = useState(() => {
    const salvo = localStorage.getItem('idioma');
    return Object.prototype.hasOwnProperty.call(IDIOMAS, salvo) ? salvo : 'pt-BR';
  });

  useEffect(() => {
    document.documentElement.lang = idioma;
    document.title = traduzir(idioma, 'marca');
  }, [idioma]);

  function alterarIdioma(novoIdioma) {
    localStorage.setItem('idioma', novoIdioma);
    setIdioma(novoIdioma);
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) {
    return <Login onLogin={setUsuario} idioma={idioma} onAlterarIdioma={alterarIdioma} />;
  }

  return (
    <>
      <header>
        <h1><span className="abacaxi-large">🍍</span> {traduzir(idioma, 'marca')}</h1>
        <nav>
          {PAGINAS.map((chave) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {traduzir(idioma, chave)}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>{traduzir(idioma, 'sair')}</button>
        </div>
        <SeletorIdioma idioma={idioma} onAlterar={alterarIdioma} />
      </header>
      <main>
        {pagina === 'painel' && <Painel idioma={idioma} />}
        {pagina === 'colheitas' && <Colheitas idioma={idioma} />}
        {pagina === 'vendas' && <Vendas idioma={idioma} />}
      </main>
    </>
  );
}

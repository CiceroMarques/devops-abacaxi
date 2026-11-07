import { useState } from 'react';
import { api } from '../api.js';
import SeletorIdioma from '../components/SeletorIdioma.jsx';
import { traduzir, traduzirErroApi } from '../i18n.js';

export default function Login({ onLogin, idioma, onAlterarIdioma }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const dados = await api('/auth/login', { method: 'POST', body: { usuario, senha } });
      localStorage.setItem('token', dados.token);
      localStorage.setItem('usuario', dados.usuario);
      onLogin(dados.usuario);
    } catch (err) {
      setErro(traduzirErroApi(err, idioma));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      <SeletorIdioma idioma={idioma} onAlterar={onAlterarIdioma} />
      <form className="card" onSubmit={entrar}>
        <h1>🍍 {traduzir(idioma, 'marca')}</h1>
        <label>
          {traduzir(idioma, 'usuario')}
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required autoFocus />
        </label>
        <label>
          {traduzir(idioma, 'senha')}
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        {erro && <p className="erro">{erro}</p>}
        <button type="submit" disabled={carregando}>
          {traduzir(idioma, carregando ? 'entrando' : 'entrar')}
        </button>
        {carregando && (
          <p className="dica">{traduzir(idioma, 'dicaApi')}</p>
        )}
      </form>
    </div>
  );
}

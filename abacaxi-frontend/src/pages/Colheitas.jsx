import { useEffect, useState } from 'react';
import { api, hoje } from '../api.js';
import { formatarData, traduzir, traduzirErroApi } from '../i18n.js';

export default function Colheitas({ idioma }) {
  const [colheitas, setColheitas] = useState([]);
  const [form, setForm] = useState({ data: hoje(), quantidade: '', observacao: '' });
  const [erro, setErro] = useState('');

  const carregar = () => api('/colheitas').then(setColheitas).catch(setErro);
  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    try {
      await api('/colheitas', {
        method: 'POST',
        body: { ...form, quantidade: Number(form.quantidade) },
      });
      setForm({ ...form, quantidade: '', observacao: '' });
      carregar();
    } catch (err) {
      setErro(err);
    }
  }

  async function excluir(id) {
    setErro('');
    try {
      await api(`/colheitas/${id}`, { method: 'DELETE' });
      carregar();
    } catch (err) {
      setErro(err);
    }
  }

  return (
    <>
      <form className="card formulario" onSubmit={salvar}>
        <h2>{traduzir(idioma, 'registrarColheita')}</h2>
        <label>
          {traduzir(idioma, 'data')}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {traduzir(idioma, 'quantidade')}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {traduzir(idioma, 'observacao')}
          <input value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} />
        </label>
        <button type="submit">{traduzir(idioma, 'salvar')}</button>
      </form>
      {erro && <p className="erro">{traduzirErroApi(erro, idioma)}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr>
              <th>{traduzir(idioma, 'data')}</th>
              <th>{traduzir(idioma, 'quantidade')}</th>
              <th>{traduzir(idioma, 'observacao')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {colheitas.map((c) => (
              <tr key={c.id}>
                <td>{formatarData(c.data, idioma)}</td>
                <td>{c.quantidade}</td>
                <td>{c.observacao}</td>
                <td><button className="excluir" onClick={() => excluir(c.id)}>{traduzir(idioma, 'excluir')}</button></td>
              </tr>
            ))}
            {colheitas.length === 0 && <tr><td colSpan="4">{traduzir(idioma, 'nenhumaColheita')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

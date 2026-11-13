import { useEffect, useState } from 'react';
import { api, hoje } from '../api.js';
import { formatarData, formatarDolares, traduzir, traduzirErroApi } from '../i18n.js';

export default function Vendas({ idioma }) {
  const [vendas, setVendas] = useState([]);
  const [form, setForm] = useState({ data: hoje(), quantidade: '', preco_unitario: '', cliente: '' });
  const [erro, setErro] = useState('');

  const carregar = () => api('/vendas').then(setVendas).catch(setErro);
  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    try {
      await api('/vendas', {
        method: 'POST',
        body: {
          ...form,
          quantidade: Number(form.quantidade),
          preco_unitario: Number(form.preco_unitario),
        },
      });
      setForm({ ...form, quantidade: '', preco_unitario: '', cliente: '' });
      carregar();
    } catch (err) {
      setErro(err);
    }
  }

  async function excluir(id) {
    setErro('');
    try {
      await api(`/vendas/${id}`, { method: 'DELETE' });
      carregar();
    } catch (err) {
      setErro(err);
    }
  }

  return (
    <>
      <form className="card formulario" onSubmit={salvar}>
        <h2>{traduzir(idioma, 'registrarVenda')}</h2>
        <label>
          {traduzir(idioma, 'data')}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {traduzir(idioma, 'quantidade')}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {traduzir(idioma, 'precoUnitario')}
          <input type="number" min="0.01" step="0.01" value={form.preco_unitario} onChange={(e) => setForm({ ...form, preco_unitario: e.target.value })} required />
        </label>
        <label>
          {traduzir(idioma, 'cliente')}
          <input value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
        </label>
        <button type="submit">{traduzir(idioma, 'salvar')}</button>
      </form>
      {erro && <p className="erro">{traduzirErroApi(erro, idioma)}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr>
              <th>{traduzir(idioma, 'data')}</th>
              <th>{traduzir(idioma, 'cliente')}</th>
              <th>{traduzir(idioma, 'quantidadeAbreviada')}</th>
              <th>{traduzir(idioma, 'precoAbreviado')}</th>
              <th>{traduzir(idioma, 'total')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id}>
                <td>{formatarData(v.data, idioma)}</td>
                <td>{v.cliente}</td>
                <td>{v.quantidade}</td>
                <td>{formatarDolares(v.preco_unitario, idioma)}</td>
                <td>{formatarDolares(v.quantidade * Number(v.preco_unitario), idioma)}</td>
                <td><button className="excluir" onClick={() => excluir(v.id)}>{traduzir(idioma, 'excluir')}</button></td>
              </tr>
            ))}
            {vendas.length === 0 && <tr><td colSpan="6">{traduzir(idioma, 'nenhumaVenda')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

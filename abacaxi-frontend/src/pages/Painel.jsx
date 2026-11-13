import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { formatarDolares, traduzir, traduzirErroApi } from '../i18n.js';

export default function Painel({ idioma }) {
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch(setErro);
  }, []);

  if (erro) return <p className="erro">{traduzirErroApi(erro, idioma)}</p>;
  if (!resumo) return <p>{traduzir(idioma, 'carregando')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{traduzir(idioma, 'totalColhido')}</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>{traduzir(idioma, 'totalVendido')}</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>{traduzir(idioma, 'emEstoque')}</span><strong>{resumo.estoque}</strong></div>
      <div className="card"><span>{traduzir(idioma, 'faturamento')}</span><strong>{formatarDolares(resumo.faturamento, idioma)}</strong></div>
    </div>
  );
}

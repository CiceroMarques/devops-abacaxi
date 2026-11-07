import { IDIOMAS, traduzir } from '../i18n.js';

export default function SeletorIdioma({ idioma, onAlterar }) {
  return (
    <div className="seletor-idioma" role="group" aria-label={traduzir(idioma, 'seletorIdioma')}>
      {Object.entries(IDIOMAS).map(([codigo, lingua]) => (
        <button
          key={codigo}
          type="button"
          className={idioma === codigo ? 'ativo' : ''}
          aria-label={lingua.nome}
          aria-pressed={idioma === codigo}
          title={lingua.nome}
          onClick={() => onAlterar(codigo)}
        >
          {lingua.bandeira}
        </button>
      ))}
    </div>
  );
}

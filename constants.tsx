
export const GEMINI_MODEL = 'gemini-3-pro-preview';

export const SYSTEM_INSTRUCTION = `
Você é um especialista sênior em desenvolvimento de sites WordPress, operando por meio do modelo DeepSeek-R1, com domínio avançado do tema The7 e do plugin WPBakery Visual Composer, utilizando também o Ultimate Addons for WPBakery Page Builder.

Seu papel é atuar como um “gerador de blocos WPBakery”, criando códigos prontos para serem colados diretamente no editor WPBakery (modo texto/shortcode), sem necessidade de ajustes manuais.

REGRAS CRÍTICAS:
1. Retorne APENAS o código pronto.
2. Utilize shortcodes compatíveis com WPBakery (vc_row, vc_column, etc).
3. Garanta compatibilidade total com o tema The7 e Ultimate Addons.
4. Não inclua NENHUMA explicação, comentário ou texto extra.
5. Não utilize Gutenberg ou Elementor.
6. Garanta responsividade nativa via parâmetros dos shortcodes.
7. Se for fornecido um código de referência, use-o como base estrutural.
`;

export const ICON_COPY = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

export const ICON_TRASH = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

export const ICON_SPINNER = (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const CONCEPTS_DATA = [
  {
    id: "jsx",
    number: "01",
    title: "JSX",
    subtitle: "JavaScript XML",
    description: "Como escrever a interface usando sintaxe semelhante a HTML.",
    icon: "Code2",
    color: "from-blue-500 to-cyan-400",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    summary: "O JSX é uma extensão de sintaxe para JavaScript que permite escrever estruturas semelhantes a HTML dentro do código JS, unindo lógica e apresentação.",
    keyPoints: [
      "Permite interpolação de expressões JS usando chaves { }",
      "Exige que elementos tenham um único elemento pai ou Fragment <>...</>",
      "Usa camelCase para atributos como className em vez de class e htmlFor em vez de for",
      "É transformado pelo Babel/Vite em chamadas React.createElement"
    ]
  },
  {
    id: "componentes",
    number: "02",
    title: "Componentes",
    subtitle: "Modularidade de UI",
    description: "Como dividir a interface em partes reutilizáveis.",
    icon: "Boxes",
    color: "from-purple-500 to-indigo-400",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    summary: "Componentes são os blocos fundamentais de uma aplicação React. Eles encapsulam estrutura, estilo e comportamento em pedaços independentes e reutilizáveis.",
    keyPoints: [
      "Podem ser Componentes Funcionais (funções JS que retornam JSX)",
      "Promovem a reutilização de código e a facilidade de manutenção",
      "Cada componente gerencia seu próprio ciclo de vida e visual",
      "Podem ser compostos aninhando uns dentro dos outros"
    ]
  },
  {
    id: "props",
    number: "03",
    title: "Props",
    subtitle: "Propriedades e Parâmetros",
    description: "Como passar informações entre componentes.",
    icon: "ArrowRightLeft",
    color: "from-amber-500 to-orange-400",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    summary: "Props (curto para propriedades) são o mecanismo pelo qual componentes pais enviam dados e funções de callback para seus componentes filhos.",
    keyPoints: [
      "Props são imutáveis (read-only) dentro do componente filho",
      "Podem passar qualquer valor JS: strings, números, objetos, arrays, funções e elementos JSX",
      "A prop especial 'children' permite passar elementos descendentes em contêineres",
      "Desestruturação no parâmetro da função torna o código mais limpo"
    ]
  },
  {
    id: "virtual-dom",
    number: "04",
    title: "Virtual DOM",
    subtitle: "Reconciliação e Desempenho",
    description: "Como o React atualiza a interface quando os dados mudam.",
    icon: "Zap",
    color: "from-emerald-500 to-teal-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    summary: "O Virtual DOM é uma cópia leve em memória da árvore do DOM real. O React calcula as diferenças (diffing) e aplica apenas as alterações necessárias no DOM real.",
    keyPoints: [
      "Evita manipulações diretas e custosas no DOM do navegador",
      "Algoritmo de Reconciliação (Fiber) compara a árvore antiga e a nova",
      "Atualiza apenas as partes exatas que mudaram em um único batch de renderização",
      "Garante performance fluida mesmo em interfaces complexas"
    ]
  },
  {
    id: "listas-e-keys",
    number: "05",
    title: "Listas e keys",
    subtitle: "Iteração Dinâmica",
    description: "Como renderizar coleções com map() e key.",
    icon: "ListOrdered",
    color: "from-pink-500 to-rose-400",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    summary: "Para renderizar listas de elementos no React, usamos o método .map() do JavaScript e atribuímos a prop 'key' única a cada item.",
    keyPoints: [
      "O método .map() transforma arrays de dados em arrays de elementos JSX",
      "A prop 'key' ajuda o React a identificar quais itens mudaram, foram adicionados ou removidos",
      "As keys devem ser idênficadores únicos e estáveis (ex: IDs do banco de dados)",
      "Evite usar o índice do array (index) como key em listas mutáveis"
    ]
  },
  {
    id: "renderizacao-condicional",
    number: "06",
    title: "Renderização condicional",
    subtitle: "Exibição Flexível",
    description: "Como mostrar conteúdos diferentes conforme uma condição.",
    icon: "GitFork",
    color: "from-violet-500 to-fuchsia-400",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    summary: "Permite que a interface exiba componentes ou elementos específicos com base no estado atual da aplicação, valores de props ou regras de negócio.",
    keyPoints: [
      "Operador ternário (condição ? true : false) para escolhas de duas opções",
      "Operador curto-circuito && (condição && <Elemento />) para exibição simples",
      "Declarações if / switch para retornos condicionais antecipados (early return)",
      "Retornar null impede que o componente renderize na tela"
    ]
  },
  {
    id: "state-e-usestate",
    number: "07",
    title: "State e useState",
    subtitle: "Estado Reativo",
    description: "Como armazenar informações e atualizar a interface.",
    icon: "Database",
    color: "from-sky-500 to-blue-600",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    summary: "O estado (state) é a memória do componente. O hook useState permite declarar variáveis de estado que, ao serem alteradas, disparam a re-renderização da interface.",
    keyPoints: [
      "Retorna um par: [valorAtual, funcaoParaAtualizar]",
      "Sempre use a função de atualização para modificar o estado, nunca altere diretamente",
      "Atualizações de estado podem ser assíncronas e agrupadas em batch",
      "Para atualizar com base no valor anterior, passe uma função de callback: setState(prev => prev + 1)"
    ]
  },
  {
    id: "formularios",
    number: "08",
    title: "Formulários",
    subtitle: "Componentes Controlados",
    description: "Como receber, validar e processar informações.",
    icon: "FileCheck",
    color: "from-amber-600 to-yellow-400",
    badgeColor: "bg-amber-600/10 text-amber-400 border-amber-600/30",
    summary: "Formulários em React utilizam o conceito de 'Componentes Controlados', onde os valores dos inputs são sincronizados diretamente com o estado do React.",
    keyPoints: [
      "O atributo 'value' é vinculado a um estado e o evento 'onChange' atualiza esse estado",
      "Tratamento de 'onSubmit' com event.preventDefault() evita a recarga padrão da página",
      "Validação síncrona em tempo real para feedback imediato ao usuário",
      "Suporte a campos de texto, checkboxes, selects, radios e arquivos"
    ]
  },
  {
    id: "useeffect",
    number: "09",
    title: "useEffect",
    subtitle: "Efeitos Colaterais",
    description: "Como sincronizar componentes com sistemas externos.",
    icon: "RefreshCw",
    color: "from-teal-500 to-emerald-400",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    summary: "O hook useEffect é usado para executar efeitos colaterais (side effects), tais como busca de dados em APIs, inscrições em eventos, timers e sincronizações com o DOM.",
    keyPoints: [
      "Array de dependências []: executa apenas uma vez após a montagem",
      "Array com variáveis [id]: executa quando o valor de 'id' mudar",
      "Sem array de dependências: executa a cada re-renderização",
      "Função de limpeza (cleanup): retornada no useEffect para cancelar timers ou listeners"
    ]
  },
  {
    id: "consumo-de-apis",
    number: "10",
    title: "Consumo de APIs",
    subtitle: "Comunicação Assíncrona",
    description: "Como buscar e apresentar dados de serviços externos.",
    icon: "Globe",
    color: "from-indigo-500 to-blue-500",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    summary: "Integração do React com APIs HTTP REST usando `fetch` ou `axios` dentro do hook `useEffect` ou acionados por eventos do usuário.",
    keyPoints: [
      "Gerenciamento de 3 estados fundamentais: Carregando (Loading), Dados (Data) e Erro (Error)",
      "Uso de async/await para lidar com Promises de forma limpa",
      "Exibição de skeletons ou spinners durante requisições pendentes",
      "Tratamento de exceções com blocos try/catch e botões de nova tentativa (retry)"
    ]
  },
  {
    id: "react-router",
    number: "11",
    title: "React Router",
    subtitle: "Navegação SPA",
    description: "Como organizar páginas e navegação por URLs.",
    icon: "Compass",
    color: "from-red-500 to-pink-500",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    summary: "O React Router permite criar aplicações de página única (SPA) com navegação fluida entre múltiplos caminhos de URL sem recarregar a página.",
    keyPoints: [
      "BrowserRouter provê o contexto de roteamento para a aplicação",
      "Routes e Route mapeiam caminhos (path) para componentes de página",
      "Link e NavLink realizam transições de URL instantâneas sem reload",
      "Hooks poderosos: useNavigate(), useParams() para IDs dinâmicos e useSearchParams()"
    ]
  }
];

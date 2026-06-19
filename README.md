# BattlePoke-Front

Front-end do projeto **Battle-Pokemon**: um app de batalhas Pokémon construído com
**Expo + React Native** (web/iOS/Android), **TypeScript** e **Expo Router**.

O usuário registra um treinador, captura pokémons (bolsa), monta um time de 5 e
batalha contra um oponente. O back-end é dono dos dados (perfil, time, capturados);
a [PokeAPI](https://pokeapi.co) fornece dados visuais complementares.

---

## Stack

| Área | Tecnologia |
|---|---|
| Runtime | Expo SDK 56, React Native 0.85, React 19 |
| Navegação | `expo-router` (file-based routing) |
| HTTP | `axios` (cliente centralizado) |
| Formulários | `react-hook-form` + `yup` (`@hookform/resolvers`) |
| Persistência local | `@react-native-async-storage/async-storage` |
| Estado global | React Context (`AuthContext`) |
| Feedback | `react-native-toast-message` |
| Animações | `react-native-reanimated`, `lottie-react-native` |
| Fontes | Space Grotesk, Space Mono |

> A documentação versionada do Expo está em
> https://docs.expo.dev/versions/v56.0.0/ 

---

## Como rodar

```bash
npm install
npx expo start --iniciar o projeto
```

Não há etapa de build de tipos no `package.json`. Para checar os tipos manualmente:

```bash
npx tsc --noEmit
```

---

## Visão geral da arquitetura

O projeto segue uma organização **feature-based** (cada domínio agrupa suas
próprias telas, componentes, tipos e integrações), com uma camada **compartilhada**
(`shared`, `components`, `constants`, `contexts`, `utils`) para o que é transversal.

```
src/
├─ app/              # Rotas (expo-router). Apenas "casca" — re-exporta telas das features.
├─ features/         # Domínios da aplicação (auth, home, battle, fight, pokedex, profile)
├─ components/       # Componentes de UI reutilizáveis (ui/ e layout/)
├─ contexts/         # Estado global via React Context (AuthContext)
├─ shared/           # API (axios), tipos e config compartilhados
│  ├─ api/           #   httpClient, config, storage, integrações globais (PokeAPI)
│  └─ types/         #   tipos de domínio compartilhados (Pokemon, Profile)
├─ constants/        # colors, fonts, valores globais
├─ utils/            # funções utilitárias (cache, helpers de pokémon)
└─ mocks/            # dados estáticos para desenvolvimento (ex.: time do oponente)
```

### Princípio central

- **As rotas (`app/`) não contêm lógica.** Elas só re-exportam a tela da feature
  correspondente. Toda a regra de negócio vive em `features/`.
- **O back-end é a fonte de verdade** dos dados (perfil, time, bolsa). O front
  hidrata visualmente com a PokeAPI quando necessário e usa o AsyncStorage como
  cache/sessão.

---

## Anatomia de uma feature

Cada feature em `src/features/<nome>/` pode conter as pastas abaixo. Nem toda
feature usa todas — só as que fizerem sentido para o domínio.

```
features/auth/
├─ @types/           # tipos/DTOs específicos da feature
│   ├─ LoginDTO.ts
│   ├─ RegisterDTO.ts
│   ├─ AuthResponse.ts
│   └─ AuthContextData.ts
├─ components/        # componentes só desta feature (cada um com index.tsx + style.ts)
│   ├─ LoginForm/
│   │   ├─ index.tsx
│   │   └─ style.ts
│   └─ LoginHero/
├─ hooks/            # hooks com a lógica de UI/estado da feature (useLogin)
├─ integration/      # chamadas HTTP da feature (authIntegration.ts)
├─ screens/          # composição da tela (LoginScreen.tsx + style.ts)
└─ validations/      # schemas yup dos formulários (loginSchema, registerSchema)
```

### Camadas (responsabilidades)

| Camada | Pasta | Faz | Não faz |
|---|---|---|---|
| **Rota** | `app/` | Mapear URL → tela; re-exportar a screen | Lógica, estilo, fetch |
| **Screen** | `features/*/screens/` | Compor componentes, orquestrar hooks/estado da tela | Estilos primitivos inline; chamadas HTTP cruas |
| **Component** | `features/*/components/`, `components/` | UI apresentacional; recebe dados por props | Conhecer rotas ou o back-end |
| **Hook** | `features/*/hooks/` | Estado e ações da feature (ex.: `handleLogin`) | Renderizar UI |
| **Integration** | `features/*/integration/`, `shared/api/` | Falar com o back-end via `httpClient` e mapear DTOs | Tocar em estado de UI |
| **Validation** | `features/*/validations/` | Schemas `yup` para os formulários | Lógica de submit |
| **Types** | `features/*/@types/`, `shared/types/` | Contratos de dados (interfaces/DTOs) | Lógica |

---

## Styles

Estilos usam **`StyleSheet.create`** do React Native, **colocados ao lado do
componente** num arquivo `style.ts` (ou `styles.ts`). Não há CSS nem
styled-components.

```
components/LoginForm/
├─ index.tsx     # importa { styles } from "./style"
└─ style.ts      # export const styles = StyleSheet.create({ ... })
```

```ts
// style.ts
import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
```

Convenções:

- **Cores, fontes e valores globais vêm de `src/constants/`** — não use hex solto
  quando houver um token correspondente em `colors`.
- Cada componente/tela é dono do seu `style.ts`; **estilos não são compartilhados**
  entre features (favorece isolamento).
- Tema escuro é o padrão (`colors.background`, `colors.surface`, etc.).
- Use `Platform` para divergências web/native quando necessário.

### `constants/`

| Arquivo | Conteúdo |
|---|---|
| `colors.ts` | Paleta: `background`, `surface`, `primary`, `text.*`, `types.*` (cor por tipo de pokémon), `rankings.*` |
| `fonts.ts` | Famílias de fonte (Space Grotesk / Space Mono) |
| `global.ts` | Constantes diversas (ex.: `DEFAULT_AVATAR`) |

---

## Types

Tipos ficam em duas escalas:

- **`src/shared/types/`** — contratos de domínio usados por várias features.
  - `pokemon.ts` → `Pokemon`, `Stats`
  - `Profile.ts` → `Profile`
- **`features/<f>/@types/`** — tipos e **DTOs** específicos de uma feature.
  - Ex.: `LoginDTO`, `RegisterDTO`, `AuthResponse`, `AuthContextData`.

Convenções:

- **DTO** = formato trocado com o back-end na fronteira da `integration`. Quando o
  front e o back divergem nos nomes, a conversão acontece **na integration**
  (ex.: `authIntegration` mapeia `{ email, senha } → { username, password }`).
- O modelo `Pokemon` do app é o alvo; respostas do back-end (que usam `index`,
  `abilities` como stats, etc.) são **mapeadas para `Pokemon`** dentro da
  integration, nunca espalhadas pela UI.

---

## Integration (camada de dados)

Toda comunicação com o back-end passa pelo **cliente axios centralizado**.

### `shared/api/`

| Arquivo | Responsabilidade |
|---|---|
| `config.ts` | `API_BASE_URL` do back-end (AWS API Gateway) |
| `httpClient.ts` | Instância axios: injeta `Authorization: Bearer <token>` e normaliza erros |
| `storage.ts` | Sessão no AsyncStorage (`@Auth:token`, `@Auth:userId`) |
| `pokemonIntegration.ts` | Integração com a **PokeAPI** (lista e detalhes) |
| `api.ts` | (reservado) |

O `httpClient` resolve duas preocupações transversais:

```ts
// 1) injeta o token salvo em toda requisição
httpClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2) normaliza o erro para uma mensagem amigável (usada nos toasts)
httpClient.interceptors.response.use(
  (r) => r,
  (error) => Promise.reject(new Error(/* message extraída de error.response */)),
);
```

### Integrações por feature

Cada feature que fala com o back-end tem seu `integration/<nome>Integration.ts`.
A integration **usa o `httpClient`** e expõe funções de alto nível, escondendo o
formato cru do back-end:

```ts
// features/auth/integration/authIntegration.ts
export async function login(data: LoginDTO): Promise<AuthResponse> {
  const response = await httpClient.post<AuthResponse>('/auth/v1/login', toCredentials(data));
  await saveSession({ token: response.data.token, userId: response.data.userId });
  return response.data;
}
```

### Duas origens de dados

| Origem | Cliente | Exemplos |
|---|---|---|
| **Back-end próprio** (AWS) | `httpClient` (`@sharedApi/httpClient`) | auth, perfil, time, capturados |
| **PokeAPI** (pública) | axios próprio em `pokemonIntegration.ts` | lista de pokémons, detalhes, evoluções |

> Padrão importante: o back-end é dono dos **IDs**; a PokeAPI fornece os **dados
> visuais**. Algumas respostas do back-end já trazem `name`/`image`/`types`, e
> nesses casos a integration mapeia direto, sem depender da PokeAPI.

#### Endpoints do back-end (referência)

| Ação | Método | Rota | Parâmetros |
|---|---|---|---|
| Registrar | `POST` | `/auth/v1/register` | body `{ username, password }` |
| Login | `POST` | `/auth/v1/login` | body `{ username, password }` |
| Perfil | `GET` | `/auth/v1/stats/{userId}` | — |
| Atualizar perfil | `PUT` | `/auth/v1/stats/{userId}` | body `{ level, vitorias, derrotas }` |
| Retornar time | `GET` | `/pokemon/v1/team` | query `user-id` → `{ team, capture }` |
| Atualizar time | `PUT` | `/pokemon/v1/team` | query `user-id` + body `{ removedPokemon, newPokemon }` |
| Adicionar capturado | `PUT` | `/pokemon/v1/captured` | query `user-id`, `pokemon-id` |
| Remover capturado | `DELETE` | `/pokemon/v1/captured` | query `user-id`, `pokemon-id` |

> **Time vs. bolsa:** o back-end mantém dois conjuntos mutuamente exclusivos —
> `team` (5 pokémons de batalha, sempre cheio) e `capture` (bolsa). "Atualizar
> time" só **substitui** um por outro (`removedPokemon` precisa estar no time,
> `newPokemon` nos capturados); ao substituir, o pokémon trocado **volta para a
> bolsa**. Não existe "adicionar a time vazio" — todo usuário nasce com 5.

---

## Estado global — `contexts/AuthContext.tsx`

Único contexto da aplicação. Mantém sessão e dados do treinador, e expõe ações:

- **Estado:** `isAuthenticated`, `user`, `userId`, `displayName`, `avatar`,
  `team`, `isLoading`.
- **Ações:** `signIn`, `signOut`, `updateDisplayName`, `updateAvatar`,
  `updateTeam`.
- **Boot:** ao iniciar, restaura a sessão do AsyncStorage e recarrega o time do
  back-end.

Consumido com o hook `useAuth()`:

```tsx
const { userId, team, updateTeam } = useAuth();
```

O provider é montado uma vez em `app/_layout.tsx`, envolvendo toda a navegação.

---

## Navegação — `app/` (expo-router)

Roteamento **baseado em arquivos**. Grupos entre parênteses (`(auth)`,
`(dashboard)`) organizam rotas sem aparecer na URL.

```
app/
├─ _layout.tsx             # layout raiz: fontes, AuthProvider, Stack, Toast
├─ index.tsx               # rota inicial
├─ (auth)/
│   ├─ Login/index.tsx     # → re-exporta LoginScreen
│   └─ Register/index.tsx
└─ (dashboard)/
    ├─ _layout.tsx
    ├─ Home/index.tsx
    ├─ Battle/index.tsx
    ├─ Fight/index.tsx
    ├─ Pokedex/index.tsx
    ├─ Victory/index.tsx
    └─ Profile/index.tsx

```

As rotas são finas — apenas re-exportam a tela da feature:

```tsx
// app/(auth)/Login/index.tsx
import { LoginScreen } from "@/features/auth/screens/LoginScreen/LoginScreen";
export default LoginScreen;
```

Navegação programática usa `router` / `useRouter` do `expo-router`:

```ts
router.push('/(dashboard)/Home');
```

---

## Aliases de import (`tsconfig.json`)

Use os aliases em vez de caminhos relativos longos:

| Alias | Aponta para |
|---|---|
| `@/*` | `src/*` |
| `@sharedTypes/*` | `src/shared/types/*` |
| `@sharedApi/*` | `src/shared/api/*` |
| `@homeIntegrations/*` | `src/features/home/integration/*` |
| `@pokedexIntegrations/*` | `src/features/pokedex/integration/*` |

```ts
import { Pokemon } from "@sharedTypes/pokemon";
import { httpClient } from "@sharedApi/httpClient";
import { colors } from "@/constants/colors";
```

---

## Convenções rápidas

- **Uma pasta por componente/tela**, com `index.tsx` (ou `Nome.tsx`) + `style.ts`.
- **Lógica de UI em hooks** (`features/*/hooks/`); telas só compõem.
- **HTTP só nas integrations**; componentes nunca chamam axios direto.
- **Validação de formulário** com `yup` + `react-hook-form` (`@hookform/resolvers`).
- **Feedback ao usuário** via `Toast.show(...)`; mensagens de erro vêm
  normalizadas do `httpClient`.
- **Cores/fontes** sempre de `constants/`.
- **Tipos/DTOs** em `@types/` (feature) ou `shared/types/` (global); conversões
  front↔back acontecem na integration.

---

## Estrutura de pastas (resumo)

```
src/
├─ app/                     # rotas (expo-router)
├─ components/
│  ├─ layout/               # Navbar, Sidebar, Footer, Loading, Toast
│  └─ ui/                   # Buttons, Cards, Inputs, TypeBadge, StatusBar, ...
├─ constants/               # colors, fonts, global
├─ contexts/                # AuthContext
├─ features/
│  ├─ auth/                 # login/registro (@types, components, hooks, integration, screens, validations)
│  ├─ home/                 # captura, bolsa e montagem de time
│  ├─ battle/               # seleção de modo / preview de time
│  ├─ fight/                # simulação da batalha
│  ├─ pokedex/              # listagem e detalhes de pokémons
│  └─ profile/              # perfil do treinador
├─ shared/
│  ├─ api/                  # httpClient, config, storage, pokemonIntegration
│  └─ types/                # Pokemon, Profile
├─ utils/                   # pokemonCache, pokemonUtils
└─ mocks/                   # opponentsTeam
```

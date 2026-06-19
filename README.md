# BattlePoke-Front

Front-end do **Battle-Pokemon**, um app de batalhas Pokémon feito com
**Expo + React Native** (roda na web, no iOS e no Android), **TypeScript** e **Expo Router**.

A ideia é simples: você cria um treinador, captura pokémons (que ficam na bolsa),
monta um time de 5 e parte pra batalha contra um oponente. Quem manda nos dados
(perfil, time, capturados) é o back-end; a [PokeAPI](https://pokeapi.co) entra só
para completar a parte visual.

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
npx expo start
```

Não existe um script de checagem de tipos no `package.json`. Se quiser conferir os tipos na mão:

```bash
npx tsc --noEmit
```

---

## Visão geral da arquitetura

A organização é **por feature**: cada domínio guarda as próprias telas, componentes,
tipos e integrações. O que é transversal e usado por todo mundo fica numa camada
**compartilhada** (`shared`, `components`, `constants`, `contexts`, `utils`).

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

- **As rotas (`app/`) não têm lógica nenhuma.** Cada uma só re-exporta a tela da
  feature correspondente — toda a regra de negócio mora em `features/`.
- **Quem tem a palavra final sobre os dados é o back-end** (perfil, time, bolsa).
  O front completa o visual com a PokeAPI quando precisa e usa o AsyncStorage para
  guardar sessão e cache.

---

## Anatomia de uma feature

Toda feature em `src/features/<nome>/` pode ter as pastas abaixo. Ninguém é
obrigado a usar todas — cada feature pega só o que faz sentido pra ela.

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
├─ hooks/            # hooks com a lógica de UI/estado da feature (ex.: useLogin, useBattleSimulation)
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

Os estilos usam o **`StyleSheet.create`** do React Native e ficam **ao lado do
componente**, num arquivo `style.ts` (ou `styles.ts`). Nada de CSS nem
styled-components por aqui.

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

- **Cores, fontes e valores globais saem sempre de `src/constants/`** — se já
  existe um token em `colors`, evite cravar um hex solto.
- Cada componente/tela cuida do próprio `style.ts`; **estilos não são compartilhados**
  entre features, justamente para manter tudo isolado.
- O tema escuro é o padrão (`colors.background`, `colors.surface`, etc.).
- Quando web e native precisarem se comportar diferente, use `Platform`.

### `constants/`

| Arquivo | Conteúdo |
|---|---|
| `colors.ts` | Paleta: `background`, `surface`, `primary`, `text.*`, `types.*` (cor por tipo de pokémon), `rankings.*` |
| `fonts.ts` | Famílias de fonte (Space Grotesk / Space Mono) |
| `global.ts` | Constantes diversas (ex.: `DEFAULT_AVATAR`) |

---

## Types

Os tipos vivem em dois níveis:

- **`src/shared/types/`** — contratos de domínio usados por várias features.
  - `pokemon.ts` → `Pokemon`, `Stats`
  - `Profile.ts` → `Profile`
- **`features/<f>/@types/`** — tipos e **DTOs** específicos de uma feature.
  - Ex.: `LoginDTO`, `RegisterDTO`, `AuthResponse`, `AuthContextData`.

Convenções:

- **DTO** é o formato que viaja de e para o back-end, ali na fronteira da
  `integration`. Quando os nomes do front e do back não batem, a conversão
  acontece **na integration** (ex.: `authIntegration` traduz
  `{ email, senha } → { username, password }`).
- O modelo `Pokemon` do app é sempre o destino: o que o back-end devolve (com
  `index`, `abilities` no lugar de stats, etc.) é **convertido para `Pokemon`**
  dentro da integration, sem deixar esse formato cru vazar para a UI.

---

## Integration (camada de dados)

Toda conversa com o back-end passa por um único **cliente axios centralizado**.

### `shared/api/`

| Arquivo | Responsabilidade |
|---|---|
| `config.ts` | `API_BASE_URL` do back-end (AWS API Gateway) |
| `httpClient.ts` | Instância axios: injeta `Authorization: Bearer <token>` e normaliza erros |
| `storage.ts` | Sessão no AsyncStorage (`@Auth:token`, `@Auth:userId`) |
| `pokemonIntegration.ts` | Integração com a **PokeAPI** (lista e detalhes) |
| `api.ts` | (reservado) |

O `httpClient` cuida de duas coisas que valem para todas as requisições:

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

Toda feature que conversa com o back-end tem o seu `integration/<nome>Integration.ts`.
A integration **usa o `httpClient`** por baixo e oferece funções mais amigáveis,
escondendo o formato cru que vem do back-end:

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

> Vale guardar essa regra: os **IDs** são do back-end; os **dados visuais** vêm da
> PokeAPI. Mas algumas respostas do back-end já chegam com `name`/`image`/`types`,
> e aí a integration aproveita direto, sem precisar bater na PokeAPI.

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

> **Time vs. bolsa:** o back-end separa duas listas que nunca se sobrepõem —
> `team` (os 5 pokémons de batalha, sempre cheio) e `capture` (a bolsa). "Atualizar
> time" não adiciona nem remove, só **troca**: o `removedPokemon` tem que estar no
> time e o `newPokemon` na bolsa, e quem sai do time **volta para a bolsa**. Não dá
> para "colocar num slot vazio" — todo usuário já começa com os 5 preenchidos.

---

## Estado global — `contexts/AuthContext.tsx`

É o único contexto do app. Ele guarda a sessão e os dados do treinador e ainda
oferece as ações para mexer neles:

- **Estado:** `isAuthenticated`, `user`, `userId`, `displayName`, `avatar`,
  `team`, `isLoading`.
- **Ações:** `signIn`, `signOut`, `updateDisplayName`, `updateAvatar`,
  `updateTeam`.
- **Boot:** ao abrir o app, ele restaura a sessão salva no AsyncStorage e busca o
  time de novo no back-end.

Para consumir, é só usar o hook `useAuth()`:

```tsx
const { userId, team, updateTeam } = useAuth();
```

O provider é montado uma única vez em `app/_layout.tsx`, abraçando toda a navegação.

---

## Navegação — `app/` (expo-router)

O roteamento é **baseado em arquivos**. Os grupos entre parênteses (`(auth)`,
`(dashboard)`) servem só para organizar as rotas — eles não aparecem na URL.

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

As rotas são bem enxutas — só re-exportam a tela da feature:

```tsx
// app/(auth)/Login/index.tsx
import { LoginScreen } from "@/features/auth/screens/LoginScreen/LoginScreen";
export default LoginScreen;
```

Para navegar via código, é só usar `router` / `useRouter` do `expo-router`:

```ts
router.push('/(dashboard)/Home');
```

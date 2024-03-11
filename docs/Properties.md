# ACTIONS / REACTIONS

As ações ou reações são eventos ou habilidades que os jogadores podem usar durante o jogo para influenciar o resultado das partidas. Cada ação possui um nome único, uma descrição que explica o que ela faz e um conjunto de condições de custo que devem ser cumpridas antes que a ação possa ser ativada. As condições de custo podem incluir a necessidade de possuir cartas específicas, a ocorrência de eventos como embaralhar o baralho ou descartar cartas, ou até mesmo o resultado de rolagens de dados. Essas condições garantem que as ações sejam usadas estrategicamente, adicionando uma camada adicional de complexidade e escolha tática ao jogo.

A diferença entre actions e reactions é que reactions ocorre automaticamente quando o custo de executar dela é cumprido.

- Nome (name): O nome da ação. Isso identifica a ação de forma clara e concisa para os jogadores.

- Descrição (description): Uma descrição que detalha o efeito ou propósito da ação. Isso ajuda os jogadores a entenderem o que a ação faz no jogo.

- Tipo (type): Especifica em qual campo a carta deve ser jogado. Valores: ATK, DEF, ITEM

- Hide: Se a ação deve ser escondida do player para ações em cadeia.

Esses efeitos combinados criam a dinâmica do jogo e podem ser utilizados estrategicamente pelos jogadores para alcançar a vitória, aqui está um exemplo de carta que pode ser criada:
```json
{
    "id": "X6MLeo",
    "name": "Espada da verdade",
    "description": "A lamina afiada dessa espada revela a verdade",
    "type": "ATK",
    "actions": [
        {
            "name": "Corte afiado",
            "description": "Este ataque causa 10 de dano, após cada ataque, compre uma carta",
            "cost": {
                "card": "TYPE:DEX;QTY:1"
            },
            "effect": {
                "draw_card": "QTY:1",
                "deal_damage": "10"
            }
        }
    ],
    "reaction": [
        {
            "name": "Contra golpe roll",
            "hide": true,
            "cost": {
                "after_damage_self": true
            },
            "effect": {
                "roll_dice": "QTY:1",
        },
        {
            "name": "Contra golpe",
            "description": "Quando oponente ataca, rola um dado caso dê 6, o golpe não tem efeito",
            "cost": {
                "after_damage_self": true,
                "after_roll_dice": 6
            },
            "effect": {
                "deal_damage": "10"
            }
        }
    ]
}
```

# Cost

Custo (cost): O custo necessário para usar a ação. Este é um elemento crucial, pois impõe limitações ao uso da ação e adiciona estratégia ao jogo. O custo pode ser customizado de várias maneiras:

    card_placed: Uma ou mais cartas que devem ser pagas como custo para usar a ação, devem ser separados por ponto e virgula e Aqui estão os detalhes específicos do custo da carta:

        - TYPE: O tipo da carta necessária para o custo.
        - ID: O identificador único da carta necessária.
        - PLACED: A localização da carta necessária.
            - HAND
            - DECK
            - TABLE
        - NAME: O nome da carta necessária.
        - QTY: A quantidade de cartas necessárias.
        
    Exemplo:
```json
{
    "cost": {
        "card_placed": "TYPE:MANA;ID:Rkn2hf;PLACED:hand,NAME:Exodia;QTY:2",
    }
}
```
    card_draw: Uma ou mais cartas que devem ser sacadas como custo para usar a ação, devem ser separados por ponto e virgula e Aqui estão os detalhes específicos do custo da carta:

        - TYPE: O tipo da carta necessária para o custo.
        - ID: O identificador único da carta necessária.
        - PLACED: A localização da carta necessária.
            - HAND
            - DECK
            - TABLE
        - NAME: O nome da carta necessária.
        - QTY: A quantidade de cartas necessárias.
        
    Exemplo:
```json
{
    "cost": {
        "card_draw": "TYPE:MANA;ID:Rkn2hf;PLACED:hand,NAME:Exodia;QTY:2",
    }
}
```

    after_shuffle: Um indicador booleano que especifica que a ação só pode ser usada após o jogador embaralhar o baralho. Isso pode adicionar uma dinâmica estratégica interessante ao jogo.

    after_damage_self: Um indicador booleano que especifica que a ação só pode ser usada após o jogador receber dano.

    after_damage_enemy: Um indicador booleano que especifica que a ação só pode ser usada após o inimigo receber dano.

    after_dice_roll: Um indicador que especifica que a ação só pode ser usada após o jogador rolar um dado. 
        Valores possíveis:
        - "ANY" // Qualquer valor
        - 4,5,6  // 4,5,6

    
----
    after_discarted_card: Uma carta que deve ser destruída como custo para usar a ação. Devem ser separados por ponto e virgula e aqui estão os detalhes específicos do custo da carta:

        TYPE: O tipo da carta a ser destruída.
        ID: O identificador único da carta a ser destruída.
        NAME: O nome da carta a ser destruída.
        QTY: A quantidade de cartas a serem destruídas.

    Exemplo:
```json
{
    "cost": {
        "after_discarted_card": "TYPE:MANA;ID:Rkn2hf;PLACED:hand,NAME:Exodia;QTY:2",
    }
}
```

## Effect
O efeito do ataque descreve as ações resultantes quando um jogador ativa uma ação de ataque durante o jogo. Estas ações podem variar desde causar dano ao oponente até a cura do próprio jogador. Cada efeito é detalhado abaixo:

    shuffle_card_enemy: Um indicador booleano que especifica se o baralho do oponente deve ser embaralhado

---
    discard_card_enemy: Especifica se o ataque resulta na necessidade do oponente descartar uma carta.
    Aqui estão os detalhes específicos:

        - TYPE: O tipo da carta necessária para o custo.
        - ID: O identificador único da carta necessária.
        - PLACED: A localização da carta necessária.
            - HAND
            - DECK
            - TABLE
        - CHOOSE: Se o usuário pode escolher qual quarta descartar // true or false
        - NAME: O nome da carta necessária.
        - QTY: A quantidade de cartas necessárias.
        
    Exemplo:
```json
{
    "effect": {
        "discard_card_enemy": "TYPE:MANA;ID:Rkn2hf;PLACED:hand,NAME:Exodia;CHOOSE:false;QTY:2",
    }
}
```
---

    discard_card_self: Indica se o jogador que atacou deve descartar uma ou mais cartas.
    Aqui estão os detalhes específicos:

        - TYPE: O tipo da carta necessária para o custo.
        - ID: O identificador único da carta necessária.
        - PLACED: A localização da carta necessária.
            - HAND
            - DECK
            - TABLE
        - CHOOSE: Se o usuário pode escolher qual quarta descartar // true or false
        - NAME: O nome da carta necessária.
        - QTY: A quantidade de cartas necessárias.
        
    Exemplo:
```json
{
    "effect": {
        "discard_card_self": "TYPE:MANA;ID:Rkn2hf;PLACED:hand,NAME:Exodia;CHOOSE:false;QTY:2",
    }
}
```
---

    draw_card: Descreve o tipo e a quantidade de cartas que o jogador pode comprar após o ataque. Por exemplo, "TYPE:MANA;QTY:2" significa que o jogador deve comprar 2 cartas do tipo MANA.

    Aqui estão os detalhes específicos:

        - TYPE: O tipo da carta necessária para o custo.
        - ID: O identificador único da carta necessária.
        - PLACED: A localização da carta necessária.
            - HAND
            - DECK
            - TABLE
        - CHOOSE: Se o usuário pode escolher qual quarta comprar // true or false
        - NAME: O nome da carta necessária.
        - QTY: A quantidade de cartas necessárias.
    Exemplo:
```json
{
    "effect": {
        "draw_card": "TYPE:MANA;ID:Rkn2hf;PLACED:hand,NAME:Exodia;CHOOSE:false;QTY:2",
    }
}
```
---

    deal_damage: Especifica a quantidade de dano que o ataque causa ao oponente. Por exemplo, "10" significa que o ataque causa 10 pontos de dano.

    heal_self: Indica a quantidade de pontos de vida que o jogador recupera após o ataque. Por exemplo, "10" significa que o jogador se cura em 10 pontos de vida.

    negate_damage: Indica que o jogador nega o dano completamente de qualquer ataque
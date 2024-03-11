# Como criar carta

Para criar uma carta no seu TCG, é essencial considerar diversos atributos que definirão as características e funcionalidades da carta. Abaixo estão alguns atributos básicos (requiridos) que você pode incluir no arquivo cards.json para cada carta:

---

ID: Um identificador único para a carta. Isso permite que o jogo identifique cada carta de forma exclusiva. Certifique-se de que cada ID seja único entre todas as cartas do jogo. * Usar extensão NanoID do VSCode para gerar novos ID's

Name (Nome): O nome da carta. Escolha um nome descritivo que represente a carta de forma clara e concisa.

Description (Descrição): Uma descrição que detalha as habilidades, efeitos ou características da carta. Esta descrição é útil para os jogadores entenderem como a carta funciona e como ela pode afetar o jogo.

Type (Tipo): O tipo da carta, que pode incluir categorias como "ATK" (Ataque), "DEF" (Defesa), "ITEM" (Item), entre outros, O tipo da carta pode determinar suas funcionalidades e como ela pode ser utilizada durante o jogo.

    TIPOS POSSIVEIS (TEMP, PODE SER CUSTOMIZADO):
    - ATK
    - DEF
    - ITEM
    - MANA (MANA: pervasive supernatural or magical power)
    - DEX (DEXTERITY: skill in performing tasks, especially with the hands.)
    - AGI (AGILITY: ability to move quickly and easily.)
    - KNOW (KNOWLEDGE: the theoretical or practical understanding of a subject)

```json
    {
        "id": "tpdrVy",
        "name": "Exodia",
        "description": "Este card juntado com outros 4 cards acaba o jogo",
        "type": "ATK",
        "requirements": [],
        "actions": [],
        "reactions": []
    }
```


# ACTIONS / REACTIONS 
- [Propriedades das Actions e Reactions](../docs/Properties.md)

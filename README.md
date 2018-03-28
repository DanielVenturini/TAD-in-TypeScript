Para o projeto de Linguagens de Programação, não podemos usar nenhuma estrutura pronta: Lista, Pilha, Hash, Arvore e etc.
Então estou implementando estas para assim usar as que eu implementei.

==========================TREE AVL==========================

tree = new TreeAVL()

tree.insert(id, "value is any")

tree.contains(id)

tree.getHeight()

tree.remove(id)

tree.print()

tree.get(id)

A AVL está com todas as operações de inserir e remove realizando as devidas rotações.


==========================ArrayList==========================

let array = new ArrayList()

array.add("value is any")

array.addIn(index, "value is any")

array.lastIndexOf("value is any")

array.contains("value is any")

array.indexOf("value is any")

array.remove("value is any")

array.get(index)

array.isEmpty()

array.print()

array.size()


==========================Stack==========================

let stack = new Stack()

stack.push("type is any")

stack.getSize()

stack.print()

stack.empty()

stack.peek()

stack.pop()


==========================Graph==========================

let graph = new Graph(isGraph:boolean)  - if 'isGraph' is true, is a graph; if is false, is a digraph

graph.insertEdge("type is any", "type is any")

graph.removeEdge("type is any", "type is any")

graph.print()


Por baixo dos panos, a lista usa 'nós' ao invez de elementos. Ela é uma duplamente encadeada. O ponteiro 'left' representa o 'prev' e o ponteiro 'right' representa o 'next'. Respectivamente, as funções getters e setters. Também a pilha está usando os 'nós' como seus elementos. E o ponteiro para o elemento abaixo é o 'left'.

A pasta src contem os arquivos TypeScrip e a pasta build contem os arquivos JavaScript compilados pelo TypeScript. O arquivo index.html é onde inserimos o Main.js no html para rodar no navegador.

Para compilar os arquivos:

tsc ./src/ArqOrigem.ts --out ./build/ArqDestino.js

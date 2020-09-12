console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')


const db = require('./database')
const readline = require("readline-sync")
const {
    produtos
} = db

produtos.sort((a, b) => a.preco - b.preco)

console.table(produtos)

const idProduto = parseInt(readline.question("informe o ID do prduto desejado: "))
const quantidade = parseInt(readline.question("informe a quantidade do produto desejado: "))

if (quantidade < 0) {
    console.log('Informe um valor valido')
    quantidade = parseInt(readline.question("informe a quantidade do produto desejado: "))
}

const desconto = parseInt(readline.question("Possui cupom de desconto?: "))

function procurarProduto() {
    return produtos.find(x => x.id == idProduto)
}

function calcularSubtotal() {
    let produtoSelecionado = procurarProduto();
    return produtoSelecionado.preco * quantidade;
}

function calcularTotal() {
    let valorSubtotal = calcularSubtotal();
    let desc = valorSubtotal * (desconto / 100);
    return valorSubtotal - desc;
}

function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}

console.log('*****************')
console.log('comprovante')
console.log(`data da compra ${dataAtualFormatada()}`)
console.log(`${ quantidade } - ${ procurarProduto().nome }`)
console.table(procurarProduto())
console.log(`Subtotal: R$ ${ calcularSubtotal() }`)
console.log(`Total: R$ ${ calcularTotal() }`)
console.log('*****************')
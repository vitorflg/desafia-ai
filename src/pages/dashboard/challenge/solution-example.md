# 💡Template de solução do desafio

## ✅ Solução 1 - Documentação/Layouts/Especificações

Arquivos disponíveis no link do drive [desse link](#).

## ✅ Solução 2 - Código externamente

Solução disponível no [repositório](#). Leia e atente-se ao README.md do repositório para executar o projeto.

## ✅ Solução 3 - Código internamente

    let bubbleSort = (inputArr) => {
        let len = inputArr.length;
        for (let i = 0; i < len; i++) {
    	    for (let j = 0; j < len; j++) {
    		    if (inputArr[j] > inputArr[j + 1]) {
    			    let tmp = inputArr[j];
    			    inputArr[j] = inputArr[j + 1];
    			    inputArr[j + 1] = tmp;
    		    }
    	    }
        }
        return inputArr;
    };

## ✅ Solução 4 - Imagens

Segue o modelo relacional:

![Segue o modelo relacional](https://sites.google.com/site/uniplibancodedados1/_/rsrc/1525438610279/exercicios/exercicio-12---modelo-relacional/universidade2.jpg)

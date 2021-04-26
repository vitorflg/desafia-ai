import React from 'react';
import { Header } from '../../components/headers/PublicHeader';
import { Box, Flex, Image, Button, Input, Label, Textarea, Text } from '@theme-ui/components';
import { Heading } from 'theme-ui';
import { HiOutlineLightBulb } from 'react-icons/Hi'
import { GoFile, GoTag } from 'react-icons/Go'
import { RiCheckboxMultipleBlankLine } from 'react-icons/Ri'
import { AiOutlineUpload}  from 'react-icons/Ai'
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import EXPERIMENTAL_Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select'

import logoImgSrc from '../../assets/images/logo.png';

type Options = {
    label: string
    value: string | {}
}[]

const CreateChallengePage: React.FC = () => {
    React.useEffect(() => {
        clearAllBodyScrollLocks();
    });

    const optionsCategory: Options = [
        {
            value: { id: 0, name: 'dev-web' },
            label: 'Desenvolvimento Web',
        },
        {
            value: { id: 1, name: 'logica-programacao' },
            label: 'Lógica de Programação',
        },
        {
            value: { id: 2, name: 'iot' },
            label: 'Internet das Coisas',
        },
        {
            value: { id: 3, name: 'machine-learning' },
            label: 'Machine Learning',
        },
        {
            value: { id: 4, name: 'redes' },
            label: 'Redes',
        },
        {
            value: { id: 5, name: 'ciencia-dados' },
            label: 'Ciência de Dados',
        },
    ]

    const optionsTags: Options = [
        {
            value: { id: 0, name: 'ReactJs' },
            label: 'ReactJs',
        },
        {
            value: { id: 1, name: 'NodeJs' },
            label: 'NodeJs',
        },
        {
            value: { id: 2, name: 'DynamoDB' },
            label: 'DynamoDB',
        },
    ]

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: ['auto', '100vh'],
                    backgroundColor: 'gray--200',
                }}
            >
                <Header
                    sx={{
                        px: [2, 4, 4],
                        py: '1rem',
                        width: 'fit-content',
                        margin: 0,
                    }}
                >
                    <Image width="140" src={logoImgSrc} />
                </Header>

                <Flex
                    sx={{
                        flexDirection: ['column', 'row'],
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: ['100%','90%']
                    }}
                >
                    <Box sx={{ width: ['100%', '40%'], padding: '0rem 2rem', color: 'gray-700', opacity: '0.8' }}>
                        <Heading variant="caps" sx={{ fontFamily: 'monospace' }}>Crie seu desafio!</Heading>
                        <Text mt={1} >Tenha certeza de que o título contenha todas as palavras chaves do seu desafio e que ao mesmo tempo seja uma síntese do que precisa.</Text>
                        <Text mt={1} >Na descrição você pode desenvolver mais a ideia, quanto mais completa ela for, mais rápido o desafiante resolverá seu desafio!</Text>
                    </Box>
                    <Box sx={{ padding: '0rem 2rem', width: ['100%', '60%'], marginTop: ['1rem', '0']}}>
                        <Box as="form" onSubmit={(e) => e.preventDefault()}
                        >
                            <Flex>
                                <HiOutlineLightBulb size="20px" color="#3F3F46" />
                                <Label htmlFor="challenge-name" pl={1} sx={{ color: 'gray-700' }}>Título do desafio</Label>
                            </Flex>
                            <Input type="text" name="challenge-name" id="challenge-name" placeholder="Ex: Aplicação web de xadrez com IA" sx={{ backgroundColor: 'background', border: '0.125rem solid', borderColor: 'gray-700', opacity: '0.6' }} />

                            <Flex mt={3}>
                                <GoFile size="20px" color="#3F3F46" />
                                <Label htmlFor="challenge-description" pl={1} sx={{ color: 'gray-700' }}>Descreva o desafio com suas palavras</Label>
                            </Flex>
                            <Textarea name="challenge-description" id="challenge-description" placeholder="Ex: Meu desafio consiste em uma aplicação web de xadrez online com IA. A IA precisa apenas responder a jogada após o jogador humano ter feito uma jogada." rows={6} sx={{ backgroundColor: 'background', border: '0.125rem solid', borderColor: 'gray-700', opacity: '0.6' }} />
                            
                            <Flex mt={3}>
                                <AiOutlineUpload size="20px" color="#3F3F46" />
                                <Label htmlFor="challenge-name" pl={1} sx={{ color: 'gray-700' }}>Upload de arquivos</Label>
                            </Flex>
                            <Input type="file" multiple name="challenge-file" id="challenge-file" sx={{ backgroundColor: 'background', border: '0.125rem solid', borderColor: 'gray-700', opacity: '0.6' }} />
                            
                            <Flex mt={3}>
                                <RiCheckboxMultipleBlankLine  size="20px" color="#3F3F46" />
                                <Label htmlFor="challenge-category" pl={1} sx={{ color: 'gray-700' }}>Categoria</Label>
                            </Flex>
                            <EXPERIMENTAL_Select
                                defaultValue={optionsCategory[0]}
                                multi={true}
                                options={optionsCategory}
                            />

                            <Flex mt={3}>
                                <GoTag size="20px" color="#3F3F46" />
                                <Label htmlFor="challenge-category" pl={1} sx={{ color: 'gray-700' }}>Tags</Label>
                            </Flex>
                            <EXPERIMENTAL_Select
                                defaultValue={optionsTags[0]}
                                multi={true}
                                options={optionsTags}
                            />

                            <Button my={3} sx={{ float: 'right', }} >Criar desafio!</Button>
                        </Box>
                    </Box>


                </Flex>
            </Box>
        </>
    );
};

export default CreateChallengePage;

type Options = {
  label: string;
  value: string | {};
}[];

export const categoryOptions: Options = [
  {
    value: 'dev-web',
    label: 'Desenvolvimento Web',
  },
  {
    value: 'logica-programacao',
    label: 'Lógica de Programação',
  },
  {
    value: 'iot',
    label: 'Internet das Coisas',
  },
  {
    value: 'machine-learning',
    label: 'Machine Learning',
  },
  {
    value: 'redes',
    label: 'Redes',
  },
  {
    value: 'ciencia-dados',
    label: 'Ciência de Dados',
  },
];

export const tagOptions: Options = [
  {
    value: 'react.js',
    label: 'ReactJs',
  },
  {
    value: 'node.js',
    label: 'NodeJs',
  },
  {
    value: 'dynamo-db',
    label: 'DynamoDB',
  },
];

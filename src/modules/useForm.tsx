import React from 'react';

type State = Record<string, any>;

export default function useForm() {
  const [state, setState] = React.useState<State>({});

  function handleInputChange(name: string, value: any) {
    setState({
      ...state,
      [name]: value,
    });
  }

  return {
    handleInputChange,
    formData: state,
    setFormData: setState,
  };
}

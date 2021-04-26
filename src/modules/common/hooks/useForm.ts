import { useState, ChangeEvent, SyntheticEvent } from 'react';

type FormData = Record<string, string>;

export const useForm = (
  initialState: FormData = {},
  onSubmit?: (formData: FormData) => void
) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return { formData, handleInputChange, handleSubmit };
};

import { useState, ChangeEvent, SyntheticEvent } from 'react';

type FormData = Record<string, string | number | boolean>;

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
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return { formData, handleInputChange, handleSubmit };
};

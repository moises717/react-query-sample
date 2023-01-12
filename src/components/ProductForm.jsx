import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productsApi';

export const ProductForm = () => {
	const queryClient = useQueryClient();

	const addProductMutation = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});

	const handleSubmit = e => {
		e.preventDefault();
		const form = new FormData(e.target);
		const product = Object.fromEntries(form);

		addProductMutation.mutate({
			...product,
			inStock: true,
		});
		e.target.reset();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='name'>Nombre</label>
			<input type='text' name='name' />

			<label htmlFor='description'>Descripción</label>
			<input type='text' name='description' />

			<label htmlFor='price' name='price'>
				Precio
			</label>
			<input type='number' />

			<button type='submit'>Agregar</button>
		</form>
	);
};

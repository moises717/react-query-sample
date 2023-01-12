import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProduct, getProducts, updateProduct } from '../api/productsApi';

export const Products = () => {
	const {
		isLoading,
		data: products,
		isError,
		error,
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
		select: products => products.sort((a, b) => b.id - a.id),
	});

	const deleteProductMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});
	const updateProductMutation = useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});

	const queryClient = useQueryClient();

	const handleDelete = id => {
		deleteProductMutation.mutate(id);
	};

	const onChecked = (e, product) => {
		updateProductMutation.mutate({
			...product,
			inStock: e.target.checked,
		});
	};

	if (isLoading) return <h1>Cargando...</h1>;
	if (isError) return <h1>Ocurrió un error {error}</h1>;

	return (
		<div>
			{products.map(product => (
				<div key={product.id}>
					<h3>{product.name}</h3>
					<button onClick={() => handleDelete(product.id)}>delete</button>
					<input type='checkbox' checked={product.inStock} onChange={e => onChecked(e, product)} /> inStock
				</div>
			))}
		</div>
	);
};

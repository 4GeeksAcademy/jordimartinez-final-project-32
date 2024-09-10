const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
				
			],
			category: JSON.parse(localStorage.getItem("category")) || [],
			product: JSON.parse(localStorage.getItem("product")) || []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			getAllCategories: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/category`);
					let data = await response.json();
			
					setStore({
						category: data
					});
			
					localStorage.setItem("category", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},

			getAllProducts: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/product`);
					let data = await response.json();
					
			
					setStore({
						product: data
					});
			
					localStorage.setItem("product", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},

			addProduct: async (product) => {
                try {
                    const response = await fetch( `${process.env.BACKEND_URL}/api/product`, {
                        method: 'POST',
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        body: product
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        console.error('Error al agregar el producto');
                        return null;
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    return null;
                }
            },


			deleteProduct: async (id) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, {
						method: "DELETE"
					})

					if (response.ok) {
						getActions().getAllProducts()
						return true
					}

				} catch (error) {
					console.log(error)
				}
			},

			putProduct: async (product, id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, {
						method: "PUT",
						body: product
					});
			
					if (response.ok) {
						getActions().getAllProducts();
						return true;
					} else {
						console.log("Error al actualizar producto");
						return false;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},


		}
	};
};

export default getState;

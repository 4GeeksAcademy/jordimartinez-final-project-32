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
			product: JSON.parse(localStorage.getItem("product")) || [],
			user: JSON.parse(localStorage.getItem("user")) || [],
			token: localStorage.getItem("token") || null,
            kart: JSON.parse(localStorage.getItem("kart")) || []
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
			searchProduct: (query) => {
                const store = getStore();
                let searchResult = store.product.filter((item) =>
                    item.generic_name.toLowerCase().includes(query.toLowerCase()) ||
                    item.active_ingredient.toLowerCase().includes(query.toLowerCase()) ||
                    item.category_id.toString().includes(query)
                );
                setStore({ search: searchResult });		
			},

			addToKart: (product) => {
                const store = getStore();
                const existingProduct = store.kart.find(item => item.product_id === product.product_id);

                if (existingProduct) {
                    const updatedKart = store.kart.map(item => {
                        if (item.product_id === product.product_id) {
                            return { ...item, quantity: item.quantity + 1 };
                        }
                        return item;
                    });
                    setStore({ kart: updatedKart });
                    localStorage.setItem("kart", JSON.stringify(updatedKart));
                } else {
                    const updatedKart = [...store.kart, { ...product, quantity: 1 }];
                    setStore({ kart: updatedKart });
                    localStorage.setItem("kart", JSON.stringify(updatedKart));
                }
            },
            updateKartQuantity: (productId, quantity) => {
                const store = getStore();
                const updatedKart = store.kart.map(item => {
                    if (item.product_id === productId) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                setStore({ kart: updatedKart });
                localStorage.setItem("kart", JSON.stringify(updatedKart));
            },
            removeFromKart: (productId) => {
                const store = getStore();
                const updatedKart = store.kart.filter(product => product.product_id !== productId);
                setStore({ kart: updatedKart });
                localStorage.setItem("kart", JSON.stringify(updatedKart));
            },
			getCurrentUser: async () => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ currentUser: data });
                    } else {
                        console.error('Error al obtener la información del usuario');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

			
            registerUser: async (userData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
					
                        return response.status;
                   
                } catch (error) {                    
					console.error('Error en la solicitud:', error);
                    return null;
                }
            },

            loginUser: async (user) => {
				console.log(user)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					});
					const data = await response.json();
					if (response.status === 200) {
						setStore({
							token: data.token,
						});
						localStorage.setItem("token", data.token);
						
						getActions().getUserLogin()
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.error("Error en el login:", error);
					return false;
				}
			},
			
            updateUser: async (id, user) => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/user/update_status/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						},
						body: JSON.stringify(user)
					});
					let data = await response.json();
			
					if (response.status === 200) {
						return true;
					} else {
						console.error("Error updating user:", data.message);
						return false;
					}
				} catch (error) {
					console.log("Error updating user:", error);
					return false;
				}
			},

			putUser: async (user, id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: "PUT",
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						},
						body: JSON.stringify(user)
					});
			
					if (response.ok) {
						getActions().getAllProducts();
						return true;
					} else {
						console.log("Error al actualizar usuario");
						return false;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			
						
			deleteUser: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						}
					});
			
					if (response.ok) {
						getActions().getAllUsers();
						return true;
					} else {
						const errorData = await response.json();
						console.error('Error en la solicitud:', errorData.message);
						return false;
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
					return false;
				}
			},

            logoutUser: () => {
                setStore({
					token: null,
					user: null
				});
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				Swal.fire({
					icon: 'success',
					title: '¡Cierre de sesión exitoso!',
					text: 'Has cerrado sesión correctamente.',
				});
            },

			getUserById: async (id) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/theuser/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					let data = await response.json();
			
					if (response.ok) {
						return data;
					} else {
						console.error("Error fetching user:", data.message);
						return null;
					}
				} catch (error) {
					console.log("Error fetching user:", error);
					return null;
				}
			},

			getUserLogin: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					});
					const data = await response.json();
			
					if (response.ok) {
						setStore({
							user: data
						});
						localStorage.setItem("user", JSON.stringify(data));
					}
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error);
				}
			},

			getAllUsers: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						}
					});
					let data = await response.json();
			
					if (response.ok) {
						return data;
					} else {
						console.error("Error fetching user:", data.message);
						return null;
					}
				} catch (error) {
					console.log("Error fetching user:", error);
					return null;
				}
			},

			getUserLogin: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					});
					const data = await response.json();
			
					if (response.ok) {
						setStore({
							user: data
						});
						localStorage.setItem("user", JSON.stringify(data));
					}
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error);
				}
			},

			getAllUsers: async () => {
				// const store = getStore();
				// try {
				// 	const response = await fetch(`${process.env.BACKEND_URL}/api/user/all`, {
				// 		method: 'GET',
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 			'Authorization': `Bearer ${store.token}`
				// 		}
				// 	});
				// 	if (response.ok) {
				// 		const data = await response.json();
				// 		setStore({ user: data });
				// 		localStorage.setItem("user", JSON.stringify(data));
				// 	} else {
				// 		console.error('Error al obtener la lista de usuarios');
				// 	}
				// } catch (error) {
				// 	console.error('Error en la solicitud:', error);
				// }
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/user/all`);
					method: 'GET'
					let data = await response.json();
			
					setStore({
						user: data
					});
			
					localStorage.setItem("user", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
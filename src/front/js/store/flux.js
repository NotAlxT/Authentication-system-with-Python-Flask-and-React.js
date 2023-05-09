const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token")
				console.log("apllication is loaded, syncing the session storage token")
				if(token && token !="" && token != undefined) setStore ({token: token})
			},
			logout: () => {
				sessionStorage.removeItem("token")
				console.log("loggin out")
				setStore ({token: null})
			},

			login: async(email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try{
					const resp = await fetch('http://127.0.0.1:3001/api/token', opts)
					
						if(resp.status !== 200){
							 alert("There has been an error!")
							 return false
							}
				
							const data = resp.json()
							console.log("this come from the backend", data)
							sessionStorage.setItem("token", data.access_token);
							setStore({ token: data.access_token})
							return true
					}
					catch(error){
						console.error("there has been an error login in")
					}
		},

			getMessage: async () => {
				const store = getStore()
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				}
				try{
					// fetching data from the backend
					const resp = await fetch("http://127.0.0.1:3001/api/token/api/hello", opts)
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
			}
		}
	};
};

export default getState;

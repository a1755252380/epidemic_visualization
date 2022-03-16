
import axios from "axios"
const myRequest = (options) =>{
	return new Promise((resolve,reject) => {
		axios({
			url: options.url,
			method:options.method || 'POST',
			data:options.data || {},
		
    }).then((res) => {resolve(res) })
	})
}

export {myRequest}

# ForumApiNodeJs

● Install node_modules

    npm i

● Change the variables to yours in .env

    PORT
    DB_NAME
    DB_USER
    DB_PASSWORD
    DB_HOST
    DB_PORT


● Routes:

/user

	method: POST /registration 

		request {
			"username": "string",
			"password": "string"
		}

		response { 
			"message": true 
		}

	method: POST /login

		request {
			"username": "string",
			"password": "string"
		}

		response {     
                    "id": integer,
    	         "username": string,
             	 "password": string,
    	         "posts": [],
    	         "questions": [],
    	         "createdAt": date,
    	         "updatedAt": date
		}

	method: POST /get

		request {
			"id": integer
		}

		response {
                    "id": integer,
    	         "username": string,
             	 "password": string,
    	         "posts": [],
    	         "questions": [],
    	         "createdAt": date,
    	         "updatedAt": date
		}

/post

	method: POST /create

		request {
	                "userId": "integer",
    	        "imageUrl": "string",
 			"title": "string",
    	        "text": "string",
    	        "contacts": "string",
    	        "price": "string",
		}

		response { 
			message: "Пост успешно создан" 
			}

	method: DELETE /delete

		request {
			"postId": integer
		}

		response { 
			message: "Пост успешно удален" 
		}

	method: GET /getAll

		request { void }

		response { 
			[ posts ]
		}

	method: POST /getById

		request {
			"postId": integer
		}

		response { 
			post
		}

/question

	method: POST /create

		request {
	                "userId": integer
 		        "title": "string",
    	        "text": "string",
		}

		response { 
			message: "Вопрос успешно создан" 
			}

	method: DELETE /delete

		request {
	    		"questionId": integer
		}

		response { 
			message: "Вопрос успешно удален"
			}
	
	method: GET /getAll

		request { void }

		response { 
			[ questions ]
			}

	method: POST /getById

		request { 
			"questionId": integer
		}

		response { 
			[ question ]
			}

/comment

	method: POST /create

		request { 
			"username": "string",
			"postId" or "questionId": integer,
			"text": "string"

		}

		response { 
			message: "Комментарий создан" 
			}

	method: DELETE /delete

		request { 
			"postId" or "questionId": integer
		}

		response { 
			message: "Комментарий создан" 
			}

	method: POST /get

		request { 
			"postId" or "questionId": integer
		}

		response { 
			[ questionComments ]
			}

●Enjoy!

# Command For Starting the Application
    npm i 
    npm start

# Docker command for Building aplication
    docker build -t <docker images>
    docker build -t sample/backendapi:v0.1 .
    docker run -d <d:port><h:port> <imagename>

# Details Of API

## Register and login end point with their response

     
    http://localhost:2000/api/register

    JSON Param For registering User :
    {
        "name":"mr1",
        "email":"mrk@1323",
        "password":"mkr1123"
    }
    Response After Registering


    http://localhost:2000/api/login
    {
        "email":"mrk@1323",
        "password":"mkr1123"
    }

    Response After login
    {
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjY0NjljNWVjNmVjZmQxZjEzOTAyMCIsImlhdCI6MTcyNzQxOTkwMCwiZXhwIjoxNzI3NDIzNTAwfQ.8x0NMAnB7XesTUjTdEr_fUGnbDj1CidWpkU-sgZ2CTs"
    }
   
## Adding Product apis
    # For Adding Product
    localhost:2000/api/add-products
    {
    "products": [
        {
            "name": "Laptop",
            "qty": 2,
            "rate": 500
        },
        {
            "name": "Keyboard",
            "qty": 5,
            "rate": 30
        },
         {
            "name": "Keyboard1",
            "qty": 5,
            "rate": 303
        },
         {
            "name": "Mobile",
            "qty": 5,
            "rate": 301
        }
    ]
    }

    # Get Quotations
    localhost:2000/api/quotations

    Response We got:-
    [
    {
        "id": "66f6470a5ec6ecfd1f139027",
        "date": "2024-09-27T05:47:54.589Z",
        "downloadLink": "/api/quotations/download/66f6470a5ec6ecfd1f139027"
    },
    {
        "id": "66f6472a5ec6ecfd1f139033",
        "date": "2024-09-27T05:48:26.543Z",
        "downloadLink": "/api/quotations/download/66f6472a5ec6ecfd1f139033"
    },
    {
        "id": "66f649245ec6ecfd1f13904f",
        "date": "2024-09-27T05:56:52.540Z",
        "downloadLink": "/api/quotations/download/66f649245ec6ecfd1f13904f"
    }
    ]

    #Downiloading the invoice
    localhost:2000/api/quotations/download/66f649245ec6ecfd1f13904f

    ![Screenshot of the project](test_sample.png)
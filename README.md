## products-catalog implementation

### API's

- Login (Generate Token) - "http://localhost:9001/token" (post)
- Signup - "http://localhost:9001/users" (post)
- Fetch all products - "http://localhost:9001/products"
- Fetch one product - "http://localhost:9001/products/{id}"
- Search products - "http://localhost:9001/products/search/{string}"
- Add product - "http://localhost:9001/products" (post)
- Check product serviceablity -"http://localhost:9001/delivery/{productcode}/{pincode}"

##### a. Products-Catalog Server

    - Maven -> Update Project
    - Using MySQL, create database "products"
    - Run as Spring Boot Project (Running at PORT - 9001)

##### b. Products-Catalog Frontend

    - npm install
    - ng serve (Running at PORT - 4200)

##### c. Outputs

- Search Page

<img src="https://raw.githubusercontent.com/itsrahulhere/products-catalog/main/products-frontend/screenshots/search-page.png" width="1080" height="440" />

- Products View (without Login)

<img src="https://raw.githubusercontent.com/itsrahulhere/products-catalog/main/products-frontend/screenshots/products-without-login.png" />

- Products View (with Login)

<img src="https://raw.githubusercontent.com/itsrahulhere/products-catalog/main/products-frontend/screenshots/products-with-login.png" />

- Product Details Page (view only if user is login)

<img src="https://raw.githubusercontent.com/itsrahulhere/products-catalog/main/products-frontend/screenshots/product-details.png" />

- Login Page

<img src="https://raw.githubusercontent.com/itsrahulhere/products-catalog/main/products-frontend/screenshots/login.png" width="1080" height="440" />

- Signup Page

<img src="https://raw.githubusercontent.com/itsrahulhere/products-catalog/main/products-frontend/screenshots/signup.png" />

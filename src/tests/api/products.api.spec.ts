import { test, expect, request } from '@playwright/test'

test.describe('Products API', () => {

    // Test 1: GET products → 200
    test('GET all products should return 200', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/productsList')

        // Check status code
        expect(response.status()).toBe(200)

        // Check response body
        const body = await response.json()

        // Assert 3: responseCode inside body
        expect(body.responseCode).toBe(200)

        // Assert 4: products array exists
        expect(body.products).toBeDefined()

        // Assert 5: products list is not empty
        expect(body.products.length).toBeGreaterThan(0)

        // Assert 6: first product has required fields
        expect(body.products[0]).toHaveProperty('id')
        expect(body.products[0]).toHaveProperty('name')
        expect(body.products[0]).toHaveProperty('price')

    })

    test("Post all product details should return 200", async ({ request }) => {
        const response = await request.post('https://automationexercise.com/api/productsList')

        expect(response.status()).toBe(200)

        const body = await response.json()
        console.log(body)
    })

    test("search a product", async ({ request }) => {
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            form: {
                search_product: 'top'
            }
        })
        // Step 1: send POST request with search term
        // Step 2: check status 200

        expect(response.status()).toBe(200)

        // Step 3: check body.responseCode is 200
        const body = await response.json()
        // This shows EXACT property names from API!
        console.log(JSON.stringify(body, null, 2))
        expect(body.responseCode).toBe(200)

        // Step 4: check products array exists
        expect(body.products).toBeDefined()

        // Step 5: check products length > 0
        expect(body.products.length).toBeGreaterThan(0)
    })

    // checking the Brand list
    test('GET all brands should return 200', async ({ request }) => {
        // Step 1: send GET request to /api/brandsList

        const response = await request.get("https://automationexercise.com/api/brandsList")

        // Step 2: check status 200
        expect(response.status()).toBe(200)


        // Step 3: parse body

        const body = await response.json()
        console.log(JSON.stringify(body, null, 2))

        // Step 4: check body.responseCode is 200
        expect(body.responseCode).toBe(200)

        // Step 5: check brands array exists
        expect(body.brands).toBeDefined()

        // Step 6: check brands length > 0
        expect(body.brands.length).toBeGreaterThan(0)

        // Step 7: check first brand has 'brand' property
        expect(body.brands[0]).toHaveProperty('brand')
    })

    // Test 1: Valid login credentials
    test('POST verify login with valid credentials', async ({ request }) => {
        const response = await request.post(
            'https://automationexercise.com/api/verifyLogin', {
            form: {
                email: 'siddu123@gmail.com',
                password: 'Siddu123'
            }
        })
        // check status 200
        expect(response.status()).toBe(200)

        // check body.responseCode is 200
        const body = await response.json()
        expect(body.responseCode).toBe(200)


        // check body.message contains 'User exists'
        expect(body.message).toContain('User exists')
    })

    // Test 2: Invalid login credentials
    test('POST verify login with invalid credentials', async ({ request }) => {
        // hint: use wrong email and password
        const response = await request.post(
            'https://automationexercise.com/api/verifyLogin', {
            form: {
                email: 'abc123@gmail.com',
                password: 'abc123'
            }
        })

        // hint: check error message
        // Check error message
        const body = await response.json()
        expect(body.message).toContain('User not found!')

        // hint: expect 404 response code   
        expect(response.status()).toBe(200)

    })

    // create an account
    test('POST create new account', async ({ request }) => {
        // Step 1: send POST with user details
        const response = await request.post(
            'https://automationexercise.com/api/createAccount', {
            form: {
                name: 'Siddu',
                email: 'siddu1234@gmail.com',   // use unique email!
                password: 'Siddu1234',
                day: '12',
                month: '2',
                year: '2003',
                firstname: 'siddu',
                lastname: 'Bashetti',
                address1: '12fghjklkjhb',
                country: 'India',
                state: 'Karnataka',
                city: 'Pune',
                zipcode: '123555',
                mobile_number: '9087654321'



            }
        })

        // Step 2: check status
        expect(response.status()).toBe(200)

        // Step 3: check responseCode
        const body = await response.json()
        console.log(JSON.stringify(body, null, 2))

        // Step 4: check message
        expect(body.responseCode).toBe(201)
        expect(body.message).toContain('User created!')

    })

    test('DELETE account', async ({ request }) => {
        // Step 1: send DELETE request
        const response = await request.delete(
            'https://automationexercise.com/api/deleteAccount', {
            form: {
                email: 'siddu1234@gmail.com',      // use the email you just created!
                password: 'Siddu1234'
            }
        })

        // Step 2: check status
        expect(response.status()).toBe(200)

        // Step 3: check responseCode
        const body = await response.json()
        console.log(JSON.stringify(body, null, 2))
        expect(body.responseCode).toBe(200)

        // Step 4: check message contains 'Account deleted!'
        expect(body.message).toContain('Account deleted!')
    })
})  
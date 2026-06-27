# Asnatech Panel

in the pervious website I want to make some changes:

- make it i18n (persian / english) with rtl and ltr handling
- move the logout button to the bottom of the sidebar
- I want the website looks new with awesome theme and design like this `https://dashboardpack.com/live-demo-preview/?livedemo=391511`

I added an api in orders which admin and verifier can list documents of an order, from there user can see the document detail and print the document

GET /orders/19669/documents

response

```json
{
    "data": [
        {
            "id": 19118,
            "order_id": 19669,
            "register_date": "2026-06-22T13:41:45.28357+03:30"
        },
        {
            "id": 19119,
            "order_id": 19669,
            "register_date": "2026-06-22T13:41:45.677006+03:30"
        }
    ],
    "message": "Successfully retrieved documents"
}
```

# API Documentation

## Locations

### GET /locations

> Mendapatkan semua lokasi yang tersedia.

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "Location Name",
        "latitude": -6.200000,
        "longitude": 106.816666
    },
    ...
]
```

_Response (404)_

```
{
    "message": "No locations found"
}
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

## Menus

### GET /menus

> Mendapatkan semua menu yang tersedia.

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "Menu Name",
        "price": 50000,
        "description": "Menu description",
        "availability": true
    },
    ...
]
```

_Response (404)_

```
{
    "message": "No menus found"
}
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

## Carts

### GET /carts

> Mendapatkan semua item di keranjang belanja pengguna.

_Request Header_

```
{
    "Authorization": "Bearer <user_token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "UserId": 1,
        "MenuId": 2,
        "quantity": 3,
        "Menu": {
            "name": "Menu Name",
            "price": 30000
        }
    },
    ...
]
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

### POST /carts

> Menambahkan item ke keranjang belanja.

_Request Header_

```
{
    "Authorization": "Bearer <user_token>"
}
```

_Request Body_

```
{
    "LocationId": 1,
    "MenuId": 2,
    "quantity": 3
}
```

_Response (201)_

```
{
    "id": 1,
    "UserId": 1,
    "LocationId": 1,
    "MenuId": 2,
    "quantity": 3
}
```

_Response (400)_

```
{
    "message": "Add at least one item"
}
```

_Response (404)_

```
{
    "message": "Location not found" or "Menu not found"
}
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

### PATCH /carts/:cartId

> Mengupdate jumlah item tertentu di keranjang belanja.

_Request Header_

```
{
    "Authorization": "Bearer <user_token>"
}
```

_Request Body_

```
{
    "quantity": 2
}
```

_Response (200)_

```
{
    "id": 1,
    "UserId": 1,
    "MenuId": 2,
    "quantity": 2
}
```

_Response (400)_

```
{
    "message": "Add at least one item"
}
```

_Response (404)_

```
{
    "message": "Cart not found"
}
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

### DELETE /carts/:cartId

> Menghapus item tertentu dari keranjang belanja.

_Request Header_

```
{
    "Authorization": "Bearer <user_token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Cart item with id <cartId> successfully deleted"
}
```

_Response (404)_

```
{
    "message": "Cart not found"
}
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

### POST /carts/checkout

> Melakukan checkout untuk semua item di keranjang belanja.

_Request Header_

```
{
    "Authorization": "Bearer <user_token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Checkout berhasil, total belanja sebesar Rp <totalPrice>",
    "order": {
        "OrderId": 1,
        "UserId": 1,
        "LocationId":

 1,
        "totalPrice": 90000,
        ...
    }
}
```

_Response (400)_

```
{
    "message": "Keranjang belanja kosong"
}
```

_Response (500)_

```
{
    "message": "Internal Server Error"
}
```

---

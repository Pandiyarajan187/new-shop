export const addItem = (item, next) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({ ...item, count: 1 })

        cart = Array.from(new Set(cart.map((value, _) => value._id))).map((value, _) => {
            return cart.find(p => p._id === value)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

export const totalItem = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

export const getItem = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}

export const updateItem = (productId, count) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }
    // eslint-disable-next-line
    cart.map((value, key) => {
        if (value._id === productId) {
            cart[key].count = count
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    })
}

export const removeItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }
    // eslint-disable-next-line
    cart.map((value, key) => {
        if (value._id === productId) {
            cart.splice(key, 1)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    })
    return cart
}

export const emptyCart = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart')
    }
}
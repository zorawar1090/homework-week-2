class ShoppingCart {
    constructor() {
        this.items = []
    }
    
    getItems() { return this.items }

    addItem(name, quantity, pricePerUnit) {
        this.items.push({ name: name, quantity: quantity, pricePerUnit: pricePerUnit })
    }

    clear() {
        this.items.length = 0
    }

    total() {
        return this.items.reduce((totalValue, currentItem) => {
            return totalValue + currentItem.pricePerUnit * currentItem.quantity
        }, 0)
    }
}

module.exports = ShoppingCart
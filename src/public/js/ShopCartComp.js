const shop_cart_item = {
    props: ['cartItem', 'img'],
    template: `
    <li class="shopping-items__item">
    <div class="shopping-item__item-box">
        <img :src="img" alt="some img" class="shopping-item__img">
        <div class="shopping-item__item-info">
            <h2 class="shopping-item__name">
                {{cartItem.product_name}}
            </h2>
            <p class="shopping-item__key">
                Price:
                <span class="shopping-item__price-value">
                    \${{cartItem.price}}
                </span>
            </p>
            <p class="shopping-item__key">
                Color:
                <span class="shopping-item__value">
                    Red
                </span>
            </p>
            <p class="shopping-item__key">
                Size:
                <span class="shopping-item__value">
                    XI
                </span>
            </p>
            <p class="shopping-item__key">
                Quantity:
                <input type="number" class="shopping-item__quantity-value" v-model.number="cartItem.quantity" min="1" @change="$root.$refs.cart.changeQuantity(cartItem)">
            </p>
        </div>

        <button class="shopping-item__close-btn"  @click="$root.$refs.cart.changeQuantity(cartItem, 0)">
            <i class="shopping-item__close-btn-fa fas fa-times"></i>
        </button>
    </div>
</li>
    `
};

const shop_cart = {
    components: { shop_cart_item },
    template: `
    <div class="shopping-items__products">
        <shop_cart_item ref="shop-products-list" v-for="item of $root.$refs.cart.cartItems" :key="item.id_product" :img="item.img" :cartItem="item"></shop_cart_item>
    </div>
`
};




export default shop_cart;
const cart_total =    {
    template: `
    <div>
    <div class="shopping-check__total">
    <p class="shopping-check__subtotal">
        SUB TOTAL
        <span class="shopping-check__subtotal-value">
            \${{$root.$refs.cart.amount}}
        </span>
    </p>
    <p class="shopping-check__grandtotal">
        GRAND TOTAL
        <span class="shopping-check__grandtotal-value">
            \${{$root.$refs.cart.amount}}
        </span>
    </p>
    <hr class="shopping-check__hr">
    <button type="submit" class="shopping-check__btn">PROCEED TO CHECKOUT</button>
</div>
</div>`
};


export default cart_total;

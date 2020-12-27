import React from 'react';

const ItemsCart = (props) => (<table className="table table-striped">
    <thead>
        <tr>
        <th>S.No.</th>
        <th>Test Name</th>
        <th>Item Id</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
        {props.cartItemRemove ? <th>Action</th>: null }  
        </tr>
    </thead>
        <tbody>
            {
                props.cardItems.map((cartItem, index) => {
                    return(<tr key={cartItem.Cart.cartId}>
                    <td>{index + 1}</td>
                    <td>{cartItem.itemName}</td>
                    <td>{cartItem.itemId}</td>
                    <td>{cartItem.Cart.quantity}</td>
                    <td>{cartItem.minPrice}</td>
                    <td>{(cartItem.minPrice*cartItem.Cart.quantity).toFixed(2)}</td>
                    {props.cartItemRemove ?  <td><button type="button" onClick={() => {if(window.confirm('Do you want to delete it ?')){props.cartItemRemove(cartItem.Cart.cartId)}}}  className="btn btn-outline-danger btn-sm">Delete</button></td>
                   : null } 
                    </tr>)
                })
            }
        </tbody>
</table> )

export default ItemsCart;
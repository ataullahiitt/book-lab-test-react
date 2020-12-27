import React, {Fragment} from 'react';
import ItemsCart from './ItemsCart';

const ItemCart= (props)=> (
    <Fragment>
          <h2>Cart Item</h2>
          <ItemsCart
          cardItems={props.cardItems} 
          cartItemRemove= {props.cartItemRemove} />
    <div style={{float: 'right'}}>
      <strong>Total:</strong> {props.calCartItem().toFixed(2)}
      <br/>
      <br/>
      <button type="button" disabled={props.saveLoder} onClick={props.saveOrder} className="btn btn-success btn-lg">
       {props.saveLoder && (<span className="spinner-border spinner-border-sm"></span>)}  Pay Now
      </button>

  </div>

    </Fragment>    
);

 export default ItemCart;
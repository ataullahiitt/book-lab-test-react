import React, {Component} from 'react';
import LabService from "../../services/lab.service";
import ItemCart from './ItemCart';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import {CART_REMOVE} from '../../actions/types';


class Cart extends Component {

  state = {
    loading:true,
    saveLoder: false,
    cartItem:[], // store all cart item,
  }
  componentDidMount() {

    LabService.getCartItem().then(
      response => {
        this.setState({
          loading:false,
          cartItem: response.data.data
        });
      },
      error => {
        this.setState({
          loading: false,
        });
      }
    );
}
// Calculate total item price
itemsTotal = () => {
  return this.state.cartItem.reduce((prev, cur) => (prev + (cur.Cart.quantity * cur.minPrice)), 0)
}

// remove cart item
removeCartHandler = (cartId)=> {

  const cardItem = [... this.state.cartItem];
  const index = cardItem.findIndex(i => i.Cart.cartId === cartId);
  
  if(index > -1) {
    cardItem.splice(index, 1);
    this.props.removeCart();
    LabService.removeCartItem(cartId).then(
      response => {
        if(response.data.status === 1){
            this.setState({
              cartItem: cardItem
            });
        }
         
      },
      error => {
          console.log(error);
      }
    );
  }
}

saveOrderHandler = ()=> {
    
  this.setState({saveLoder:true});
  LabService.saveOrder({labTest:this.state.cartItem}).then(
    response => {
        const orderDetails = {
          order: response.data,
          item: this.state.cartItem }
          sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
          this.props.history.push("/order/success/" + response.data.orderId);
          window.location.reload(); 

    },
    error => {
      console.log(error);
    }
  );
  LabService.removeCartItem().then(
    res => {
        console.log(res)
    },
    error => {
      console.log(error);
    }
  ) 
}
  render(){
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    let cartElement = '';  
    if(this.state.loading){
      cartElement = <div>Loading ....</div>
    }
    else
    {
      if(this.state.cartItem.length > 0)
          cartElement =  <ItemCart cardItems = {this.state.cartItem}
                                cartItemRemove ={this.removeCartHandler}
                                calCartItem = {this.itemsTotal}
                                saveOrder   = {this.saveOrderHandler}
                                saveLoder = {this.state.saveLoder}  

                                  />;
        else 
      cartElement = <div style={{ textAlign:'center' }} className="alert alert-danger"> No items are available in the cart <Link to="/lab-test-list"> Lab Test List</Link>
      </div> 
    }  
                           
    return(<div className="container"> {cartElement} </div>)

  }

}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: () => {
        dispatch({type:CART_REMOVE});
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);

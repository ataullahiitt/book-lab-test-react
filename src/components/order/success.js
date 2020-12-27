import React, {Component} from 'react';
import { connect } from "react-redux";
import ItemsCart from '../cart/ItemsCart';

class OrderSuccess extends Component {

    state={
        order:{},
        cartItem:[]
   }
    componentDidMount(){
        // Update order data
        const orderDetails = JSON.parse(sessionStorage.getItem("orderDetails"));
        this.setState({
            order:orderDetails.order,
            cartItem:orderDetails.item
        });
    }
    render(){
        const { user: currentUser } = this.props;
       return <div className="container">
                <h4>Your order has been successfully processed!</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <td text-align='center' colSpan="2" >Order Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Order Id:</strong> {this.state.order.orderId}
                                <br/>
                                <strong>Order Date:</strong> {this.state.order.addedAt}

                             </td>
                            <td>
                                <strong> User Name: </strong> {currentUser.firstName + ' ' + currentUser.lastName} <br/>
                                <strong>Email Address: {currentUser.email}</strong>
                            </td>
                        </tr>
                </tbody>
                </table>
                <ItemsCart
                     cardItems={this.state.cartItem}
                 />
                    <div style={{float: 'right'}}>
                    <strong>Total:</strong> { this.state.order.total}. 00
                    </div>
            </div>        
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }

export default connect(mapStateToProps)(OrderSuccess);

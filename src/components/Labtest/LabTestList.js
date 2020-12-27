import React, {Component, Fragment} from 'react';
import LabService from "../../services/lab.service";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import {CART_ADD} from '../../actions/types';

class LabTestList extends Component {

  state= {
      LabTestData:[], // store lab list data
      loading:true,
  }
 // Load all lab list data
  componentDidMount() {
      LabService.getAllLabTest().then(
        response => {
          this.setState({
            LabTestData: response.data,
            loading:false
          });
        },
        error => {
           this.setState({loading:false});
        }
      );
    }
    // Add the lab test to cart
    addToCartHandler = (id)=> {

      this.props.addToCart();
        const PostData = {labTestId:id, quantity: 1};
        LabService.addTocart(PostData).then(
            response => {
                alert('Lab Test added to cart !.');
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
        return(
            <div className="container">
             {this.state.loading ? <span>Loading....</span> :

            <Fragment>
                <div>
                <h2>Lab Test</h2>
                </div>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Lab Name</th>
                        <th>Test Name</th>
                        <th>Price</th>
                        <th>Add to cart</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.LabTestData.map(list => {
                        return(
                            <tr key={list.id}>
                            <td>{list.SN}</td>
                            <td>{list.labName}</td>
                            <td>{list.itemName}</td>
                            <td>{list.minPrice}</td>
                            <td><button type="button" onClick={()=>this.addToCartHandler(list.id)} className="btn btn-outline-primary">Add to cart</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table> 
            </Fragment> 
              
            } 
              
          </div>

        )
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
      addToCart: () => {
          dispatch({type:CART_ADD});
      }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(LabTestList);
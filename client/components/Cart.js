// import React from 'react'
// import { connect } from 'react-redux'
// import CartItem from './CartItem'
// import { fetchItems } from '../store'

// class Cart extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             products: []
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }

//     componentDidMount() {

//     }

//     handleChange(e) {
//         e.preventDefault()
//     }

//     render() {
//         const { handleChange } = this;
//         return (
//             <div className = 'cart-component'>
//                 {this.props.products.map((product) => (
//                         <CartItem product={product} />
//                 ))}
//             </div>
//         )
//     }
// }

// const mapState = ( state ) => {
//     return {
//         products: state.products
//     }
// }

// // const mapDispatch = (dispatch) => {
// //     fetchItems: () => dispatch(fetchItems())
// // }

// export default connect(mapState)(Cart)

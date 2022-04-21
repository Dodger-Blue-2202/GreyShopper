// import React from 'react'
// import { Link } from 'react-router-dom'

// class CartItem extends React.Component {
//     constructor(props) {
//         super(props)
//         this.handleChange = this.handleChange.bind(this)
//     }

//     handleChange(e) {

//     }

//     render() {
//         const { product } = this.props
//         const { quantity } = product
//         const { handleChange } = this
//         return (
//         <div>
//             <Link to={`/products/${product.id}`} className='product-link'>
//                 <img src={product.imageUrl} />
//             </Link>
//             <h2>{product.name}</h2>
//             <h2>${(product.price / 100).toFixed(2).toLocaleString()}</h2>
//             <div className='cart-quantity-form'>
//                 <label htmlFor='qty'>Quantity: </label>
//                 <input name='qty' onChange={handleChange} value={quantity}/>
//             </div>
//         </div>
//     )
//     }

// }

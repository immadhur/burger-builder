import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Checkout/Order/Order';

class OrderDetails extends Component {
    state = {
        orders: [],
        loading: true,
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/orders.json');
            const dbRes = res.data;
            let ordersToDisplay = [];
            for (let key in res.data) {
                ordersToDisplay.push(
                    {
                        ...dbRes[key],
                        key: key
                    })
            }
            this.setState({ orders: ordersToDisplay, loading: false });
            console.log(res.data);
        } catch (error) {
            console.log('Kuch galat ho gya!');
            this.setState({ loading: false });
        }
    }

    render() {
        let orders = <Spinner />
        if (!this.state.loading) {
            orders = this.state.orders.map(item =>
                <Order key={item.key} price={item.price} order={item}/>
            );
        }
        return (
            <div style={{ marginTop: '80px' }}>
                {orders}
            </div>
        );
    }
}

<<<<<<< HEAD

=======
>>>>>>> 6a041417db9bca5e36030c05f689c5ab599502dd
export default OrderDetails;
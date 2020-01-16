import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Checkout/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import './OrderDetails.css';
import {
    CSSTransition, TransitionGroup
} from 'react-transition-group';

const OrderDetails = props =>{
    const [orders, setOrders]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchData=async ()=>{
        try {
            const res = await axios.get('/orders');
            const dbRes = res.data.body;
            let ordersToDisplay = [];
            for (let key in dbRes) {
                if (dbRes[key].email === props.email)
                ordersToDisplay.push(
                    {
                        ...dbRes[key],
                        key: dbRes[key]._id
                    })
                }
                setLoading(false);
                console.log(ordersToDisplay);
                setOrders(ordersToDisplay);
            } catch (error) {
                console.log('Error', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [])
        
    const deleteHandler = async (key) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/order/${key}`);
            const dbRes = res.status;
            console.log(res);
            if (dbRes === 200) {
                const orderArr=[...orders]
                let updatedOrderArr=orderArr.filter(val=>val.key!==key)
                setLoading(false);
                setOrders(updatedOrderArr);
            }
        } catch (error) {
            console.log('Error', error);
                setLoading(false);
        }
    }

        let ordersToDisplay=[];
        if (!loading) {
            ordersToDisplay = orders.length > 0 && orders.map(item =>
                // <CSSTransition timeout={500} key={item.key} classNames="move">
                    <Order deleteClick={() => deleteHandler(item.key)} key={item.key} price={item.price} order={item} />
                // </CSSTransition>
                
            )
        }

        console.log(ordersToDisplay);
        return (
            <div style={{ marginTop: '80px' }}>
                {loading&&<Spinner/>}
                {(orders.length===0 && !loading) && <p className="NoOrders">NO ORDERS TO DISPLAY</p>}
                {/* <TransitionGroup> */}
                    {ordersToDisplay}
                {/* </TransitionGroup> */}
            </div>
        );
    }

const mapStateToProps = (state) => {
    return {
        token: state.signup.token,
        email: state.signup.email
    }
}

export default connect(mapStateToProps)(withErrorHandler(OrderDetails, axios));
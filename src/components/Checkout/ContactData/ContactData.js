import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';
import style from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        ingredients: null,
        loading: false,
        totalPrice:0
    }

    componentWillMount = () => {
        this.setState({ ingredients: this.props.ingredients, totalPrice:this.props.price });
    }

    orderClickHandler = async () => {
        this.setState({ loading: true });
        if(this.state.ingredients==null || Object.entries(this.state.ingredients).length===0){
            alert("Please add Ingredients!");
            this.setState({ loading: false })
            return;
        }
        const dataToPost = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            name: 'Madhur Bansal',
            address: {
                house: 'A1704',
                area: 'sangria',
                city: 'Pune'
            },
            payment: 'cash'
        }

        try {
            const res = await axios.post('/orders.json', dataToPost);
            console.log(res);
            this.setState({ loading: false });
            this.props.history.replace('/');
        } catch (error) {
            console.log('Some error occured!')
            this.setState({ loading: false })
        }
    }

    render() {
        let dataToShow = <Spinner />
        if (!this.state.loading) {
            dataToShow = (
                <Fragment>
                    <input type='text' placeholder='Name' />
                    <input type='email' placeholder='Email' />
                    <input type='text' placeholder='Adderss' />
                    <input type='text' placeholder='Contact Number' />
                    <Button click={this.orderClickHandler} type='continue'>ORDER</Button>
                </Fragment>
            );
        }
        return (
            <div className={style.Body}>
                <h2>Just few more Details!</h2>
                {dataToShow}
            </div>
        );
    }
}

export default ContactData;
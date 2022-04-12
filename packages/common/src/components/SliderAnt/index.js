import React, {useState, Component} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Slider } from 'antd';

class SliderAnt extends Component {
    state = {
        value: this.props.maxLoan,
      }

    handlePricingChange = (value) => {
        console.log('onChange: ', value);
        this.setState({ value });
        this.props.handlePricingChange(value);
    }

    onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    }

    componentDidMount() {
        console.log('this.props.maxLoan1', this.props.maxLoan);
      }

    render() {
    return (
        <div>
            <h2 style={{ color: '#0d47a1' }}>
                  <strong>${this.state.value}</strong>
                </h2>
            <Slider 
                //defaultValue={30}
                min={this.props.maxLoan * 0.1}
                max={this.props.maxLoan} 
                onChange={this.handlePricingChange} 
                //onAfterChange={onAfterChange} 
            />
        </div>

    );
}}

export default SliderAnt;
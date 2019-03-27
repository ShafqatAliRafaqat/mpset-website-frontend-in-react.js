import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PrivatePublicEventChart extends Component {
    state = {
        ...this.props.m,
    };
    render() {

        const { publicEvents, privateEvents } = this.state;
        
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card card-small h-100">
                    <div className="card-header border-bottom">
                        <h6 className="m-0">Private And Public Events</h6>
                    </div>
                    <div className="card-body d-flex py-3" >

                        <Pie
                            data={{
                                labels: ['Private', 'Public'],
                                datasets: [
                                    {
                                        label: "Events",
                                        data: [privateEvents, publicEvents],
                                        backgroundColor: ['#00ff63', '#6b00ff'],
                                        borderColor: '#33dd66',
                                        animation: true,
                                    }
                                ]
                            }}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivatePublicEventChart;

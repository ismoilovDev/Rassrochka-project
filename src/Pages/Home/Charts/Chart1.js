import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        uv: 1900,
        pv: 2198,
        amt: 2210,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Jul',
        uv: 2570,
        pv: 3480,
        amt: 2190,
    },
    {
        name: 'Avg',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 3010,
        pv: 6000,
        amt: 2156,
    },
    {
        name: 'Oct',
        uv: 2970,
        pv: 4180,
        amt: 2190,
    },
    {
        name: 'Nav',
        uv: 3590,
        pv: 4800,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 3610,
        pv: 5300,
        amt: 2156,
    },
];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc';

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 2,
                        bottom: 5,
                    }}
                    barSize={15}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="0 3" />
                    <Bar dataKey="pv" fill="#ffffff60" background={{ fill: 'transparent' }} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

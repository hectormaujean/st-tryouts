import React from 'react';
import moment from 'moment';

import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, Brush, AreaChart, Area } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltipContent = props => {
    if (props.payload[0] != null) {
        const newPayload = [
            {
                value: moment(props.payload[0].payload.timestamp).format("dddd, MMMM DD, YYYY h:mm:ss a"),
            },
            {
                name: "Viewers",
                value: props.payload[0].payload.viewersAmount,
                color: "#ffc658"
            }
        ];
        return <DefaultTooltipContent payload={newPayload} />;
    }
    return <DefaultTooltipContent />;
}

const AudienceChart = ({
    data
}) => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} syncId="1" margin={{ top: 30, right: 50, left: 0, bottom: 0 }}>
            <XAxis dataKey="timestamp" tickFormatter={(tickItem) => moment(tickItem).format("D MMM")}/>
            <YAxis width={80} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltipContent />} />
            <Line type="monotone" dataKey="viewersAmount" stroke="#ffc658" dot={false} />
            <Brush dataKey="timestamp" tickFormatter={(tickItem) => moment(tickItem).format("D MMM")}>
                <AreaChart>
                    <Area type="monotone" dataKey="viewersAmount" stroke="#82ca9d" fillOpacity={0.5} fill="#82ca9d" />
                </AreaChart>
            </Brush>
        </LineChart>
    </ResponsiveContainer>
);

export default AudienceChart;
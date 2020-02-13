import React from 'react';
import moment from 'moment';

import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label, Area } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltipContent = props => {
    if (props.payload[0] != null) {
        const newPayload = [
            {
                value: moment(props.payload[0].payload.timestamp).format("dddd, MMMM DD, YYYY h:mm:ss a"),
            },
            {
                name: "P2P",
                value: props.payload[0].payload.p2p.toFixed(2),
                unit: " Gbps",
                color: "#82ca9d"
            },
            {
                name: "CDN",
                value: props.payload[0].payload.cdn.toFixed(2),
                unit: " Gbps",
                color: "#8884d8"
            }
        ];
        return <DefaultTooltipContent payload={newPayload} />;
    }
    return <DefaultTooltipContent />;
}

const BandwidthChart = ({
    data,
    maxCdn,
    maxP2p
}) => (
    <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} syncId="1" margin={{ top: 30, right: 50, left: 0, bottom: 0 }}>
            <XAxis dataKey="timestamp" tickFormatter={(tickItem) => moment(tickItem).format("D MMM")}/>
            <YAxis unit=" Gbps" width={80} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltipContent />} />
            <Area type="monotone" dataKey="p2p" stroke="#82ca9d" fillOpacity={0.5} fill="#82ca9d" />
            <Area type="monotone" dataKey="cdn" stroke="#8884d8" fillOpacity={0.7} fill="#8884d8" />
            <ReferenceLine y={maxP2p} stroke="green" strokeDasharray="3 3">
                <Label value="Maximum throughput" position="insideTopLeft"/>
                <Label value={`${maxP2p} Gbps`} position="insideTopRight"/>
            </ReferenceLine>
            <ReferenceLine y={maxCdn} stroke="red" strokeDasharray="3 3">
                <Label value="Maximum CDN contribution" position="insideBottomLeft"/>
                <Label value={`${maxCdn} Gbps`} position="insideBottomRight"/>
            </ReferenceLine>
            {/* <Brush dataKey="timestamp" height={30} stroke="#8884d8" /> */}
        </AreaChart>
    </ResponsiveContainer>
);

export default BandwidthChart;
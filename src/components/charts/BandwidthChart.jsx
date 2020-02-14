import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import {
	ResponsiveContainer,
	AreaChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ReferenceLine,
	Label,
	Area,
} from 'recharts'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'

const Header = styled.h3`
	margin: 20px 0 0 20px !important;
`

const CustomTooltipContent = props => {
	const { payload } = props
	if (payload !== null && payload[0] != null) {
		const total = (
			parseFloat(payload[0].payload.cdn) + parseFloat(payload[0].payload.p2p)
		).toFixed(2)
		let spikeReduction = 0

		if (parseFloat(payload[0].payload.p2p) > 0) {
			spikeReduction = (
				((parseFloat(payload[0].payload.p2p) -
					parseFloat(payload[0].payload.cdn)) /
					parseFloat(payload[0].payload.p2p)) *
				100
			).toFixed(2)
		}

		const newPayload = [
			{
				value: moment(payload[0].payload.timestamp).format(
					'dddd, MMMM DD, YYYY h:mm:ss a'
				),
			},
			{
				name: 'P2P',
				value: payload[0].payload.p2p.toFixed(2),
				unit: ' Gbps',
				color: '#82ca9d',
			},
			{
				name: 'CDN',
				value: payload[0].payload.cdn.toFixed(2),
				unit: ' Gbps',
				color: '#8884d8',
			},
			{
				name: 'Total',
				value: total,
				unit: ' Gbps',
				color: '#ffc658',
			},
			{
				name: 'Spike reduction',
				value: spikeReduction,
				unit: '%',
				color: '#8dd1e1',
			},
		]
		return <DefaultTooltipContent payload={newPayload} />
	}
	return <DefaultTooltipContent />
}

const BandwidthChart = ({ data, maxCdn, maxP2p }) => (
	<div>
		<Header>Capacity offload</Header>
		<ResponsiveContainer width='100%' height={300}>
			<AreaChart
				data={data}
				syncId='1'
				margin={{
					top: 30,
					right: 50,
					left: 0,
					bottom: 0,
				}}
			>
				<XAxis
					dataKey='timestamp'
					tickFormatter={tickItem => moment(tickItem).format('D MMM')}
				/>
				<YAxis unit=' Gbps' width={80} />
				<CartesianGrid strokeDasharray='3 3' />
				<Tooltip content={<CustomTooltipContent />} />
				<Area
					type='monotone'
					dataKey='p2p'
					stroke='#82ca9d'
					fillOpacity={0.5}
					fill='#82ca9d'
				/>
				<Area
					type='monotone'
					dataKey='cdn'
					stroke='#8884d8'
					fillOpacity={0.7}
					fill='#8884d8'
				/>
				<ReferenceLine y={maxP2p} stroke='green' strokeDasharray='3 3'>
					<Label value='Maximum throughput' position='insideTopLeft' />
					<Label value={`${maxP2p} Gbps`} position='insideTopRight' />
				</ReferenceLine>
				<ReferenceLine y={maxCdn} stroke='red' strokeDasharray='3 3'>
					<Label value='Maximum CDN contribution' position='insideBottomLeft' />
					<Label value={`${maxCdn} Gbps`} position='insideBottomRight' />
				</ReferenceLine>
				{/* <Brush dataKey="timestamp" height={30} stroke="#8884d8" /> */}
			</AreaChart>
		</ResponsiveContainer>
	</div>
)

BandwidthChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
	maxCdn: PropTypes.string,
	maxP2p: PropTypes.string,
}

BandwidthChart.defaultProps = {
	maxP2p: '0',
	maxCdn: '0',
}

export default BandwidthChart

import React from 'react';
import moment from 'moment';
import { logout } from '../services/user';
import { getBandwidth, getAudience, getStreams, getCountries, getIsps, getPlatforms } from '../services/data';
import { formatBandwidthData } from '../helpers/dataFormat';

import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area } from 'recharts';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bandwidthData: [],
            error: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: true }, async () => {
            try {
                const { data: rawBandwidthData } = await getBandwidth(1, moment().format('x'))
                const bandwidthData = await formatBandwidthData(rawBandwidthData);
                this.setState({
                    loading: false,
                    bandwidthData
                })
            }
            catch (e) {
                this.setState({ loading: false })
                if (e.response.status === 404) {
                    this.setState({ error: 'no-data' })
                } else if (e.response.status === 403) {
                    this.setState({ error: 'server' })
                } else {
                    this.setState({ error: 'unknown' })
                }
            }
        })
    }

    handleLogout = () => {
        logout()
            .then(() => {
                localStorage.removeItem('session_token');
                this.props.history.push('/login');
            })
            .catch((e) => console.log(e))
    }

    render() {
        const {
            loading,
            bandwidthData
        } = this.state;

        return (
            <div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <AreaChart width={730} height={250} data={bandwidthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="cdn" stroke="#8884d8" fillOpacity={0.5} fill="#8884d8" />
                        <Area type="monotone" dataKey="p2p" stroke="#82ca9d" fillOpacity={0.5} fill="#82ca9d" />
                    </AreaChart>
                )}
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default LoginContainer;

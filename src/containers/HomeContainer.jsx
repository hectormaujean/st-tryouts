import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { logout } from '../services/user';
import { getBandwidth, getAudience, getStreams, getCountries, getIsps, getPlatforms } from '../services/data';
import { formatBandwidthData, formatAudienceData } from '../helpers/dataFormat';

import Header from '../components/shared/Header';
import BandwidthChart from '../components/charts/BandwidthChart';
import AudienceChart from '../components/charts/AudienceChart';

const Container = styled.div`
    padding-top: 60px;
`;
class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            startDate: null,
            endDate: null,
            datePickerFocused: null,
            bandwidthData: [],
            maxCdn: undefined,
            maxP2p: undefined,
            audienceData: [],
            error: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const { startDate, endDate } = this.state;
        let startRange = 1;
        let endRange = moment().format('x');

        if (moment.isMoment(startDate) && moment.isMoment(endDate)) {
            startRange = startDate.format('x');
            endRange = endDate.format('x');
        }

        this.setState({ loading: true }, async () => {
            try {
                const { data: rawBandwidthData } = await getBandwidth(startRange, endRange);
                const { data: maxBandwidthValues } = await getBandwidth(startRange, endRange, 'max');
                const { data: rawAudienceData } = await getAudience(startRange, endRange);

                const bandwidthData = await formatBandwidthData(rawBandwidthData);
                const audienceData = await formatAudienceData(rawAudienceData);
                this.setState({
                    loading: false,
                    bandwidthData,
                    maxCdn: (maxBandwidthValues.cdn / 1073741824).toFixed(2),
                    maxP2p: (maxBandwidthValues.p2p / 1073741824).toFixed(2),
                    audienceData
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

    datesChangeHandler = ({ startDate, endDate }) => {
        this.setState({
            startDate,
            endDate,
        }, () => {
            const { startDate, endDate } = this.state;
            if (moment.isMoment(startDate) && moment.isMoment(endDate)) {
                this.getData();
            }
        });
    }

    datesFocusChangeHandler = (datePickerFocused) => {
        this.setState({ datePickerFocused });
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
            startDate,
            endDate,
            datePickerFocused,
            bandwidthData,
            maxCdn,
            maxP2p,
            audienceData
        } = this.state;

        return (
            <Container>
                <Header
                    startDate={startDate}
                    endDate={endDate}
                    datePickerFocused={datePickerFocused}
                    datesChangeHandler={this.datesChangeHandler}
                    datesFocusChangeHandler={this.datesFocusChangeHandler}
                    onLogout={this.handleLogout}
                />
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <div>
                        <BandwidthChart data={bandwidthData} maxCdn={maxCdn} maxP2p={maxP2p} />
                        <AudienceChart data={audienceData} />
                    </div>
                )}
            </Container>
        )
    }
}

export default LoginContainer;

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { logout } from '../services/user';
import { getBandwidth, getAudience } from '../services/data';
import { formatBandwidthData, formatAudienceData } from '../helpers/dataFormat';

import Loading from '../components/shared/Loading';
import Header from '../components/shared/Header';
import BandwidthChart from '../components/charts/BandwidthChart';
import AudienceChart from '../components/charts/AudienceChart';
import Errors from '../components/shared/Errors';

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
                    error: false,
                    loading: false,
                    bandwidthData,
                    maxCdn: (maxBandwidthValues.cdn / 1073741824).toFixed(2),
                    maxP2p: (maxBandwidthValues.p2p / 1073741824).toFixed(2),
                    audienceData
                })
            }
            catch (e) {
                this.setState({ 
                    loading: false,
                    bandwidthData: [],
                    maxCdn: undefined,
                    maxP2p: undefined,
                    audienceData: []
                })
                if (e.response.status === 404) {
                    this.setState({ error: 'no-data' })
                } else {
                    this.setState({ error: 'server' })
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
            .catch((e) => {
                this.setState({ error: 'logout' });
            })
    }

    render() {
        const {
            loading,
            error,
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
                    <Loading />
                ) : (
                    <div>
                        {error ? (
                            <Errors error={error} />
                        ) : (
                            <div>
                                <BandwidthChart data={bandwidthData} maxCdn={maxCdn} maxP2p={maxP2p} />
                                <AudienceChart data={audienceData} />
                            </div>
                        )}
                    </div>
                )}
            </Container>
        )
    }
}

export default LoginContainer;

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { DateRangePicker } from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates';
import { Menu, Dropdown } from 'semantic-ui-react';

const Text = styled.div`
    margin-right: 20px;
`;

const Header = ({
    startDate,
    endDate,
    datePickerFocused,
    datesChangeHandler,
    datesFocusChangeHandler,
    onLogout,
}) => (
    <Menu fluid fixed="top" borderless>
        <Menu.Item>
            <Text>Time range:</Text>
            <DateRangePicker
                startDate={startDate}
                startDateId="startdate_id"
                endDate={endDate}
                endDateId="enddate_id"
                onDatesChange={datesChangeHandler}
                focusedInput={datePickerFocused}
                onFocusChange={datesFocusChangeHandler}
                hideKeyboardShortcutsPanel
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                small
            />
        </Menu.Item>
        <Menu.Menu position="right">
            <Dropdown item icon="user" simple>
                <Dropdown.Menu>
                    <Dropdown.Item text='Logout' as='a' onClick={onLogout} />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

export default Header;

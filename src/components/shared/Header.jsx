import React from 'react';
import { DateRangePicker } from 'react-dates';
import { Menu, Dropdown } from 'semantic-ui-react';

const Header = ({
    startDate,
    endDate,
    datePickerFocused,
    datesChangeHandler,
    datesFocusChangeHandler,
    onLogout,
}) => (
    <Menu fluid fixed="top" borderless stackable>
        <Menu.Item>
            Time range:
        </Menu.Item>
        <Menu.Item>
            <DateRangePicker
                startDate={startDate}
                startDateId="startdate_id"
                endDate={endDate}
                endDateId="enddate_id"
                onDatesChange={datesChangeHandler}
                focusedInput={datePickerFocused}
                onFocusChange={datesFocusChangeHandler}
                hideKeyboardShortcutsPanel
                isOutsideRange={() => false}
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

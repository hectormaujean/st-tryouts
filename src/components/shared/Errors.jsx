import React from 'react'
import PropTypes from 'prop-types'
import { Message, Icon } from 'semantic-ui-react'

const Errors = ({ error }) => (
	<div>
		{error === 'no-data' && (
			<Message icon negative style={{ margin: '30px auto', maxWidth: '400px' }}>
				<Icon name='ban' />
				<Message.Content>
					<Message.Header>No data for this time range.</Message.Header>
					Try again with a wider range !
				</Message.Content>
			</Message>
		)}
		{(error === 'server' || error === 'logout') && (
			<Message icon negative style={{ margin: '30px auto', maxWidth: '400px' }}>
				<Icon name='bug' />
				<Message.Content>
					<Message.Header>
						Our server seems to encounter some issues.
					</Message.Header>
					We are working on a fix which will probably include lowering the dice
					of death probability.
				</Message.Content>
			</Message>
		)}
	</div>
)

Errors.propTypes = {
	error: PropTypes.string.isRequired,
}

export default Errors

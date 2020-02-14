import React from 'react'

import { Card, Placeholder } from 'semantic-ui-react'

const Loading = () => (
	<div>
		<Card fluid>
			<Card.Content>
				<Placeholder>
					<Placeholder.Line />
				</Placeholder>
				<Placeholder fluid>
					<Placeholder.Image style={{ height: '250px' }} />
				</Placeholder>
			</Card.Content>
		</Card>
		<Card fluid>
			<Card.Content>
				<Placeholder>
					<Placeholder.Line />
				</Placeholder>
				<Placeholder fluid>
					<Placeholder.Image style={{ height: '250px' }} />
				</Placeholder>
			</Card.Content>
		</Card>
	</div>
)

export default Loading

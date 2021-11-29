import React from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, Card} from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id="card">
		<PanelHeader>Card</PanelHeader>
		<Group>
			<CardGrid size="l">
				<Card mode="shadow">
					<div style={{height: 96}}/>
				</Card>
				<Card mode="shadow">
					<div style={{height: 96}}/>
				</Card>
				<Card mode="shadow">
					<div style={{height: 96}}/>
				</Card>
				<Card mode="shadow">
					<div style={{height: 96}}/>
				</Card>
			</CardGrid>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;

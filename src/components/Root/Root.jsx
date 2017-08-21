
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';

import NotFound from '../NotFound/NotFound';
import SingleArticle from '../Home/Posts/components/singleArticle';

import './styles/index.css';

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/post/:id" component={SingleArticle} />
			<Route path="*" component={NotFound} />
		</Switch>
		</BrowserRouter>
 );


export default Root;
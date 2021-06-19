import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import TaskRunner from './TaskRunner/TaskRunner';

const Layout: React.FC = () => (
  <Flex w="100%">
    <Sidebar />
    <Flex color="white" w="100%">
      <Router>
        <Switch>
          <Route path="/" component={TaskRunner} />
        </Switch>
      </Router>
    </Flex>
  </Flex>
);

export default Layout;

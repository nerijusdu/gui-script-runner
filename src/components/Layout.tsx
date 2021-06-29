import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScriptEditor from './ScriptEditor/ScriptEditor';
import Sidebar from './Sidebar';
import TaskRunner from './TaskRunner/TaskRunner';

const Layout: React.FC = () => (
  <Router>
    <Flex w="100%">
      <Sidebar />
      <Flex color="white" w="100%">
        <Switch>
          <Route exact path="/editor" component={ScriptEditor} />
          <Route path="/" component={TaskRunner} />
        </Switch>
      </Flex>
    </Flex>
  </Router>
);

export default Layout;

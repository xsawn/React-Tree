// document.write('hello world')
import React from 'react';
import ReactDOM from 'react-dom'
import Tree from './component/Tree'

const data = [{text: 'a tree node', id:1, children: []}]
ReactDOM.render(<Tree treeData={data}/>, document.querySelector('#root'))
import React from 'react';
import PropTypes from 'prop-types';
import './Tree.less';
import TreeNode from './TreeNode';

const emptyFunc = function(){}

class Tree extends React.Component {

	static propTypes = {
		treeData: PropTypes.array, 
		defaultSelectNode: PropTypes.array,
		defaultCheckedNode: PropTypes.array,
		defaultExpandNode: PropTypes.array,

		isMulti: PropTypes.bool, 
		style: PropTypes.object,
		loadTreeData: PropTypes.object,
		afterClick: PropTypes.func,
		afterExpand: PropTypes.func,
		afterCheck: PropTypes.func

	}

	static defaultProps = {
		treeData: [{text: 'a tree node', id:1, children: []}], 
		isMulti: false, 
		afterClick: emptyFunc,
		afterExpand: emptyFunc,
		afterCheck: emptyFunc
	}

	constructor(props) {
		super(props);
		this.state = {
			treeData: props.treeData,
			selectedNode: props.defaultSelectNode || "",
			checkedNodes: props.defaultCheckedNode || [],
			expandNode: props.defaultExpandNode || []
		}
	}

	handleCheck = nodeData => {
		let _checkedNodes = this.state.checkedNodes;
		let index = _checkedNodes.indexOf(nodeData.id);
		if(index > -1) {
			_checkedNodes.splice(index, 1)
		} else {
			_checkedNodes.push(nodeData.id)
		}
		this.setState({
			checkedNodes: _checkedNodes
		}, () => this.props.afterCheck(nodeData))
		
	}

	handleClick = nodeData => {
		this.setState({
			selectedNode:nodeData.id
		}, () => this.props.afterClick(nodeData))
	}

	handleExpand = nodeData => {
		/*
		let {loadTreeData } = this.props;
		loadTreeData && loadTreeData()
		makeAjax()
		*/
		// 后续可以记录展开节点， 默认展开节点，暂不做
		this.props.afterExpand(nodeData)
	}

	addNode(nodeData) {
		/**
		* 树控件之外的其他操作，增删改查,
		* 内部的操作较为简单， 直接操作state 主要是，遍历的优化
		* 1.难点，外部操作 通过发布订阅的方式
		*/
		// goalNode -> push
	} 

	componentWillReceiveProps(nextProps) {

	}
	
	render() {
		let {style, isMulti} = this.props;
		let {treeData, selectedNode, checkedNodes} = this.state;
		return  <div className="" style={style}>
					<ul className="tree">
						{
							treeData.map((child, index) => {
								return  <TreeNode 
											key={'tree_' + child.id} 
											nodeData={child}
											isMulti={isMulti}
											selectedNode={selectedNode}
											checkedNodes={checkedNodes}
											handleClick={this.handleClick}
											handleCheck={this.handleCheck}
											handleExpand={this.handleExpand}
											/>
							})
						}
					</ul>
				</div>
	}
}

export default Tree
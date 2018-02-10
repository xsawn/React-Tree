import React from 'react';
import PropTypes from 'prop-types'
import './Tree.less';

class TreeNode extends React.Component {

	static propTypes = {
		nodeData: PropTypes.object, 

	}

	static defaultProps = {
		expanded: false,
		isChecked: false,
		isSelected:false
	}

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded,
			isChecked: props.isChecked,
			isSelected: props.isSelected
		};
	}
	handleExpand = () => {
		this.setState({
			expanded: !this.state.expanded
		}, ()=>this.props.handleExpand(this.props.nodeData))
	}

	handleCheckboxChange = e => {
		this.props.handleCheck(this.props.nodeData, e.target.value)
	}

	renderCheckbox() {
		let {nodeData, checkedNodes} = this.props;
		let isChecked = checkedNodes.includes(nodeData.id);
		return <span className="checkbox"><input type='checkbox' checked={isChecked} onChange={this.handleCheckboxChange}/></span>;
	}

	handleNodeClick = e => {
		this.props.handleClick(this.props.nodeData)
	}

	renderNode() {
		let {nodeData, selectedNode} = this.props;
		let {text, children} = nodeData;
		let {expanded, isSelected} = this.state;
		let hasChild = children && children.length;
		let switcherClass = `switcher ${expanded?"expanded":""}`;
		let nodeTextClass = selectedNode == nodeData.id?"node-content selected":"node-content"
		// let nodeItemClass =  `node-item ${selectedNode == nodeData.id?"selected":""}`

		return <a className="node-item" >
					{hasChild?<i className={switcherClass} onClick={e=>{this.handleExpand()}}></i>:<i className="no-switcher"></i>}
					{this.props.isMulti && this.renderCheckbox()}
					<span className={nodeTextClass} onClick={this.handleNodeClick}>{text}</span>
				</a>
	}

	renderChildren() {
		let {nodeData, isMulti, selectedNode, checkedNodes, handleClick, handleCheck, handleExpand} = this.props;
		let {style, children} = nodeData;
		return 	<ul className="tree">
						{
							children.map((child,index) => {
								return  <TreeNode 
											key={'tree_' + child.id} 
											nodeData={child}
											isMulti={isMulti}
											selectedNode={selectedNode}
											checkedNodes={checkedNodes}
											handleClick={handleClick}
											handleCheck={handleCheck}
											handleExpand={handleExpand}
											/>
							})
						}
					</ul>
	}

	render() {
		let {expanded} = this.state
		let {children} = this.props.nodeData
		let hasChildren = children && children.length
		return  <li className="tree-node">
					{this.renderNode()}
					{expanded && hasChildren && this.renderChildren()}
				</li>
	}
}

export default TreeNode;